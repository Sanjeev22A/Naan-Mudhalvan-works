import fs from 'fs';

var total=0;

document.getElementById('expenseForm').addEventListener('submit',function(e){
    e.preventDefault();
    getEntriesFromForm();

    
    
});       

document.getElementById('saveToFile').addEventListener('click',(e)=>{
    extractEntriesFromTable();
});

function extractEntriesFromTable(){
    const rows=document.querySelectorAll("#expenseTableBody tr");
    console.log(rows);
}

function getEntriesFromForm(){
    const purpose=document.getElementById('Purpose').value;
    const amount=document.getElementById('Amount').value;
    total+=parseFloat(amount);
    
    const date=document.getElementById('Date').value;
    const category=document.getElementById('Category').value;
    addEntryToTable(purpose,amount,date,category,total);
    complete();
}


function addEntryToTable(purpose,amount,date,category,totalAmount){
    document.getElementById('totalAmount').innerText=totalAmount.toFixed(2);
    let row=document.createElement('tr');
    row.innerHTML=`<td>${purpose}</td><td>${amount}</td><td>${date}</td><td>${category}</td>`;
    document.getElementById('expenseTableBody').appendChild(row);
    
    

}

function complete(){
    document.getElementById('expenseForm').reset();
    alert('Expense record added successfully!');
}

function saveToFile(jsonArray,filepath){
    fs.appendFile(filepath,JSON.stringify(jsonArray),(err)=>{
        if(err){
            console.error('Error writing to file:',err);
        }
        else{
            console.log('Data saved to file successfully!');
        }
    });

}

function loadFromFile(filepath){
    fs.readFile(filepath,'utf8',(err,data)=>{
        if(err){
            console.error('Error reading file:',err);
        }
        else{
            const jsonArray=json.parse(data);
            jsonArray.forEach((e)=>{
                addEntryToTable(e.purpose,e.amount,e.date,e.category,e.totalAmount);
            });
        }
    });
}

