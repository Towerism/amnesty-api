# Amnesty Api [![Build Status](https://travis-ci.org/Towerism/amnesty-api.svg?branch=master)](https://travis-ci.org/Towerism/amnesty-api)


> The api for the Amnesty International blog

## Build Setup

``` bash
# install dependencies
yarn install

# initialize database
yarn run initdb

# serve with auto reload at localhost:3000
yarn run dev

# start without auto reload
yarn run start

# run all tests
yarn test
```

## Deployment N.B.
Before deploying be sure to set the `JWT_SECRET` environment variable.

### Database
Set the user and password via the environment variables `DB_USER` and `DB_PASSWORD`. Configure the database connection in `config/config.js`.