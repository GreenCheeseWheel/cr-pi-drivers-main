const { DataTypes} = require('sequelize');

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
    },
    surname: {
      type: DataTypes.TEXT,
    },
    description: {
      type: DataTypes.TEXT,
    },
    image: {
      type: DataTypes.TEXT,
      defaultValue: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEHFUXplWvF-t9Re9pVBYPeVJw-bcz8ZFnuh9BI1g&s',
     
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
    hooks: {
      beforeCreate: (driver) => {
        let today = new Date();
        let driverBirth = new Date(driver.birth);
        
        if(driverBirth > today) throw Error('Input birth date is in the future');

        today.setFullYear(today.getFullYear - 18);

        if(driverBirth > today) throw Error('Driver is too young');

        try
        {
          new URL(driver.image)
        }
        catch(err)
        {
          throw Error('Image provided is not a valid URL');
        }
      },

    }

  });
};