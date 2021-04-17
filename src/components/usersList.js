import React, {useState,useEffect} from 'react'
import axios from 'axios'



function Users() {

    const [users,setUsers] = useState()
    const [interests,setInterests] = useState()
    let count

    useEffect(() => {
        // get users
        axios.get('users.json')
        .then(res => setUsers(res.data))
        .catch(err => console.log(err))

        // get interests
        axios.get('interests.json')
        .then(res => setInterests(res.data))
        .catch(err => console.log(err))
        
    }, [])

console.log('users', users)

 count = users?.map(user => {
    const result = users?.filter(c => c.id !== user.id && c.following.indexOf(user.id) > -1)?.length;
    return { id: user.id, followers: result };});

console.log('++++', 
count
)

    return (
        <div>
            <div>
                <h1>users</h1>
                {users?.map(user => (
                    <div key={user?.name}>
                        <ul>
                            <li>name: {user?.name}</li>

                        </ul>
                    </div>
                ))}
            </div>
        </div>
    )
}

export const UsersList = Users
