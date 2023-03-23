FROM node:18

ADD . /work
WORKDIR /work

RUN npm install
RUN npm run build

CMD ["npm", "run", "start"]