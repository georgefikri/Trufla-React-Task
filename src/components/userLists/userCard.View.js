import React from "react";

export const UserCardView = ({
  user,
  showInterests,
  showInterestsFn,
  hideInterestsFn,
  removeUsers,
  setUsers,
  users,
  interests,
}) => {
  return (
    <div className="list-item">
      <h3 className="name">{user?.name}</h3>
      <div className="count">followers count: {user?.followers?.length}</div>
      {showInterests !== [] &&
        showInterests.some(
          (singleInterest) => singleInterest.name === user?.name
        ) && (
          <div className="interests-list">
            <div>
              {user?.interests?.map((interest, indexx) => {
                return (
                  <div key={interest} className="interest">
                    <span>{interest} </span>
                    {/* {console.log("interest", user?.interests)}
                    {console.log("user", user)} */}

                    <span
                      onClick={() =>
                        setUsers([...users, user?.interests?.splice(indexx, 1)])
                      }
                    >
                      delete
                    </span>
                    {/* {console.log("users", user?.interests?.splice(1, indexx))} */}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      {user?.interests?.length ? (
        <div className="toggle-interests">
          <button onClick={() => showInterestsFn(user)}> show interests</button>
          <button onClick={() => hideInterestsFn(user)}>hide interests</button>
        </div>
      ) : undefined}
      <div className="remove-user">
        <button onClick={() => removeUsers(user)}>remove user</button>
      </div>
    </div>
  );
};
