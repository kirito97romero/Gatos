'use strict';
const _ = require('lodash');
const util = require('util');	// Required in swagger sample controller
var controllerHelper = require('../helpers/controller.helper');
var messageHelper = require('../helpers/message.helper');
//var shortid = require('shortid');


const { cats } = require('../models');	// Sequelize

////////////////////////////////////////////////////////////////////////////////
// CONSTANTS
////////////////////////////////////////////////////////////////////////////////


// Module Name
const MODULE_NAME = '[gamesystem.controller]';

// Error Messages
const GS_CT_ERR_GAMESYSTEM_NOT_FOUND = 'Gamesystem not found';

// Success Messages
const GS_CT_DELETED_SUCCESSFULLY = 'Gamesystem deleted successfully';

////////////////////////////////////////////////////////////////////////////////
// PUBLIC METHODS
///////////////////////
/////////////////////////////////////////////////////////
function getCatbyId(req, res) {
  //console.log("operadores.controller getOperadorById");
  try {

    console.log(req.swagger.params.id.value);
    var id = req.swagger.params.id.value;
   
    console.log("gamesystem by id..." + id);
    //console.log(gamesystems);

    cats.findByPk(id)
    .then(mycat => {
    console.log(mycat);
    res.status(200).send(mycat);
   })

  } catch (error) {
    console.log("Was an error");
    controllerHelper.handleErrorResponse(MODULE_NAME, getCatbyId.name, error, res);
  }
}

function getCats(req, res) {

  try {
        
   console.log("cats...");
   console.log(cats);
   cats.findAll({
    /*include: [{
      model: orderstatus
     
    }]

    include: [{ all: true, nested: true }]*/
      })
   .then((mycats) => {
     console.log(mycats);
     res.status(200).send(mycats);
     //utils.writeJson(res, consoles);
   }, (error) => {
     res.status(500).send(error);
   });

  } catch (error) {
    controllerHelper.handleErrorResponse(MODULE_NAME, getCats.name, error, res);
  }
}

function updateCats(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  //console.log("operadores.controller getOperadorById");
  try {
    var id = req.swagger.params.id.value;
   
    console.log("params : " + id);
    var myupdatecat = req.body;
    console.log("update gamesystems ... " + myupdatecat.name + " " + myupdatecat.description);
 

    cats.findByPk(id)
      .then(mycat => {
        console.log("Result of findById: " + mycat);
        if (!mycat) {
          res.status(401).send(({}));
        
        }
        return mycat
          .update({ 
            name: myupdatecat.name, 
            description: myupdatecat.description 
           })
          .then(() => res.status(200).send(mycat) )
          .catch(error => res.status(403).send(mycat));
        })
      .catch(error => {
          console.log("There was an error: " + error);
          //resolve(error);
    });

  } catch (error) {
      console.log("Was an error");
      controllerHelper.handleErrorResponse(MODULE_NAME, updateCats.name, error, res);
  }

}

function addCat(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  try {

    console.log("params : ");
    var mycat = req.body;
    console.log("gamesystems ... " + mycat);
 
      return cats
        .create({
          name: mycat.name,
          raza:mycat.raza,
          description: mycat.description,
          pais:mycat.pais,
          peso:mycat.peso
         
        }, {
        /*  include: [{
            model: order_detail,
            as: 'orderdetail'
          }] */
        })
        .then((mycat) => {
          res.status(201).send(mycat);
              
        })
        .catch((error) => res.status(400).send(error));
    

  } catch (error) {
    console.log("Was an error");
    controllerHelper.handleErrorResponse(MODULE_NAME, addCats.name, error, res);
  }
}


function deleteCat(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
  res.header('Access-Control-Allow-Headers', 'Content-Type');
 
  console.log(req.swagger.params.id.value);
  var id = req.swagger.params.id.value;
 
  cats
    .findByPk(id)
    .then(mycat => {
      console.log("Result of findById: " + mycat);
      if (!mycat) {
        res.status(200).send({"success": 0, "description":"not found !"});
      }
      else
      {
      return mycat
        .destroy()
        .then(() => res.status(200).send({"success": 1, "description":"deleted!"}))
        .catch(error => res.status(403).send({"success": 0, "description":"error !"}))
      }
    })
    .catch(error => {
      console.log("There was an error: " + error);
    });


}

module.exports = {
  getCatbyId,
  getCats,
  updateCats,
  addCat,
  deleteCat,
  GS_CT_ERR_GAMESYSTEM_NOT_FOUND,
  GS_CT_DELETED_SUCCESSFULLY,
  MODULE_NAME
}