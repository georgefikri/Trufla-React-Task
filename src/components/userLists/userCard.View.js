import React from "react";

export const UserCardView = ({
  user,
  showInterests,
  showInterestsFn,
  hideInterestsFn,
  removeUsers,
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
            <p>
              {user?.interests?.map((interest) => {
                return <span key={interest}>{interest}</span>;
              })}
            </p>
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
