'use strict'

var PuchaseOrder = require('../models/puchaseOrder');
var User = require('../models/user');

var controller = {

    savePuchaseOrder: async function(req, res){

        var puchaseOrderOBJ = new PuchaseOrder();

        var params = req.body;
        puchaseOrderOBJ.amount = params.amount;
        puchaseOrderOBJ.price = params.price;
        puchaseOrderOBJ.name = params.name;
        puchaseOrderOBJ.user = params.user;
        puchaseOrderOBJ.status = params.status;

        
        var query = await User.findById(puchaseOrderOBJ.user,(err, user) => {

            if(err) return res.status(500).send({message: "Error al devolver los datos"});
            if(!user) return res.status(404).send({message: "El usuario no existe"});
            //return res.status(200).send({user});
        });

        if(query.isManager == true){
            puchaseOrderOBJ.save((err, puchaseOrderStored) => {

                if(err) return res.status(500).send({ message: "Error al guardar la ordend e compra"});
                if(!puchaseOrderStored) return res.status(404).send({ message: 'No se ha podido guardar la orden de compra'});
                
                return res.status(200).send({ 
                    message: "Order de compra guardada",
                    puchaseorderOBJ: puchaseOrderStored});
            });
        }else{
            return res.status(404).send({ message: 'El usuario no es un Gerente'});
        }

    }

    

}

module.exports = controller;