# React functional components with Universal Router + Mobx

## Dockerized

- Multi-staged Dockerfile (Node `yarn install && yarn build` + Nginx `COPY static` + daemon)

- Launch with a **Makefile** (`make buildSlim`) or `docker-compose up --build`
