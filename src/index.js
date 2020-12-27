import { render } from "react-dom";
import React, { createElement as h } from "react";

import UniversalRouter from "universal-router";
import history from "./history.js";
import { configure } from "mobx";
import routes from "./routes.js";
import store from "./store.js";

configure({
  enforceActions: "always",
  computedRequiresReaction: true,
  reactionRequiresObservable: true,
  observableRequiresReaction: true,
  disableErrorBoundaries: true,
});

const context = {
  mode: "admin",
  mystore: store,
};

const router = new UniversalRouter(routes, { context });
const root = document.getElementById("root");

async function renderRoute(location) {
  try {
    const page = await router.resolve({
      pathname: location.pathname,
    });

    if (page.redirect) {
      return history.push({ pathname: page.redirect, search: "" });
    }
    return render(<React.StrictMode>{page}</React.StrictMode>, root);
  } catch (err) {
    return render(h("p", {}, "Wrong!"), root);
  }
}

history.push("/");
history.listen(({ location }) => renderRoute(location));
renderRoute(history.location);
