

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
    //console.log(expenses)
    let entries = expenses.entries();
    //console.log(entries)
    for (let tuple of entries) {

        //console.log(tuple[1].date);
        let returnedDate = formatDate(tuple[1].date).split('.');
        let month = returnedDate[1];
        let category = tuple[1].category;
       // console.log(month);
        if(!summary.hasOwnProperty(category)){

            summary[category] = {};
            
         
            
        }
        if(!summary[category].hasOwnProperty(month)){
            summary[category][month] = 0;
        }
        
        summary[category][month] += (Number(tuple[1].amount));
    }
    //console.log(summary);

    localStorage.setItem('summary', JSON.stringify(summary))

}