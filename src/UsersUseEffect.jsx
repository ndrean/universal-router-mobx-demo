import React from "react";
import history from "./history";

const UsersUseEffect = () => {
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
};

export default UsersUseEffect;
