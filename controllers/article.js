const Article = require("../models/article");

class ArticleCtl {
  async find(ctx) {
    const { per_page = 10 } = ctx.query;
    const page = Math.max(ctx.query.page * 1, 1) - 1;
    const perPage = Math.max(per_page * 1, 1);
    const key = new RegExp(ctx.query.key);
    const tag = ctx.query.tag;
    let article;
    if (tag) {
      article = await Article.find({
        title: key,
        tags: { $elemMatch: { $eq: tag } },
      }).sort({_id: -1})
        .limit(perPage)
        .skip(perPage * page);
    } else {
      article = await Article.find({
        title: key,
      }).sort({_id: -1})
        .limit(perPage)
        .skip(perPage * page);
    }
    ctx.body = article;
  }

  async findOne(ctx) {
    const id = ctx.params.id;
    const article = await Article.findById(id);
    ctx.body = article;
  }
  //获取随机文章
  async findRandom(ctx){
    const article = await Article.aggregate([{$sample: {size: 5}}])
    const data = article.map(({_id, title}) => ({_id, title}))
    ctx.body = data
  }
  //管理界面获取文章列表
  async findAdmin(ctx){
    const article = await Article.find()
    const data = article.map(({title, _id, createdAt}) => ({title, _id, createdAt}))
    ctx.body = data
  }
  //修改文章
  async update(ctx){
    ctx.verifyParams({
      title: {
        type: "string",
        require: true,
      },
      content: {
        type: "string",
        require: true,
      },
    });
    const article = await Article.findById(ctx.params.id).update(ctx.request.body)
    ctx.body = article
  }

  async create(ctx) {
    ctx.verifyParams({
      title: {
        type: "string",
        require: true,
      },
      content: {
        type: "string",
        require: true,
      },
    });
    const article = await new Article({
      ...ctx.request.body,
    }).save();
    ctx.body = article;
  }

  async delete(ctx){
    const _id = ctx.params.id
    await Article.findByIdAndRemove({_id})
    ctx.status = 204
  }

  async checkArticleExist(ctx, next) {
    const id = ctx.params.articleId;
    const article = await Article.findById(id);
    if (!article) {
      ctx.throw(404, "文章不存在");
    }
    ctx.state.article = article;
    await next();
  }


  async getTopic(ctx) {
    const topic = ctx.params.topic;
    const articles = await Article.find({ topic });
    const arr = articles.map(({ title, _id, topic }) => ({
      title,
      _id,
      topic,
    }));
    ctx.body = arr;
  }

//   async getTopic(ctx){
//       const _id = ctx.params.id
//       const article = await Article.find({_id})
//       ctx.body = article.topic
//   }
}

module.exports = new ArticleCtl();
