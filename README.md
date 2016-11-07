# slms
Social Learning Management System

## Como crear un pull request:

Lo primero antes de iniciar un desarrollo:

* vamos a crear un issue en github con el nombre de la tarea de trello, con el numero de issue
* vamos a crear un branch de git donde vamos a codificar todo nuestro código
´git checkout -b slms/issue-<numero de issue>´

* Es valido crear el pull request aunque no este completado el issue, de esta forma podemos ver que hemos cambiado respecto al master y hacer una revisión de código personal 
* para crear el pull request primero hay que subir el branch al repositorio de git
* despues de agregar todos los nuevos artefactos y darles commit
* utilizamos el siguiente comando:
´git push origin [nombre del branch]´
* luego en github le damos crear pull request y seleccionamos el branch
* cuando este terminado, pasamos la tarea de trello/github a code review y le indicamos a los demas que hagan una revisión rapida para que: 1) vayamos en sintonia con la codificación y podamos encontrar errores de manera temprana
* una vez los demas digan "Me parece bien" le hacemos merge del branch a master
