import React from "react";
import { observer } from "mobx-react-lite";
import history from "./history";

const Users = {
  Mobx: observer(({ store }) => {
    const handleClick = (e) => {
      e.preventDefault();
      history.push({ pathname: e.target.pathname });
    };

    function handleSubmit(e) {
      e.preventDefault();
      const query = Object.fromEntries(new FormData(e.currentTarget));
      console.log(query);
      const { pathname, search } = window.location;
      const qstring = new URLSearchParams(search);
      for (const k in query) {
        qstring.append(k, query[k]);
      }

      history.push({
        pathname: pathname,
        search: "?" + qstring,
      });
    }

    return (
      <>
        <form onSubmit={handleSubmit}>
          <input type="number" name="nb" />
          <input type="text" name="job" placeholder="test urlparams" />
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
  }),
  ReactEffect: () => {
    const [users, setUsers] = React.useState("");
    const handleClick = (e) => {
      e.preventDefault();
      history.push({ pathname: e.target.pathname });
    };

    React.useEffect(() => {
      async function getUsers() {
        const query = await fetch("https://reqres.in/api/users?page=1");
        const response = await query.json();
        setUsers(response.data);
      }
      getUsers();
    }, []);
    //history.push({ pathname: `/users/${query.nb}` });<- OK!!

    return (
      <>
        <ul>
          {users &&
            users.map((user) => (
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
  },
};

export default Users;
