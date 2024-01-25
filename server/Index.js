const express = require('express');
const cors = require('cors');
const db = require('./models');
const Tenants=require("./Router/Tenants");
const Properties=require("./Router/Properties");
const Leases=require("./Router/Leases");
const port=8000;
const app=express();
app.use(express.json());
app.use(cors());
app.use("/Tenants",Tenants);
app.use("/Properties",Properties);
app.use("/Leases",Leases);
db.sequelize.sync().then(()=>{
app.listen(port,()=>{
    console.log("server: ",port);
})
})