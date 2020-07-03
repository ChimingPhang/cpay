import cPay from '../index';
import Config from './config';
const Express = require('express'),
    bodyParser = require('body-parser'),
    app = new Express(),
    xmlparser = require('express-xml-bodyparser'),
    path = require('path'),
    ejs = require('ejs');

app.use(bodyParser.json({ limit: "500000kb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(xmlparser());


let weixin = new cPay.Model.WeixinConfig();
weixin.AppID = Config.weixin.AppID;
weixin.AppSecret = Config.weixin.AppSecret;
weixin.Key = Config.weixin.Key;
weixin.MchID = Config.weixin.MchID;
weixin.Redirect_uri = Config.weixin.Redirect_uri;
weixin.NotifyUrl = Config.weixin.NotifyUrl;
weixin.SSlCertPath = Config.weixin.SSlCertPath;
weixin.SSlCertPassword = Config.weixin.SSlCertPassword;
weixin.Ip = Config.weixin.Ip;
weixin.Facid = Config.weixin.Facid;

new cPay.Config.WeixinPayConfig(weixin);
new cPay.Config.RedisConfig(Config.redis.host, Config.redis.port, Config.redis.db);
new cPay.Config.MySqlConfig(Config.mySql.host, Config.mySql.user, Config.mySql.pwd, Config.mySql.db);


app.get('/auth', async function (req: any, res: any, next: any) {
    let ojsapipay = new cPay.JsApiPay(req, res, next);
    await ojsapipay.GetWeixinUserInfo('http://xulayen.imwork.net:13561/', false);
    console.log(ojsapipay.WeixinUserInfo);
});


app.post('/notice', async function (req: any, res: any, next: any) {
    console.log('推送-通知：notice');
    console.log(req);
    let notify = new cPay.Notify.CommonlyNotify(req, res, next);
    await notify.ProcessNotify();
});


app.post('/notice/native', async function (req: any, res: any, next: any) {
    console.log('推送-扫码支付模式1-通知：');
    console.log(req);

    let notify = new cPay.Notify.NativeNotify(req, res, next);
    await notify.ProcessNotify();

});



app.post('/h5pay', async function (req: any, res: any, next: any) {

    let h5pay = new cPay.H5Pay(),
        scene = new cPay.Model.SceneInfo("11", "22", "444"),
        orderinfo = new cPay.Model.OrderInfo();
    orderinfo.body = "1111111";
    orderinfo.total_fee = 100;
    h5pay.orderInfo = orderinfo;
    //out_trade_no

    let res_order = await h5pay.UnifiedOrder(new Date().getTime().toString(), scene, "http://baidu.com/");
    console.log(res_order);

    res.send(res_order);
});

app.post('/jspay', async function (req: any, res: any, next: any) {

    let ojsapipay = new cPay.JsApiPay(req, res, next), openid = req.body.openid;
    ojsapipay.orderInfo = new cPay.Model.OrderInfo("test", "test", "test", "test", 100);
    let res_order = await ojsapipay.UnifiedOrder(openid);
    console.log(res_order);
    let paramter = ojsapipay.GetJsApiPayParameters();
    res.send(paramter);


});


app.post('/native/prepay', async function (req: any, res: any, next: any) {
    let nativepay = new cPay.NativePay();
    nativepay.orderInfo = new cPay.Model.OrderInfo();
    nativepay.orderInfo.body = "商品描述";
    nativepay.orderInfo.total_fee = 1;
    nativepay.orderInfo.attach = "附件信息";
    nativepay.orderInfo.detail = "详细信息";
    nativepay.orderInfo.goods_tag = "测试";
    let url = await nativepay.GetPrePayUrl("111111");
    res.send(url);
});

app.post('/native/pay', async function (req: any, res: any, next: any) {
    let nativepay = new cPay.NativePay(), oinfo = new cPay.Model.OrderInfo();
    oinfo.body = "商品描述";
    oinfo.total_fee = 1;
    oinfo.attach = "附件信息";
    oinfo.detail = "详细信息";
    oinfo.goods_tag = "测试";
    nativepay.orderInfo = oinfo;
    let url = await nativepay.GetPayUrl("1111111111");
    res.send(url);
});

app.post('/wxapay', async function (req: any, res: any, next: any) {
    let wxaPay = new cPay.WxaPay();
    wxaPay.orderInfo = new cPay.Model.OrderInfo();
    wxaPay.orderInfo.body = "99999999";
    wxaPay.orderInfo.total_fee = 100;
    wxaPay.orderInfo.attach = "vvvv";
    wxaPay.orderInfo.detail = "bb";
    wxaPay.orderInfo.goods_tag = "aa";
    let data = await wxaPay.UnifiedOrder(new Date().getTime().toString(), "oi4qm1cAO4em3nUtBgOsOORvJhOk");

    let p = wxaPay.GetWxaApiPayParameters();
    console.log(p);
    res.send(data);
});


app.post('/apppay', async function (req: any, res: any, next: any) {
    let appPay = new cPay.AppPay();
    appPay.orderInfo = new cPay.Model.OrderInfo();
    appPay.orderInfo.body = "99999999";
    appPay.orderInfo.total_fee = 100;
    appPay.orderInfo.attach = "vvvv";
    appPay.orderInfo.detail = "bb";
    appPay.orderInfo.goods_tag = "aa";
    let data = await appPay.UnifiedOrder("1111111111", { device_info: "111" }),
        p = appPay.GetAppApiPayParameters();
    console.log(p);
    res.send(data);
});

app.post('/micropay', async function (req: any, res: any, next: any) {
    let microPay = new cPay.MicroPay(), auth_code = req.body.auth_code;
    microPay.orderInfo = new cPay.Model.OrderInfo();
    microPay.orderInfo.body = "99999999";
    microPay.orderInfo.total_fee = 1;
    microPay.orderInfo.attach = "56565656565";
    microPay.orderInfo.detail = "bb";
    microPay.orderInfo.goods_tag = "aa";
    let data = await microPay.Scan(new Date().getTime().toString(), auth_code);
    console.log(data);
    res.send(data);
});




app.post('/orderquery', async function (req: any, res: any, next: any) {

    let paydata = new cPay.Model.WxPayData(), orderinfo,
        ordernumber = req.body.ordernumber;
    paydata.SetValue("out_trade_no", ordernumber);

    try {
        orderinfo = await cPay.BaseApi.OrderQuery(paydata);

    } catch (error) {
        orderinfo = error.message;
    }

    res.send(orderinfo);

});


app.post('/closeorder', async function (req: any, res: any, next: any) {

    let paydata = new cPay.Model.WxPayData(), orderinfo;
    paydata.SetValue("out_trade_no", "111");

    try {
        orderinfo = await cPay.BaseApi.CloseOrder(paydata);

    } catch (error) {
        orderinfo = error.message;
    }

    res.send(orderinfo);

});


app.post('/Refund', async function (req: any, res: any, next: any) {

    let paydata = new cPay.Model.WxPayData(), orderinfo;
    paydata.SetValue("out_refund_no", "111");
    paydata.SetValue("out_trade_no", "11111111111");
    paydata.SetValue("refund_fee", "11111111111");
    paydata.SetValue("op_user_id", "11111111111");
    paydata.SetValue("total_fee", "11111111111");

    try {
        orderinfo = await cPay.BaseApi.Refund(paydata);

    } catch (error) {
        orderinfo = error.message;
    }

    res.send(orderinfo);

});


app.post('/RefundQuery', async function (req: any, res: any, next: any) {

    let paydata = new cPay.Model.WxPayData(), orderinfo;
    paydata.SetValue("out_refund_no", "111");

    try {
        orderinfo = await cPay.BaseApi.RefundQuery(paydata);

    } catch (error) {
        orderinfo = error.message;
    }

    res.send(orderinfo);

});



app.post('/ShortUrl', async function (req: any, res: any, next: any) {

    let paydata = new cPay.Model.WxPayData(), orderinfo;
    paydata.SetValue("long_url", "111");

    try {
        orderinfo = await cPay.BaseApi.ShortUrl(paydata);

    } catch (error) {
        orderinfo = error.message;
    }

    res.send(orderinfo);

});


app.set('views', path.join(__dirname, ".", 'web'));
app.engine('.html', ejs.__express);
app.set('view engine', 'html');
app.use(Express.static(path.join(__dirname, 'web/public')));

app.get('/index', function (req: any, res: any) {
    res.render('index', { title: 'users member' });
});

app.get('/h5pay', async function (req: any, res: any) {

    let h5pay = new cPay.H5Pay(),
        scene = new cPay.Model.SceneInfo("11", "22", "444"),
        orderinfo = new cPay.Model.OrderInfo();
    orderinfo.body = "1111111";
    orderinfo.total_fee = 1;
    h5pay.orderInfo = orderinfo;
    let res_order = await h5pay.UnifiedOrder(new Date().getTime().toString(), scene, "http://xulayen.imwork.net:13561/index");
    console.log(res_order);

    let url = res_order.data.GetValue("mweb_url");
    //res.render('h5pay', res_order);
    res.redirect(url);
});

//http://xulayen.imwork.net:13561/jspay?openid=oi4qm1cAO4em3nUtBgOsOORvJhOk
app.get('/jspay', async function (req: any, res: any, next: any) {
    let ojsapipay = new cPay.JsApiPay(req, res, next), openid = req.query.openid;
    ojsapipay.orderInfo = new cPay.Model.OrderInfo("test", "test", "test", "test", 1);
    let res_order = await ojsapipay.UnifiedOrder(openid);
    console.log(res_order);
    let paramter = ojsapipay.GetJsApiPayParameters();
    res.render('jspay', { data: paramter });
});


app.listen(8888, function (err: any) {
    if (err) {
        console.error('err:', err);
    } else {
        var _content = `===> api server is running at at http://10.20.26.19:8888`;
        console.info(_content);
    }
});