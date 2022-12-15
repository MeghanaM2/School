const mysql=require('mysql2');
const express=require('express');
var app=express();
const path=require('path');
const http=require('http');
const parser=require('body-parser');
const server=http.createServer(app);
app.use(parser.json());
var connection=mysql.createConnection({
    host:'mini-project.cpdcyq7bgfly.us-east-1.rds.amazonaws.com',
    user:'admin',
    password:'meghana1841129!',
    database:'db',

})
connection.connect((err)=>
{
    if(!err) 
    console.log('DB connected');
    else
    console.log('Error');
})
app.listen(7000,()=>console.log('server started...'));

app.use(parser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname,'/')));

app.get('/',(req,res) => {
    res.sendFile(path.join(__dirname,'/index.html'));
});

app.get('/display',(req,res)=>
{
    connection.query('SELECT * FROM stuinfo',(err,rows,fields)=>
    {
        if(!err)
        // res.render('index', { title: 'Hey', message: 'Hello there!'});
        res.send(rows);
        else
        console.log("error");
    })
})

app.post('/add',(req,res)=>
{
    var post={stuid:req.body.sid,stuname:req.body.sname,stuage:req.body.sage,gender:req.body.sgender,course:req.body.scourse,address:req.body.saddress,grade:req.body.sgrade};
    var sql='INSERT INTO stuinfo SET ?';
    console.log("SID : ",req.body.sid);
    var query=connection.query(sql,post,(err,result)=>
    {
        if (err) throw err;
        res.send("Inserted Rows Succefully...");
    })
});

app.post('/cdisplay',(req,res)=>
{
    connection.query('SELECT * FROM stuinfo WHERE stuid=?',[req.body.suid],(err,rows,fields)=>
    {
        if(!err)
        res.send(rows);
        else
        console.log("error");
    })
})

app.post('/cmdisplay',(req,res)=>
{    
    connection.query('SELECT stuid,stuname FROM stuinfo WHERE course= ?',[req.body.scourse],(err,rows,fields)=>
    {
        if(!err)
        res.send(rows);
        else
        console.log("error");
    })
})
app.post('/msdisplay',(req,res)=>
{    
    connection.query('SELECT * FROM stuinfo WHERE gender="Male" AND grade="A"',(err,rows,fields)=>
    {
        if(!err)
        res.send(rows);
        else
        console.log("error");
    })
})

app.post('/update',(req,res)=>{
    sid=req.body.sudid;
    scourse=req.body.sudcourse;
    sql=`UPDATE stuinfo SET course = '${scourse}' WHERE stuid='${sid}'`
    var query=connection.query(sql,post,(err,result)=>
    {
        if (err) throw err;
        res.send("Updated Succefully...");
        
    })        
        
  
})









