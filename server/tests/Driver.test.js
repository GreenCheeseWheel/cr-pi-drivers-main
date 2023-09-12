const dbMock = require("sequelize-mock");
const dbMockConnected = new dbMock(); 
const {conn, Driver} = require('../src/db');
const {postDriver} = require('../src/controllers/postControllers');

const DriverMock = {
  name: 'Juan Manuel',
  surname: 'Fangio',
  description: 'Fue un corredor',
  image: 'https://unaimagen.com',
  nationality: 'Argentina',
  birth: '1910-11-14',
  teams: 'Ferrari, McLaren',
  userEmail: 'green@gmail.com'
};

describe('Driver model tests', () => {

  it('Driver is created with no errors', () => {
    postDriver(...Object.values(DriverMock))
      .then(() => {
        expect(true).toBe(true);
      })
      .catch(err => {
        console.log(err.message);
        expect(false).toBe(true)
      })
  });

});