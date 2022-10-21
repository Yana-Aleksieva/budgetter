

setLocalStorage();
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
  if (name == 'budget' || name == 'expenses') {
    trEl.append(createButtons());
  }




  return trEl
}

export function createSummaryRow(el) {



 
  el.innerHTML += 
   
  `<thead>
  <tr>
      <th>Category</th>
      <th>Jan</th>
      <th>Feb</th>
      <th>Mar</th>
      <th>Total</th>
  </tr>
</thead>
<tbody>
  <tr>
      <th>Utilities</th>
      <td><span class="currency"></span></td>
      <td><span class="currency"></span></td>
      <td><span class="currency"></span></td>
      <th><span class="currency"></span></th>
  </tr>
  <tr>
      <th>Groceries</th>
      <td><span class="currency"></span></td>
      <td><span class="currency"></span></td>
      <td><span class="currency"></span></td>
      <th><span class="currency"></span></th>
  </tr>
  <tr>
      <th>Entertainment</th>
      <td><span class="currency"></span></td>
      <td><span class="currency"></span></td>
      <td><span class="currency"></span></td>
      <th><span class="currency"></span></th>
  </tr>
  <tr>
      <th>Transport</th>
      <td><span class="currency"></span></td>
      <td><span class="currency"></span></td>
      <td><span class="currency"></span></td>
      <th><span class="currency"></span></th>
  </tr>
  <tr>
      <th>Other</th>
      <td><span class="currency"></span></td>
      <td><span class="currency"></span></td>
      <td><span class="currency"></span></td>
      <th><span class="currency"></span></th>
  </tr>
</tbody>
<tfoot>
  <tr class="total">
      <th>Total Spent</th>
      <td><span class="currency"></span></td>
      <td><span class="currency"></span></td>
      <td><span class="currency"></span></td>
      <th><span class="currency"></span></th>
  </tr>
  <tr class="overrun">
      <th>Budget Overruns</th>
      <td><span class="currency"></span></td>
      <td><span class="currency"></span></td>
      <td><span class="currency"></span></td>
      <th><span class="currency"></span></th>
  </tr>
  <tr class="savings">
      <th>Savings</th>
      <td><span class="currency"></span></td>
      <td><span class="currency"></span></td>
      <td><span class="currency"></span></td>
      <th><span class="currency"></span></th>
  </tr>
</tfoot>`
return el;
  
}

function formatDate(date) {

  let current = new Date(date);

  let month = current.getMonth();
  let day = current.getDate();
  return `${day}.${months[month]}`

}

export function getMonth(date) {


  let date1 = date.toString().split('-')

  let [month, year] = [...date1];

  let currentDate = new Date(year, month);
  month = currentDate.getMonth();
  year = currentDate.getFullYear()


  return `${months[month - 1]}.${year}`
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
    summary[year]['spendedMoney'] = 0;
    summary[year]['savedMoney'] = 0;
    summary[year]['overruns'] = 0;
  }

  localStorage.setItem('summary', JSON.stringify(summary))

}


function sumTotalMonth() {

  let tableEl = Array.from(document.querySelectorAll('tbody tr td span'));
  let thArray = document.querySelectorAll('tbody tr th');
  let totalElements = Array.from(document.querySelectorAll('.total td span'));


  for (let totalRow = 0; totalRow < totalElements.length; totalRow++) {
    let totalMonthSum = 0;
    for (let row = totalRow; row < tableEl.length; row += 3) {

      if (row >= tableEl.length) {
        break;
      }
      totalMonthSum += Number(tableEl[row].textContent);

    }
    totalElements[totalRow].textContent = totalMonthSum;

  }
}

function sumTotalUtils() {

  let totalEl = Array.from(document.querySelectorAll('tbody tr th span'));
  let rowElements = Array.from(document.querySelectorAll('tbody tr td span'));
  rowElements = rowElements.map(e => e.textContent);
  let totalSpend = document.querySelector('.total th span');



  for (let col = 0; col < rowElements.length; col += 3) {
    let total = 0;
    let currentEl = rowElements.slice(col, col + 3)
      .reduce((a, x) => Number(a) + Number(x), 0)
    total += currentEl;

  }

  totalEl = totalEl.map(e => e.textContent);
  totalSpend.textContent = totalEl.reduce((a, x) => Number(a) + Number(x), 0);



}

export function fillRow() {

  let thArray = document.querySelectorAll('tbody tr th');
  let rowElements = Array.from(document.querySelectorAll('tbody tr span'));
  let startIndex = 0;
  let thead = Array.from(document.querySelector('thead tr').children).slice(1, 4);
  let summary = (JSON.parse(localStorage.getItem('summary')));
  let year = '';
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


        if (summary.hasOwnProperty(currentYear)) {
          year = currentYear;
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
  sumTotalUtils();
  sumTotalMonth();
  sumBudget(year);
}

function sumBudget(year) {


  let thead = Array.from(document.querySelector('thead tr').children).slice(1, 4);
  let budgetFields = Array.from(document.querySelectorAll('.overrun td span'));
  let spendEl = Array.from(document.querySelectorAll('.total td span'));
  let budget = Object.fromEntries(new Map(JSON.parse(localStorage.getItem(`budget`))));
  let savings = Array.from(document.querySelectorAll('.savings td span'));
  let totalsavings = document.querySelector('.savings th span');
  let totalSpend = Array.from(document.querySelectorAll('.overrun th span'));
  let summary = (JSON.parse(localStorage.getItem('summary')));



  for (let key in budget) {


    let currentEl = budget[key];
    let [month, currentYear] = currentEl.month.split('-');

    month = getMonth(currentEl.month).split('.')[0];

    if (year = currentYear) {

      for (let i = 0; i < thead.length; i++) {


        if (thead[i].textContent.includes(month)) {
          console.log(thead[i].textContent, month);
          let currentSpend = Number(spendEl[i].textContent);
          let currentBudget = Number(currentEl.budget);
          let currentIncome = Number(currentEl.income);
          let diff = (currentIncome - currentBudget) - currentSpend;

          if (diff < 0) {
            budgetFields[i].textContent = Math.abs(diff);
            savings[i].textContent = 0;


          } else {
            savings[i].textContent = diff;
            budgetFields[i].textContent = 0;

          }
        } else {
          budgetFields[i].textContent = 0;
          savings[i].textContent = 0;

        }

      }

    }

  }


  if (year) {
    let spendMoney = budgetFields.map(e => e.textContent)
      .reduce((a, x) => Number(a) + Number(x), 0);
    totalSpend[0].textContent = Number(spendMoney);
    summary[year].overruns += spendMoney;
    summary[year].spendedMoney += Number(document.querySelector('.total th span').textContent);
    let totalSavedMoney = savings.map(e => e.textContent)
      .reduce((a, x) => Number(a) + Number(x), 0);
    totalsavings.textContent = totalSavedMoney;
    summary[year].savedMoney += totalSavedMoney;
    localStorage.setItem('summary', JSON.stringify(summary));
  }
}

