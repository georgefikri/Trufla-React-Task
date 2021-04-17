import React, {useState,useEffect} from 'react'
import axios from 'axios'

function Users() {

    const [users,setUsers] = useState([])
    const [interests,setInterests] = useState()
    const [sortBoolean, setSortBoolean] = useState(false)

    useEffect(() => {
        // get users
        axios.get('users.json')
        .then(({data}) => {
            console.log('data', data)

    

            let newUsers = []

            data.map((element) => {
                return newUsers.push({
                    ...element,
                    count: data?.filter(c => c.id !== element.id && c.following.indexOf(element.id) > -1)?.length
                })
            })
            if(sortBoolean === 'ascending') {
                newUsers.sort((a,b)=> a?.count - b?.count)
            } else if (sortBoolean === 'descending') {
                newUsers.sort((a,b)=> b?.count - a?.count)

            }
            setUsers([...newUsers]) 
        })
        .catch(err => console.log(err))

        // get interests
        axios.get('interests.json')
        .then(res => setInterests(res.data)) 
        .catch(err => console.log(err))
        
    }, [sortBoolean])

   
console.log('users', 
users
)

useEffect(() => {
    // setUsers(users?.sort((a,b)=> a?.count - b?.count))
}, [sortBoolean])

const sort  = (sort) => {
    setSortBoolean(sort)
}

    return (
        <div>
            <div>
                <h1>users</h1>
                {users?.map(user => (
                    <div key={user?.name}>
                        <ul>
                            <li>name: {user?.name}</li>
                            <li>followers count: {user?.count}</li>
                        </ul>
                    </div>
                ))}
                <button onClick={()=> sort('ascending')}>ascending sort</button>
                <button onClick={()=> sort('descending')}>descending sort</button>

            </div>
        </div>
    )
}

export const UsersList = Users
