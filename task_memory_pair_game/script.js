"use strict";
window.onload = function() {
  
  const themes = [
    {
      "color1": "#f6da73",
      "color2": "#3e5336",
      "color3": "#e55b7e",
      "font": "theme1_font",
      "baseFontSize": "16"
    },
    {
      "color1": "#f4f6ec",
      "color2": "#2d0c03",
      "color3": "#f8b786",
      "font": "theme2_font",
      "baseFontSize": "16"
    }
  ];
  
  const doc = document.body;
  const themeButtons = document.querySelectorAll(".theme_selector__button");
  const sizeSelector = document.querySelector(".size_selector");
  const cardThemeSelector = document.querySelectorAll('input[name="option"]');
  const startButton = document.querySelector(".start_button");
  let gameArea = document.querySelector(".game_area");
  let numbersArray;
  let cardThemeSelected;
  let cardSelected;
  let cardsArray;
  let matchedCounter;
  
  startButton.addEventListener("click", startGame);

  themeButtons.forEach((el,i) => {
    el.style.setProperty("color", themes[i].color1);
    el.style.setProperty("background-color", themes[i].color2);
    el.style.setProperty("border-color", themes[i].color3);
    el.style.setProperty("font-family", themes[i].font);
    el.style.setProperty("font-size", (themes[i].baseFontSize - 1 ) + "px");
    el.addEventListener("click", function() {
      setupTheme(i);
    });
  });

  function setupTheme(num) {
    doc.style.setProperty("--color", themes[num].color1);
    doc.style.setProperty("--background_color", themes[num].color2);
    doc.style.setProperty("--decor_color", themes[num].color3);
    doc.style.setProperty("--font_family", themes[num].font);
    doc.style.setProperty("--base_font_size", themes[num].baseFontSize + "px");
  };
  
  function startGame() {
    cardThemeSelected = document.querySelector('input[name="option"]:checked');
    cardThemeSelector.forEach((item) => {
      item.disabled = true;
      item.nextElementSibling.classList.add("form_item-desabled");
      item.nextElementSibling.style.pointerEvents = "none";
    });
    sizeSelector.disabled = true;
    sizeSelector.classList.add("form_item-desabled");
    startButton.disabled = true;
    startButton.classList.add("form_item-desabled");
    startButton.style.pointerEvents = "none";
    matchedCounter = 0;
    prepareGameField();
  };
  
  function prepareGameField() {
    numbersArray = [];
    for (let i=0; i < sizeSelector.value/2; i++) {
      numbersArray[i] = i;
    };
    numbersArray = numbersArray.concat(numbersArray);

    function shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      };
    };
    
    shuffle(numbersArray);
    
    if (document.documentElement.clientHeight > document.documentElement.clientWidth) {
      if (sizeSelector.value == 12) {
        gameArea.classList.add("game_area-3columns");
      } else {
        gameArea.classList.add("game_area-4columns");
      };
    } else {
      if (sizeSelector.value <= 16) {
        gameArea.classList.add("game_area-4columns");
      } else if (sizeSelector.value == 20){
        gameArea.classList.add("game_area-5columns");
      } else {
        gameArea.classList.add("game_area-6columns");
      };
    };
    let fragment = document.createDocumentFragment();
    for (let i=0; i < sizeSelector.value; i++) {
      let card = document.createElement("button");
      card.classList.add("card");
      card.innerHTML = `<div class="card__front" style="background-image: url(img/${cardThemeSelected.value}_bg.jpg);"></div><div class="card__back" style="background-image: url(img/${cardThemeSelected.value}_${numbersArray[i] + 1}.jpg);"></div>`;
      fragment.append(card);
      card.addEventListener("click", checkCard);
    };
    gameArea.append(fragment);
    cardsArray = Array.from(document.querySelectorAll(".card"));
  };
  
  function checkCard({target}) {
    flipCard.call(target);
    setTimeout(function() {
      if (!cardSelected) {
        cardSelected = cardsArray.indexOf(target) + 1;
        lockCard.call(target);
      } else if ((numbersArray[cardSelected - 1] == numbersArray[cardsArray.indexOf(target)])&&(cardSelected - 1 != cardsArray.indexOf(target))) {
        vanishCard.call(cardsArray[cardSelected - 1]);
        vanishCard.call(target);
        cardSelected = "";
        matchedCounter++;
        if (matchedCounter == sizeSelector.value/2) {
          hailWinner();
        };
      } else {
        flipCard.call(cardsArray[cardSelected - 1]);
        unlockCard.call(cardsArray[cardSelected - 1])
        cardSelected = "";      
        flipCard.call(target);
      };
    }, 400);
    
    function vanishCard() {
      this.classList.add("card-vanish");
      this.setAttribute("tabindex", "-1");
    };
    
    function flipCard() {
      this.firstElementChild.classList.toggle("card__front-flip");
      this.lastElementChild.classList.toggle("card__back-flip");
    };
    
    function lockCard() {
      this.style.pointerEvents = "none";
      this.setAttribute("disabled", "true");
    };
    
    function unlockCard() {
      this.style.pointerEvents = "auto";
      this.removeAttribute("disabled");
    };
  };

  function hailWinner() {
    const hailWindow = document.createElement("div");
    hailWindow.classList.add("popup_hail__background");
    hailWindow.innerHTML = `<div class="popup_hail__window">Вы выиграли!<button class="popup_hail__button">Ok</button></div>`;
    doc.append(hailWindow);
    const okButton = document.querySelector(".popup_hail__button");
    okButton.addEventListener("click", resetWindow);
    
    function resetWindow() {
      okButton.removeEventListener("click", resetWindow);
      hailWindow.remove();
      sizeSelector.disabled = false;
      sizeSelector.classList.remove("form_item-desabled");
      startButton.disabled = false;
      startButton.classList.remove("form_item-desabled");
      startButton.style.pointerEvents = "all";
      cardThemeSelector.forEach((item) => {
        item.disabled = false;
        item.nextElementSibling.classList.remove("form_item-desabled");
        item.nextElementSibling.style.pointerEvents = "all";
      });
      gameArea.classList.forEach((item) => {
        gameArea.classList.remove(item);
      });
      gameArea.classList.add("game_area");
      gameArea.innerHTML = "";
    };
  };
}