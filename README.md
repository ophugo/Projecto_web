# Projecto_web

Este proyecto fue creado con [Create React App](https://github.com/facebook/create-react-app).


Antes de correr el proyecto, estando en el directorio del proyecto Projecto_web/todo-app/ debe correr el siguiente comando en la terminal:

### `npm install`

Este comando instalará todos los modulos necesarios en el directorio del proyecto.
Despues de eso, para empezar el proyecto use:

### `npm start`

Este comando correrá la applicación en modo development.\
Abra [http://localhost:3000](http://localhost:3000) vara visualizarlo en el navegador.


### No es necesario instalar el backend, ya que incluso el frontend local tiene los urls del api que esta en la web.!!

# Para hacer deployment siga los siguientes pasos
### El primer paso es clonar el proyecto, luego ya estando adentro de la carpeta del proyecto se siguen los siguientes pasos
```
git init
heroku create -b https://github.com/mars/create-react-app-buildpack.git
git add .
git commit -m "react-create-app on Heroku"
git push heroku master
heroku open
```
