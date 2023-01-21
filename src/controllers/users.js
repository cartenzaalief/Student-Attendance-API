const UsersModel = require("../model/users");
const sequelize = require("sequelize");

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
          password,
        },
      });

      console.log("cek", data);

      if (data.length > 0) {
        return res.status(200).send(data);
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
            password,
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
};
