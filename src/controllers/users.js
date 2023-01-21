const UsersModel = require("../model/users");

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

      console.log(data);

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
    }
  },
};
