const User = require("../models/user");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const { github } = require("../config");
const { secret } = require("../config");

class UserCtl {
  async login(ctx) {
    const {code} = ctx.request.body;
    const result = await axios.post(
      "https://github.com/login/oauth/access_token",
      { client_id: github.client_id, client_secret: github.client_secret, code }
    );
    ctx.body = code
  }
  async register(ctx) {
    const { name } = ctx.request.body;
    const user = await User.findOne({
      name,
    });
    if (user) {
      ctx.throw(409, "用户名已经存在");
    }
    const newUser = await new User(ctx.request.body).save();
    const { _id } = newUser;
    const token = jwt.sign(
      {
        name,
        _id,
      },
      secret,
      {
        expiresIn: "1d",
      }
    );
    ctx.body = token;
  }
}

module.exports = new UserCtl();
