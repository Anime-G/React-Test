module.exports = (sequelize, DataTypes) => {
    const Tenants = sequelize.define("Tenants", {
      name: {
        type: DataTypes.STRING,
        allownull: false,
      },
      emailid: {
        type: DataTypes.STRING,
        unique:true,
        allownull: false,
      },
    });
    Tenants.associate=(modal)=>{
        Tenants.hasMany(modal.PropertyTenants,{
            allownull:false,
            onDelete:"cascade",
        })
    }
    return Tenants;
  };