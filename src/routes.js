import React, { createElement as h } from "react";
import { runInAction, when } from "mobx";
// import store from "./store.js";
// const LazyNavBar = lazy(() => import("./NavBar.js"));
// const LazyHome = lazy(() => import("./Home"));
// const LazyUsers = lazy(() => import("./UsersMobx"));
// const LazyUser = lazy(() => import("./User"));
//import Home from "./Home.js";
// import UsersMobx from "./UsersMobx.js";
// import UsersUseEffect from "./UsersUseEffect.jsx";
// import Users from "./Users";
// import User from "./User";

const routes = [
  {
    path: "",
    action: async ({ next, mystore }) => {
      const content = await next();

      if (content.redirect) {
        return content;
      }
      return (
        content &&
        import("./NavBar").then((component) =>
          h(component.default, { store: mystore }, content)
        )
        // <Suspense fallback={<p></p>}>
        //   <LazyNavBar store={mystore}>{content}</LazyNavBar>
        // </Suspense>
      );
    },
    children: [
      {
        path: "/",
        action: async () =>
          await import("./Home").then((component) =>
            h(component.default, {}, "")
          ),
        // <Suspense fallback={<p></p>}>
        //   <LazyHome />
        // </Suspense>
        // <LazyHome />,
      },
      {
        path: "/users",
        children: [
          {
            path: "",
            action: async (context) => {
              const { mystore, mode } = context;

              // switch mode admin or not
              let whichMode = "";
              runInAction(() => (whichMode = mystore.modeAdmin));
              if (whichMode !== mode) {
                return { redirect: "/" };
              }
              // if (mode !== localStorage.getItem("mode")) {

              // redirection of query string
              const searchString = new URLSearchParams(window.location.search);
              const id = searchString.get("nb");
              if (id) {
                return { redirect: `/users/${id}` };
              }

              /*
              return await runInAction(() => store.fetchUsers()).then(() => (
                <Suspense fallback={<p></p>}>
                  <LazyUsers store={store} />
                </Suspense>
              ));
              */

              // async call to feed <Users/>

              runInAction(() => mystore.fetchUsers());
              await when(() => mystore.users.length > 0);
              const { default: Users } = await import("./Users");
              return <Users.Mobx store={mystore} />;

              /*
              return import("./Users").then((component) =>
                h(component.default.Mobx, { store: mystore }, "")
              );
              // <Suspense fallback={<p></p>}>
              //   <LazyUsers store={mystore} />
              // </Suspense>
              */
            },
          },
          {
            path: "/:id",
            children: [
              {
                path: "",
                async action(context) {
                  const {
                    mystore,
                    params: { id },
                  } = context;
                  //const id = context.params.id;
                  const { default: User } = await import("./User");
                  return <User store={mystore} id={id} />;
                },
              },
              {
                path: "/details",
                async action(context) {
                  const id = context.params.id;
                  // ver1
                  return await import("./User").then((component) =>
                    h(
                      component.default,
                      { store: context.mystore, id, more: true },
                      ""
                    )
                  );
                  // ver2
                  // <Suspense fallback={<p></p>}>
                  //   <LazyUser store={context.mystore} id={id} more={true} />
                  // </Suspense>
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "(.*)",
    action: () => h("h1", {}, "404: No way"),
  },
];

export default routes;
