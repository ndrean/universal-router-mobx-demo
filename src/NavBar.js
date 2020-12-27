import React from "react";
import { action } from "mobx";
import { observer } from "mobx-react-lite";
import history from "./history.js";
// import store from "./store.js";

const NavBar = observer(({ children, store }) => {
  // const [mode, setMode] = React.useState("");

  function handleNav(e) {
    e.preventDefault();
    history.push({ pathname: e.target.pathname });
  }

  const handleMode = action((e) => {
    // setMode(e.target.checked);
    store.toggleMode();
  });

  //console.log(store.modeAdmin);
  /*
  React.useEffect(() => {
    mode
      ? localStorage.setItem("mode", "admin")
      : localStorage.setItem("mode", "");
  }, [mode]);
  */

  return (
    <div>
      <a href="/" onClick={handleNav} style={{ margin: "10px" }}>
        {" "}
        Home
      </a>
      <a href="/users" onClick={handleNav}>
        {" "}
        Users
      </a>
      <input
        type="checkbox"
        name="mode"
        onChange={handleMode}
        style={{ marginLeft: "100px" }}
      />{" "}
      {store.modeAdmin} mode
      <br />
      <hr />
      {children}
    </div>
  );
});

export default NavBar;
