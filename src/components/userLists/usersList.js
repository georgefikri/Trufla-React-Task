import React, {useState,useEffect} from 'react'
import axios from 'axios'
import './styles/styles.scss';
import {apiCall} from '../../API/usersAPI'
/* 
    0. change the state on the client side ( sort , remove interest ) don't call the api again
    1. move sorting code to be in usersList.js
    2. remove sortBoolean from useEffect
    3. api to be called once only ( remove any references )
    4. fix this issue: fix followers count when remove a single user
    4. extra: remove indidual interest
*/
function Users() {

    const [users,setUsers] = useState([])
    const [interests,setInterests] = useState([])
    const [sortBoolean, setSortBoolean] = useState(false)
    const [showInterests, setShowInterests] = useState([])

    let usersJSON = "users.json";
    let  interestsJSON= "interests.json";
    const usersRequest = axios.get(usersJSON);
    const interestsRequest = axios.get(interestsJSON);

    useEffect(() => {
        apiCall(usersRequest,interestsRequest,sortBoolean,setUsers,setInterests);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortBoolean])

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


const sort  = (sort) => {
    setSortBoolean(sort);
}


    return (
        <div>
            <div>
                <h1>users list</h1>
                <div className='sorting-list'>
                    <button onClick={()=> sort('ascending')}>ascending sort</button>
                    <button onClick={()=> sort('descending')}>descending sort</button>
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
                                    <button 
                                        onClick ={()=> 
                                            setShowInterests([...showInterests,
                                            {name: user?.name}])}>
                                        show interests
                                    </button>
                                    <button 
                                        onClick={
                                            ()=> setShowInterests(showInterests.filter((obj)=>{
                                                return obj.name !== user?.name;
                                            }))
                                        }>
                                        hide interests
                                    </button>

                                </div>
                            : undefined
                        }
                        <div className='remove-user'>
                            <button onClick={()=> setUsers(users.filter((obj)=>{
                                    return obj.name !== user?.name;
                                }))}>
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
