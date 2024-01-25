const express = require("express");
const { Tenants } = require("../models");

const router = express.Router();

router.get("/", async (req, res) => {
  const TenantsData = await Tenants.findAll();
  res.json(TenantsData);
});

//find Tenant
router.get("/find/:id", async (req, res) => {
  const { id } = req.params;
  const TenantsData = await Tenants.findOne({ where: { id: id } });
  if (TenantsData) {
    res.json(TenantsData);
    
  } else {
    res.json({ msg: "No Data Found" });
  }
});
//adding the Tenant Data
router.post("/add", async (req, res) => {
  const { name, emailid } = req.body;
  const TenantsData = await Tenants.findAll();

  //if the Email id is Repeated then it will not Inserted in db
  const flag = TenantsData.some(
    (Tenant) => Tenant.emailid.toLowerCase() === emailid.toLowerCase()
  );
  console.log(emailid, " : ", flag);
  if (!flag) {
    const result = await Tenants.create({
      name,
      emailid: emailid.toLowerCase(),
    });
    if (result) {
      res.json({ msg: "Tenant Is Added!" });
    } else {
      res.json({ msg: "Tenant Is Not Added!" });
    }
  } else {
    res.json({ msg: "Tenant Is already Added!" });
  }
});
router.patch("/Update", async (req, res) => {
  const { id, name, emailid } = req.body;
  const data = await Tenants.update(
    { name, emailid },
    {
      where: {
        id: id,
      },
    }
  );
  if (data) {
    res.json({ msg: "Tenant's Profile Updated!" });
  } else {
    res.json({ msg: "Profile Is Not updated!" });
  }
});
router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  const data = await Tenants.destroy({ where: { id: id } });
  if (data) {
    const tenants = await Tenants.findAll();
    res.json({ msg: "Tenant is Deleted!", tenants });
  } else {
    res.json({ msg: "Tenant is Not Deleted!" });
  }
});
module.exports = router;
