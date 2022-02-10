# MWC/BCN - Desafio de BackEnd - Carlos Fraile.

### Descripción del proyecto :

en este pequeño proyecto realizamos una CLI donde mostramos información del evento, el listado de asistentes y una función para añadir nuevos asistentes. Debido a la facilidad del proyecto y a que el repositorio resultante me iba a servir de referencia para futuras CLI, me he tomado la libertad de añadir funcionalidades no exigidas en el enunciado, generando un CRUD para los asistentes, peticiones HTTP para traer el JSON con los usuarios, así como funciones de creación y borrado de ficheros para usar desde la primera bajada de la base de datos la misma almacenada localmente. Como generar CLIs era una tarea que tenia pendiente y que deseaba aprender, este desafio me ha venido de perlas.

### Tecnologias empleadas:
![]( =50x) ![](https://cdn-icons-png.flaticon.com/512/5968/5968381.png =50x)
<img src='https://cdn-icons-png.flaticon.com/512/5968/5968322.png' width="100">

La tecnologia empleada ha sido Node.JS , el conocido backend en Javascript . Las librerias que he empleado han sido:
- [Axios](https://www.npmjs.com/package/axios) - Clásica libreria para las peticiones HTTP.
- [Table](https://www.npmjs.com/package/table) - Libreria para transformar un conjunto de datos en una tabla. Mas exactamente en un string que se imprimirá como una tabla en cosnola.
- [Colors](https://www.npmjs.com/package/colors) - Clásica libreria para dar colores a las salidas en consola.
- [Inquirer](https://www.npmjs.com/package/inquirer) - La solución para generar menus de consola mas extendida de Javascript.
- [Typescript](https://www.npmjs.com/package/typescript) - Superset de Javascript que endurece su tipado. Si solo conoces Javascript, te recomiendo que indages sobre el y lo implantes en tus proyectos.

### Como usar el repositorio y cargar el programa:

- Para poder ejecutar el proyecto, necesitaras instalar Node(https://nodejs.org/es/download/package-manager/#debian-and-ubuntu-based-linux-distributions-enterprise-linux-fedora-and-snap-packages), el cual ya instala Node y NPM.
- Luego, abre una terminal situada en la raíz del proyecto y ejecuta `npm install` para cargar las dependencias.
- Tras ello, ya puedes ejecutar el proyecto con `npm start`, el cual genera el fichero "./dist" con todo el programa compilado desde TS a JS.

## IMPORTANTE:
Al ejecutar el programa, es conveniente dar bastante anchura a la terminal para que la tabla con la información de los visitantes no se vea incorrectamente.



