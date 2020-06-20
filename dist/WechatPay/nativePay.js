"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NativePay = void 0;
const cPay = require("../wxPayApi");
const cPay_Config = require("../Config");
const date_fns_1 = require("date-fns");
const constant_1 = require("../Config/constant");
const cPay_Util = require("../Util");
//export namespace cPay_NativePay {
const WxPayData = cPay.WxPayData;
const WxPayApi = cPay.WxPayApi;
const Util = cPay_Util.Util;
class NativePay {
    constructor() {
        this.config = cPay_Config.Config.GetWxPayConfig();
    }
    GetPrePayUrl(productId) {
        console.log("Native pay mode 1 url is producing...");
        let data = new WxPayData();
        data.SetValue("appid", this.config.GetAppID()); //公众帐号id
        data.SetValue("mch_id", this.config.GetMchID()); //商户号
        data.SetValue("time_stamp", WxPayApi.GenerateTimeStamp()); //时间戳
        data.SetValue("nonce_str", WxPayApi.GenerateNonceStr()); //随机字符串
        data.SetValue("product_id", productId); //商品ID
        data.SetValue("sign", data.MakeSign()); //签名
        let str = Util.ToUrlParams(data.GetValues()); //转换为URL串
        let url = `${constant_1.default.WEIXIN_wxpay_bizpayurl}${str}`;
        console.log("生成扫码支付模式1 : " + url);
        return url;
    }
    GetPayUrl(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Native pay mode 2 url is producing...");
            let data = new WxPayData(), url = "";
            data.SetValue("body", this.orderInfo.body); //商品描述
            data.SetValue("attach", this.orderInfo.attach); //附加数据
            data.SetValue("out_trade_no", WxPayApi.GenerateOutTradeNo()); //随机字符串
            data.SetValue("total_fee", this.orderInfo.total_fee); //总金额
            data.SetValue("time_start", date_fns_1.format(new Date(), "yyyyMMddHHmmss")); //交易起始时间
            data.SetValue("time_expire", date_fns_1.format(date_fns_1.addMinutes(new Date(), 10), "yyyyMMddHHmmss")); //交易结束时间
            data.SetValue("goods_tag", this.orderInfo.goods_tag); //商品标记
            data.SetValue("trade_type", constant_1.default.WEIXIN_trade_type_NATIVE); //交易类型
            data.SetValue("product_id", productId); //商品ID
            let result = yield WxPayApi.UnifiedOrder(data); //调用统一下单接口
            if (result.IsSet("code_url")) {
                url = result.GetValue("code_url").toString(); //获得统一下单接口返回的二维码链接
                console.log("Get native pay mode 2 url : " + url);
            }
            console.log("生成扫码支付模式2 : " + url);
            return url;
        });
    }
}
exports.NativePay = NativePay;
//}
