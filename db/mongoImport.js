# Pasar los archivos al contenedor

sudo docker cp liga.json mongo-router:/liga.json
sudo docker cp club.json mongo-router:/club.json
sudo docker cp jugador.json mongo-router:/jugador.json


#Conectarse a la terminal del contenedor

docker exec -it mongo-router bash

# Cargar los archivos a las colecciones

mongoimport --db practica --collection liga --file liga.json --jsonArray
mongoimport --db practica --collection club --file club.json --jsonArray
mongoimport --db practica --collection jugador --file jugador.json --jsonArray