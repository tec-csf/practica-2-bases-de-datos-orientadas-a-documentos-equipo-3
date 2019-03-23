//El numero de jugadores que hay por pais de origen, ordenados ascendentemente por el nombre del pais.
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

//El club con más titulos de cada liga, ordenados ascendentemente por el nombre de la liga
db.club.aggregate([

    {
        $group:{
            _id:"$Liga_id",
            max:{$max:"$noTitulos"},
            club:{$addToSet:"$_id"}
        }
    },
    {
        $sort:{
            _id:1
        }
    },
    { $limit : 10 }
    
   
])