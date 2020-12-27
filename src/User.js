import React from "react";
import { observer } from "mobx-react-lite";
import history from "./history";

const User = observer(({ store, id, more }) => {
  const handleClick = (e) => {
    e.preventDefault();
    history.push({ pathname: e.target.pathname });
  };

  const user = store.findUser(id);
  return (
    <>
      <p>
        {user?.first_name} {user?.last_name}
      </p>
      {/* !! the '/' before uses is important !!*/}
      <a href={`/users/${id}/details`} onClick={handleClick}>
        Display more ?
      </a>
      <br />
      {more && user?.email}
    </>
  );
});

export default User;
