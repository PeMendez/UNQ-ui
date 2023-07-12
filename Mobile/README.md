## Modificaciones en la API

- SimpleUserDTO ahora también nos trae el atributo image.
- TweetDTO ahora también trae el atributo isLiked, que indica si el tweet esta "likeado" por el usuario logueado.

## Configuración y ejecución del proyecto
Antes de comenzar, es importante asegurarse de tener npm instalado en el sistema. Los pasos son los siguientes:


1. En la ubicación actual de la terminal (por ejemplo, `~/2023s1-Grupo04/Mobile/`), se debe crear un archivo llamado `.env` con el siguiente contenido;
API_URL=http://xxx.xxx.xxx.x:7071
Reemplazando la IP de la API por la dirección IP y el puerto donde se encuentra alojada la API.
Por ejemplo, si la API se encuentra en la IP `192.168.100.6` y utiliza el puerto `7071`, en el archivo `.env` tiene que verse así: `API_URL=http://192.168.100.6:7071` 

2. Guardar y cerrar el archivo `.env`

3. Desde la ubicación actual de la terminal, ejecutar el siguiente comando para instalar las dependencias del proyecto:

npm install

4. Después, hay que ejecutar el siguiente comando para iniciar el proyecto:

npx expo start --clear --android

**La clave principal para que el proyecto funcione correctamente es asegurarse de configurar el archivo .env con la dirección IP y el puerto correctos de la API. Esto es fundamental para que la aplicación pueda comunicarse con la API y obtener los datos.**