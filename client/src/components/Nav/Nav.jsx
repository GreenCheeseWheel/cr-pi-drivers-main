import { Link, useLocation } from "react-router-dom"
import React from "react";
import {useDispatch, useSelector} from "react-redux"
import { updateSuggested } from "../../redux/actions";

export default function Nav()
{
    const drivers = useSelector(state => state.drivers); 
    const dispatch = useDispatch();
    const pathname = useLocation().pathname;
    
    const [search, setSearch] = React.useState('');

    const handleSearch = () => {
        const update = drivers.filter(driver => {
            const inFullName = `${driver.name} ${driver.surname}`.indexOf(search) > -1;

            return inFullName;
        })

        console.log(update);
        dispatch(updateSuggested(update));
    }

    React.useEffect(() => {
        handleSearch();
    }, [search])


    // We need to use the search state to search drivers by name
    // Redux state will have a 'suggestions' property that will
    // hold every suggested driver to display

    return(
        <ul>
            <li><Link to='/home'>Home</Link></li>
            {
                pathname === '/home' && (
                    <li>
                        <input 
                            type="text" 
                            value={search} 
                            onChange={(ev) => setSearch(ev.target.value)} 
                            placeholder="Search driver"
                            />
                    </li>
                ) 
            }
            <li><Link to='/create'>Create Driver</Link></li>
        </ul>
    )
}