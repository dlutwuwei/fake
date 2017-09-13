const router = require('koa-router')()
const request = require('koa2-request');

// router.get('/', async (ctx, next) => {
//   await ctx.render('index', {
//     title: 'Hello Koa 2!'
//   })
// })

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

router.get('*', async (ctx) => {
  const url = ctx.request.url;
  if(url.indexOf('go.php')>=0) {
    ctx.body = {
      success: true
    };
    return;
  }
  const options = {
    url: `https://guangdiu.com/${ctx.request.url}`,
    headers: { 'User-Agent': 'request' }
  };

  const response = await request(options);
  //Yay, HTTP requests with no callbacks!
  ctx.response.set(response.headers);
  ctx.body = response.body;
})
module.exports = router
