function validateName(name)
{

    const isCorrect = name.length > 0 && /[`!@#$%^&*()_\-+=\[\]{};:'"\\|,.<>\/?~]/.test(name);

    return !isCorrect;
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

function validateDescription(description)
{
    const isCorrect = /[a-z]/.test(description)
    return isCorrect;
}

function validateTeams(teams)
{
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
            setIsPermited(prev => new Object({...prev, nationality: validateName(val)}));
            break;
        
        case 'image':
            setDriver(prev => new Object({...prev, image: val}));
            setIsPermited(prev => new Object({...prev, image: validateImage(val)}))
            break;
        
        case 'birth':
            setDriver(prev => new Object({...prev, birth: val}));
            setIsPermited(prev => new Object({...prev, birth: true}));
            break;

        case 'description':
            setDriver(prev => new Object({...prev, description: val}));
            setIsPermited(prev => new Object({...prev, description: validateDescription(val)}));
            break;

        case 'teams':
            setDriver(prev => new Object({...prev, teams: val}));
            setIsPermited(prev => new Object({...prev, teams: true}));
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
