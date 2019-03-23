//El numero de jugadores que hay por pais de origen, ordenados ascendentemente por pais.
db.jugador.aggregate([

    {
        $group :{
          _id:"$paisDeOrigen",
          Total:{$sum:1}, 
        }
    },
    {
        $project:{
            _id:0,
            Pais:"$_id",
            Total:1
        }

    },
    {
        $sort:{
            _id:1
        }
    }
])

//La edad promedio de los jugadores, donde su posision es medio, por club.
db.jugador.aggregate([

    {
        $match:{
            posicion:"medio"
        }

    },
    {
        $group:{
            _id:"$club_id",
            edadPromedio:{$avg:"$edad"}
        }
    },
    { $limit : 10 }

])

db.club.aggregate([
    
    {
        $group:{
            _id:"$Liga_id",
            max:{$max:"$noTitulos"}
        }
    },
    {
        $project:{
            _id:1,
            max:1
        }

    },
    { $limit : 10 }
   
])