import React, {useState,useEffect} from 'react'
import axios from 'axios'

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


        // get users
        /*axios.get('users.json')
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
        .catch(err => console.log(err))*/

        // get interests
        /*axios.get('interests.json')
        .then(({data}) => {
            setInterests(data)
        }) 
        .catch(err => console.log(err))*/
        
    }, [sortBoolean])

   
    useEffect(() => {
        if(users.length && interests.length) {
            console.log('interests goa', interests)
            console.log('users goa ',users)
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

console.log('users', 
users
)
console.log('interests', 
interests
)

console.log('showInterests', showInterests)

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
                            {
                                user?.interests?.length ? 
                                <li>
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

                                    {showInterests !== [] 
                                        &&showInterests.some(singleInterest => singleInterest.name === user?.name) && 
                                        <ul>
                                            {
                                                user?.interests?.map(interest => {
                                                    return <li key={interest}>
                                                        {interest}
                                                    </li>
                                                })
                                            }
                                        </ul>
                                    }
                                </li>
                     
                                : undefined
                            }
                            <li>
                                <button onClick={()=> setUsers(users.filter((obj)=>{
                                            return obj.name !== user?.name;
                                        }))}>
                                    remove user
                                </button>
                            </li>
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
