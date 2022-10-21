import { createSummaryRow, fillRow, summaryTable } from "./util.js";


let table = document.querySelector('.editor');
let page = 0;
let summary = (JSON.parse(localStorage.getItem('summary')));
let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
summaryTable();
let year = "";
let summaryKeys;


if (Object.entries(summary).length > 0) {
  console.log(Object.keys(summary))
  summaryKeys = Object.keys(summary);
  year = summaryKeys[0];
  (createSummaryRow(table));
  let currecyElements = Array.from(document.querySelectorAll('.currency'));
  currecyElements.forEach(el => el.textContent = 0);

  let thead = Array.from(document.querySelector('thead tr').children).slice(1, 4);
  let btns = Array.from(document.querySelectorAll('#summary button'));
  btns.forEach(b => b.addEventListener('click', onClick));
  currecyElements.forEach(e => e.textContent = 0);
  for (let i = 0; i < page + 3; i++) {
    if (year != "") {
      thead[i].textContent = months[i] + ` ${year}`;

    }


  }

  fillRow();
}





function onClick(e) {

  let thead = Array.from(document.querySelector('thead tr').children).slice(1, 4);
  if (e.target.textContent.includes('Next') && year != "") {


    page == (months.length) * summaryKeys.length - 3 ? (page = (months.length) * summaryKeys.length - 3) : (page += 3);

    let index = 0;
    if (page % 12 == 0) {
      year++;
    }

    if (page > 11 && page != 0) {

      for (let i = Math.floor(page % 12); i < Math.floor(page % 12) + 3; i++) {
        thead[index].textContent = months[i] + ` ${year}`;
        index++;
      }
    } else {
      for (let i = page; i < page + 3; i++) {
        thead[index].textContent = months[i] + ` ${year}`;
        index++;
      }
    }




    fillRow()

  } else if (year != '') {
    page > 0 ? (page -= 3) : (page = 0);

    let index = 2;
    if (page % 12 == 0 && page != 0) {
      year--;
    }
    if (page > 11) {

      for (let i = Math.floor(page % 12); i > Math.floor(page % 12 - 3); i--) {

        thead[index].textContent = months[i + 3 - 1] + ` ${year}`;
        index--;

      }

    } else {
      for (let i = page; i > page - 3; i--) {

        thead[index].textContent = months[i + 3 - 1] + ` ${year}`;
        index--;

      }
    }

  }

  fillRow()


}


