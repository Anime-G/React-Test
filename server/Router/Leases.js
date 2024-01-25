const express = require("express");
const router = express.Router();
const { Leases ,PropertyLeasers,Properties} = require("../models");
const { result } = require("lodash");
//fetch data
router.get("/", async (req, res) => {
  const LeasesData = await Leases.findAll();
  res.json(LeasesData);
});
//find Lease
router.get("/find/:id", async (req, res) => {
  const { id } = req.params;
  const LeasesData = await Leases.findOne({ where: { id: id } });
  if (LeasesData) {
    const PropertyId = await PropertyLeasers.findOne({ where: { LeaseId: id },attribute:["PropertyId"] });
    console.log(PropertyId.PropertyId);
    const PropertyData=await Properties.findOne({where:{id:PropertyId.PropertyId}});
    res.json({LeasesData,PropertyData});
  } else {
    res.json({ msg: "No Data Found" });
  }
});
//adding the Lease Data
router.post("/add", async (req, res) => {
  const { name, emailid,StartingDate,EndingDate ,Properties,RentAmount} = req.body;
  
  const result = await Leases.create({
      name,
      emailid: emailid.toLowerCase(),
      StartingDate,EndingDate,RentAmount
    }).then(async(result)=>{
      await PropertyLeasers.create({LeaseId:result.id,PropertyId:Properties});
    });
  if (result) {
    res.json({ msg: "Lease Is Added!" });
  } else {
    res.json({ msg: "Lease Is Not Added!" });
  }
  
});
router.patch("/Update", async (req, res) => {
  const { id, name, emailid,StartingDate,EndingDate,Properties ,RentAmount} = req.body;
  const data = await Leases.update(
    {name, emailid,StartingDate,EndingDate,RentAmount  },
    {
      where: {
        id: id,
      },
    }
  );
  await PropertyLeasers.update({PropertyId:Properties},{
    where: {
      LeaseId: id,
    },
  });
  
  if (data) {
    res.json({ msg: "Lease's Profile Updated!" });
  } else {
    res.json({ msg: "Profile Is Not updated!" });
  }
});
router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  const data = await Leases.destroy({ where: { id: id } });
  if (data) {
    const LeasesData = await Leases.findAll();
    res.json({ msg: "Lease is Deleted!", Leases:LeasesData });
  } else {
    res.json({ msg: "Lease is Not Deleted!" });
  }
});
module.exports = router;
