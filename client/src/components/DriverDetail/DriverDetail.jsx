import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom"
import "./index.css"
import axios from "axios";
import Button from "../Button/Button";
import { getAllDrivers } from "../../redux/actions";


export default function DriverDetail()
{
    const {id} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [driver, setDriver] = React.useState({
        id: id, 
        name: '', 
        surname: '', 
        image: '',
        Teams: '',
        birth: '',
        nationality: '',
        description: '',
    });


    React.useEffect(() => {
        axios.get(`http://localhost:3001/drivers/${id}`).then(res => {
            setDriver(res.data);
        })
        .catch((err) => console.log(err.response.data))
        
        
    }, []);

    const handleDelete = () => {
        axios
            .delete(`http://localhost:3001/driver/${driver.id}`)
            .then(() => {
                dispatch(getAllDrivers());
                navigate('/home');
                
            })
            .catch(err => alert(err.message));
    };

    const handleUpdate = () => {
        navigate(`/update/${driver.id}`);
    }

    return(
        driver && (
        <div id="driver-detail">
            
            <p>{driver.id}</p>
            <p>{Array.isArray(driver.Teams) ? driver.Teams.map(team => team.name).join(', ') : driver.Teams }</p>
            <p>{driver.name} {driver.surname}</p>
            <img src={driver.image} />
            <p>{driver.birth}</p>
            <p>{driver.nationality}</p>
            <p>{driver.description}</p>

            {
                driver.origin && (
                <div id="ud-btns">
                    <Button 
                        text="Update"
                        onClick={handleUpdate}
                        disabled={false}
                        />

                    <Button
                        text="Delete"
                        onClick={handleDelete}
                        disabled={false}
                        />
                </div>
                )
            }
            
        </div>
    )
    )
}