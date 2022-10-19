import { fillRow, summaryTable } from "./util.js";


let page = 0;
let summary = (JSON.parse(localStorage.getItem('summary')));
let h2 = document.querySelector('h2');
let thead = Array.from(document.querySelector('thead tr').children).slice(1, 4);
thead.forEach(t => t.textContent = '');
let btns = Array.from(document.querySelectorAll('#summary button'));
let thArray = document.querySelectorAll('tbody tr th');
let rowElements = Array.from(document.querySelectorAll('tbody tr  span'));
btns.forEach(b => b.addEventListener('click', onClick));
let startIndex = 0;

let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
summaryTable();
let summaryKeys = Object.keys(summary);



let year = 0;

for (let i = 0; i < page + 3; i++) {

  thead[i].textContent = months[i]+ ` ${summaryKeys[year]}`;

}

//console.log(year)

fillRow();










function onClick(e) {
 
  if (e.target.textContent.includes('Next')) {


    page == (months.length) * summaryKeys.length - 3 ? (page = (months.length) * summaryKeys.length - 3) : (page += 3);

    let index = 0;
if(page % 12 == 0 ){
  year++;
}

    if (page > 11 && page != 0) {

      for (let i = Math.floor(page % 12); i < Math.floor(page % 12) + 3; i++) {
        thead[index].textContent = months[i]+ ` ${summaryKeys[year]}`;
        index++;
      }
    } else {
      for (let i = page; i < page + 3; i++) {
        thead[index].textContent = months[i] + ` ${summaryKeys[year]}`;
        index++;
      }
    }




    fillRow()

  } else {
    page > 0 ? (page -= 3) : (page = 0);

    let index = 2;
    if(page % 12 == 0 && page != 0 ){
      year--;
    }
    if (page > 11) {

      for (let i = Math.floor(page % 12); i > Math.floor(page % 12 - 3); i--) {

        thead[index].textContent = months[i + 3 - 1] + ` ${summaryKeys[year]}`;
        index--;
      
      }

    } else {
      for (let i = page; i > page - 3; i--) {

        thead[index].textContent = months[i + 3 - 1] + ` ${summaryKeys[year]}`;
        index--;
      
      }
    }

  }

  fillRow()


}


