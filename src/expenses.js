import { createTableElement, start } from "./util.js";

start()

let form = document.querySelector("#new-expense");

let saveBtn = document.querySelector(".centered").children[0];
let cancelBtn = document.querySelector(".centered").children[1];


saveBtn.addEventListener('click', onClick);
cancelBtn.addEventListener('click', onCancelation)



function onClick(e) {

    e.preventDefault();
    const formData = Object.fromEntries(new FormData(form));
    let index = formData['category'];
    let selected = document.querySelector(`[name=category]`).children[index].textContent;
    formData['category'] = selected;

    let row = createTableElement(formData);
    document.querySelector('tbody').append(row);
    let map = new Map(JSON.parse(localStorage.getItem('expenses')));
   

    map.set(row.getAttribute('class'), formData);
    localStorage.setItem('expenses', JSON.stringify(Array.from(map.entries())))


    form.reset();
}



function onCancelation(e) {

    e.preventDefault();
    const formData = Object.fromEntries(new FormData(form));
    form.reset();

}


