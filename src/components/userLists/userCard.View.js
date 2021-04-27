import React from "react";

export const UserCardView = ({
  user,
  showInterests,
  showInterestsFn,
  hideInterestsFn,
  removeUsers,
  removeInterests,
  FontAwesomeIcon,
  faTrash,
}) => {
  return (
    <div className="list-item">
      <h3 className="name">{user?.name}</h3>
      <div className="count">followers count: {user?.count?.length}</div>
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
                      className="cursor-pointer d-inline-block ml-30"
                      onClick={() => removeInterests(interest, indexx)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </span>
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
