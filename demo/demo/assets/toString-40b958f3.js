var l=Object.defineProperty;var i=(r,t)=>l(r,"name",{value:t,configurable:!0});import{S as e,i as p}from"./isArray-6de4a062.js";import{i as u}from"./isSymbol-3167caec.js";function S(r,t){for(var n=-1,o=r==null?0:r.length,s=Array(o);++n<o;)s[n]=t(r[n],n,r);return s}i(S,"arrayMap");var y=1/0,f=e?e.prototype:void 0,m=f?f.toString:void 0;function g(r){if(typeof r=="string")return r;if(p(r))return S(r,g)+"";if(u(r))return m?m.call(r):"";var t=r+"";return t=="0"&&1/r==-y?"-0":t}i(g,"baseToString");function a(r){return r==null?"":g(r)}i(a,"toString");export{S as a,a as t};
//# sourceMappingURL=toString-40b958f3.js.map