(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/router/router"],{"2fd0":function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a=i(e("a34a")),r=e("42ad"),u=i(e("6a3d"));function i(t){return t&&t.__esModule?t:{default:t}}function o(t,n,e,a,r,u,i){try{var o=t[u](i),c=o.value}catch(s){return void e(s)}o.done?n(c):Promise.resolve(c).then(a,r)}function c(t){return function(){var n=this,e=arguments;return new Promise(function(a,r){var u=t.apply(n,e);function i(t){o(u,a,r,i,c,"next",t)}function c(t){o(u,a,r,i,c,"throw",t)}i(void 0)})}}var s={data:function(){return{autoplay:!0,interval:1e4,duration:1e3,imgList:[]}},onLoad:function(){var t=c(a.default.mark(function t(){var n;return a.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,r.channelLogicApi.ChannelTypeImgList({type:"sy"});case 3:n=t.sent,this.imgList=n.map(function(t){return"http://cloud.zgcfo.com/api/assets/".concat(t.path)}),t.next=9;break;case 7:t.prev=7,t.t0=t["catch"](0);case 9:case"end":return t.stop()}},t,this,[[0,7]])}));function n(){return t.apply(this,arguments)}return n}(),onShow:function(){},methods:{navToIndex:function(){this.$api.navigateTo({url:u.default.index})}}};n.default=s},3414:function(t,n,e){"use strict";e.r(n);var a=e("2fd0"),r=e.n(a);for(var u in a)"default"!==u&&function(t){e.d(n,t,function(){return a[t]})}(u);n["default"]=r.a},"5b00":function(t,n,e){"use strict";var a=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("view",{staticClass:"page",attrs:{_hid:0}},[e("swiper",{staticClass:"swiper",attrs:{autoplay:t.autoplay,circular:"true",interval:t.interval,duration:t.duration,_hid:1,_batrs:"autoplay,interval,duration"},on:{click:t.navToIndex}},t._l(t.imgList,function(t,n,a){var r=void 0!==a?a:n;return e("swiper-item",{key:n,attrs:{_hid:2,_fid:r,_fk:"index"}},[e("image",{staticClass:"bg_log",attrs:{src:t,mode:"true",_hid:3,_fid:r,_batrs:"src"}})])},2,t._self))],1)},r=[];e.d(n,"a",function(){return a}),e.d(n,"b",function(){return r})},"7acc":function(t,n,e){"use strict";e.r(n);var a=e("5b00"),r=e("3414");for(var u in r)"default"!==u&&function(t){e.d(n,t,function(){return r[t]})}(u);e("f918");var i=e("2877"),o=Object(i["a"])(r["default"],a["a"],a["b"],!1,null,null,null);n["default"]=o.exports},"9b5f":function(t,n,e){"use strict";e("be16");var a=u(e("7acc")),r=u(e("3a53"));function u(t){return t&&t.__esModule?t:{default:t}}a.default.mpType="page";var i=new r.default(a.default);i.$mount()},bea9:function(t,n,e){},f918:function(t,n,e){"use strict";var a=e("bea9"),r=e.n(a);r.a}},[["9b5f","common/runtime","common/vendor"]]]);