// Find cookie on the basis that there is only one with such name
function getCookie(name)
{
    if(document.cookie)
    {
        let cookie = document.cookie.split(';');
        cookie = cookie.filter(cookie_ => cookie_.includes(name))[0].split("=")[1];
        return cookie;
    }

    return null;
}

export {
    getCookie,
}