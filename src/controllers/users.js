const UsersModel = require("../model/users");
const sequelize = require("sequelize");
const { hashPassword, createToken } = require("../config/encript");
const bcrypt = require("bcrypt");

module.exports = {
  getData: async (req, res) => {
    try {
      let data = await UsersModel.findAll();
      return res.status(200).send(data);
    } catch (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  },
  login: async (req, res) => {
    let { NIS, password } = req.body;

    try {
      let data = await UsersModel.findAll({
        where: {
          NIS,
        },
      });

      if (data.length > 0) {
        let checkPass = bcrypt.compareSync(password, data[0].dataValues.password);
        
        if (checkPass) {
          let token = createToken({ ...data[0].dataValues });
          return res.status(200).send({ ...data[0].dataValues, token });
        } else {
          return res.status(200).send({
            success: false,
            message: "Password incorrect"
          })
        }
      } else {
        return res.status(200).send({
          success: false,
          message: "Account does not exist",
        });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  },
  register: async (req, res) => {
    let {
      NIS,
      fullname,
      TTL,
      inputClass,
      gender,
      address,
      phone,
      email,
      password,
    } = req.body;

    let newPass = hashPassword(password);

    try {
      let data = await UsersModel.findAll({
        where: {
          [sequelize.Op.or]: [{ NIS, fullname, email, phone }],
        },
      });

      if (data.length > 0) {
        return res.status(200).send({
          success: false,
          message: "NIS or Fullname or Email or Phone is already exist",
        });
      } else {
        try {
          let create = await UsersModel.create({
            NIS,
            fullname,
            TTL,
            class: inputClass,
            gender,
            address,
            phone,
            email,
            password: newPass,
          });
          return res.status(200).send({
            success: true,
            message: "Register account success",
            data: create,
          });
        } catch (err) {
          console.log(err);
          return res.status(500).send(err);
        }
      }
    } catch (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  },
  keepLogin: async (req, res) => {
    console.log(req.decript);
    try {
      let data = await UsersModel.findAll({
        where: {
          id: req.decript.id,
        },
      });

      console.log(data);

      let token = createToken({ ...data[0].dataValues });
      return res.status(200).send({ ...data[0].dataValues, token });
    } catch (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  },
};
