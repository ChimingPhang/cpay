"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Constant {
}
exports.default = Constant;
/**
 * https://pay.weixin.qq.com/wiki/doc/api/native.php?chapter=6_4
 * 扫码支付模式1接口
 * @static
 * @type {string}
 * @memberof Constant
 *
 */
Constant.WEIXIN_wxpay_bizpayurl = 'weixin://wxpay/bizpayurl?';
/**
 * https://pay.weixin.qq.com/wiki/doc/api/native.php?chapter=9_1
 * 统一下单接口
 * @static
 * @type {string}
 * @memberof Constant
 */
Constant.WEIXIN_wxpay_unifiedorder = "https://api.mch.weixin.qq.com/pay/unifiedorder";
/**
 * https://pay.weixin.qq.com/wiki/doc/api/native.php?chapter=9_2
 * 2、查询订单
 * @static
 * @type {string}
 * @memberof Constant
 */
Constant.WEIXIN_wxpay_orderquery = "https://api.mch.weixin.qq.com/pay/orderquery";
/**
 * https://pay.weixin.qq.com/wiki/doc/api/native.php?chapter=9_3
 * 关闭订单
 *
 * @static
 * @type {string}
 * @memberof Constant
 */
Constant.WEIXIN_wxpay_closeorder = "https://api.mch.weixin.qq.com/pay/closeorder";
/**
 * https://pay.weixin.qq.com/wiki/doc/api/native.php?chapter=9_4
 * 申请退款
 *
 * @static
 * @type {string}
 * @memberof Constant
 */
Constant.WEIXIN_wxpay_refund = "https://api.mch.weixin.qq.com/secapi/pay/refund";
/**
 * https://pay.weixin.qq.com/wiki/doc/api/native.php?chapter=9_5
 * 查询退款
 * @static
 * @type {string}
 * @memberof Constant
 */
Constant.WEIXIN_wxpay_refundquery = "https://api.mch.weixin.qq.com/pay/refundquery";
/**
 * https://pay.weixin.qq.com/wiki/doc/api/native.php?chapter=9_9&index=10
 * 转换短链接
 * @static
 * @type {string}
 * @memberof Constant
 */
Constant.WEIXIN_wxpay_shorturl = "https://api.mch.weixin.qq.com/tools/shorturl";
/**
 *
 * https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/Wechat_webpage_authorization.html
 * 微信授权，获取code
 * @static
 * @type {string}
 * @memberof Constant
 */
Constant.WEIXIN_auth2_authorize = "https://open.weixin.qq.com/connect/oauth2/authorize?";
/**
 * https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/Wechat_webpage_authorization.html
 * 根据code获取token、openID
 * @static
 * @type {string}
 * @memberof Constant
 */
Constant.WEIXIN_auth2_access_token = "https://api.weixin.qq.com/sns/oauth2/access_token?";
/**
 * https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/Wechat_webpage_authorization.html
 * 刷新Token
 * @static
 * @type {string}
 * @memberof Constant
 */
Constant.WEIXIN_auth2_refresh_token = "https://api.weixin.qq.com/sns/oauth2/refresh_token?";
/**
 * https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/Wechat_webpage_authorization.html
 * 获取微信信息
 * @static
 * @type {string}
 * @memberof Constant
 */
Constant.WEIXIN_auth2_userinfo = " https://api.weixin.qq.com/sns/userinfo?";
/**
 *
 *
 * @static
 * @type {string} 交易类型-JSAPI支付
 * @memberof Constant
 */
Constant.WEIXIN_trade_type_JSAPI = "JSAPI";
/**
 *交易类型-Native支付
 * @static
 * @type {string}
 * @memberof Constant
 */
Constant.WEIXIN_trade_type_NATIVE = "NATIVE";
/**
 * 交易类型-APP支付
 * @static
 * @type {string}
 * @memberof Constant
 */
Constant.WEIXIN_trade_type_APP = "APP";