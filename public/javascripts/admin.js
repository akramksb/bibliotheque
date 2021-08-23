const usernameText = document.querySelector('#username')


async function getUserInfo()
{
    const response = await fetch("/users/current")
    const data = await response.json()
    usernameText.textContent = data.username
} 
getUserInfo()