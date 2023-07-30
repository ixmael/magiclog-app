# Introduction
I implemented this with a personal interpretation of Hexagonal Architecture, but without all the components.

## Business definitions
Each business require to describe what is expected for its app. You have to describe definitions of the business.

The business definitions are located at *src/core/domain*.

## Business services
The services are the place where the business rules are applied. You haven't to care about a server endpoint, the database connection or an external service. You only care about the business rules: the user exists, the user has 18 years old, the product is published, etc.

The business services are implemented in *src/core/services*.

### Business repositories
This is a service that allows store the data provided to the RestAPI.

The business services are implemented in *src/services/repositories*.

## Application: RestAPI
The RestAPI is defined in *src/restapi* and this directory contains the routers, middlewares, endpoints, etc., related to the RestAPI application.

## Starting the RestAPI
The file *src/index.ts* has the responsability to create the services (business, repositories) and provide them to the express based server.