import axios from "axios"
import store from "../../redux/store"
import { GET_ALL_TEAMS } from "../../redux/types";
import { getTeams } from "../../redux/actions";
import { getCountries } from "./countries";

function validateName(name)
{

    const isIncorrect = /[`!@#$%^&*()_\-+=\[\]{};:'"\\|,.<>\/?~]/.test(name);

    return !isIncorrect && name.trim().length > 3;
}

function validateImage(url)
{
    try
    {
        new URL(url)
        return true;
    }
    catch(error)
    {
        return false;
    }
}

function validateNationality(nationality)
{
    let isValid = false;

    for(const countryName of Object.values(getCountries()))
    {
        if(countryName.trim().toLowerCase() == nationality.trim().toLowerCase() )
        {
            isValid = true;
        }
    }

    return isValid;
}

function validateBirth(date)
{
    const thisYear = new Date();
    thisYear.setFullYear(thisYear.getFullYear() - 18);
   
    return thisYear > new Date(date);
    
}

function validateDescription(description)
{
    const isCorrect = /[a-z]/.test(description)
    return isCorrect;
}

function validateTeams(teams)
{
    let isValid = !(teams.length == 0 || /[`!@#$%^&*()_\-+=\[\]{};:'"\\|.<>\/?~]/.test(teams));
    if(!isValid) return false;

   
    let teamsArr = teams.split(',').map(teamName => teamName.trim());

    
    let validTeams = store.getState().teams.map(team => team.name);
    
    for(let i = 0; i < teamsArr.length; i++)
    {
        if(!validTeams.includes(teamsArr[i])) return false;
    }
    


    return true;
}

function validateAll(setDriver, setIsPermited, val, type)
{
    switch(type)
    {
        case 'name':
            setDriver(prev => new Object({...prev, name: val}));
            setIsPermited(prev => new Object({...prev, name: validateName(val)}));
            break;
        
        case 'surname':
            setDriver(prev => new Object({...prev, surname: val}));
            setIsPermited(prev => new Object({...prev, surname: validateName(val)}));
            break;
        
        case 'nationality':
            setDriver(prev => new Object({...prev, nationality: val}));
            setIsPermited(prev => new Object({...prev, nationality: validateNationality(val)}));
            break;
        
        case 'image':
            setDriver(prev => new Object({...prev, image: val}));
            setIsPermited(prev => new Object({...prev, image: validateImage(val)}))
            break;
        
        case 'birth':
            setDriver(prev => new Object({...prev, birth: val}));
            setIsPermited(prev => new Object({...prev, birth: validateBirth(val)}));
            break;

        case 'description':
            setDriver(prev => new Object({...prev, description: val}));
            setIsPermited(prev => new Object({...prev, description: validateDescription(val)}));
            break;

        case 'teams':
            setDriver(prev => new Object({...prev, teams: val}));
            setIsPermited(prev => new Object({...prev, teams: validateTeams(val)}));
            break;

    }
}



export {
    validateName,
    validateImage,
    validateDescription,
    validateTeams,
    validateAll
}
