module.exports = (sequelize, DataTypes) => {
  const Properties = sequelize.define("Properties", {
    name: {
      type: DataTypes.STRING,
      allownull: false,
    },
    address: {
      type: DataTypes.STRING,
      unique: true,
      allownull: false,
    },
    available_rooms:{
        type:DataTypes.INTEGER,
        allownull:false,
    }
  });
  Properties.associate=(modal)=>{
    Properties.hasMany(modal.PropertyTenants,{
        allownull:false,
        onDelete:"cascade",
    })
    ,Properties.hasMany(modal.PropertyLeasers,{
      allownull:false,
      onDelete:"cascade",
    })
  }
  return Properties;
};
