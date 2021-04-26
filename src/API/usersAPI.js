import axios from "axios";

export const apiCall = (
  usersRequest,
  interestsRequest,
  setUsers,
  setInterests
) => {
  axios
    .all([usersRequest, interestsRequest])
    .then(
      axios.spread((...responses) => {
        /*******************users********************/
        let newUsers = [];
        let responseOne = responses[0].data.map((element) => {
          return newUsers.push({
            ...element,
            followers: responses[0].data?.filter(
              (response) =>
                response.id !== element.id &&
                response.following.indexOf(element.id) > -1
            ),
          });
        });
        setUsers([...newUsers]);
        // console.log('newUsers', newUsers)
        // console.log('responses[0].data', responses[0].data)

        /*******************interests********************/
        let responseTwo = responses[1].data;
        setInterests(responseTwo);
      })
    )
    .catch((errors) => {
      // react on errors.
      console.error(errors);
    });
};
