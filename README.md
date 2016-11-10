# slms
Social Learning Management System

## Como crear un pull request:

Lo primero antes de iniciar un desarrollo:

* Crear un issue en github con el nombre de la tarea de trello.
* Con el numero de issue, crear un branch de git donde vamos a codificar todo nuestro código
`git checkout -b slms/issue-<numero de issue>`

* Es valido crear el pull request aunque no este completado el issue, de esta forma se puede observar que hemos cambiado respecto al master y hacer una revisión de código personal.
* Para crear el pull request primero hay que subir el branch al repositorio de git.
* Despues de agregar todos los nuevos artefactos y darles commit y push al branch con el siguiente comando:
`git push origin [nombre del branch]`
* Luego en github se crea el pull request y se selecciona el branch
* Cuando este terminado, se mueve la tarea de `trello/github` a code review y se le indica a los demás que hagan una revisión rápida para que vayamos en sintonia con la codificación y se puedan encontrar errores de manera temprana.
* Una vez los demas digan "Me parece bien" se hace merge del branch a master.
