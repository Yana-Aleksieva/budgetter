import { getMonth, formatDate } from "./util.js";

let summary = (JSON.parse(localStorage.getItem('expenses')));

//console.log(summary)
//summary = summary.forEach(tuple => Object.values(tuple[1]).sort((a, b) => new Date(a.month) - new Date(b.month) || new Date(a.date) - new Date(b.date) ))

//summary = (Object.values(summary).sort((a, b) => new Date(a.month) - new Date(b.month) || new Date(a.date) - new Date(b.date)))


let months = {
    0: 'Jan',
    1: 'Feb',
    2: 'Mar',
    3: 'Apr',
    4: 'May',
    5: 'Jun',
    6: 'Jul',
    7: 'Aug',
    8: 'Sep',
    9: 'Oct',
    10: 'Nov',
    11: 'Dec'
}

let breakdown = { 'Utilities': 0, 'Groceries': 0, 'Other': 0, 'Transport': 0, 'Entertainment': 0 };
let hasBudget = false;
let obj = { 'Spent': 0, 'Remaining': 0, 'Savings': 0 };
let currentDate = new Date();
let currentYear = currentDate.getFullYear().toString();
let currentMonth = months[currentDate.getMonth()];

if (summary != null && Object.entries(summary).length > 0) {

    for (let tuple of summary) {

        let year;
        let month;
        let day;

        if (tuple[1].date) {
            [day, month, year] = formatDate(tuple[1].date).split('.');
            if (currentYear == (year) && currentMonth == month) {

                obj.Spent += Number(tuple[1].amount);

                for (let key in breakdown) {



                    if (key == tuple[1].category) {

                        let sum = Number(tuple[1].amount);
                        breakdown[key] += sum;

                    }
                }

            }

        } else if (tuple[1].month) {

            [month, year] = getMonth(tuple[1].month).split('.');

            if (currentYear == (year) && currentMonth == month) {

                let budget = Number(tuple[1].budget);
                if (budget) {
                    hasBudget = true;
                }
                obj.Remaining += budget
                obj.Savings = tuple[1].income - budget

            }
        }


    }

    if (hasBudget) {

        obj.Remaining -= obj.Spent;

        let article = document.querySelector('article:not([class=clear])');

        createLeftColEl(document.querySelector('.left-col'), obj);

        let max = Object.values(breakdown).sort((a, b) => b - a)[0];

        let objSum = Object.values(obj).reduce((acc, x) => acc + x, 0);
        createLeftColEl(article, breakdown, max);
        console.log(max)
        let rigthEl = document.querySelector('.right-col');


        for (let key in obj) {

            if (key == 'Spent') {
                createRigthCol(rigthEl, 'ov spent', (Number(obj[key]) / objSum * 300));
            } else if (key == 'Remaining') {
                createRigthCol(rigthEl, 'ov remain', (obj[key] / objSum * 300));
            } else {
                createRigthCol(rigthEl, 'ov save', (obj[key] / objSum * 300));
            }
        }

    }




}

function createLeftColEl(parent, obj, max) {

    for (let key in obj) {

        let div = document.createElement('div');
        div.className = 'cat-row';

        for (let j = 0; j < 2; j++) {
            let spanEl = document.createElement('span');
            if (j == 0) {
                spanEl.className = 'row label';
                spanEl.textContent = `${key}`;
            } else {
                spanEl.className = 'row value';
                spanEl.textContent = `${obj[key]}`;
            }

            div.append(spanEl)
        }

        if (max !== undefined) {
            let bar = document.createElement('div');
            bar.setAttribute('class', 'bar-area');
            let span = document.createElement('span');
            span.setAttribute('class', 'bar')
            let sum = Math.floor((obj[key] / max) * 500);

            span.style.width = `${sum}` + 'px';
            //span.style.width =`${Math.floor(20)}px`;
            bar.append(span);
            div.append(bar);
        }


        parent.append(div);
    }


}

function createRigthCol(parent, elClass, elHeigh) {


    let div = document.createElement('div');
    div.className = `${elClass}`;
    div.style.height = `${Math.floor(elHeigh)}px`;
    //console.log(elHeigh)
    parent.append(div);


    return div;
}