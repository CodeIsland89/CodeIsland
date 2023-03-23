FROM node:18

ADD . /work
WORKDIR /work

RUN apt-get install -y openssl
RUN npm install
RUN npm run swagger-autogen
RUN ./node_modules/.bin/prisma generate

CMD ["npm", "run", "start"]