(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-router-router"],{"2f03":function(e,t,n){"use strict";var a=n("5811"),i=n.n(a);i.a},3414:function(e,t,n){"use strict";n.r(t);var a=n("62ca"),i=n.n(a);for(var r in a)"default"!==r&&function(e){n.d(t,e,function(){return a[e]})}(r);t["default"]=i.a},"41fa":function(e,t,n){t=e.exports=n("2350")(!1),t.push([e.i,'@charset "UTF-8";\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */uni-page-body[data-v-ae040c64]{width:100vw;height:100vh}.page[data-v-ae040c64]{width:100vw;height:100vh}.page .swiper[data-v-ae040c64]{width:100vw;height:100vh}.page .swiper .bg_log[data-v-ae040c64]{width:100vw;height:100%}',""])},5811:function(e,t,n){var a=n("41fa");"string"===typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);var i=n("4f06").default;i("b19dd398",a,!0,{sourceMap:!1,shadowMode:!1})},"62ca":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=s(n("a34a")),i=n("42ad"),r=s(n("6a3d"));function s(e){return e&&e.__esModule?e:{default:e}}function o(e,t,n,a,i,r,s){try{var o=e[r](s),u=o.value}catch(c){return void n(c)}o.done?t(u):Promise.resolve(u).then(a,i)}function u(e){return function(){var t=this,n=arguments;return new Promise(function(a,i){var r=e.apply(t,n);function s(e){o(r,a,i,s,u,"next",e)}function u(e){o(r,a,i,s,u,"throw",e)}s(void 0)})}}var c={data:function(){return{autoplay:!0,interval:1e4,duration:1e3,imgList:[]}},onLoad:function(){var e=u(a.default.mark(function e(){var t;return a.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,i.channelLogicApi.ChannelTypeImgList({type:"sy"});case 3:t=e.sent,this.imgList=t.map(function(e){return"http://cloud.zgcfo.com/api/assets/".concat(e.path)}),e.next=9;break;case 7:e.prev=7,e.t0=e["catch"](0);case 9:case"end":return e.stop()}},e,this,[[0,7]])}));function t(){return e.apply(this,arguments)}return t}(),onShow:function(){},methods:{navToIndex:function(){this.$api.navigateTo({url:r.default.index})}}};t.default=c},"6a3d":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a={index:"/pages/index/index",router:"/pages/router/router",enterprise:"/pages/business/enterprise/enterprise",finance:"/pages/business/finance/finance",highSalary:"/pages/business/highSalary/highSalary",companyDetail:"/pages/business/highSalary/companyDetail/companyDetail",abnormal:"/pages/tools/abnormal/abnormal",bill:"/pages/tools/bill/bill",income:"/pages/tools/income/income",latestPolicy:"/pages/tools/latestPolicy/latestPolicy",patent:"/pages/tools/patent/patent",subsidy:"/pages/tools/subsidy/subsidy",subsidyDetail:"/pages/tools/subsidy/detail/detail",login:"/pages/login/login",error:"/pages/error/error"},i=a;t.default=i},"7acc":function(e,t,n){"use strict";n.r(t);var a=n("fc5b"),i=n("3414");for(var r in i)"default"!==r&&function(e){n.d(t,e,function(){return i[e]})}(r);n("2f03");var s=n("2877"),o=Object(s["a"])(i["default"],a["a"],a["b"],!1,null,"ae040c64",null);t["default"]=o.exports},fc5b:function(e,t,n){"use strict";var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-uni-view",{staticClass:"page",on:{click:function(t){t=e.$handleEvent(t),e.navToIndex(t)}}},[n("v-uni-swiper",{staticClass:"swiper",attrs:{autoplay:e.autoplay,circular:"true",interval:e.interval,duration:e.duration}},e._l(e.imgList,function(e,t){return n("v-uni-swiper-item",{key:t},[n("v-uni-image",{staticClass:"bg_log",attrs:{src:e,mode:""}})],1)}),1)],1)},i=[];n.d(t,"a",function(){return a}),n.d(t,"b",function(){return i})}}]);