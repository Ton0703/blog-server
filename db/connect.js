const mongoose = require('mongoose')

module.exports = {
    open(){
        return mongoose.connect('mongodb://127.0.0.1:27017/blog', {
            user:'',
            pass: '',
            poolSize: 10,
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, () => console.log('数据库连接成功'))
    }
}