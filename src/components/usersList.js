import React, {useState,useEffect} from 'react'
import axios from 'axios'



function Users() {

    const [users,setUsers] = useState()
    const [interests,setInterests] = useState()


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



    return (
        <div>
            hello world
        </div>
    )
}

export const UsersList = Users
