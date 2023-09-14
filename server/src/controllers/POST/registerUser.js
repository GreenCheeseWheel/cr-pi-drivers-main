const {User} = require('../../db');
const jwt = require('jsonwebtoken');

const {JWT_SECRET} = process.env;

async function registerUser(email, password)
{

    if(!email || !password) throw Error('No email or password provided');

    const [user, wasCreated] = await User.findOrCreate({
        where: {
            email, 
            password
        }
    });

    if(!wasCreated) throw Error('User already registered');
    
    const id = user.id;
    
    const token = jwt.sign({id}, JWT_SECRET);

    return token;
    
}

module.exports = {
    registerUser,
}