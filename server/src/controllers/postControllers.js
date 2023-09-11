const {Driver, Teams, User, users_x_drivers, drivers_x_teams} = require('../db');


async function postDriver(name, surname, description, image, nationality, birth, teams, userEmail)
{
    try
    {
        console.log("User email es: " + userEmail);
        const driver = await Driver.create({name, 
            surname, 
            description, 
            image: image ? image : "https://es.wikipedia.org/wiki/Temporada_2022_de_F%C3%B3rmula_1#/media/Archivo:2022_Formula_One_car_at_the_2021_British_Grand_Prix_(51350002179).jpg", 
            nationality, birth,
            origin: 'db'
        });
        
        
        const teams_arr = teams.split(',').map(team => new Object({name: team.trim()}));
        const teams_resp = [];
        
        for(const team of teams_arr)
        {
            const [teamFromDb, created] = await Teams.findOrCreate({
                where: {
                    name: team.name
                }
            });
            
            teams_resp.push(teamFromDb);
        }

        console.log("User email es: " + userEmail);
        console.log("El driver id es: " + driver.id);
        for(let i = 0; i < teams_resp.length; i++)
        {
            await drivers_x_teams.create({DriverId: driver.id, TeamId: teams_resp[i].id });
        }

        console.log("User email es: " + userEmail);
        console.log("El driver id es: " + driver.id);
        await users_x_drivers.create({DriverId: driver.id, UserEmail: userEmail});

    }
    catch(error)
    {
        throw Error(error.message);
    }
    
}

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
    postDriver,
    loginUser,
    logoutUser
}