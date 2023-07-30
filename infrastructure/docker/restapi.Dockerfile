# FROM node:18.16.0-alpine as base
# Section to build

# Start production
FROM node:16

COPY ./restapi /restapi
WORKDIR /restapi

RUN yarn install

ENTRYPOINT ["yarn"]
CMD ["restapi"]
