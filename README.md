# OneFreelance Front

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Functional promise](#functional-promise)
- [CI / CD](#ci--cd)
    - [Github Actions](#github-actions)
- [Configuration and run](#configuration-and-run)

## Functional promise

OneFreelance ambition is the ability for all customers to create and manage the company.

## CI / CD

### Github Actions

If you are not yet familiar with Github actions please start from [here](https://docs.github.com/en/actions).

## Configuration and run

- Set the environment variable : 
```javascript
// The api base url
VITE_API_URL=
// The google client id for authentication
VITE_GOOGLE_CLIENT_ID=
```

- Run application on local

```shell
npm run dev
```

- Build production 

```shell
npm run build
```

- Build docker image

```shell
docker build -t onefreelance-front .
```

- Run docker 

```shell
docker run -p 80:80 onefreelance-front --env VITE_API_URL=<YOUR_API_URL> --env VITE_GOOGLE_CLIENT_ID=<YOUR_CLIENT_ID>
```