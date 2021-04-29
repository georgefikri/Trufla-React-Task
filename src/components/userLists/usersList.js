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
    3. fix this issue: fix followers count when remove a single user - not done
    4. remove the functions to be onClick to be separated not to be added inside onClick - done 
    5. extra: remove indidual interest - done
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
            id: user.id,
            name: user?.name,
            count: user?.count,
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
    setUsers([...users].sort((a, b) => b?.count.length - a?.count.length));
  };

  const sortAsc = () => {
    setUsers([...users].sort((a, b) => a?.count.length - b?.count.length));
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
      ...users
        .map((user) => {
          if (user.id !== selectedUser?.id) {
            const newUser = {
              id: user.id,
              name: user.name,
              interests: user?.interests,
              count: [...filterUserFromFollowers(user?.count, selectedUser)],
            };
            return newUser;
          }
        })
        .filter(Boolean),
    ];
    setUsers([...newUsers]);
  };

  const removeInterests = (interest, indexx) => {
    setUsers(
      users.map((user) => {
        return {
          id: user.id,
          name: user?.name,
          count: user?.count,
          interests: user?.interests.filter(
            (item, index) => item[index] !== interest[indexx]
          ),
        };
      })
    );
  };

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

export const UsersListComp = UsersList;
