function getMonth(date) {
    console.log(date)
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

getMonth(06-2022)