FROM node:18-alpine
WORKDIR /usr/src/app

# Instalar los datos de zonas horarias para que Node reconozca la hora local
RUN apk add --no-cache tzdata
ENV TZ=America/Bogota

COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
