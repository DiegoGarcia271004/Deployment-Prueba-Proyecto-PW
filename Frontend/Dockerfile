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

# Construye la aplicación para producción
RUN npm run build

# Instala un servidor para servir los archivos estáticos
RUN npm install -g serve

# Expone el puerto 80
EXPOSE 80

# Comando para ejecutar la aplicación
CMD ["serve", "-s", "build", "-l", "80"]
