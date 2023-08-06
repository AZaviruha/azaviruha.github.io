var yt=Object.defineProperty;var s=(e,t)=>yt(e,"name",{value:t,configurable:!0});import{r as q}from"./index-13f3a07b.js";import{r as gt}from"./index-d5fbfd5b.js";import{a as bt,c as wt}from"./ui-6e300fc6.js";import{u as xt}from"./useClickOutside-38d34b76.js";import{j as et}from"./jsx-runtime-d0e2239a.js";var T="top",M="bottom",V="right",$="left",je="auto",pe=[T,M,V,$],Z="start",fe="end",Ot="clippingParents",tt="viewport",oe="popper",Et="reference",Xe=pe.reduce(function(e,t){return e.concat([t+"-"+Z,t+"-"+fe])},[]),rt=[].concat(pe,[je]).reduce(function(e,t){return e.concat([t,t+"-"+Z,t+"-"+fe])},[]),At="beforeRead",Pt="read",Rt="afterRead",Ct="beforeMain",Dt="main",jt="afterMain",Tt="beforeWrite",$t="write",Bt="afterWrite",St=[At,Pt,Rt,Ct,Dt,jt,Tt,$t,Bt];function H(e){return e?(e.nodeName||"").toLowerCase():null}s(H,"getNodeName");function S(e){if(e==null)return window;if(e.toString()!=="[object Window]"){var t=e.ownerDocument;return t&&t.defaultView||window}return e}s(S,"getWindow");function K(e){var t=S(e).Element;return e instanceof t||e instanceof Element}s(K,"isElement");function L(e){var t=S(e).HTMLElement;return e instanceof t||e instanceof HTMLElement}s(L,"isHTMLElement");function Te(e){if(typeof ShadowRoot>"u")return!1;var t=S(e).ShadowRoot;return e instanceof t||e instanceof ShadowRoot}s(Te,"isShadowRoot");function Lt(e){var t=e.state;Object.keys(t.elements).forEach(function(r){var n=t.styles[r]||{},a=t.attributes[r]||{},o=t.elements[r];!L(o)||!H(o)||(Object.assign(o.style,n),Object.keys(a).forEach(function(c){var i=a[c];i===!1?o.removeAttribute(c):o.setAttribute(c,i===!0?"":i)}))})}s(Lt,"applyStyles");function Mt(e){var t=e.state,r={popper:{position:t.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(t.elements.popper.style,r.popper),t.styles=r,t.elements.arrow&&Object.assign(t.elements.arrow.style,r.arrow),function(){Object.keys(t.elements).forEach(function(n){var a=t.elements[n],o=t.attributes[n]||{},c=Object.keys(t.styles.hasOwnProperty(n)?t.styles[n]:r[n]),i=c.reduce(function(f,u){return f[u]="",f},{});!L(a)||!H(a)||(Object.assign(a.style,i),Object.keys(o).forEach(function(f){a.removeAttribute(f)}))})}}s(Mt,"effect$2");const Vt={name:"applyStyles",enabled:!0,phase:"write",fn:Lt,effect:Mt,requires:["computeStyles"]};function N(e){return e.split("-")[0]}s(N,"getBasePlacement");var J=Math.max,be=Math.min,ee=Math.round;function Re(){var e=navigator.userAgentData;return e!=null&&e.brands&&Array.isArray(e.brands)?e.brands.map(function(t){return t.brand+"/"+t.version}).join(" "):navigator.userAgent}s(Re,"getUAString");function nt(){return!/^((?!chrome|android).)*safari/i.test(Re())}s(nt,"isLayoutViewport");function te(e,t,r){t===void 0&&(t=!1),r===void 0&&(r=!1);var n=e.getBoundingClientRect(),a=1,o=1;t&&L(e)&&(a=e.offsetWidth>0&&ee(n.width)/e.offsetWidth||1,o=e.offsetHeight>0&&ee(n.height)/e.offsetHeight||1);var c=K(e)?S(e):window,i=c.visualViewport,f=!nt()&&r,u=(n.left+(f&&i?i.offsetLeft:0))/a,p=(n.top+(f&&i?i.offsetTop:0))/o,h=n.width/a,b=n.height/o;return{width:h,height:b,top:p,right:u+h,bottom:p+b,left:u,x:u,y:p}}s(te,"getBoundingClientRect");function $e(e){var t=te(e),r=e.offsetWidth,n=e.offsetHeight;return Math.abs(t.width-r)<=1&&(r=t.width),Math.abs(t.height-n)<=1&&(n=t.height),{x:e.offsetLeft,y:e.offsetTop,width:r,height:n}}s($e,"getLayoutRect");function at(e,t){var r=t.getRootNode&&t.getRootNode();if(e.contains(t))return!0;if(r&&Te(r)){var n=t;do{if(n&&e.isSameNode(n))return!0;n=n.parentNode||n.host}while(n)}return!1}s(at,"contains");function I(e){return S(e).getComputedStyle(e)}s(I,"getComputedStyle");function kt(e){return["table","td","th"].indexOf(H(e))>=0}s(kt,"isTableElement");function U(e){return((K(e)?e.ownerDocument:e.document)||window.document).documentElement}s(U,"getDocumentElement");function we(e){return H(e)==="html"?e:e.assignedSlot||e.parentNode||(Te(e)?e.host:null)||U(e)}s(we,"getParentNode");function Ye(e){return!L(e)||I(e).position==="fixed"?null:e.offsetParent}s(Ye,"getTrueOffsetParent");function Wt(e){var t=/firefox/i.test(Re()),r=/Trident/i.test(Re());if(r&&L(e)){var n=I(e);if(n.position==="fixed")return null}var a=we(e);for(Te(a)&&(a=a.host);L(a)&&["html","body"].indexOf(H(a))<0;){var o=I(a);if(o.transform!=="none"||o.perspective!=="none"||o.contain==="paint"||["transform","perspective"].indexOf(o.willChange)!==-1||t&&o.willChange==="filter"||t&&o.filter&&o.filter!=="none")return a;a=a.parentNode}return null}s(Wt,"getContainingBlock");function ue(e){for(var t=S(e),r=Ye(e);r&&kt(r)&&I(r).position==="static";)r=Ye(r);return r&&(H(r)==="html"||H(r)==="body"&&I(r).position==="static")?t:r||Wt(e)||t}s(ue,"getOffsetParent");function Be(e){return["top","bottom"].indexOf(e)>=0?"x":"y"}s(Be,"getMainAxisFromPlacement");function ie(e,t,r){return J(e,be(t,r))}s(ie,"within");function Nt(e,t,r){var n=ie(e,t,r);return n>r?r:n}s(Nt,"withinMaxClamp");function ot(){return{top:0,right:0,bottom:0,left:0}}s(ot,"getFreshSideObject");function it(e){return Object.assign({},ot(),e)}s(it,"mergePaddingObject");function st(e,t){return t.reduce(function(r,n){return r[n]=e,r},{})}s(st,"expandToHashMap");var Ht=s(function(t,r){return t=typeof t=="function"?t(Object.assign({},r.rects,{placement:r.placement})):t,it(typeof t!="number"?t:st(t,pe))},"toPaddingObject");function qt(e){var t,r=e.state,n=e.name,a=e.options,o=r.elements.arrow,c=r.modifiersData.popperOffsets,i=N(r.placement),f=Be(i),u=[$,V].indexOf(i)>=0,p=u?"height":"width";if(!(!o||!c)){var h=Ht(a.padding,r),b=$e(o),l=f==="y"?T:$,x=f==="y"?M:V,m=r.rects.reference[p]+r.rects.reference[f]-c[f]-r.rects.popper[p],v=c[f]-r.rects.reference[f],w=ue(o),E=w?f==="y"?w.clientHeight||0:w.clientWidth||0:0,A=m/2-v/2,d=h[l],y=E-b[p]-h[x],g=E/2-b[p]/2+A,O=ie(d,g,y),C=f;r.modifiersData[n]=(t={},t[C]=O,t.centerOffset=O-g,t)}}s(qt,"arrow");function It(e){var t=e.state,r=e.options,n=r.element,a=n===void 0?"[data-popper-arrow]":n;a!=null&&(typeof a=="string"&&(a=t.elements.popper.querySelector(a),!a)||at(t.elements.popper,a)&&(t.elements.arrow=a))}s(It,"effect$1");const Ft={name:"arrow",enabled:!0,phase:"main",fn:qt,effect:It,requires:["popperOffsets"],requiresIfExists:["preventOverflow"]};function re(e){return e.split("-")[1]}s(re,"getVariation");var Ut={top:"auto",right:"auto",bottom:"auto",left:"auto"};function Xt(e,t){var r=e.x,n=e.y,a=t.devicePixelRatio||1;return{x:ee(r*a)/a||0,y:ee(n*a)/a||0}}s(Xt,"roundOffsetsByDPR");function ze(e){var t,r=e.popper,n=e.popperRect,a=e.placement,o=e.variation,c=e.offsets,i=e.position,f=e.gpuAcceleration,u=e.adaptive,p=e.roundOffsets,h=e.isFixed,b=c.x,l=b===void 0?0:b,x=c.y,m=x===void 0?0:x,v=typeof p=="function"?p({x:l,y:m}):{x:l,y:m};l=v.x,m=v.y;var w=c.hasOwnProperty("x"),E=c.hasOwnProperty("y"),A=$,d=T,y=window;if(u){var g=ue(r),O="clientHeight",C="clientWidth";if(g===S(r)&&(g=U(r),I(g).position!=="static"&&i==="absolute"&&(O="scrollHeight",C="scrollWidth")),g=g,a===T||(a===$||a===V)&&o===fe){d=M;var R=h&&g===y&&y.visualViewport?y.visualViewport.height:g[O];m-=R-n.height,m*=f?1:-1}if(a===$||(a===T||a===M)&&o===fe){A=V;var P=h&&g===y&&y.visualViewport?y.visualViewport.width:g[C];l-=P-n.width,l*=f?1:-1}}var D=Object.assign({position:i},u&&Ut),k=p===!0?Xt({x:l,y:m},S(r)):{x:l,y:m};if(l=k.x,m=k.y,f){var j;return Object.assign({},D,(j={},j[d]=E?"0":"",j[A]=w?"0":"",j.transform=(y.devicePixelRatio||1)<=1?"translate("+l+"px, "+m+"px)":"translate3d("+l+"px, "+m+"px, 0)",j))}return Object.assign({},D,(t={},t[d]=E?m+"px":"",t[A]=w?l+"px":"",t.transform="",t))}s(ze,"mapToStyles");function Yt(e){var t=e.state,r=e.options,n=r.gpuAcceleration,a=n===void 0?!0:n,o=r.adaptive,c=o===void 0?!0:o,i=r.roundOffsets,f=i===void 0?!0:i,u={placement:N(t.placement),variation:re(t.placement),popper:t.elements.popper,popperRect:t.rects.popper,gpuAcceleration:a,isFixed:t.options.strategy==="fixed"};t.modifiersData.popperOffsets!=null&&(t.styles.popper=Object.assign({},t.styles.popper,ze(Object.assign({},u,{offsets:t.modifiersData.popperOffsets,position:t.options.strategy,adaptive:c,roundOffsets:f})))),t.modifiersData.arrow!=null&&(t.styles.arrow=Object.assign({},t.styles.arrow,ze(Object.assign({},u,{offsets:t.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:f})))),t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-placement":t.placement})}s(Yt,"computeStyles");const zt={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:Yt,data:{}};var ye={passive:!0};function _t(e){var t=e.state,r=e.instance,n=e.options,a=n.scroll,o=a===void 0?!0:a,c=n.resize,i=c===void 0?!0:c,f=S(t.elements.popper),u=[].concat(t.scrollParents.reference,t.scrollParents.popper);return o&&u.forEach(function(p){p.addEventListener("scroll",r.update,ye)}),i&&f.addEventListener("resize",r.update,ye),function(){o&&u.forEach(function(p){p.removeEventListener("scroll",r.update,ye)}),i&&f.removeEventListener("resize",r.update,ye)}}s(_t,"effect");const Gt={name:"eventListeners",enabled:!0,phase:"write",fn:s(function(){},"fn"),effect:_t,data:{}};var Jt={left:"right",right:"left",bottom:"top",top:"bottom"};function ge(e){return e.replace(/left|right|bottom|top/g,function(t){return Jt[t]})}s(ge,"getOppositePlacement");var Kt={start:"end",end:"start"};function _e(e){return e.replace(/start|end/g,function(t){return Kt[t]})}s(_e,"getOppositeVariationPlacement");function Se(e){var t=S(e),r=t.pageXOffset,n=t.pageYOffset;return{scrollLeft:r,scrollTop:n}}s(Se,"getWindowScroll");function Le(e){return te(U(e)).left+Se(e).scrollLeft}s(Le,"getWindowScrollBarX");function Qt(e,t){var r=S(e),n=U(e),a=r.visualViewport,o=n.clientWidth,c=n.clientHeight,i=0,f=0;if(a){o=a.width,c=a.height;var u=nt();(u||!u&&t==="fixed")&&(i=a.offsetLeft,f=a.offsetTop)}return{width:o,height:c,x:i+Le(e),y:f}}s(Qt,"getViewportRect");function Zt(e){var t,r=U(e),n=Se(e),a=(t=e.ownerDocument)==null?void 0:t.body,o=J(r.scrollWidth,r.clientWidth,a?a.scrollWidth:0,a?a.clientWidth:0),c=J(r.scrollHeight,r.clientHeight,a?a.scrollHeight:0,a?a.clientHeight:0),i=-n.scrollLeft+Le(e),f=-n.scrollTop;return I(a||r).direction==="rtl"&&(i+=J(r.clientWidth,a?a.clientWidth:0)-o),{width:o,height:c,x:i,y:f}}s(Zt,"getDocumentRect");function Me(e){var t=I(e),r=t.overflow,n=t.overflowX,a=t.overflowY;return/auto|scroll|overlay|hidden/.test(r+a+n)}s(Me,"isScrollParent");function ft(e){return["html","body","#document"].indexOf(H(e))>=0?e.ownerDocument.body:L(e)&&Me(e)?e:ft(we(e))}s(ft,"getScrollParent");function se(e,t){var r;t===void 0&&(t=[]);var n=ft(e),a=n===((r=e.ownerDocument)==null?void 0:r.body),o=S(n),c=a?[o].concat(o.visualViewport||[],Me(n)?n:[]):n,i=t.concat(c);return a?i:i.concat(se(we(c)))}s(se,"listScrollParents");function Ce(e){return Object.assign({},e,{left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height})}s(Ce,"rectToClientRect");function er(e,t){var r=te(e,!1,t==="fixed");return r.top=r.top+e.clientTop,r.left=r.left+e.clientLeft,r.bottom=r.top+e.clientHeight,r.right=r.left+e.clientWidth,r.width=e.clientWidth,r.height=e.clientHeight,r.x=r.left,r.y=r.top,r}s(er,"getInnerBoundingClientRect");function Ge(e,t,r){return t===tt?Ce(Qt(e,r)):K(t)?er(t,r):Ce(Zt(U(e)))}s(Ge,"getClientRectFromMixedType");function tr(e){var t=se(we(e)),r=["absolute","fixed"].indexOf(I(e).position)>=0,n=r&&L(e)?ue(e):e;return K(n)?t.filter(function(a){return K(a)&&at(a,n)&&H(a)!=="body"}):[]}s(tr,"getClippingParents");function rr(e,t,r,n){var a=t==="clippingParents"?tr(e):[].concat(t),o=[].concat(a,[r]),c=o[0],i=o.reduce(function(f,u){var p=Ge(e,u,n);return f.top=J(p.top,f.top),f.right=be(p.right,f.right),f.bottom=be(p.bottom,f.bottom),f.left=J(p.left,f.left),f},Ge(e,c,n));return i.width=i.right-i.left,i.height=i.bottom-i.top,i.x=i.left,i.y=i.top,i}s(rr,"getClippingRect");function ct(e){var t=e.reference,r=e.element,n=e.placement,a=n?N(n):null,o=n?re(n):null,c=t.x+t.width/2-r.width/2,i=t.y+t.height/2-r.height/2,f;switch(a){case T:f={x:c,y:t.y-r.height};break;case M:f={x:c,y:t.y+t.height};break;case V:f={x:t.x+t.width,y:i};break;case $:f={x:t.x-r.width,y:i};break;default:f={x:t.x,y:t.y}}var u=a?Be(a):null;if(u!=null){var p=u==="y"?"height":"width";switch(o){case Z:f[u]=f[u]-(t[p]/2-r[p]/2);break;case fe:f[u]=f[u]+(t[p]/2-r[p]/2);break}}return f}s(ct,"computeOffsets");function ce(e,t){t===void 0&&(t={});var r=t,n=r.placement,a=n===void 0?e.placement:n,o=r.strategy,c=o===void 0?e.strategy:o,i=r.boundary,f=i===void 0?Ot:i,u=r.rootBoundary,p=u===void 0?tt:u,h=r.elementContext,b=h===void 0?oe:h,l=r.altBoundary,x=l===void 0?!1:l,m=r.padding,v=m===void 0?0:m,w=it(typeof v!="number"?v:st(v,pe)),E=b===oe?Et:oe,A=e.rects.popper,d=e.elements[x?E:b],y=rr(K(d)?d:d.contextElement||U(e.elements.popper),f,p,c),g=te(e.elements.reference),O=ct({reference:g,element:A,strategy:"absolute",placement:a}),C=Ce(Object.assign({},A,O)),R=b===oe?C:g,P={top:y.top-R.top+w.top,bottom:R.bottom-y.bottom+w.bottom,left:y.left-R.left+w.left,right:R.right-y.right+w.right},D=e.modifiersData.offset;if(b===oe&&D){var k=D[a];Object.keys(P).forEach(function(j){var X=[V,M].indexOf(j)>=0?1:-1,Y=[T,M].indexOf(j)>=0?"y":"x";P[j]+=k[Y]*X})}return P}s(ce,"detectOverflow");function nr(e,t){t===void 0&&(t={});var r=t,n=r.placement,a=r.boundary,o=r.rootBoundary,c=r.padding,i=r.flipVariations,f=r.allowedAutoPlacements,u=f===void 0?rt:f,p=re(n),h=p?i?Xe:Xe.filter(function(x){return re(x)===p}):pe,b=h.filter(function(x){return u.indexOf(x)>=0});b.length===0&&(b=h);var l=b.reduce(function(x,m){return x[m]=ce(e,{placement:m,boundary:a,rootBoundary:o,padding:c})[N(m)],x},{});return Object.keys(l).sort(function(x,m){return l[x]-l[m]})}s(nr,"computeAutoPlacement");function ar(e){if(N(e)===je)return[];var t=ge(e);return[_e(e),t,_e(t)]}s(ar,"getExpandedFallbackPlacements");function or(e){var t=e.state,r=e.options,n=e.name;if(!t.modifiersData[n]._skip){for(var a=r.mainAxis,o=a===void 0?!0:a,c=r.altAxis,i=c===void 0?!0:c,f=r.fallbackPlacements,u=r.padding,p=r.boundary,h=r.rootBoundary,b=r.altBoundary,l=r.flipVariations,x=l===void 0?!0:l,m=r.allowedAutoPlacements,v=t.options.placement,w=N(v),E=w===v,A=f||(E||!x?[ge(v)]:ar(v)),d=[v].concat(A).reduce(function(Q,F){return Q.concat(N(F)===je?nr(t,{placement:F,boundary:p,rootBoundary:h,padding:u,flipVariations:x,allowedAutoPlacements:m}):F)},[]),y=t.rects.reference,g=t.rects.popper,O=new Map,C=!0,R=d[0],P=0;P<d.length;P++){var D=d[P],k=N(D),j=re(D)===Z,X=[T,M].indexOf(k)>=0,Y=X?"width":"height",B=ce(t,{placement:D,boundary:p,rootBoundary:h,altBoundary:b,padding:u}),W=X?j?V:$:j?M:T;y[Y]>g[Y]&&(W=ge(W));var le=ge(W),z=[];if(o&&z.push(B[k]<=0),i&&z.push(B[W]<=0,B[le]<=0),z.every(function(Q){return Q})){R=D,C=!1;break}O.set(D,z)}if(C)for(var de=x?3:1,xe=s(function(F){var ae=d.find(function(me){var _=O.get(me);if(_)return _.slice(0,F).every(function(Oe){return Oe})});if(ae)return R=ae,"break"},"_loop"),ne=de;ne>0;ne--){var ve=xe(ne);if(ve==="break")break}t.placement!==R&&(t.modifiersData[n]._skip=!0,t.placement=R,t.reset=!0)}}s(or,"flip");const ir={name:"flip",enabled:!0,phase:"main",fn:or,requiresIfExists:["offset"],data:{_skip:!1}};function Je(e,t,r){return r===void 0&&(r={x:0,y:0}),{top:e.top-t.height-r.y,right:e.right-t.width+r.x,bottom:e.bottom-t.height+r.y,left:e.left-t.width-r.x}}s(Je,"getSideOffsets");function Ke(e){return[T,V,M,$].some(function(t){return e[t]>=0})}s(Ke,"isAnySideFullyClipped");function sr(e){var t=e.state,r=e.name,n=t.rects.reference,a=t.rects.popper,o=t.modifiersData.preventOverflow,c=ce(t,{elementContext:"reference"}),i=ce(t,{altBoundary:!0}),f=Je(c,n),u=Je(i,a,o),p=Ke(f),h=Ke(u);t.modifiersData[r]={referenceClippingOffsets:f,popperEscapeOffsets:u,isReferenceHidden:p,hasPopperEscaped:h},t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-reference-hidden":p,"data-popper-escaped":h})}s(sr,"hide");const fr={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:sr};function cr(e,t,r){var n=N(e),a=[$,T].indexOf(n)>=0?-1:1,o=typeof r=="function"?r(Object.assign({},t,{placement:e})):r,c=o[0],i=o[1];return c=c||0,i=(i||0)*a,[$,V].indexOf(n)>=0?{x:i,y:c}:{x:c,y:i}}s(cr,"distanceAndSkiddingToXY");function pr(e){var t=e.state,r=e.options,n=e.name,a=r.offset,o=a===void 0?[0,0]:a,c=rt.reduce(function(p,h){return p[h]=cr(h,t.rects,o),p},{}),i=c[t.placement],f=i.x,u=i.y;t.modifiersData.popperOffsets!=null&&(t.modifiersData.popperOffsets.x+=f,t.modifiersData.popperOffsets.y+=u),t.modifiersData[n]=c}s(pr,"offset");const ur={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:pr};function lr(e){var t=e.state,r=e.name;t.modifiersData[r]=ct({reference:t.rects.reference,element:t.rects.popper,strategy:"absolute",placement:t.placement})}s(lr,"popperOffsets");const dr={name:"popperOffsets",enabled:!0,phase:"read",fn:lr,data:{}};function vr(e){return e==="x"?"y":"x"}s(vr,"getAltAxis");function mr(e){var t=e.state,r=e.options,n=e.name,a=r.mainAxis,o=a===void 0?!0:a,c=r.altAxis,i=c===void 0?!1:c,f=r.boundary,u=r.rootBoundary,p=r.altBoundary,h=r.padding,b=r.tether,l=b===void 0?!0:b,x=r.tetherOffset,m=x===void 0?0:x,v=ce(t,{boundary:f,rootBoundary:u,padding:h,altBoundary:p}),w=N(t.placement),E=re(t.placement),A=!E,d=Be(w),y=vr(d),g=t.modifiersData.popperOffsets,O=t.rects.reference,C=t.rects.popper,R=typeof m=="function"?m(Object.assign({},t.rects,{placement:t.placement})):m,P=typeof R=="number"?{mainAxis:R,altAxis:R}:Object.assign({mainAxis:0,altAxis:0},R),D=t.modifiersData.offset?t.modifiersData.offset[t.placement]:null,k={x:0,y:0};if(g){if(o){var j,X=d==="y"?T:$,Y=d==="y"?M:V,B=d==="y"?"height":"width",W=g[d],le=W+v[X],z=W-v[Y],de=l?-C[B]/2:0,xe=E===Z?O[B]:C[B],ne=E===Z?-C[B]:-O[B],ve=t.elements.arrow,Q=l&&ve?$e(ve):{width:0,height:0},F=t.modifiersData["arrow#persistent"]?t.modifiersData["arrow#persistent"].padding:ot(),ae=F[X],me=F[Y],_=ie(0,O[B],Q[B]),Oe=A?O[B]/2-de-_-ae-P.mainAxis:xe-_-ae-P.mainAxis,ut=A?-O[B]/2+de+_+me+P.mainAxis:ne+_+me+P.mainAxis,Ee=t.elements.arrow&&ue(t.elements.arrow),lt=Ee?d==="y"?Ee.clientTop||0:Ee.clientLeft||0:0,Ve=(j=D==null?void 0:D[d])!=null?j:0,dt=W+Oe-Ve-lt,vt=W+ut-Ve,ke=ie(l?be(le,dt):le,W,l?J(z,vt):z);g[d]=ke,k[d]=ke-W}if(i){var We,mt=d==="x"?T:$,ht=d==="x"?M:V,G=g[y],he=y==="y"?"height":"width",Ne=G+v[mt],He=G-v[ht],Ae=[T,$].indexOf(w)!==-1,qe=(We=D==null?void 0:D[y])!=null?We:0,Ie=Ae?Ne:G-O[he]-C[he]-qe+P.altAxis,Fe=Ae?G+O[he]+C[he]-qe-P.altAxis:He,Ue=l&&Ae?Nt(Ie,G,Fe):ie(l?Ie:Ne,G,l?Fe:He);g[y]=Ue,k[y]=Ue-G}t.modifiersData[n]=k}}s(mr,"preventOverflow");const hr={name:"preventOverflow",enabled:!0,phase:"main",fn:mr,requiresIfExists:["offset"]};function yr(e){return{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}}s(yr,"getHTMLElementScroll");function gr(e){return e===S(e)||!L(e)?Se(e):yr(e)}s(gr,"getNodeScroll");function br(e){var t=e.getBoundingClientRect(),r=ee(t.width)/e.offsetWidth||1,n=ee(t.height)/e.offsetHeight||1;return r!==1||n!==1}s(br,"isElementScaled");function wr(e,t,r){r===void 0&&(r=!1);var n=L(t),a=L(t)&&br(t),o=U(t),c=te(e,a,r),i={scrollLeft:0,scrollTop:0},f={x:0,y:0};return(n||!n&&!r)&&((H(t)!=="body"||Me(o))&&(i=gr(t)),L(t)?(f=te(t,!0),f.x+=t.clientLeft,f.y+=t.clientTop):o&&(f.x=Le(o))),{x:c.left+i.scrollLeft-f.x,y:c.top+i.scrollTop-f.y,width:c.width,height:c.height}}s(wr,"getCompositeRect");function xr(e){var t=new Map,r=new Set,n=[];e.forEach(function(o){t.set(o.name,o)});function a(o){r.add(o.name);var c=[].concat(o.requires||[],o.requiresIfExists||[]);c.forEach(function(i){if(!r.has(i)){var f=t.get(i);f&&a(f)}}),n.push(o)}return s(a,"sort"),e.forEach(function(o){r.has(o.name)||a(o)}),n}s(xr,"order");function Or(e){var t=xr(e);return St.reduce(function(r,n){return r.concat(t.filter(function(a){return a.phase===n}))},[])}s(Or,"orderModifiers");function Er(e){var t;return function(){return t||(t=new Promise(function(r){Promise.resolve().then(function(){t=void 0,r(e())})})),t}}s(Er,"debounce");function Ar(e){var t=e.reduce(function(r,n){var a=r[n.name];return r[n.name]=a?Object.assign({},a,n,{options:Object.assign({},a.options,n.options),data:Object.assign({},a.data,n.data)}):n,r},{});return Object.keys(t).map(function(r){return t[r]})}s(Ar,"mergeByName");var Qe={placement:"bottom",modifiers:[],strategy:"absolute"};function Ze(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return!t.some(function(n){return!(n&&typeof n.getBoundingClientRect=="function")})}s(Ze,"areValidElements");function Pr(e){e===void 0&&(e={});var t=e,r=t.defaultModifiers,n=r===void 0?[]:r,a=t.defaultOptions,o=a===void 0?Qe:a;return s(function(i,f,u){u===void 0&&(u=o);var p={placement:"bottom",orderedModifiers:[],options:Object.assign({},Qe,o),modifiersData:{},elements:{reference:i,popper:f},attributes:{},styles:{}},h=[],b=!1,l={state:p,setOptions:s(function(w){var E=typeof w=="function"?w(p.options):w;m(),p.options=Object.assign({},o,p.options,E),p.scrollParents={reference:K(i)?se(i):i.contextElement?se(i.contextElement):[],popper:se(f)};var A=Or(Ar([].concat(n,p.options.modifiers)));return p.orderedModifiers=A.filter(function(d){return d.enabled}),x(),l.update()},"setOptions"),forceUpdate:s(function(){if(!b){var w=p.elements,E=w.reference,A=w.popper;if(Ze(E,A)){p.rects={reference:wr(E,ue(A),p.options.strategy==="fixed"),popper:$e(A)},p.reset=!1,p.placement=p.options.placement,p.orderedModifiers.forEach(function(P){return p.modifiersData[P.name]=Object.assign({},P.data)});for(var d=0;d<p.orderedModifiers.length;d++){if(p.reset===!0){p.reset=!1,d=-1;continue}var y=p.orderedModifiers[d],g=y.fn,O=y.options,C=O===void 0?{}:O,R=y.name;typeof g=="function"&&(p=g({state:p,options:C,name:R,instance:l})||p)}}}},"forceUpdate"),update:Er(function(){return new Promise(function(v){l.forceUpdate(),v(p)})}),destroy:s(function(){m(),b=!0},"destroy")};if(!Ze(i,f))return l;l.setOptions(u).then(function(v){!b&&u.onFirstUpdate&&u.onFirstUpdate(v)});function x(){p.orderedModifiers.forEach(function(v){var w=v.name,E=v.options,A=E===void 0?{}:E,d=v.effect;if(typeof d=="function"){var y=d({state:p,name:w,instance:l,options:A}),g=s(function(){},"noopFn");h.push(y||g)}})}s(x,"runModifierEffects");function m(){h.forEach(function(v){return v()}),h=[]}return s(m,"cleanupModifierEffects"),l},"createPopper")}s(Pr,"popperGenerator");var Rr=[Gt,dr,zt,Vt,ur,ir,hr,Ft,fr],Cr=Pr({defaultModifiers:Rr});const Dr={name:"sameWidth",enabled:!0,phase:"beforeWrite",requires:["computeStyles"],fn:({state:e})=>{e.styles.popper.width=`${e.rects.reference.width}px`},effect:({state:e})=>{const t=e.elements.reference;e.elements.popper.style.width=`${t.offsetWidth}px`}},jr={},Tr=s(()=>{},"noop"),De=s(({anchorEl:e,children:t,isSameWidth:r=!1,options:n=jr,className:a="",onClose:o=Tr})=>{const c=q.useRef(null),i=q.useRef(null),f=q.useRef(Pe(n,r));return q.useEffect(()=>{s(async()=>{c.current!=null&&(await c.current.setOptions(Pe(n,r)),await c.current.update())},"runUpdate")(),f.current=Pe(n,r)},[n,r]),q.useEffect(()=>{i.current!=null&&(c.current=Cr((e==null?void 0:e.current)??document.body,i.current,{strategy:"fixed",...f.current}))},[e]),q.useEffect(()=>()=>{var u;i.current!=null&&(document.body.removeChild(i.current),(u=c.current)==null||u.destroy(),c.current=null,i.current=null)},[]),xt(i,o,{capture:!0,excludedElemRefs:[e]}),et("div",{className:bt("cf-popover-content",a),ref:i,children:t})},"PopoverContent"),Pe=s((e,t=!1)=>{const r=((e==null?void 0:e.modifiers)??[]).concat(t?[Dr]:[]);return{...e,modifiers:r}},"calculateOptions");try{De.displayName="PopoverContent",De.__docgenInfo={description:"",displayName:"PopoverContent",props:{anchorEl:{defaultValue:null,description:"",name:"anchorEl",required:!1,type:{name:"RefObject<HTMLElement>"}},isSameWidth:{defaultValue:{value:"false"},description:"",name:"isSameWidth",required:!1,type:{name:"boolean"}},options:{defaultValue:{value:"{}"},description:"",name:"options",required:!1,type:{name:"Partial<Options>"}},className:{defaultValue:{value:""},description:"",name:"className",required:!1,type:{name:"string"}},onClose:{defaultValue:{value:"(): void => {}"},description:"",name:"onClose",required:!1,type:{name:"(() => void)"}}}}}catch{}const pt=100,$r=wt(`
  &.cf-opened {
    .cf-popover-content {
      opacity: 1;
    }
  }
  
  .cf-popover-content {
    z-index: 1099;
    transition: ${pt}ms opacity;
    opacity: 0;
    padding: 8px;
    border-radius: 8px;
    background: #ffffff;
    box-shadow: 0px 24px 38px 0px rgba(58, 71, 78, 0.10);
  }
`),Wr=s(({isOpen:e,...t})=>{const[r,n]=q.useState(),a=q.useRef(!1);return q.useEffect(()=>{if(!e||a.current)return;const o=document.createElement("div");o.className=$r,document.body.appendChild(o),n(o);const c=setTimeout(()=>{o.classList.add("cf-opened"),clearTimeout(c)},0);return()=>{o.classList.remove("cf-opened"),a.current=!0;const i=setTimeout(()=>{n(null),document.body.removeChild(o),a.current=!1,clearTimeout(i)},pt)}},[e]),r!=null?gt.createPortal(et(De,{...t}),r):null},"Popover");try{PopoverV2.displayName="PopoverV2",PopoverV2.__docgenInfo={description:"",displayName:"PopoverV2",props:{isOpen:{defaultValue:null,description:"",name:"isOpen",required:!0,type:{name:"boolean"}},anchorEl:{defaultValue:null,description:"",name:"anchorEl",required:!1,type:{name:"RefObject<HTMLElement>"}},isSameWidth:{defaultValue:null,description:"",name:"isSameWidth",required:!1,type:{name:"boolean"}},options:{defaultValue:null,description:"",name:"options",required:!1,type:{name:"Partial<Options>"}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}},onClose:{defaultValue:null,description:"",name:"onClose",required:!1,type:{name:"(() => void)"}}}}}catch{}export{Wr as P};
//# sourceMappingURL=index-1d92391b.js.map
