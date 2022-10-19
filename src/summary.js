import { fillRow, summaryTable } from "./util.js";


let page = 0;
let summary = (JSON.parse(localStorage.getItem('summary')));

let thead = Array.from(document.querySelector('thead tr').children).slice(1, 4);
thead.forEach(t => t.textContent = '');
let btns = Array.from(document.querySelectorAll('#summary button'));
let thArray = document.querySelectorAll('tbody tr th');
let rowElements = Array.from(document.querySelectorAll('tbody tr  span'));
btns.forEach(b => b.addEventListener('click', onClick));
let startIndex = 0;

let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
summaryTable();

for (let i = 0; i < page + 3; i++) {

  thead[i].textContent = months[i];


}
fillRow()






function onClick(e) {



  //thead.forEach(t => t.textContent = '');
  if (e.target.textContent.includes('Next')) {
    page >= months.length - 3 ? (page = months.length - 3) : (page += 3);

    let index = 0;

    for (let i = page; i < page + 3; i++) {


      thead[index].textContent = months[i];

      index++;

    }

    //thead.forEach(e => console.log(e.textContent));
    fillRow()

  } else {
    page > 0 ? (page -= 3) : (page = 0);

    let index = 2;
    for (let i = page; i > page - 3; i--) {

      thead[index].textContent = months[i + 3 - 1];
      index--;
    }
  }
  fillRow()


}


