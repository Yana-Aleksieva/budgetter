import { createTableElement, generateId, start } from "./util.js";



console.log('budget');

start('budget');
const form = document.querySelector('#new-budget');
let tBody = document.querySelector('tbody');
let btns = Array.from(document.querySelectorAll('.action'));
tBody.addEventListener('click', editTableRow);
btns.forEach(b => b.addEventListener('click', onClick));

let currentItem;
let currentId;
function onClick(e) {

    e.preventDefault();

    const formData = Object.fromEntries(new FormData(form));

    if (e.target.textContent === "Save") {

        let row = createTableElement(formData, 'budget');
        let id = generateId();
        row.setAttribute('id', id)
        document.querySelector('tbody').append(row);
        let map = new Map(JSON.parse(localStorage.getItem('expenses')));
        map.set(row.id, formData);
        localStorage.setItem('expenses', JSON.stringify(Array.from(map.entries())))
        form.reset();

    } else if (e.target.textContent === "Cancel") {
        let map = new Map(JSON.parse(localStorage.getItem('expenses')));

        if (currentId !== undefined && currentItem != undefined) {

            map.set(currentId, currentItem);
            localStorage.setItem('expenses', JSON.stringify(Array.from(map.entries())));
        }
        start('budget');
        form.reset();

    }
}

function editTableRow(e) {
    let row = e.target.parentElement.parentElement;
    let id = row.id;
    currentId = id;
    let map = new Map(JSON.parse(localStorage.getItem('expenses')));

    if (e.target.textContent == "Edit") {

        let currentEl;
        for (let el of map) {

            if (el[0] == id) {


                for (let key in el[1]) {

                    console.log(key)
                    currentEl = document.querySelector(`[name=${key}]`);
                    currentEl.value = el[1][key]

                }

                row.remove();
                currentItem = map.get(id);

                map.delete(el[0]);
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


