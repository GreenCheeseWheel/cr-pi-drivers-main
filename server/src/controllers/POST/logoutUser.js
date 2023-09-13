const {User} = require('../../db');

async function logoutUser(email)
{
    const user = await User.findOne({
        where: {
            email
        }
    });

    if(user == null) throw Error("Acces violation: Non-existent user");

}

module.exports = {
    logoutUser,
}