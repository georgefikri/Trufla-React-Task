import axios from 'axios'

export const apiCall = (usersRequest,interestsRequest,sortType,setUsers,setInterests) => {
    axios
    .all([usersRequest, interestsRequest])
    .then(
        axios.spread((...responses) => {
            /*******************users********************/
            let newUsers = []
            let responseOne = 
            responses[0].data.map((element) => {
                return newUsers.push({
                    ...element,
                    count: responses[0].data?.filter(
                        response => response.id !== element.id && response.following.indexOf(element.id) > -1)?.length
                })
            })
            if(sortType === 'ascending') {
                newUsers.sort((a,b)=> a?.count - b?.count)
            } else if (sortType === 'descending') {
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
}