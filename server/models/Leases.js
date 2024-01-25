module.exports = (sequelize, DataTypes) => {
  const Leases = sequelize.define("Leases", {
    name: {
      type: DataTypes.STRING,
      allownull: false,
    },
    emailid: {
      type: DataTypes.STRING,
      allownull: false,
    },
    StartingDate: {
      type: DataTypes.DATEONLY,
      allownull: false,
    },
    EndingDate: {
      type: DataTypes.DATEONLY,
      allownull: false,
    },
    RentAmount: {
      type: DataTypes.INTEGER,
      allownull: false,
    },
  });
  Leases.associate = (modal) => {
    Leases.hasMany(modal.PropertyLeasers, {
      allownull: false,
      onDelete: "cascade",
    });
  };
  return Leases;
};
