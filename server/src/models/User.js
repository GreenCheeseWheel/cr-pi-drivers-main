const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('User', {
        email: {
            type: DataTypes.TEXT,
            isEmail: true,
            primaryKey: true,
        },
        password: {
            type: DataTypes.TEXT,
            allowNull: false,
        }
    },{
        timestamps: false,
    });
}