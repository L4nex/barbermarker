FROM node:16-alpine

WORKDIR /home/node/app

ADD . .

ENV NODE_ENV=local
ENV DB_HOST=production.cieovfeltmfv.us-east-1.rds.amazonaws.com
ENV DB_USER=root
ENV DB_PASS=Oarfd4pfbu1MBu0zVCZU
ENV DB_NAME=bm_dev
ENV PORT=8081

RUN npm install

EXPOSE 8081

CMD [ "yarn", "start" ]