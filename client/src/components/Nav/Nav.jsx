import { Link, useLocation, useNavigate } from "react-router-dom"
import React from "react";
import {useDispatch, useSelector} from "react-redux"
import { updateSearch, updateSuggested } from "../../redux/actions";
import F1Logo from '../../assets/F1.svg'
import './index.css'
import axios from "axios";
import { getCookie } from "../../cookies/getCookie";


export default function Nav()
{
    const drivers = useSelector(state => state.drivers); 
    const dispatch = useDispatch();
    const pathname = useLocation().pathname;
    const navigate = useNavigate();

    const [search, setSearch] = React.useState('');

    const handleSearch = () => {
        dispatch(updateSearch(search));  
    }

    const logOut = () => {
        let userMail = getCookie("email-drivers");

        axios
            .post('http://localhost:3001/logout', {email: userMail})
            .then(() => {
                document.cookie = "email-drivers=;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
                navigate(0);
            })
            .catch(() => {
                document.cookie = "email-drivers=;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
                navigate(0);
            });
    };

    React.useEffect(() => {
        handleSearch();
    }, [search])


    // We need to use the search state to search drivers by name
    // Redux state will have a 'suggestions' property that will
    // hold every suggested driver to display

    return(
        <>
            <nav title="navbar" id="navbar">
                <ul title="navbar-contents" id="navbar-contents">
                    <li className="navbar-link"><Link reloadDocument to='/'><img src={F1Logo}></img></Link></li>
                    <li className="navbar-link"><Link title="link-home"  to='/home'>Home</Link></li>
                    { 
                        pathname === '/home' && (
                            <li title="navbar-searchbar" id="navbar-searchbar">
                                <input 
                                    type="text" 
                                    value={search} 
                                    onChange={(ev) => setSearch(ev.target.value)} 
                                    placeholder="Search driver"
                                    />
                            </li>
                        ) 
                    }
                    <li className="navbar-link"><Link to='/create'>Create Driver</Link></li>
                    <li onClick={logOut}>Log out</li>
                </ul>
            </nav>
            <div></div>
        </>
    )
}