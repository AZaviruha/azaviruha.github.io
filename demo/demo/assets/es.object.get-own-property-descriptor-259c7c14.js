var u=Object.defineProperty;var n=(o,t)=>u(o,"name",{value:t,configurable:!0});import{_ as v,q as g,ab as C,E as m,d as p,t as x,K as h}from"./index-aa905caf.js";var l=v,O=g,P=C,D=RangeError,i=String.fromCharCode,s=String.fromCodePoint,$=O([].join),b=!!s&&s.length!=1;l({target:"String",stat:!0,arity:1,forced:b},{fromCodePoint:n(function(t){for(var e=[],f=arguments.length,a=0,r;f>a;){if(r=+arguments[a++],P(r,1114111)!==r)throw D(r+" is not a valid code point");e[a]=r<65536?i(r):i(((r-=65536)>>10)+55296,r%1024+56320)}return $(e,"")},"fromCodePoint")});var y=v,E=m,R=x,c=h.f,d=p,j=!d||E(function(){c(1)});y({target:"Object",stat:!0,forced:j,sham:!d},{getOwnPropertyDescriptor:n(function(t,e){return c(R(t),e)},"getOwnPropertyDescriptor")});
//# sourceMappingURL=es.object.get-own-property-descriptor-259c7c14.js.map