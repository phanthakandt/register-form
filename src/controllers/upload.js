const fs = require("fs");

const db = require("../models");
const User = db.users;
const path = require('path')


const uploadFiles = async (req, res) => {
  
  try {
    console.log(req.file);

    if (req.file == undefined) {
      return res.send(`You must select a file.`);
    }

    User.create({
      type: req.file.mimetype,
      fname: req.body.fname,
      lname: req.body.lname,
      pnum: req.body.phone,
      email: req.body.email,
      company: req.body.company,
      imagename: req.file.originalname,
      data: fs.readFileSync(
        __basedir + "/resources/static/assets/uploads/" + req.file.filename
      ),
    }).then((user) => {
      fs.writeFileSync(
        __basedir + "/resources/static/assets/tmp/" + user.imagename,
        user.data
      );

      return res.sendFile(path.join(`${__dirname}/../views/success.html`));
    });
  } catch (error) {
    console.log(error);
    return res.send(`Error when trying upload images: ${error}`);
  }
};

module.exports = {
  uploadFiles,
};
