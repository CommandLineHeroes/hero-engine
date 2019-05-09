FROM node:latest
WORKDIR /var/tmp
COPY . /var/tmp
RUN npm install
ENTRYPOINT ["npm", "run", "examples"]
