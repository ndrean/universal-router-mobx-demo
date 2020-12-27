import { observable, action, runInAction } from "mobx";

const store = observable({
  users: "",
  addUsers: action((data) => (store.users = data)),
  fetchUsers: async () => {
    const query = await fetch("https://reqres.in/api/users?page=1");
    const response = await query.json();
    runInAction(() => (store.users = response.data)); // <- using IIEF action, instead of runInAction
  },
  findUser: function (id) {
    return store.users.find((user) => {
      return user.id === +id;
    });
  },
  modeAdmin: "",
  toggleMode: action(() =>
    store.modeAdmin === ""
      ? (store.modeAdmin = "admin")
      : (store.modeAdmin = "")
  ),
});

export default store;
