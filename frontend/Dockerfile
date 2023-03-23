FROM node:18

ADD ./frontend /work
WORKDIR /work

RUN npm install
RUN npm run build

CMD ["npm", "run", "start"]