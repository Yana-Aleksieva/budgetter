import { createTableElement, generateId, start, summaryTable } from "./util.js";

start('expenses');

let form = document.querySelector("#new-expense");
let buttons = Array.from(document.querySelectorAll('form button'))
buttons.forEach(b => b.id = generateId());

let saveBtn = document.querySelector(".centered").children[0];
let cancelBtn = document.querySelector(".centered").children[1];
let tBody = document.querySelector('tbody');
tBody.addEventListener('click', modifyTableRow)
saveBtn.addEventListener('click', onClick);
cancelBtn.addEventListener('click', onCancelation)

let currentId;
let currentItem;

function onClick(e) {

    e.preventDefault();


    const formData = Object.fromEntries(new FormData(form));
    let index = formData['category'];

    let selected = document.querySelector(`[name=category]`).children[index].textContent;
    formData['category'] = selected;
    let map = new Map(JSON.parse(localStorage.getItem('expenses')));

    map.set(generateId(), formData);
    localStorage.setItem('expenses', JSON.stringify(Array.from(map.entries())));
    start('expenses');
    summaryTable();

    form.reset();
}


function modifyTableRow(e) {


    let row = e.target.parentElement.parentElement;
    let id = row.id;
    currentId = id;
    let map = new Map(JSON.parse(localStorage.getItem('expenses')));
    let rowElement;

    if (e.target.textContent == "Edit") {

        let elId;
        let currentEl;
        for (let el of map) {

            if (el[0] == id) {

                elId = el[0];
                for (let key in el[1]) {

                    currentEl = document.querySelector(`[name=${key}]`);

                    currentEl.value = el[1][key];
                }
                currentItem = map.get(id);
                map.delete(id);
                row.remove();
                rowElement = el;

                localStorage.setItem('expenses', JSON.stringify(Array.from(map.entries())));

            }

        }


    } else if (e.target.textContent == "Delete") {
        let text = 'Do you really want to delete this utility?'

        if (confirm(text) == true) {
            row.remove();
            map.delete(id);
            localStorage.setItem('expenses', JSON.stringify(Array.from(map.entries())));
        }


    }
}


function onCancelation(e) {

    e.preventDefault();

    if (currentId !== undefined && currentItem != undefined) {
        let map = new Map(JSON.parse(localStorage.getItem('expenses')));
        map.set(currentId, currentItem);
        localStorage.setItem('expenses', JSON.stringify(Array.from(map.entries())));
    }

    start('expenses');
    form.reset();

}
