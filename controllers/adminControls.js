const sql = require('../model/dataAdmin');
const bcrypt = require("bcrypt");


exports.createAdmin = async (req, res) => {

  const hash = await bcrypt.hash(req.body.pass, 10);
  const a = await sql.createAdmin(req.body.name, hash, req.body.mail, req.body.role);
  if (a.code==200) {

    return res.status(200).send(a)
   

  } else {
    return res.status(406).send(a)
   
  }


};

exports.deleteAdmin = async (req, res) => {

  const a = await sql.deleteAdmin(req.body.id)

  if (a.code==200) {

    return res.status(200).send(a)
   

  } else {
    return res.status(404).send(a)
   
  }



};
exports.editAdmin = async (req, res) => {
  const a = await sql.updateAdmin(req.body.id, req.body.name);


  if (a.code == 200) {

    return res.status(200).send(a)
  } else {

    return res.status(404).send(a)
  }

};

exports.statusUpdateAdmin = async (req, res) => {
  const a = await sql.statusUpdateAdmin(req.body.id, req.body.status);
 
  if (a.code==200) {
    
    return res.status(200).send(a)
    
  } else {
    return res.status(404).send(a)
  }

}