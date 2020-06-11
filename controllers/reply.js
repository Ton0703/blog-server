const Reply = require('../models/reply')
const Comment = require('../models/comment')

class ReplyCtl {
    async create(ctx){
        const { content, id} = ctx.request.body
        const userId = ctx.state.user._id
        const {commentId, articleId} = ctx.params
        let replyTo
        if(id == commentId){
            const comment = await Comment.findById(id).populate('userId')
            replyTo = comment.userId.name
        } else{
            let reply = await Reply.findById(id).populate('userId') 
            replyTo = reply.userId.name
        }
        const reply = await new Reply({content, userId, commentId, articleId, replyTo}).save()
        ctx.body = reply
    }
}

module.exports = new ReplyCtl()