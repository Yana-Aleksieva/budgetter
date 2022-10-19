

setLocalStorage();


export function generateId() {


    let id = Math.floor(Math.random() * 999999999999).toString(16);
    return id;
}

export function createTableElement(formInput, name) {


    let trEl = document.createElement('tr');


    for (let key in formInput) {

        let td = document.createElement('td');


        if (key === 'date' || key == 'month') {

            if (name === 'expenses') {
                td.textContent = formatDate(formInput[key])
            } else if (name === 'budget') {
                td.textContent = getMonth(formInput[key]);

            }


        } else
            if (key == 'amount' || key == 'income' || key == 'budget') {

                let span = document.createElement('span');
                span.textContent = formInput[key];

                span.className = 'currency';
                td.append(span);
            } else {

                td.textContent = formInput[key];
            }
        trEl.append(td);

    }

    trEl.append(createButtons());



    return trEl
}


function formatDate(date) {

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

    let current = new Date(date);

    let month = current.getMonth();
    let day = current.getDate();
    return `${day}.${months[month]}`

}

export function getMonth(date) {

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
    let date1 = date.toString().split('-')
    console.log(date1)
    let [month, year] = [...date1];

    let currentDate = new Date(year, month);
    month = currentDate.getMonth();
    year = currentDate.getFullYear()

    console.log(`${months[month]}.${year}`)
    return `${months[month]}.${year}`
}

function createButtons() {

    let td = document.createElement('td');
    let editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    let delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    td.append(editBtn);
    td.append(delBtn);
    return td;
}


export function setLocalStorage() {

    let map = new Map(JSON.parse(localStorage.getItem('expenses')));
    localStorage.setItem('expenses', JSON.stringify(Array.from(map.entries())));

}

export function removeItem(item) {

    localStorage.removeItem(`${item}`);
}


export function start(name) {

    let table = document.querySelector('tbody')
    let data = new Map(JSON.parse(localStorage.getItem(`${name}`)));
    table.replaceChildren();

    for (let el of data) {

        let current = createTableElement(el[1], name);
        current.setAttribute('id', el[0])

        table.append(current)

    }


}

export function summaryTable() {


    let summary = {};
    let expenses = new Map(JSON.parse(localStorage.getItem(`expenses`)));
    let entries = expenses.entries();

    for (let tuple of entries) {

        let date = new Date(tuple[1].date);
        let year = date.getFullYear();

        if (!summary.hasOwnProperty(year)) {
            summary[year] = {};
        }
        let returnedDate = formatDate(tuple[1].date).split('.');
        let month = returnedDate[1];
        let category = tuple[1].category;

        if (!summary[year].hasOwnProperty(category)) {

            summary[year][category] = {};

        }
        if (!summary[year][category].hasOwnProperty(month)) {
            summary[year][category][month] = 0;
        }

        summary[year][category][month] += (Number(tuple[1].amount));

    }

    localStorage.setItem('summary', JSON.stringify(summary))

}


function sumTotalMonth() {

    let tableEl = Array.from(document.querySelectorAll('tbody tr  span'));
    let thArray = document.querySelectorAll('tbody tr th');
    let totalElements = Array.from(document.querySelectorAll('.total  span'));

    //console.log(totalElements)
    for (let totalRow = 0; totalRow < totalElements.length; totalRow++) {
        let totalMonthSum = 0;
        for (let row = totalRow; row < tableEl.length; row += 3) {

            if (row >= tableEl.length) {
                break;
            }
            totalMonthSum += Number(tableEl[row].textContent);
            //console.log(tableEl[row].textContent)

        }
        totalElements[totalRow].textContent = totalMonthSum;
        //console.log(totalElements[totalRow])
    }
}

export function fillRow() {

    let thArray = document.querySelectorAll('tbody tr th');
    let rowElements = Array.from(document.querySelectorAll('tbody tr  span'));
    let startIndex = 0;
    let thead = Array.from(document.querySelector('thead tr').children).slice(1, 4);
    let summary = (JSON.parse(localStorage.getItem('summary')));
    console.log(summary)

    for (let row = 0; row < 10; row += 2) {
        let util = thArray[row].textContent;

        let currentCells = rowElements.slice(startIndex, startIndex + 4);
        currentCells.forEach(c => c.textContent = "");
        let total = 0;
        let i = 0;


        currentCells.forEach(e => {


            if (i == 3) {
                e.textContent = total;
            } else {


                let [currentMonth, currentYear] = (thead[i].textContent).split(' ');
                console.log(currentYear)

                if (summary.hasOwnProperty(currentYear)) {
                    console.log(summary[currentYear])
                    if (summary[currentYear].hasOwnProperty(util)) {

                        if (summary[currentYear][util].hasOwnProperty(currentMonth)) {

                            let sum = summary[currentYear][util][currentMonth];
                            e.textContent = sum;
                            total += Number(sum)
                        } else {
                            e.textContent = 0;
                        }
                    } else {
                        e.textContent = 0;
                    }
                } else {
                    e.textContent = 0;
                }
            }
            i++;
        });
        startIndex += 4;




    }

    sumTotalMonth()
}

