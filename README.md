# MWC/BCN - Desafio de BackEnd - Carlos Fraile.

### Descripción del proyecto :

en este pequeño proyecto realizamos una CLI donde mostramos información del evento, el listado de asistentes y una función para añadir nuevos asistentes. Debido a la facilidad del proyecto y a que el repositorio resultante me iba a servir de referencia para futuras CLI, me he tomado la libertad de añadir funcionalidades no exigidas en el enunciado, generando un CRUD para los asistentes, peticiones HTTP para traer el JSON con los usuarios, así como funciones de creación y borrado de ficheros para usar desde la primera bajada de la base de datos la misma almacenada localmente. Como generar CLIs era una tarea que tenia pendiente y que deseaba aprender, este desafio me ha venido de perlas.

### Tecnologias empleadas:

La tecnologia empleada ha sido Node.JS , el conocido backend en Javascript . Las librerias que he empleado han sido:
[Axios](https://www.npmjs.com/package/axios) - Clásica libreria para las peticiones HTTP.
[Table](https://www.npmjs.com/package/table) - Libreria para transformar un conjunto de datos en una tabla. Mas exactamente en un string que se imprimirá como una tabla en cosnola.
[Colors](https://www.npmjs.com/package/colors) - Clásica libreria para dar colores a las salidas en consola.
[Inquirer](https://www.npmjs.com/package/inquirer) - La solución para generar menus de consola mas extendida de Javascript.
[Typescript](https://www.npmjs.com/package/typescript) - El "superset" por antonomasia de Javascript . A pesar de que no lo uso de forma totalmente ortodoxa, tanto para acceder a los métodos sugeridos por el IDE como no tener bugs sin retroalimentar a tiempo me es mas que suficiente.
