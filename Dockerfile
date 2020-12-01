FROM node:12.19.0

WORKDIR /app

COPY package*.json ./

RUN npm config set save-exact=true
RUN npm install -g nodemon
RUN npm install

COPY . /app

#CMD ["nodemon src/app.js"]

EXPOSE 5000






