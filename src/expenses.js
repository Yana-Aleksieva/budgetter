import { createTableElement, setItem } from "./util.js";


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
    console.log(formData);
 
    //console.log(data);
   document.querySelector('tbody').append(createTableElement(formData))
   console.log(createTableElement(formData))

    form.reset();
}



function onCancelation(e) {

    e.preventDefault();
    const formData = Object.fromEntries(new FormData(form));
    form.reset();

}

//onsole.log(formData)
