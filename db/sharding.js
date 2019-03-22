# Crear una red para el Sharding

docker network create mongo-sh
# -----------------------------------------------
# ------ Configurar el Config Replica Set -------
# -----------------------------------------------

# Crear tres contenedores para los nodos del Config Replica Set

docker run --name mongo-config1 -d --net mongo-sh mongo --replSet "rsConfig" --configsvr
docker run --name mongo-config2 -d --net mongo-sh mongo --replSet "rsConfig" --configsvr
docker run --name mongo-config3 -d --net mongo-sh mongo --replSet "rsConfig" --configsvr

# Iniciar una terminal en uno de los nodos

docker exec -it mongo-config1 bash

# Conectarse a uno de los nodos 

mongo --host mongo-config1 --port 27019

# Inicializar el Config Replica Set

config = {
      "_id" : "rsConfig",
      "configsvr": true,
      "members" : [
          {
              "_id" : 0,
              "host" : "mongo-config1:27019"
          },
          {
              "_id" : 1,
              "host" : "mongo-config2:27019"
          },
          {
              "_id" : 2,
              "host" : "mongo-config3:27019"
          }
      ]
  }

rs.initiate(config)

# Desconectarse del nodo

exit  # Para salir de mongo shell
exit  # Para salir del contenedor

# ------------------------------------------------
# ------ Configurar los Shard Replica Sets -------
# ------------------------------------------------

# Crear tres contenedores para los nodos del Shard Replica Set

docker run --name mongo-shard11 -d --net mongo-sh mongo --replSet "rsShard1" --shardsvr
docker run --name mongo-shard12 -d --net mongo-sh mongo --replSet "rsShard1" --shardsvr
docker run --name mongo-shard13 -d --net mongo-sh mongo --replSet "rsShard1" --shardsvr

# Iniciar una terminal en uno de los nodos

docker exec -it mongo-shard11 bash

# Conectarse a uno de los nodos 

mongo --host mongo-shard11 --port 27018

# Inicializar el Shard Replica Set

config = {
      "_id" : "rsShard1",
      "members" : [
          {
              "_id" : 0,
              "host" : "mongo-shard11:27018"
          },
          {
              "_id" : 1,
              "host" : "mongo-shard12:27018"
          },
          {
              "_id" : 2,
              "host" : "mongo-shard13:27018"
          }
      ]
  }

rs.initiate(config)

# Desconectarse del nodo

exit  # Para salir de mongo shell
exit  # Para salir del contenedor

# --------------------------------
# ------ Iniciar el Router -------
# --------------------------------

docker run  --name mongo-router -d --net mongo-sh mongo  mongos --configdb rsConfig/mongo-config1:27019,mongo-config2:27019,mongo-config3:27019

docker exec -it mongo-router mongo

sh.addShard( "rsShard1/mongo-shard11:27018")
sh.addShard( "rsShard1/mongo-shard12:27018")
sh.addShard( "rsShard1/mongo-shard13:27018")

use practica
db.createCollection("liga")
db.createCollection("club")
db.createCollection("jugador")

sh.enableSharding( "practica" )
db.liga.createIndex( { _id : 1 } )
db.club.createIndex( { _id : 1 } )
db.jugador.createIndex( { nombre : 1 } )

sh.shardCollection( "shdb.liga", { "_id" : 1 } )
sh.shardCollection( "shdb.club", { "_id" : 1 } )
sh.shardCollection( "shdb.jugador", { "nombre" : 1 } )