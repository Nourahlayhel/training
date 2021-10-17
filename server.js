var xlsx= require('xlsx');
const express=require('express');
const fs=require('fs');
const cors=require('cors');
const bodyParser=require('body-parser');
var reader =xlsx.readFile('students.xlsx');
var data=[];
data=xlsx.utils.sheet_to_json(reader.Sheets["Sheet1"]);
const app=express();
const {v4 : uuidv4} = require('uuid')

app.use(cors());

app.get('/students', function (req, res) {
  res.send(data);
  })

  app.get('/getstudent',function(req,res){
i=0;
while(i<data.length&&data[i].ID!=req.query.ID)
i++;if(i<data.length)
res.send(data[i]);
else res.send('not found');
  })
  
  app.use(bodyParser.json());

  app.post('/addstudent',function(req,res){
    if(req.body.email!=""){
    
i=0;
while(i<data.length&&req.body.email!=data[i].email)
i++;
if (i==data.length){
  req.body.ID=uuidv4();
data.push(req.body)
xlsx.utils.sheet_add_json(reader.Sheets["Sheet1"] , data)
xlsx.writeFile(reader,'students.xlsx')
res.send("done")
}
else res.send("found")
  }
  else res.send("empty")
})

  app.post('/authenticate',function(req,res){
    console.log(req.body)
    if(req.body.ID!=0){
      i=0;
      while(i<data.length&&req.body.ID!=data[i].ID)
      i++;
      if(req.body.ID==data[i].ID){
if(req.body.email==data[i].email&&req.body.password==data[i].password){
res.send("true");
}
else{ console.log("wrong email or password")
res.send("false")}}
else console.log("this id does not exist");
res.send("false");}

else res.send("null")
      

     })
app.listen(3000);
