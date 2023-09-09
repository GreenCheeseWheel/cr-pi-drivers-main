const { DataTypes, STRING } = require('sequelize');

module.exports = (sequelize) => {

  return sequelize.define('Driver', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
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