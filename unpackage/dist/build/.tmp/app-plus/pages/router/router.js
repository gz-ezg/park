(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/router/router"],{"20ae":function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=o(e("a34a")),a=e("ea2e"),u=o(e("b883"));function o(n){return n&&n.__esModule?n:{default:n}}function i(n,t,e,r,a,u,o){try{var i=n[u](o),c=i.value}catch(f){return void e(f)}i.done?t(c):Promise.resolve(c).then(r,a)}function c(n){return function(){var t=this,e=arguments;return new Promise(function(r,a){var u=n.apply(t,e);function o(n){i(u,r,a,o,c,"next",n)}function c(n){i(u,r,a,o,c,"throw",n)}o(void 0)})}}var f={data:function(){return{autoplay:!0,interval:1e4,duration:1e3,imgList:[]}},onLoad:function(){var n=c(r.default.mark(function n(){var t;return r.default.wrap(function(n){while(1)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,a.channelLogicApi.ChannelTypeImgList({type:"sy"});case 3:t=n.sent,this.imgList=t.map(function(n){return"http://cloud.yrl.fun/api/assets/".concat(n.path)}),n.next=9;break;case 7:n.prev=7,n.t0=n["catch"](0);case 9:case"end":return n.stop()}},n,this,[[0,7]])}));function t(){return n.apply(this,arguments)}return t}(),onShow:function(){},methods:{navToIndex:function(){this.$api.navigateTo({url:u.default.index})}}};t.default=f},2997:function(n,t,e){"use strict";var r=e("c821"),a=e.n(r);a.a},"3a6e":function(n,t,e){"use strict";e.r(t);var r=e("20ae"),a=e.n(r);for(var u in r)"default"!==u&&function(n){e.d(t,n,function(){return r[n]})}(u);t["default"]=a.a},"73df":function(n,t,e){"use strict";var r=function(){var n=this,t=n.$createElement;n._self._c},a=[];e.d(t,"a",function(){return r}),e.d(t,"b",function(){return a})},c821:function(n,t,e){},f36f:function(n,t,e){"use strict";e.r(t);var r=e("73df"),a=e("3a6e");for(var u in a)"default"!==u&&function(n){e.d(t,n,function(){return a[n]})}(u);e("2997");var o=e("2877"),i=Object(o["a"])(a["default"],r["a"],r["b"],!1,null,null,null);t["default"]=i.exports}},[["76ca","common/runtime","common/vendor"]]]);