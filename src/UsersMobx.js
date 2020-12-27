import React from "react";
import { observer } from "mobx-react-lite";
// import { createPath } from "history";
import history from "./history";
const Users = observer(({ store }) => {
  const handleClick = (e) => {
    e.preventDefault();
    history.push({ pathname: e.target.pathname });
  };

  //history.push({ pathname: `/users/${query.nb}` });<- OK!!

  function handleSubmit(e) {
    e.preventDefault();
    let query = Object.fromEntries(new FormData(e.currentTarget));
    //history.push({ pathname: `/users/${query.nb}` });

    const qstring = new URLSearchParams(window.location.search);
    qstring.append("nb", query.nb);
    history.push({ pathname: "?" + qstring });
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="number" name="nb" />
        <button>Search a user (nb)</button>
      </form>
      <ul>
        {store.users.map((user) => (
          <li key={user.id}>
            {" "}
            {user.id},{" "}
            <a href={`/users/${user.id}`} onClick={handleClick}>
              {user.email}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
});

export default Users;
