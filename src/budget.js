import { createTableElement, generateId, start } from "./util.js";

console.log('budget');

start('budget')
const form = document.querySelector('#new-budget');
let tBody = document.querySelector('tbody');
let btns = Array.from(document.querySelectorAll('.action'));
tBody.addEventListener('click', editTableRow)
btns.forEach(b => b.addEventListener('click', onClick))



function onClick(e) {

    e.preventDefault();

    const formData = Object.fromEntries(new FormData(form));
    //console.log(formData)
    if (e.target.textContent === "Save") {

        let row = createTableElement(formData, 'budget');
        console.log(formData)
        let id = generateId();
        row.setAttribute('id', id)
        document.querySelector('tbody').append(row);
        let map = new Map(JSON.parse(localStorage.getItem('budget')));
        map.set(row.getAttribute('id'), formData);
        localStorage.setItem('budget', JSON.stringify(Array.from(map.entries())))
        form.reset();
      
    } else if (e.target.textContent === "Cancel") {

        
    }
}

function editTableRow(e) {
    let row = e.target.parentElement.parentElement;
    let id = row.getAttribute('id');
    let map = new Map(JSON.parse(localStorage.getItem('budget')));
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
                localStorage.setItem('budget', JSON.stringify(Array.from(map.entries())));
            }

        }

    } else if (e.target.textContent == "Delete") {
        console.log('delete');
        row.remove();
        map.delete(id);
        localStorage.setItem('budget', JSON.stringify(Array.from(map.entries())));

    }
}

