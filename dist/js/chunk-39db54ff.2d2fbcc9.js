(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-39db54ff"],{6740:function(t,e,r){"use strict";var n=/\b((?:https?:\/\/|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/gi,a=/\b(([a-zA-Z0-9\-\_\.])+(\+[a-zA-Z0-9]*)?@[a-zA-Z\_\-]+?(\.[a-zA-Z]{2,6})+)/gim,u=r("7fed");function c(t,e){var r=u(t),n=t;/^[a-zA-Z]{1,6}:/.test(n)||(n="http://"+n);var a=i({href:n},e);return"<a "+a+">"+r+"</a>"}function i(){return Array.prototype.slice.call(arguments).map(o).filter(Boolean).join(" ")}function s(t,e){var r=o(e);return t.replace(a,(function(t,e){var n=o({href:"mailto:"+e});return r&&(n+=" "+r),"<a "+n+">"+u(e)+"</a>"}))}function o(t){return t?Object.keys(t).map((function(e){var r=t[e];return u(e)+'="'+u(r)+'"'})).join(" "):""}t.exports=function(t,e){e||(e={});var r,a="",i=0,o=!1===e.escape?function(t){return t}:u;while(r=n.exec(t))a+=o(t.slice(i,r.index)),a+=c(r[0],e.attributes),i=n.lastIndex;return a+=o(t.slice(i)),a=s(a,e.attributes),a}},"7fed":function(t,e,r){"use strict";var n=/&/g,a=/</g,u=/>/g,c=/\'/g,i=/\"/g,s=/[&<>\"\']/;function o(t){return String(null===t||void 0===t?"":t)}t.exports=function(t){return t=o(t),s.test(t)?t.replace(n,"&amp;").replace(a,"&lt;").replace(u,"&gt;").replace(c,"&#39;").replace(i,"&quot;"):t}},b8bf:function(t,e,r){"use strict";r.r(e),r.d(e,"default",(function(){return s}));var n=r("e0e5"),a=r.n(n),u=r("6740"),c=r.n(u);const i="url";function s(t){const e={attributes:{},escape:!1},{attributes:r,escape:n}=a()({},e,t);return{id:i,async transform(t){return a()({},t,{result:c()(t.result,{attributes:r,escape:n})})}}}s.id=i}}]);
//# sourceMappingURL=chunk-39db54ff.2d2fbcc9.js.map