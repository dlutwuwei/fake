const router = require('koa-router')()
const request = require('koa2-request');
const cheerio = require('cheerio');
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
  if(ctx.request.headers['accept'].indexOf('text/html') >= 0) {
    const $ = cheerio.load(response.body);
    if($('.gooditem')) {
      const content = $('.gooditem');
      randomArray(content);
      const newContent = [];
      content.each((i, item) => {
        newContent[i] = $(item).html($(item));
      });
      $('.zkcontent').html(newContent.join(''))
    }
    $('head').append('<style>\
    .darkbk { background-color: #B1191A;}\
    </style>');
    ctx.body = $.html();
    return;
  }
  ctx.body = response.body;

})
module.exports = router

function randomArray(arr) {
  for (i = 0; i < arr.length; i++) {
    // 产生从 i 到 length 之间的随机数
    index = parseInt(Math.random() * (arr.length - i)) + i;
    if (index != i) {
        temp = arr[i];
        arr[i] = arr[index];
        arr[index] = temp;
    }
  }
}
