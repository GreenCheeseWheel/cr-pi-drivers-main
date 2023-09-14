const {DataTypes} = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize) => {
    return sequelize.define('User', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        email: {
            type: DataTypes.TEXT,
            isEmail: true,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },{
        timestamps: false,
        hooks: {
            beforeCreate: (user) => {
                let regexValidate = /[a-z0-9`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/i;

            
                if(!regexValidate.test(user.password)) throw Error('Invalid password');

                let salt = bcrypt.genSaltSync(8);

                const hash = bcrypt.hashSync(`${user.password}`, salt)
                user.password = hash;
            }
        }
    });
}