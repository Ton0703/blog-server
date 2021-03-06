const User = require("../models/user");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const { github } = require("../config");
const { secret } = require("../config");

function decodeQuery(url) {
  const params = {}
  const paramsStr = url.replace(/(\S*)\?/, '') // a=1&b=2&c=&d=xxx&e
  paramsStr.split('&').forEach(v => {
    const d = v.split('=')
    if (d[1] && d[0]) params[d[0]] = d[1]
  })
  return params
}

class UserCtl {
  async login(ctx) {
    const {code} = ctx.request.body;    
    const result = await axios.post(
      "https://github.com/login/oauth/access_token",
      { client_id: github.client_id, client_secret: github.client_secret, code: code }
    );
    const { access_token } = decodeQuery(result.data)
    // if(access_token){
    //   const result2 = await axios.get(`https://api.github.com/user?access_token=${access_token}`)
    //   const githubInfo = result2.data
    //   ctx.body = githubInfo
    // }
    //const result2 = await axios.get(`https://api.github.com/user?access_token=${access_token}`)
    ctx.body = access_token
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
