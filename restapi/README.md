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
I write initial queries for the mysql database. The migrations are in the *migrations* path. You can execute each of the migration files (name_of_the_file.up.sql) copying and pasting.

I use [migrate](https://github.com/golang-migrate/migrate) to automatize this task. You can install the binary or use the docker container and execute the migrations with:
```sh
# Binary installation
migrate -path ./migrations -database mysql://root:example@/databasename up

# Docker
docker run -v /absolute/path/to/migrations:/migrations --network host migrate/migrate -path=/migrations/ -database mysql://root:example@/databasename up
```

#### Managers
The exercise describe a manager, but nothing about the database. I prefer to load the managers users from the file *managers.json* that is an map with user as key and the value is the hashed password.

I wrote a script to create users in the *managers.json* with the hashed password. If the file not exists (in the root of the respapi project) the script creates it. You generate a new manager with:
```sh
# npm
npm run manager:add managerid "themanageridpassword"

# yarn
yarn run manager:add managerid "themanageridpassword"
```

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
