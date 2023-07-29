# RestAPI
This a RestAPI that implements the users histories given in the 'magicLog12023_TEST' file.

## Setup

### Project
Install the projec dependencies with:
```sh
# yarn
yarn install

# npm
npm install
```

### Migrations

### Environment variables

This project uses the following environment variables:
* RESTAPI_TOKEN: used in for the cryp functions, this is required.
* RESTAPI_PORT: The port where the RestAPI listen, by default the port is 3000.
* REPOSITORY: The repository to use, by default uses the in memory repository.
* REPOSITORY_URI: The URI repository to connect, required if you use sql.

The project can load a *.env* file with the definition of the environment variables. You can view the example in the *.env.example*.

## Development
```sh
# yarn
yarn run restapi:develop

# npm
npm run restapi:develop
```

## Run tests
```sh
# yarn
yarn run tests

# npm
npm run tests
```
