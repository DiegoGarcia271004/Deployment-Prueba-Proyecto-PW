# Imagen base de Node.js
FROM node:16

# Establece el directorio de trabajo
WORKDIR /usr/src/app

# Copia el package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos del proyecto
COPY . .

# Exponemos el puerto 3000 para la API
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "start"]
