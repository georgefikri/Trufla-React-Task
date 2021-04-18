import React, {useState,useEffect} from 'react'
import axios from 'axios'
import './styles/styles.scss';

function Users() {

    const [users,setUsers] = useState([])
    const [interests,setInterests] = useState([])
    const [sortBoolean, setSortBoolean] = useState(false)
    const [showInterests, setShowInterests] = useState([])

    let one = "users.json"
    let two = "interests.json"
    const requestOne = axios.get(one);
    const requestTwo = axios.get(two);
    useEffect(() => {
        /***************************************/
        axios
            .all([requestOne, requestTwo])
            .then(
                axios.spread((...responses) => {
                    /*******************users********************/
                    let newUsers = []
                    let responseOne = 
                    responses[0].data.map((element) => {
                        return newUsers.push({
                            ...element,
                            count: responses[0].data?.filter(c => c.id !== element.id && c.following.indexOf(element.id) > -1)?.length
                        })
                    })
                    if(sortBoolean === 'ascending') {
                        newUsers.sort((a,b)=> a?.count - b?.count)
                    } else if (sortBoolean === 'descending') {
                        newUsers.sort((a,b)=> b?.count - a?.count)
        
                    }
                    setUsers([...newUsers]) ;
                    /*******************interests********************/
                    let responseTwo = responses[1].data;
                    setInterests(responseTwo)
          

                })
            )
            .catch(errors => {
                // react on errors.
                console.error(errors);
            });
        /***************************************/

        
    }, [sortBoolean])

   
    useEffect(() => {
        if(users.length && interests.length) {
            setUsers( users.map(user => {
                return {
                    id: user.id,
                    name: user?.name,
                    count: user?.count,
                    interests: interests.filter(c => user.interests?.indexOf(c.id) > -1).map(interest => {
                        return interest.name;
                    })
                };
              }))
              
        }
    }, [interests])


const sort  = (sort) => {
    setSortBoolean(sort)
}

    return (
        <div>
            <div>
                <h1>users list</h1>
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
                                    <button onClick={
                                        ()=> setShowInterests(showInterests.filter((obj)=>{
                                            return obj.name !== user?.name;
                                        }))}>
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
                <div className='sorting-list'>
                    <button onClick={()=> sort('ascending')}>ascending sort</button>
                    <button onClick={()=> sort('descending')}>descending sort</button>
                </div>

            </div>
        </div>
    )
}

export const UsersList = Users
