import React, {useState,useEffect} from 'react'
import axios from 'axios'
import './styles/styles.scss';
import {apiCall} from '../../API/usersAPI'
/* 
    0. change the state on the client side ( sort , remove interest ) don't call the api again
    1. move sorting code to be in usersList.js - done
    2. remove sortType from useEffect - done
    3. api to be called once only ( remove any references ) - done
    4. fix this issue: fix followers count when remove a single user ( the fix is use contains instead of indexOf) 
    5. remove the functions to be onClick to be separated not to be added inside onClick - done 
    6. extra: remove indidual interest
*/
function Users() {

    const [users,setUsers] = useState([])
    const [interests,setInterests] = useState([])
    const [showInterests, setShowInterests] = useState([])

    let usersJSON = "users.json";
    let  interestsJSON= "interests.json";
    const usersRequest = axios.get(usersJSON);
    const interestsRequest = axios.get(interestsJSON);

    useEffect(() => {
        apiCall(usersRequest,interestsRequest,setUsers,setInterests);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if(users.length && interests.length) {
            setUsers( users.map(user => {
                return {
                    id: user.id,
                    name: user?.name,
                    count: user?.count,
                    interests: interests.filter(interest => user.interests?.indexOf(interest.id) > -1).map(interest => {
                        return interest.name;
                    })
                };
            }))
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [interests])

console.log('users', users)


const sortDesc = () => {
    setUsers([...users].sort((a,b)=> b?.count - a?.count)
    )
}

const sortAsc = () => {
    setUsers([...users].sort((a,b)=> a?.count - b?.count)
    )
}

const showInterestsFn = (user) => {
    setShowInterests([...showInterests,
        {name: user?.name}])
}

const hideInterestsFn = (user) => {
    setShowInterests(showInterests.filter((obj)=>{
        return obj.name !== user?.name;
    }))
}

const removeUsers = (user) => {
    setUsers(users.filter((obj)=>{
        return obj.name !== user?.name;
    }))
}


    return (
        <div>
            <div>
                <h1>users list</h1>
                <div className='sorting-list'>
                    <button onClick={()=> sortAsc()}>ascending sort</button>
                    <button onClick={()=> sortDesc()}>descending sort</button>
                    

                    <span className='users-total-count'>
                        <label>Total Users</label>
                        <span>{users?.length}</span>
                    </span>
                </div>
                <div className='margin-bottom-30 list-container'>
                {users?.map(user => (
                    <div key={user?.name} className='list-item'>
                        <h3 className='name'>{user?.name}</h3>
                        <div className='count'>followers count: {user?.count}</div>
                        {showInterests !== [] 
                            &&showInterests.some(singleInterest => singleInterest.name === user?.name) && 
                            <div className='interests-list'>
                                <p>
                                    {
                                        user?.interests?.map(interest => {
                                            return <span key={interest}>
                                                {interest}
                                                </span>
                                        })
                                    }
                                </p>
                            </div>
                        }
                        {
                            user?.interests?.length ? 
                                <div className='toggle-interests'>
                                    <button  onClick ={()=>  showInterestsFn(user) }> show interests</button>
                                    <button onClick={ ()=> hideInterestsFn(user)}>hide interests</button>
                                </div>
                            : undefined
                        }
                        <div className='remove-user'>
                            <button onClick={()=> removeUsers(user)}>
                                remove user
                            </button>
                        </div>
                    </div>
                ))}
                </div>
            </div>
        </div>
    )
}

export const UsersList = Users
