let breakdown = { 'Utilities': 0, 'Groceries': 0, 'Other': 0, 'Transport': 0, 'Entertainment': 0 };

const allMonths = {
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
setLocalStorage();



let utils = Object.keys(breakdown);

export function sortLocalstorage() {

  let summary = new Map(JSON.parse(localStorage.getItem('expenses')));
  let data1 = (Object.values(Object.fromEntries(data)).sort((a, b) => new Date(a.month) - new Date(b.month) || new Date(a.date) - new Date(b.date)))
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

export function getYear(arr) {

  let years = [];

  for (let tuple of arr) {

    if (tuple[1].hasOwnProperty(['month'])) {
      // console.log(tuple[1])

      let currentYear = getMonth(tuple[1].month).split('.')[1];
      if (years.filter(y => y == currentYear).length == 0) {
        years.push(currentYear);
      }

      //console.log()
    }
  }
  return years;
}

export function createSummaryRow(el) {

  el.append(createTableHead(), cteateTbody(), createTableFooter());


}


function createTableHead() {

  let tHead = document.createElement('thead');
  let trEl = document.createElement('tr');

  for (let i = 0; i < 5; i++) {
    let thEl = document.createElement('th');
    if (i == 0) {
      thEl.textContent = 'Category';
    } else if (i === 4) {
      thEl.textContent = 'Total';
    } else {
      thEl.textContent = '';
    }
    trEl.append(thEl);
  }
  tHead.append(trEl);
  return tHead;

}


function cteateTbody() {


  let tBody = document.createElement('tbody');

  for (let i = 0; i < 5; i++) {

    let trEl = document.createElement('tr');

    for (let j = 0; j < 5; j++) {

      let el;
      let span;
      if (j == 0) {
        el = document.createElement('th');
        el.textContent = utils[i];
      } else if (j == 4) {
        el = document.createElement('th');
        span = document.createElement('span');
        span.className = 'currency';
        el.append(span);
      } else {

        el = document.createElement('td');
        span = document.createElement('span');
        span.className = 'currency';
        el.append(span);
      }

      trEl.append(el)
    }

    tBody.append(trEl);
  }


  return tBody;

}

function createTableFooter() {

  let tFoot = document.createElement('tfoot');


  for (let i = 0; i < 3; i++) {

    let tr = document.createElement('tr');
    let th = document.createElement('th');
    if (i == 0) {
      tr.className = "total";
      th.textContent = 'Total Spent';
    } else if (i == 1) {
      tr.className = "overrun";
      th.textContent = 'Budget Overruns';
    } else {


      tr.className = "savings";
      th.textContent = 'Savings';
    }
    tr.append(th)
    for (let j = 0; j < 4; j++) {

      let element;

      j == 3 ? (element = document.createElement('th')) : (element = document.createElement('td'));
      let span = document.createElement('span')
      span.className = 'currency';
      span.textContent = 0;
      element.append(span)
      tr.append(element);
    }
    tFoot.append(tr);
  }

  return tFoot;

}

export function formatDate(date) {

  let current = new Date(date);

  let month = current.getMonth();
  let year = current.getFullYear()
  let day = current.getDate();
  return `${day}.${allMonths[month]}.${year}`

}

export function getMonth(date) {


  let date1 = date.toString().split('-')

  let [month, year] = [...date1];

  let currentDate = new Date(year, month);
  month = currentDate.getMonth();
  year = currentDate.getFullYear()


  return `${allMonths[month - 1]}.${year}`
}

function createButtons() {

  let td = document.createElement('td');
  let editBtn = document.createElement('button');
  editBtn.textContent = 'Edit';
  editBtn.id = generateId();
  let delBtn = document.createElement('button');
  delBtn.textContent = 'Delete';
  delBtn.id = generateId();
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
  let data = new Map(JSON.parse(localStorage.getItem(`expenses`)));

  let rows;

  table.replaceChildren();


  if (name == 'expenses') {

    rows = Object.entries(Object.fromEntries(data))
      .filter(e => e[1].hasOwnProperty('amount'));


  } else {
    rows = Object.entries(Object.fromEntries(data))
      .filter(e => e[1].hasOwnProperty('income'));

  }


  for (let el of rows) {
  
    let current = createTableElement(el[1], name);
    current.id = el[0];

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
  let summary = (JSON.parse(localStorage.getItem('expenses')));
  let year = '';
  for (let row = 0; row < 10; row += 2) {

    let util = thArray[row].textContent;
   
    let currentCells = rowElements.slice(startIndex, startIndex + 4);
    currentCells.forEach(c => c.textContent = 0);
    let total = 0;
    let i = 0;
    let currentUtil;

    currentCells.forEach(e => {

      if (i == 3) {
        e.textContent = total;
      } else {


        let [currentMonth, currentYear] = (thead[i].textContent).split(' ');
        let month;

        let day;
        //console.log(summary)

        for (let tuple of summary) {

          if (tuple[1].date) {

            currentUtil = tuple[1].category;

            [day, month, year] = formatDate(tuple[1].date).split('.');
            // console.log(day, month, currentMonth, year, currentYear )
            if (currentYear == year && currentMonth == month) {
              year = currentYear;

              // console.log(util, currentUtil);
              if (util == currentUtil) {
                let currentSum = Number(e.textContent);
                let sum = Number(tuple[1].amount);
                e.textContent = Number(sum) + currentSum;
                total += Number(sum)
              }


            }
          } else if (tuple[1].month) {

            [month, year] = getMonth(tuple[1].month).split('.');

          }

        }
        i++;
      }
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
  let savings = Array.from(document.querySelectorAll('.savings td span'));
  let totalsavings = document.querySelector('.savings th span');
  let totalSpend = Array.from(document.querySelectorAll('.overrun th span'));
  let summary = (JSON.parse(localStorage.getItem('expenses')));

  savings.forEach(e => e.textContent = 0);
  budgetFields.forEach(b => b.textContent = 0);

  for (let key of summary) {


    if (key[1].month) {

      let currentEl = key[1];

      let [month, currentYear] = getMonth(currentEl.month).split('.');


      if (year = currentYear) {

        for (let i = 0; i < thead.length; i++) {


          if (thead[i].textContent.includes(month) && thead[i].textContent.includes(year)) {

            let currentSpend = Number(spendEl[i].textContent);
            let currentBudget = Number(currentEl.budget);
            let currentIncome = Number(currentEl.income);
            let diff = (currentBudget - currentSpend);

            if (diff < 0) {
              console.log(budgetFields[i]);
              budgetFields[i].textContent = Math.abs(diff);



            } else {
              savings[i].textContent = diff;
              budgetFields[i].textContent = 0;

            }


          }

        }

      }
    }
  }


  if (year) {
    let spendMoney = budgetFields.map(e => e.textContent)
      .reduce((a, x) => Number(a) + Number(x), 0);
    totalSpend[0].textContent = Number(spendMoney);
    let totalSavedMoney = savings.map(e => e.textContent)
      .reduce((a, x) => Number(a) + Number(x), 0);
    totalsavings.textContent = totalSavedMoney;

  }
}