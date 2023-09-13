const {User} = require('../../db');

async function loginUser(email, password)
{
    const user = await User.findOne({
        where: {
            email,
        },
    });

    if(user == null)
    {
        throw Error("No user with such mail found");
    }

    if(user.password != password)
    {
        throw Error("Incorrect password");
    }

    if(!user.logged)
    {
        await User.update({logged: true}, {
            where: {
                email
            }
        })
    }
    
}

module.exports = {
    loginUser,
}