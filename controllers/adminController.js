const sql = require('../model/dataAdmin');
const bcrypt = require("bcrypt");


exports.createAdmin = async (req, res) => {

  const hash = await bcrypt.hash(req.body.pass, 10);
  const response = await sql.createAdmin(req.body.name, hash, req.body.mail, req.body.role);
  if (response.code==200) {

    return res.status(200).send(response)
   

  } else {
    return res.status(406).send(response)
   
  }


};

exports.deleteAdmin = async (req, res) => {

  const response = await sql.deleteAdmin(req.body.id)

  if (response.code==200) {

    return res.status(200).send(response)
   

  } else {
    return res.status(404).send(response)
   
  }



};
exports.editAdmin = async (req, res) => {
  const response = await sql.updateAdmin(req.body.id, req.body.name);


  if (response.code == 200) {

    return res.status(200).send(response)
  } else {

    return res.status(404).send(response)
  }

};

exports.statusUpdateAdmin = async (req, res) => {
  const response = await sql.statusUpdateAdmin(req.body.id, req.body.status);
 
  if (response.code==200) {
    
    return res.status(200).send(response)
    
  } else {
    return res.status(404).send(response)
  }

}