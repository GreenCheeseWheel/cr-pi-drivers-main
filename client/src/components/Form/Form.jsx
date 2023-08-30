import React from "react"
import "./index.css"
import { validateAll } from "./validations";

export default function Form()
{
    const [isPermited, setIsPermited] = React.useState({
        name: false,
        surname: false,
        nationality: false,
        image: false,
        birth: false,
        description: false,
        teams: true,
    });

    const [driver, setDriver] = React.useState({
        name: "",
        surname: "",
        nationality: "",
        image: "",
        birth: "",
        description: "",
        teams: "",
    });

    const handleFormChange = (val, type) => {
        validateAll(setDriver, setIsPermited, val, type);
    }

    const handleSubmit = (ev) => {
        ev.preventDefault();
        for(const key of Object.keys(isPermited))
        {
            console.log("La propiedad " + key + " es: " + isPermited[key])
        }

        for(const permission of Object.values(isPermited))
        {

            if(!permission)
            {
                alert('Validation incorrect. Try filling your form again!');
                return;
            }
        }


        fetch('http://localhost:3001/drivers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin':'*',
            },
            body: JSON.stringify(driver),
            
        })
        .catch(error => console.error(error.message));

    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-section">
                <label htmlFor="name">Name</label>
                <input 
                    value={driver.name} onChange={(ev) => handleFormChange(ev.target.value, 'name')} 
                    type="text" 
                    id="name" 
                    placeholder="Juan Manuel"
                    />

            </div>
            
            <div className="form-section">
                <label htmlFor="surname">Surname</label>
                <input 
                    value={driver.surname} onChange={(ev) => handleFormChange(ev.target.value, 'surname')}
                    type="text" 
                    id="surname" 
                    placeholder="Fangio"
                    />
            </div>
            
            <div className="form-section">
                <label htmlFor="nationality">Nationality</label>
                <input 
                    value={driver.nationality} onChange={(ev) => handleFormChange(ev.target.value, 'nationality')}
                    type="text" 
                    id="nationality" 
                    placeholder="Argentina"
                    />
            </div>
            
            <div className="form-section">
                <label htmlFor="birth">Date of Birth</label>
                <input 
                    value={driver.birth} onChange={(ev) => handleFormChange(ev.target.value, 'birth')}
                    id="birth" 
                    type="date"
                    />
            </div>
            
            <div className="form-section">
                <label htmlFor="image">Image</label>
                <input 
                    value={driver.image} onChange={(ev) => handleFormChange(ev.target.value, 'image')}
                    type="text" 
                    id="image" 
                    placeholder="https://sitio.com/imagen.jpg"
                    />
            </div>
            
            <div className="form-section">
                <label htmlFor="description">Description</label>
                <input 
                    value={driver.description} onChange={(ev) => handleFormChange(ev.target.value, 'description')}
                    type="text" 
                    id="description" 
                    placeholder="descripción"
                    />
            </div>
            
            <div className="form-section">
                <label htmlFor="teams">Teams</label>
                <input 
                    value={driver.teams} onChange={(ev) => handleFormChange(ev.target.value, 'teams')}
                    type="text" 
                    id="teams" 
                    placeholder="Ferrari, Williams, McLaren"
                    />
            </div>

            <button>Crear driver</button>
        </form>
    )
}