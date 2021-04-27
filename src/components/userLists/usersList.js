import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles/styles.scss";
import { apiCall } from "../../API/usersAPI";
import { UserCardView } from "./userCard.View";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
/* 
    0. change the state on the client side ( sort , remove interest ) don't call the api again - done
    1. move sorting code to be in usersList.js - done
    2. remove sortType from useEffect - done
    3. api to be called once only ( remove any references ) - done
    4. fix this issue: fix followers count when remove a single user
    5. remove the functions to be onClick to be separated not to be added inside onClick - done 
    6. extra: remove indidual interest - done
*/
const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [interests, setInterests] = useState([]);
  const [showInterests, setShowInterests] = useState([]);

  let usersJSON = "users.json";
  let interestsJSON = "interests.json";
  const usersRequest = axios.get(usersJSON);
  const interestsRequest = axios.get(interestsJSON);

  useEffect(() => {
    apiCall(usersRequest, interestsRequest, setUsers, setInterests);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (users.length && interests.length) {
      setUsers(
        users.map((user) => {
          return {
            // ...user,
            id: user.id,
            name: user?.name,
            followers: user?.followers,
            interests: interests
              .filter((interest) => user.interests?.indexOf(interest.id) > -1)
              .map((interest) => {
                return interest.name;
              }),
          };
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [interests]);

  const sortDesc = () => {
    setUsers(
      [...users].sort((a, b) => b?.followers.length - a?.followers.length)
    );
  };

  const sortAsc = () => {
    setUsers(
      [...users].sort((a, b) => a?.followers.length - b?.followers.length)
    );
  };

  const showInterestsFn = (user) => {
    setShowInterests([...showInterests, { name: user?.name }]);
  };

  const hideInterestsFn = (user) => {
    setShowInterests(
      showInterests.filter((obj) => {
        return obj.name !== user?.name;
      })
    );
  };

  const filterUserFromFollowers = (followersList, selectedUser) =>
    followersList?.filter((u) => u?.id !== selectedUser?.id);

  const removeUsers = (selectedUser) => {
    const newUsers = [
      ...users.filter((user) => {
        if (user.id !== selectedUser?.id) {
          const newUser = {
            id: user.id,
            name: user.name,
            interests: user?.interests,
            followers: [
              ...filterUserFromFollowers(user?.followers, selectedUser),
            ],
          };
          return newUser;
        }
      }),
    ];
    setUsers([...newUsers]);
  };

  // const removeUsers = (user) => {
  //   setUsers(
  //     users.filter((obj) => {
  //       return obj.name !== user?.name;
  //     })
  //   );
  // };
  const removeInterests = (interest, indexx) => {
    setUsers(
      users.map((user) => {
        return {
          id: user.id,
          name: user?.name,
          followers: user?.followers,
          interests: user?.interests.filter(
            (item, index) => item[index] !== interest[indexx]
          ),
        };
      })
    );
  };

  console.log("users", users);
  return (
    <div>
      <div>
        <h1>users list</h1>
        <div className="sorting-list">
          <button onClick={() => sortAsc()}>ascending sort</button>
          <button onClick={() => sortDesc()}>descending sort</button>

          <span className="users-total-count">
            <label>Total Users</label>
            <span>{users?.length}</span>
          </span>
        </div>
        <div className="margin-bottom-30 list-container">
          {users?.map((user) => (
            <UserCardView
              user={user}
              showInterests={showInterests}
              showInterestsFn={showInterestsFn}
              hideInterestsFn={hideInterestsFn}
              removeUsers={removeUsers}
              key={user?.name}
              users={users}
              sortAsc={sortAsc}
              sortDesc={sortDesc}
              setUsers={setUsers}
              interests={interests}
              removeInterests={removeInterests}
              FontAwesomeIcon={FontAwesomeIcon}
              faTrash={faTrash}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UsersList;
