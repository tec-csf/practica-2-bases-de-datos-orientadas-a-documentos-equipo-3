# Pasar los archivos al contenedor

docker cp liga.json mycontainer:/liga.json
docker cp club.json mycontainer:/club.json
docker cp jugador.json mycontainer:/jugador.json


#Conectarse a la terminal del contenedor

docker exec -it mongo-router bash

# Cargar los archivos a las colecciones

mongoimport --db practica --collection liga --file liga.json --jsonArray
mongoimport --db practica --collection club --file club.json --jsonArray
mongoimport --db practica --collection jugador --file jugador.json --jsonArray