const { DataTypes, STRING } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Driver', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.TEXT,
      unique: true,
    },
    surname: {
      type: DataTypes.TEXT,
    },
    
    description: {
      type: DataTypes.TEXT,
    },
    image: {
      type: DataTypes.TEXT, 
    },
    nationality: {
      type: DataTypes.STRING
    },
    birth: {
      type: DataTypes.DATEONLY,
    }

  }, {
    timestamps: false,
  });
};