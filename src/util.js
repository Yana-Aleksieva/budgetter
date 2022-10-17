

export function createTableElement(formInput) {

  
    setItem(data)
    let id = Math.floor(Math.random() * 999999999999).toString(16);
   
    let trEl = document.createElement('tr');
    let date = formInput['date'];

    for (let key in formInput) {

        let td = document.createElement('td');


        if (key == 'date') {

            td.textContent = formatDate(formInput[key])
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
    /*<tr>
                        <td>4.Jun</td>
                        <td>Electricity</td>
                        <td>Utilities</td>
                        <td><span class="currency">100</span></td>
                        <td><button>Edit</button><button>Delete</button></td>
                    </tr>
                    */
                    data.set(id, formInput);           
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
    let day = current.getDay();
    return `${day}.${months[month]}`

}

function createButtons(){

    let td = document.createElement('td');
    let editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    let delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    td.append(editBtn);
    td.append(delBtn);
    return td;
}


export function setItem(){

    let data = new Map();
    localStorage.setItem('expenses');
}

export function removeItem(item){

    localStorage.removeItem(`${item}`);
}


