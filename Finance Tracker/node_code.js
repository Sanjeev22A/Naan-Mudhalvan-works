import fs from 'fs';



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

