const _ = require("lodash");
const express = require("express");
const router = express.Router();
const {
  Properties,
  PropertyTenants,
  PropertyLeasers,
  Tenants,
} = require("../models");
const { Op } = require("sequelize");
//function that will return the tenant which have property
const getTenant = async (pid) => {
  const property_Tenants = await PropertyTenants.findAll({
    where: { PropertyId: pid },
  });
  console.log("property Tenant: ", property_Tenants);

  let pt = Object.values(property_Tenants);
  console.log("pt: ", pt);
  let tenants = [];
  //converting the tenant id to array from object
  for (let index = 0; index < pt.length; index++) {
    console.log();
    const id = pt[index].TenantId;
    tenants.push(id);
  }
  const Tenant = await Tenants.findAll({ where: { id: tenants } });

  return Tenant;
};
//Add propertyTenant Table
async function addPropertyTenant(id, tenants) {
  for (let index = 0; index < tenants.length; index++) {
    const tenant = tenants[index];
    await PropertyTenants.create({ PropertyId: id, TenantId: tenant });
  }
}
//Display the Function
router.get("/", async (req, res) => {
  const data = await Properties.findAll();

  // const Tenant=await getTenant();
  // console.log(Tenant);
  res.json({ data });
});
//it will return perticular property
router.get("/property/:id", async (req, res) => {
  const data = await Properties.findOne({ where: { id: req.params.id } });

  const Tenant = await getTenant(req.params.id);
  console.log(Tenant);
  res.json({ data, Tenant });
});

//it will return property Which are not lease
router.get("/findnotLease", async (req, res) => {
  const leasedPropertyid = await PropertyLeasers.findAll();
  const data = _.uniq(_.map(leasedPropertyid, "PropertyId"));
  
  if (!_.isEmpty(data)) {
    
    const propertiesforlease = await Properties.findAll({
      where: { id: {[Op.notIn]: data } },
    });
    console.log(propertiesforlease);
    res.json({ propertiesforlease });
  } else {
    const propertiesforlease = await Properties.findAll();
    console.log(propertiesforlease);
    res.json({ propertiesforlease });
  }
});
//Adding Data of property with the Property's tenants
router.post("/add", async (req, res) => {
  const data = req.body;
  console.log(data);
  const { available_rooms, name, address, tenants } = req.body;
  const property = { available_rooms, name, address };
  const repeat = await Properties.count({
    where: {
      address: address,
    },
  });
  if (repeat === 0) {
    const result = await Properties.create(property).then(async (result) => {
      await addPropertyTenant(result.id, tenants);
    });
    res.json(result);
  } else {
    res.json({ msg: "This Property is already in Records" });
  }
});
//update property by id
router.patch("/Update", async (req, res) => {
  const { id, name, address, available_rooms, tenants } = req.body;
  //remove the propertysTenant Data
  await PropertyTenants.destroy({
    where: {
      PropertyId: id,
    },
  });
  //update the property
  await Properties.update(
    {
      name,
      address,
      available_rooms,
    },
    { where: { id } }
  );

  await addPropertyTenant(id, tenants);
  res.json("updated SuccessFully");
});

//delete property
router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  const data = await Properties.destroy({ where: { id: id } });
  res.json(data);
});
module.exports = router;
