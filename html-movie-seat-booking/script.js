"use strict";
const seats = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
  [0, 0, 0, 2, 0, 2, 0, 0, 0, 0],
  [0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
  [0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
  [3, 3, 3, 3, 4, 3, 3, 3],
];

// 0 is free seat, 1 is inaccessible seat, 2 is used seat, 3 is vip-seat, 4 is used vip-seat

const seatsForm = document.forms.auditorium__selection;

function initAuditorium() {
  seatsForm.innerHTML = "";
  let renderString = "";
  seats.forEach((item, i) => {
    renderString += `<div class="auditorium__row">${prepareRow(item, i)}</div>`;
  });
  renderString += `<input type="submit" class="seats_submit" value="Заказать">`;
  seatsForm.innerHTML = renderString;
}

function prepareRow(rowData, rowIndex) {
  let rowString = "";
  rowData.forEach((item, i) => {
    switch (item) {
      case 0:
        rowString += `<input type="checkbox" id="seat${
          rowIndex + 1 + "_" + (i + 1)
        }"/><label for="seat${rowIndex + 1}_${i + 1}" class="seat"></label>`;
        break;
      case 1:
        rowString += `<input type="checkbox" id="seat${rowIndex + 1}_${
          i + 1
        }" disabled /><label for="seat${rowIndex + 1}_${
          i + 1
        }" class="seat"></label>`;
        break;
      case 2:
        rowString += `<input type="checkbox" id="seat${rowIndex + 1}_${
          i + 1
        }" disabled checked /><label for="seat${rowIndex + 1}_${
          i + 1
        }" class="seat"></label>`;
        break;
      case 3:
        rowString += `<input type="checkbox" id="seat${rowIndex + 1}_${
          i + 1
        }" data-type="vip"><label for="seat${rowIndex + 1}_${
          i + 1
        }" class="seat" /></label>`;
        break;
      case 4:
        rowString += `<input type="checkbox" id="seat${rowIndex + 1}_${
          i + 1
        }" disabled checked data-type="vip"/><label for="seat${rowIndex + 1}_${
          i + 1
        }" class="seat" /></label>`;
    }
  });
  return rowString;
}

initAuditorium();
