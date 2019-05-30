'use strict';
module.exports = (sequelize, DataTypes) => {
  const cats = sequelize.define('cats', {
    name: DataTypes.STRING,
    raza: DataTypes.STRING,
    description: DataTypes.STRING,
    pais: DataTypes.STRING,
    peso: DataTypes.STRING
  }, {});
  cats.associate = function(models) {
    // associations can be defined here
  };
  return cats;
};