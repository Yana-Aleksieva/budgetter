import { createTableElement, generateId, start } from "./util.js";

start('expenses')

let form = document.querySelector("#new-expense");

let saveBtn = document.querySelector(".centered").children[0];
let cancelBtn = document.querySelector(".centered").children[1];
let tBody = document.querySelector('tbody');
tBody.addEventListener('click', modifyTableRow)

saveBtn.addEventListener('click', onClick);
cancelBtn.addEventListener('click', onCancelation)



function onClick(e) {

    e.preventDefault();
    const formData = Object.fromEntries(new FormData(form));
    let index = formData['category'];

    let selected = document.querySelector(`[name=category]`).children[index].textContent;
    formData['category'] = selected;
    let map = new Map(JSON.parse(localStorage.getItem('expenses')));

    let id = generateId();
    let row = createTableElement(formData, 'expenses');
    row.setAttribute('id', id)
    document.querySelector('tbody').append(row);

    map.set(row.getAttribute('id'), formData);
    localStorage.setItem('expenses', JSON.stringify(Array.from(map.entries())))


    form.reset();
}


function modifyTableRow(e) {


    let row = e.target.parentElement.parentElement;
    let id = row.getAttribute('id');
    let map = new Map(JSON.parse(localStorage.getItem('expenses')));
    if (e.target.textContent == "Edit") {

        console.log('edit');

        let currentEl;
        for (let el of map) {

            if (el[0] == id) {


                for (let key in el[1]) {
                    console.log(key)
                    currentEl = document.querySelector(`[name=${key}]`);
                    console.log(currentEl)
                    currentEl.value = el[1][key]

                }

                row.remove();
                map.delete(el[0]);
                localStorage.setItem('expenses', JSON.stringify(Array.from(map.entries())));
            }

        }

    } else if (e.target.textContent == "Delete") {
        console.log('delete');
        row.remove();
        map.delete(id);
        localStorage.setItem('expenses', JSON.stringify(Array.from(map.entries())));

    }
}


function onCancelation(e) {

    e.preventDefault();
    const formData = Object.fromEntries(new FormData(form));
    form.reset();

}


