

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

db.