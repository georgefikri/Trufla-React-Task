import React, {useState,useEffect} from 'react'
import axios from 'axios'



function Users() {

    const [users,setUsers] = useState()
    const [usersWithCount, setUsersWithCount] = useState()
    const [interests,setInterests] = useState()
    const [aaa, setAaa] = useState(false)

    useEffect(() => {
        // get users
        axios.get('users.json')
        .then(res => {
            setUsers(res.data)
            setAaa(true)
        })
        .catch(err => console.log(err))

        // get interests
        axios.get('interests.json')
        .then(res => setInterests(res.data)) 
        .catch(err => console.log(err))
        
    }, [])

    let followersCount = users?.map(user => {
        const followersLength = users?.filter(c => c.id !== user.id && c.following.indexOf(user.id) > -1)?.length;
        return { id: user.id, followers: followersLength };});

    useEffect(() => {
        if(users) {
            console.log('0000', users)
            let newwww = users
            console.log('newwww', newwww)
            // setUsers([...newwww, {count: 'hello'}])
            // setUsers(newwww.forEach((element)=> element.count = 'hello'))
            setUsers(newwww.forEach((element)=> element.count = 
            newwww?.filter(c => c.id !== element.id && c.following.indexOf(element.id) > -1)?.length
            ))


        }
    }, [aaa])

    

//  let followersCount = users?.map(user => {
//     const followersLength = users?.filter(c => c.id !== user.id && c.following.indexOf(user.id) > -1)?.length;
//     return { id: user.id, followers: followersLength };});

// console.log('++++', 
// followersCount
// )

console.log('users', 
users
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
