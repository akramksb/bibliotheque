const usernameText = document.querySelector('#username')


async function getUserInfo()
{
    try 
    {
        const response = await fetch("/users/current")
        const data = await response.json()
        usernameText.textContent = data.username
    }
    catch (err)
    {
        location.assign('/login');
    }
} 
getUserInfo()