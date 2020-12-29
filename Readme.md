# React functional components with Universal Router + Mobx

State managed by **Mobx** with async calls

Example of navigation with:

- protected route
- dynamic route
- nested route
- 404

## Dockerized

- Multi-staged Dockerfile (Node `yarn install && yarn build` + Nginx `COPY static` + daemon)

- Launch with a **Makefile** (`make buildSlim`) or `docker-compose up --build`
