const Express = require('express');
const app = Express();
const mysql = require('mysql');
var bodyParser = require('body-parser');
var SqlString = require('sqlstring');
const helmet = require('helmet');
app.use(bodyParser.json());
app.use(helmet());
//Database connection is created
var mysqlconnection = mysql.createConnection({
    host:"localhost",
    user:'root',
    password:'12345',
    database:'erp_8',
    multipleStatements:'true'
});

mysqlconnection.connect((err)=>{
    if(!err){
        console.log("connected");
    }
    else{
        console.log("connection failed");
    }
});

app.get('/ri',(req,res)=>{
    mysqlconnection.query('SELECT * FROM ri',(err,row,field)=>{
        if(!err)
        {
            res.send(row);
         }
        else {
            console.log(err);
        }
    });
});

app.delete('/ri/:id',(req,res)=>{
mysqlconnection.query('DELETE FROM ri WHERE ri_sid=?',[req.params.id],(err,row,field)=>{
    if(!err){
        console.log("Deleted successfully");
    }
    else{
        console.log(err);  
    }
});
});

app.post('/ri',(req,res)=>{
var obj = req.body;
console.log(obj);
let sql_insert = "insert into ri (sku_cd,pd_sid,ri_nm,ri_desc,ri_tcd,env_cd,bus_proc_cd,tech_comp_cd,status_cd,rid,uid) values ("+ SqlString.escape(obj.sku_cd) + "," + SqlString.escape(obj.pd_sid) + "," + SqlString.escape(obj.ri_nm) + "," + SqlString.escape(obj.ri_desc) + "," + SqlString.escape(obj.ri_tcd) + "," + SqlString.escape(obj.env_cd) + ","
+ SqlString.escape(obj.bus_proc_cd) + "," + SqlString.escape(obj.tech_comp_cd) + "," + SqlString.escape(obj.status_cd) + ","+SqlString.escape(obj.rid) + ","+ SqlString.escape(obj.uid) + ")";

mysqlconnection.query(sql_insert,(err,row,field)=>{
    if(!err){
        res.send(row);
    }
    else{
        console.log(err);
    }
});
});
app.put('/ri/:id',(req,res)=>{
    let requestBody = req.body;
   
    mysqlconnection.query( "UPDATE ri SET sku_cd= "+ requestBody + " WHERE ri_sid=?",[req.params.id],(err,row,field)=>{
        if(!err){
            console.log("Updated  successfully");
        }
        else{
            console.log(err);  
        }
    });
});

/**This is the api for the prod section  */

app.get('/prod',(req,res)=>{
    mysqlconnection.query('SELECT * FROM ri',(err,row,field)=>{
        if(!err)
        {
            res.send(row);
         }
        else {
            console.log(err);
        }
    });
});

app.delete('/prod/:id',(req,res)=>{
mysqlconnection.query('DELETE FROM ri WHERE ri_sid=?',[req.params.id],(err,row,field)=>{
    if(!err){
        console.log("Deleted successfully");
    }
    else{
        console.log(err);  
    }
});
});

app.put('/prod/:id',(req,res)=>{
    let requestBody = req.body;
   
    mysqlconnection.query( "UPDATE ri SET sku_cd='requestBody' WHERE ri_sid=?",[req.params.id],(err,row,field)=>{
        if(!err){
            console.log("Updated  successfully");
        }
        else{
            console.log(err);  
        }
    });
});

app.post('/prod',(req,res)=>{
    var obj = req.body;
    console.log(obj);
    let sql_insert = "insert into ri (sku_cd,pd_sid,ri_nm,ri_desc,ri_tcd,env_cd,bus_proc_cd,tech_comp_cd,status_cd,rid,uid) values ("+ SqlString.escape(obj.sku_cd) + "," + SqlString.escape(obj.pd_sid) + "," + SqlString.escape(obj.ri_nm) + "," + SqlString.escape(obj.ri_desc) + "," + SqlString.escape(obj.ri_tcd) + "," + SqlString.escape(obj.env_cd) + ","
    + SqlString.escape(obj.bus_proc_cd) + "," + SqlString.escape(obj.tech_comp_cd) + "," + SqlString.escape(obj.status_cd) + ","+SqlString.escape(obj.rid) + ","+ SqlString.escape(obj.uid) + ")";
    
    mysqlconnection.query(sql_insert,(err,row,field)=>{
        if(!err){
            res.send(row);
        }
        else{
            console.log(err);
        }
    });
    });


app.listen(4444,()=>{console.log("the server is listening at port number 4444")});