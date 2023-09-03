const { DataTypes, STRING } = require('sequelize');

module.exports = (sequelize) => {

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
    },
    origin: {
      type: DataTypes.STRING,
    }

  }, {
    timestamps: false,
  });
};