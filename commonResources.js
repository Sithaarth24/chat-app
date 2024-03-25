let users = []
let new_messages = []

function isPending(user)
{
    for(let i=0;i<new_messages.length;i++)
    {
        if(new_messages[i].reciever === user)
            return i
    }
    return -1
}

function findUser(user)
{
    for(let i=0;i<users.length;i++)
    {
        if(users[i].userName === user)
            return i
    }
    return -1
}

module.exports = {
    isPending,
    findUser,
    users,
    new_messages
}