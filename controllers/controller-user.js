'use strict'

var PuchaseOrder = require('../models/puchaseOrder');
var User = require('../models/user');

var controller = {

    saveUser: async function(req, res){

        var user = new User();

        var params = req.body;
        user.name = params.name;
        user.lastname = params.lastname;
        user.isProvider = params.isProvider;
        user.isManager = params.isManager;

        user.save((err, userStored) => {

            if (err)
                return res.status(500).send({ message: err });
            if (!userStored)
                return res.status(404).send({ message: 'No se ha podido guardar el usuario' });

            return res.status(200).send({
                message: "Usuario guardado",
                user: userStored
            });
        });

    },

    getPuchaseOrder: async function(req, res){
       
        var userID = req.params.id;
        console.log(userID);

        var query = await User.findById(userID,(err, user) => {

            if(err) return res.status(500).send({message: "Error al devolver los datos"});
            if(!user) return res.status(404).send({message: "El usuario no existe"});
            //return res.status(200).send({user});
        });

        if(query.isManager == true || query.isProvider == true){
            
            PuchaseOrder.find({"user":userID},(err, puchaseorder) => {

                if(err) return res.status(500).send({message: "error al devolver los datos"});
                if(!puchaseorder) return res.status(404).send({message: "La orden no existe"});
                
                return res.status(200).send({puchaseorder});
                
    
            }).populate('user', (err, puchaseorder) => {
    
                if(err) return res.status(500).send({message: "error al devolver los datos"});
                if(!puchaseorder) return res.status(404).send({message: "La orden no existe"});
            
            });

                
        }else{

            return res.status(404).send({ message: 'El usuario no es un Gerente ni un Proveedor'});
        
        }

    },

    confirmPuchaseOrder: async function(req, res){

        var userID = req.body.userID;
        var puchaseID = req.body.puchaseID;

        console.log(puchaseID);

        var query = await User.findById(userID,(err, user) => {

            if(err) return res.status(500).send({message: "Error al devolver los datos"});
            if(!user) return res.status(404).send({message: "El usuario no existe"});
            //return res.status(200).send({user});
        });

        if(query.isProvider == true){
            
            await PuchaseOrder.findByIdAndUpdate(puchaseID, {$set: {isConfirmed:true}}, {new:true}, (err, puchaseOrderUpdated) => {
            
                if(err) return res.status(500).send({message: "error al actualizar"});
                if(!puchaseOrderUpdated) return res.status(404).send({message: "La orden de compra no existe"});
    
                return res.status(200).send({
                    PuchaseOrder: puchaseOrderUpdated
                });

            });
        }else{

            return res.status(404).send({ message: 'El usuario no es un Proveedor'});
        
        }
        
        
    },

    confirmRecieve: async function(req, res){
        
        var userID = req.body.userID;
        var puchaseID = req.body.puchaseID;

        var query = await User.findById(userID,(err, user) => {
            if(err) return res.status(500).send({message: "Error al devolver los datos"});
            if(!user) return res.status(404).send({message: "El usuario no existe"});
            //return res.status(200).send({user});
        })

        if(query.isManager == true){
            
            await PuchaseOrder.findByIdAndUpdate(puchaseID, {$set: {isRecieve:true}}, {new:true}, (err, puchaseOrderUpdated) => {
            
                if(err) return res.status(500).send({message: "error al actualizar"});
                if(!puchaseOrderUpdated) return res.status(404).send({message: "La orden de compra no existe"});
    
                return res.status(200).send({
                    PuchaseOrder: puchaseOrderUpdated
                });

            });
        }else{

            return res.status(404).send({ message: 'El usuario no es un Proveedor'});
        
        }
    }
    
}

module.exports = controller;