# csg_congress_2026

La respuesta corta es: No, no habrá ningún problema. La aplicación está construida con una arquitectura diseñada exactamente para eso.

Puedes tener a 5, 10 o 50 voluntarios en distintas puertas usando sus celulares al mismo tiempo, y el sistema funcionará sin inconvenientes. Aquí te explico por qué tu aplicación es segura para múltiples usuarios:

El "Pool" de Conexiones de MySQL: En tu archivo config/db.js, configuramos un connectionPool con un límite de 10. Esto significa que la base de datos mantiene 10 "carriles" abiertos permanentemente. Si 20 personas hacen check-in en el mismo milisegundo exacto, MySQL procesa 10 al instante, y los otros 10 los pone en una cola de espera que se resuelve en fracciones de segundo. El usuario final ni lo nota.

Naturaleza de Node.js: Node.js es asíncrono. Mientras espera que la base de datos guarde el registro de un voluntario en la Puerta 1, el servidor sigue procesando la consulta del voluntario en la Puerta 2 sin bloquearse.

Protección contra duplicados (Race Conditions): ¿Qué pasa si dos personas intentan registrar un asistente con el mismo número de documento exactamente al mismo tiempo? Tu base de datos tiene la regla UNIQUE en la columna id_doc y ticket. MySQL aceptará al primero que llegue y rechazará al segundo automáticamente. Tu código detectará el rechazo y le mostrará la alerta roja al segundo usuario: "Error: El número de Ticket o Documento ya existe."

Múltiples Sesiones: El sistema de "Login" que implementamos le asigna una "cookie" temporal a cada navegador. El servidor sabe perfectamente distinguir si la petición viene del celular del "Voluntario A" o de la laptop del "Administrador".

El único detalle a tener en cuenta (para que lo sepas):
Actualmente, las sesiones (los logins) se guardan en la memoria RAM del contenedor de Node.js. Esto funciona perfecto, pero si por algún motivo tienes que reiniciar el servidor de Docker en medio del evento, todas las personas que estaban logueadas tendrán que volver a poner su usuario y contraseña. Los datos de los asistentes, reportes y logs NO se pierden nunca porque esos viven seguros en el disco duro gracias a la base de datos MySQL.
