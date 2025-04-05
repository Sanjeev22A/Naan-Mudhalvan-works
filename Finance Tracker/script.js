

document.getElementById('expenseForm').addEventListener('submit',function(e){
    e.preventDefault();
    getEntriesFromForm();

    
    
});       

document.getElementById('saveBtn').addEventListener('click',(e)=>{
    e.preventDefault();
    entrys=extractEntriesFromTable();
    const fileOutput=document.getElementById('fileInput');
    const filename=fileOutput.files[0].name;
    appendToFile(filename,entrys);
});

document.getElementById('loadBtn').addEventListener('click',(e)=>{
    e.preventDefault();
    const fileInput=document.getElementById('fileInput');  
    
    const file=fileInput.files[0];
    LoadFromFile(file);
    
});

document.getElementById('walletForm').addEventListener('submit',(e)=>{
    e.preventDefault();
    const walletAmount=document.getElementById('walletAmount').value;
    const balance=document.getElementById('balance');
    const amt=parseFloat(balance.innerText);
    balance.innerText=parseFloat(amt)+parseFloat(walletAmount);
    document.getElementById('walletForm').reset();  
    alert("Funds added to the wallet");
});

var total=0;

function checkTransaction(amountPaid){
    const balance=parseFloat(document.getElementById('balance').innerText);

    if(amountPaid>balance){
        alert("Insufficient balance!!--Cant proceed with this transaction--You need to control your expenses");
        return false;
    }
    else{
        console.log(balance);
        document.getElementById('balance').innerText=(parseFloat(balance)-parseFloat(amountPaid)).toFixed(2);
        alert("Funds updated in the wallet");
        return true;
    }
    
}

function LoadFromFile(file){
    const reader=new FileReader();
    
    reader.onload=function(e){
        const data=e.target.result;
        console.log(data);
        try{
            const jsonArray=JSON.parse(data);
            console.log(jsonArray);
            
            jsonArray.forEach((e)=>{
                total=document.getElementById('totalAmount').innerText;
                total=parseFloat(total)+parseFloat(e.amount);
                addEntryToTable(e.purpose,e.amount,e.date,e.category,total);
                
            });
        }catch(err){
            console.error("Error parsing JSON:", err);

        }
       
    };
    reader.readAsText(file);
    
    
}



function extractEntriesFromTable(){
    var entrys=[];
    const rows=document.querySelectorAll("#expenseTableBody tr");
    rows.forEach((row)=>{
        const cells=row.querySelectorAll("td");
        const pupose=cells[0].innerText;
        const amount=cells[1].innerText;
        const date=cells[2].innerText;
        const category=cells[3].innerText;
        const entry={
            purpose:pupose,
            amount:amount,
            date:date,
            category:category
        };
        entrys.push(entry);
    });
    return entrys;
}
function appendToFile(filename,entrys){
    const jsonString=JSON.stringify(entrys,null,2);
    const blob=new Blob([jsonString],{type:'application/json'});
    const url=URL.createObjectURL(blob);
    const a=document.createElement('a');
    a.href=url;
    a.download=filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function getEntriesFromForm(){
    const purpose=document.getElementById('Purpose').value;
    const amount=parseFloat(document.getElementById('Amount').value);
    
    total+=parseFloat(amount);
    
    const date=document.getElementById('Date').value;
    const category=document.getElementById('Category').value;
    
    addEntryToTable(purpose,amount,date,category,total);
    complete();
}


function addEntryToTable(purpose,amount,date,category,totalAmount){
    const amt=parseFloat(amount);
    if(!checkTransaction(amt)){
        return;
    }
    document.getElementById('totalAmount').innerText=totalAmount.toFixed(2);
    let row=document.createElement('tr');
    row.innerHTML=`<td>${purpose}</td><td>${amount}</td><td>${date}</td><td>${category}</td>`;
    document.getElementById('expenseTableBody').appendChild(row);
    alert('Expense record added successfully!');
    
    

}

function complete(){
    document.getElementById('expenseForm').reset();
   
}
