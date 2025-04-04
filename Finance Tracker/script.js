var total=0;

document.getElementById('expenseForm').addEventListener('submit',function(e){
    e.preventDefault();
    getEntriesFromForm();

    
    
});       

function LoadFromFile(file){
    const reader=new FileReader();
    
    reader.onload=function(e){
        const data=e.target.result;
        console.log(data);
        try{
            const jsonArray=JSON.parse(data);
            console.log(jsonArray);
            jsonArray.forEach((e)=>{
                total+=parseFloat(e.amount);
            })
            jsonArray.forEach((e)=>{
                addEntryToTable(e.purpose,e.amount,e.date,e.category,total);
            });
        }catch(err){
            console.error("Error parsing JSON:", err);

        }
       
    };
    reader.readAsText(file);
    
    
}

document.getElementById('saveBtn').addEventListener('click',(e)=>{
    extractEntriesFromTable();
});

document.getElementById('loadBtn').addEventListener('click',(e)=>{
    e.preventDefault();
    const fileInput=document.getElementById('fileInput');  
    
    const file=fileInput.files[0];
    LoadFromFile(file);
    
})

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
