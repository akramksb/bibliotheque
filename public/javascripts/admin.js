const usernameText = document.querySelector('#username-nav')



async function getUserInfo()
{
    const response = await fetch("/users/current")
    const user = await response.json()
    if (user.role !== "admin")
        location.assign('/login')
    usernameText.textContent = user.username
}

getUserInfo()