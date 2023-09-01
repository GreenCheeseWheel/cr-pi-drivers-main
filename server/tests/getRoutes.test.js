const { default: axios } = require('axios');
const app = require('../src/server');
const {agent} = require('supertest');
const server = agent(app); 

let driverId = 1;

describe('Get all drivers', () => {

    it('Should retrieve api drivers with some modifications when db is empty', async () => {
        
        let apiResponse = (await axios('http://localhost:5000/drivers')).data;
        let response = await server.get('/drivers').expect(200);
        expect(response.body.length).toBe(apiResponse.length);
    });


    it('After db has a single driver added it should be returned along with the others', async () => {
        const driver = {
            name: 'Johan',
            surname: 'nesburgo',
            nationality: 'South Africa',
            description: 'Un corredor imaginario',
            image: 'https://www.unaimage.com/1',
            birth: '1994-11-14',
            teams: 'Mercedes, BMW',
        }

        let apiDriversNum = (await axios('http://localhost:5000/drivers')).data.length;
        await server.post('/drivers').send(driver).expect(200);

        let response = await server.get('/drivers').expect(200);
        expect(response.body.length).toBe(apiDriversNum + 1);

    })

    it('Should have saved the driver correctly', async () => {
        const driver = {
            name: 'Johan',
            surname: 'nesburgo',
            nationality: 'South Africa',
            description: 'Un corredor imaginario',
            image: 'https://www.unaimage.com/1',
            birth: '1994-11-14',
            Teams: 'Mercedes, BMW',
        }

        const driverJohan = (await server.get('/drivers/name?name=Johan')).body;
        
        const mercedes = driverJohan["Teams"][0].name;
        const bmw = driverJohan["Teams"][1].name; 

        driverId = driverJohan.id;
        expect({...driverJohan, Teams: `${mercedes}, ${bmw}`} ).toEqual({...driver, id: driverId});
    });


})

describe('Get driver by id', () => {
    it('Should get the correct driver from the database',async () => {
        const driver = {
            name: 'Johan',
            surname: 'nesburgo',
            nationality: 'South Africa',
            description: 'Un corredor imaginario',
            image: 'https://www.unaimage.com/1',
            birth: '1994-11-14',
            Teams: 'Mercedes, BMW',
        };

        const driverRes = (await server.get('/drivers/' + driverId)).body;
        expect(driverRes.name).toBe(driver.name);

    });

    it("Should retrieve a driver from the api if id is not in database",async () => {
        const driverRes = (await server.get('/drivers/' + (driverId+1) )).body;
        expect(driverRes.image).not.toBe('https://www.unaimagen.com/1');
    });
});