import { summaryTable } from "./util.js";


let page = 0;
let thead = Array.from(document.querySelector('thead tr').children).slice(1, 4);
thead.forEach(t => t.textContent = '')
let btns = Array.from(document.querySelectorAll('#summary button'));

btns.forEach(b => b.addEventListener('click', onClick))
let months = ['Jan', 'Feb', 'Mar', 'April', 'May', 'June', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
summaryTable();

for (let i = 0; i < page + 3; i++) {
    thead[i].textContent = months[i]
}



function onClick(e) {

    let summary = (JSON.parse(localStorage.getItem('summary')));
   
  
    if (e.target.textContent.includes('Next')) {
        page >= months.length - 3 ? (page = months.length -3) : (page += 3);
       
        let index = 0;
       


        for (let i = page; i < page + 3; i++) {


            thead[index].textContent = months[i]
            index++;
        }

    } else {
        page  <= 3 ? (page = 3) : (page -= 3);
       
        let index = 2;
        for (let i = page; i > page - 3; i--) {
            
            thead[index].textContent = months[i-1];
            index--;
        }
    }

   

}