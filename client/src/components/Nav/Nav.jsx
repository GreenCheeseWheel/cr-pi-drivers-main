import { Link, useLocation } from "react-router-dom"
import React from "react";
import {useDispatch, useSelector} from "react-redux"
import { updateSearch, updateSuggested } from "../../redux/actions";
import F1Logo from '../../assets/F1.svg'
import './index.css'


export default function Nav()
{
    const drivers = useSelector(state => state.drivers); 
    const dispatch = useDispatch();
    const pathname = useLocation().pathname;
    
    const [search, setSearch] = React.useState('');

    const handleSearch = () => {
        //const update = drivers.filter(driver => {
        //    const inFullName = `${(driver.name).toLowerCase()} ${(driver.surname).toLowerCase()}`.indexOf(search.toLowerCase()) > -1;
        //
        //    return inFullName;
        //})

        dispatch(updateSearch(search));
        //dispatch(updateSuggested(update));
    }

    React.useEffect(() => {
        handleSearch();
    }, [search])


    // We need to use the search state to search drivers by name
    // Redux state will have a 'suggestions' property that will
    // hold every suggested driver to display

    return(
        <>
            <nav title="navbar" id="navbar">
                <ul id="navbar-contents">
                    <li className="navbar-link"><Link reloadDocument to='/'><img src={F1Logo}></img></Link></li>
                    <li className="navbar-link"><Link reloadDocument to='/home'>Home</Link></li>
                    { 
                        pathname === '/home' && (
                            <li id="navbar-searchbar">
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
                </ul>
            </nav>
            <div></div>
        </>
    )
}