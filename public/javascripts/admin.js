const usernameText = document.querySelector('#username-nav')



async function getUserInfo()
{
    const response = await fetch("/users/current")
    const user = await response.json()
    if (user.role !== "admin")
        location.assign('/login')
    user.name = `${user.name[0].toUpperCase()}${user.name.slice(1).toLowerCase()}`
    let fullname = `${user.lastname.toUpperCase()} ${user.name}`
    usernameText.textContent = fullname
}

getUserInfo()