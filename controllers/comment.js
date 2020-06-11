const Comment = require('../models/comment')

class CommentCtl {
    async create(ctx) {
        const userId = ctx.state.user._id
        const {
            content
        } = ctx.request.body
        const articleId = ctx.state.article._id
        const comment = await new Comment({
            content,
            userId,
            articleId
        }).save()
        ctx.body = comment
    }
    async getComment(ctx) {
        const id = ctx.params.articleId
        const comment = await Comment.find({
            articleId: id
        }).populate('userId').sort({
            _id: -1
        })
        ctx.body = comment
    }
    async delete(ctx) {
        const id = ctx.params.id
        const userId = ctx.state.user._id
        const comment = await Comment.findById(id)
        if (!comment) {
            ctx.throw(404, '评论不存在')
        }
        if (userId !== comment.userId) {
            ctx.throw(403, '没有权限')
        }
        await Comment.findByIdAndRemove(id)
        //还要删除评论下的所有回复
        ctx.status = 204
    }
}

module.exports = new CommentCtl()