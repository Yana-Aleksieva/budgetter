

let summary = ((JSON.parse(localStorage.getItem('summary'))));
console.log(summary)


if ( summary != null && Object.entries(summary).length > 0 ) {
    let entries = Object.entries(summary);
    let obj = {'Spent': 0, 'Remaining' : 0, 'Savings': 0};
    let breakdown = {'Utilities':0, 'Groseries' : 0, 'Other': 0, 'Transport': 0,'Entertaiment': 0};
    for(let tuple of entries){
        console.log(tuple)
        obj.Spent = tuple[1].spendedMoney;
        obj.Remaining = tuple[1].overruns;
        obj.Savings = tuple[1].savedMoney;

        for(let key in breakdown){

            for(let util in tuple[1]){
               
                if(key == util){

                    let values = Object.values(tuple[1][util]);
                    let sum = values.reduce((acc, x) => acc + x, 0);
                    console.log(sum)
                breakdown[key] += sum;
                }
            }
            
        }
       
    }
    console.log(breakdown);
    let article = document.querySelector('article:not([class=clear])');
    console.log(article)
     createLeftColEl(document.querySelector('.left-col'), obj);
     createLeftColEl(article, breakdown, 100)
       let rigthEl = document.querySelector('.right-col');
    createRigthCol(rigthEl, 'ov spent', 100);
    createRigthCol(rigthEl, 'ov remain', 100);
    createRigthCol(rigthEl, 'ov save', 100);
}

function createLeftColEl(parent, obj, elWidth) {

    for(let key in obj){
   
        let div = document.createElement('div');
        div.setAttribute('class', 'cat-row')
        for (let j = 0; j < 2; j++) {
            let spanEl = document.createElement('span');
            if (j == 0) {
                spanEl.setAttribute('class', 'row label');
                spanEl.textContent = `${key}`;
            }else{
                spanEl.setAttribute('class', 'row value');
                spanEl.textContent = `${obj[key]}`;
            }
        
            div.append(spanEl)
        }
        if( elWidth !== undefined){
            let bar = document.createElement('div');
            bar.setAttribute('class', 'bar-area');
            let span = document.createElement('span');
            span.setAttribute('class', 'bar')
            span.style.width = `${elWidth}px`;
            bar.append(span);
            div.append(bar);
        }
        parent.append(div);
    }

//     <div class="bar-area">
//     <span class="bar" style="width: 300px"></span>
// </div>
}


function createRigthCol(parent, elClass, elHeigh) {

 
        let div = document.createElement('div');
        div.setAttribute('class', `${elClass}`);
        div.style.height = `${elHeigh}px`;
        parent.append(div);

    
           return div;
}
{/* <div class="right-col">
<div class="ov spent" style="height: 140px;"></div>
<div class="ov remain" style="height: 100px;"></div>
<div class="ov save" style="height: 60px;"></div>
</div> */}
/* <div class="cat-row">
                        <span class="row label">Savings</span>
                        <span class="row value">480</span>
                    </div>*/
//console.log(bars)

// let sumUtils = amounts.slice(3);
// sumUtils.forEach(el => el.textContent =0)

// let firstEl = amounts.slice(0, 3);

// let savings = 0;
// let overruns = 0;
// let spendMoney = 0;


// if(Object.keys(summary).length > 0){

//     for (let key in summary){

//         savings += Number(summary[key].savedMoney);
//         overruns += Number(summary[key].overruns);
//         spendMoney += Number(summary[key].spendedMoney);
//         for(let i = 0; i < utilsType.length; i++){

//             let currentAmount = 0 ;
//             let currentUtil = utilsType[i].textContent;
//             if(summary[key].hasOwnProperty(currentUtil)){
        
//                 let entries = Object.entries(summary[key][currentUtil])
             
//             for(let tuple of entries){
//                  //console.log(i);
//                 currentAmount += Number(tuple[1]);
//              }

//               sumUtils[i].textContent = currentAmount;  
//             }
//         }
//     }
//           firstEl[0].textContent = spendMoney;
//           firstEl[1].textContent = overruns;
//           firstEl[2].textContent = savings;

   

// }

// let firstEl1 = firstEl.map(x => Number(x.textContent))
// let sum = (firstEl1.reduce((a, x) => Number(a) + Number(x), 0));
// console.log(sum )
// firstEl[0].textContent == 0 ? (spendBarEl.style.height = '10px') : ( (spendBarEl.style.height = `${Math.floor(Number(firstEl[0].textContent) /sum * 300)}px`));
// firstEl[1].textContent == 0 ? (remainingBarEl.style.height = '10px') : ( (remainingBarEl.style.height = `${Math.floor(Number(firstEl[1].textContent /sum * 300))}px`));
// firstEl[2].textContent == 0 ? (savingsBarEl.style.height = '10px') : ( (savingsBarEl.style.height = `${Math.floor(Number(firstEl[2].textContent) /sum * 300)}px`));

// //console.log(Math.floor(Number((firstEl[0].textContent) /sum) * 300))
// //console.log((firstEl[0].textContent)/sum)