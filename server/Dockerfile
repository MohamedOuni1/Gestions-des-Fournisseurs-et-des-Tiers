FROM node:18

WORKDIR /app

COPY package.json ./

# Utilisation de l'option --legacy-peer-deps pour ignorer les conflits
RUN npm install --legacy-peer-deps

# Installer nodemon globalement
RUN npm install -g nodemon

COPY . .

EXPOSE 9000

CMD ["nodemon", "index.js"]