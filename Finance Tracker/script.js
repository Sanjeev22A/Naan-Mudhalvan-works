var total=0;

document.getElementById('expenseForm').addEventListener('submit',function(e){
    e.preventDefault();
    getEntriesFromForm();

    
    
});       

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