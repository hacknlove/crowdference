FROM node:8

RUN apt-get update; apt-get install build-essential -y

USER node

COPY --chown=node ./bundle /home/node/app

WORKDIR /home/node/app/programs/server

RUN npm install

WORKDIR /home/node/app
ENTRYPOINT ["npm", "start"]
CMD []
