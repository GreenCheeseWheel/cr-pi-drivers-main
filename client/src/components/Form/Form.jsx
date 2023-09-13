import React from "react"
import axios from "axios"
import "./index.css"
import { validateAll } from "./validations";
import { useDispatch } from "react-redux";
import { getAllDrivers, getTeams, updateDrivers } from "../../redux/actions";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getCookie } from "../../cookies/getCookie";
import Button from "../Button/Button"
import FormInput from "../FormInput/FormInput";

export default function Form()
{

    const {id} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation().pathname;

    const [isPermited, setIsPermited] = React.useState({
        name: false,
        surname: false,
        nationality: false,
        image: false,
        birth: location == '/create' ? false : true,
        description: false,
        teams: false,
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


    React.useEffect(() => {
        dispatch(getTeams());
    }, [])

    const handleFormChange = (val, type) => {
        console.log("birth is: " + val);
        validateAll(setDriver, setIsPermited, val, type);
    }

    const handleSubmit = (ev) => {
        ev.preventDefault();
        
        for(const permission of Object.values(isPermited))
        {

            if(!permission)
            {
                alert('Validation incorrect. Try filling your form again!');
                return;
            }
        }
        
        if(location == '/create')
        {
            axios
                .post('http://localhost:3001/drivers', {...driver, userEmail: getCookie("email-drivers")})
                .then((res) => {
                    const driver = res.data.driver.dataValues;
                    dispatch(updateDrivers(driver));
                    navigate('/home');
                })
                .catch(error => {
                    alert('An error has ocurred in the database. Check the console for more info.');
                    console.error(error.message)
                })
            return;
        }

        else
        {
            
            
            axios
                .put(`http://localhost:3001/driver`, {...driver, id})
                .then(() => {
                    dispatch(getAllDrivers());
                    navigate('/home')
                })
                .catch(error => console.error(error.message));
        }

    }

    return (
        <form onSubmit={handleSubmit}>
            {location == '/create' ? <h2>Create Driver</h2> : <h2>Update Driver</h2>}
            <FormInput 
                labelText="Name"
                className="text-input"
                value={driver.name}
                onChange={(ev) => handleFormChange(ev.target.value, 'name')}
                type="text"
                inputId="name"
                placeholder="Juan Manuel"
                />
            {!isPermited.name && <p className="error-msg">Name cannot contain special characters or be empty</p>}
            
            <FormInput 
                labelText="Surname"
                className="text-input"
                value={driver.surname}
                onChange={(ev) => handleFormChange(ev.target.value, 'surname')}
                type="text"
                inputId="surname"
                placeholder="Fangio"
                />
            {!isPermited.surname && <p className="error-msg">Surname cannot contain special characters or be empty</p>}
        
            <FormInput 
                labelText="Nationality"
                className="text-input"
                value={driver.nationality}
                onChange={(ev) => handleFormChange(ev.target.value, 'nationality')}
                type="text"
                inputId="nationality"
                placeholder="Argentina"
                />
            {!isPermited.nationality && <p className="error-msg">Nationality cannot contain special characters or be empty. It also has to be a country!</p>}


            {
                location == '/create' && (
                    <>
                        <FormInput 
                            inputId="birth"
                            labelText="Date of Birth"
                            className="text-input"
                            onChange={(ev) => handleFormChange(ev.target.value, 'birth')}
                            type="date"
                            value={driver.birth}
                            />
                        {!isPermited.birth && <p className="error-msg">Date of birth cannot be empty, in the future or less than 18 years ago</p>}
                    </>
                )
            }
           
            <FormInput 
                labelText="Image"
                className="text-input"
                value={driver.image}
                onChange={(ev) => handleFormChange(ev.target.value, 'image')}
                type="text"
                inputId="image"
                placeholder="https://sitio.com/imagen.jpg"
                />
            {!isPermited.image && <p className="error-msg">Image has to be a valid URL</p>}

            <FormInput 
                labelText="Description"
                className="text-input"
                value={driver.description}
                onChange={(ev) => handleFormChange(ev.target.value, 'description')}
                type="text"
                inputId="description"
                placeholder="This is a little description"
                />
            {!isPermited.description && <p className="error-msg">Description cannot be all caps, contain special characters or be empty</p>}            


            <FormInput 
                labelText="Teams"
                className="text-input"
                value={driver.teams}
                onChange={(ev) => handleFormChange(ev.target.value, 'teams')}
                type="text"
                inputId="teams"
                placeholder="Ferrari, Williams, McLaren, Lotus"
                />
            {!isPermited.teams && <p className="error-msg">Teams should be present in the API</p>}

            <Button disabled={Object.values(isPermited).includes(false)}  text="Crear driver" />
        </form>
    )
}