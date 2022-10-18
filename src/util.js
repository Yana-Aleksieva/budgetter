

setLocalStorage();


export function generateId() {


    let id = Math.floor(Math.random() * 999999999999).toString(16);
    return id;
}

export function createTableElement(formInput) {


    let trEl = document.createElement('tr');


    for (let key in formInput) {

        let td = document.createElement('td');


        if (key == 'date') {

            td.textContent = formatDate(formInput[key]);
            // console.log(formInput[key])
        } else
            if (key == 'amount') {

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
    //console.log(day)
    return `${day}.${months[month]}`

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

        let current = createTableElement(el[1]);
        current.setAttribute('id', el[0])

        table.append(current)

    }


}

