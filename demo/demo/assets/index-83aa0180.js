var W=Object.defineProperty;var s=(e,t)=>W(e,"name",{value:t,configurable:!0});import{r as g}from"./index-13f3a07b.js";import{r as D}from"./index-d5fbfd5b.js";import{c as k,a as q}from"./ui-6e300fc6.js";import{u as w}from"./useClickOutside-38d34b76.js";import{b as U}from"./_MapCache-7e836c94.js";import{t as F,n as P,b as B}from"./now-f5237b2a.js";import{j as Y}from"./jsx-runtime-d0e2239a.js";const I="top",V="bottom",b="center",M="left",H="right",X={vertical:V,horizontal:b},j={vertical:I,horizontal:M},$={x:0,y:0},z={capture:!1},G=200,K=s(()=>{},"noop"),Z=s(({vertical:e,horizontal:t,maxHeight:o,anchorRect:{x:i,y:a,height:r,width:u},x:n,y:c,minWidth:f,portalWidth:d})=>{let m=o;const{scrollX:p,scrollY:T,innerHeight:O,innerWidth:h}=window,_=s(()=>{y=0,E=p+i+n},"setLeftPlacement");let C=T+a+r+c,E=p+i+n+u/2,y="-50%";if(e===I&&(C=T+a+c),t===M&&_(),t===H&&(E=p+i+u+n,y="-100%"),t===b){const N=E-p+d/2>h,x=E-d/2<0;N&&(E=h+p,y="-100%"),x&&_()}return m==null&&(m=O-C+T),{top:C,left:E,translateX:y,maxHeight:m,minWidth:f}},"calculateConfig"),J=s(({vertical:e,horizontal:t,x:o,y:i,...a})=>{let r="auto",u="auto",n="auto",c="auto",f=0,d=0;return e===I&&(r=i),e===b&&(r="50%",d="-50%"),e===V&&(u=i),t===M&&(n=o),t===H&&(c=o),t===b&&(n="50%",f="-50%"),{top:r,bottom:u,left:n,right:c,translateX:f,translateY:d,position:"fixed",...a}},"calculateConfigWithoutAnchor");var Q="Expected a function",ee=Math.max,te=Math.min;function ne(e,t,o){var i,a,r,u,n,c,f=0,d=!1,m=!1,p=!0;if(typeof e!="function")throw new TypeError(Q);t=F(t)||0,U(o)&&(d=!!o.leading,m="maxWait"in o,r=m?ee(F(o.maxWait)||0,t):r,p="trailing"in o?!!o.trailing:p);function T(l){var v=i,A=a;return i=a=void 0,f=l,u=e.apply(A,v),u}s(T,"invokeFunc");function O(l){return f=l,n=setTimeout(C,t),d?T(l):u}s(O,"leadingEdge");function h(l){var v=l-c,A=l-f,S=t-v;return m?te(S,r-A):S}s(h,"remainingWait");function _(l){var v=l-c,A=l-f;return c===void 0||v>=t||v<0||m&&A>=r}s(_,"shouldInvoke");function C(){var l=P();if(_(l))return E(l);n=setTimeout(C,h(l))}s(C,"timerExpired");function E(l){return n=void 0,p&&i?T(l):(i=a=void 0,u)}s(E,"trailingEdge");function y(){n!==void 0&&clearTimeout(n),f=0,i=c=a=n=void 0}s(y,"cancel");function N(){return n===void 0?u:E(P())}s(N,"flush");function x(){var l=P(),v=_(l);if(i=arguments,a=this,c=l,v){if(n===void 0)return O(c);if(m)return clearTimeout(n),n=setTimeout(C,t),T(c)}return n===void 0&&(n=setTimeout(C,t)),u}return s(x,"debounced"),x.cancel=y,x.flush=N,x}s(ne,"debounce");function oe(e,t){return B(e,t)}s(oe,"isEqual");const re=s(e=>{const t=g.useRef(e),o=g.useRef(e==null?void 0:e.getBoundingClientRect()),[i,a]=g.useState(e==null?void 0:e.getBoundingClientRect());return g.useEffect(()=>{t.current=e},[e]),g.useEffect(()=>{const r=ne(()=>{var n;const u=(n=t.current)==null?void 0:n.getBoundingClientRect();oe(o.current,u)||(o.current=u,a(u))},G);return window.addEventListener("resize",r),()=>{window.removeEventListener("resize",r)}},[]),i},"useAnchorElRect"),ie=s(({onClose:e=K,transform:t,placement:o,anchorEl:i,maxHeight:a,minWidth:r,outsideClickConfig:u={}})=>{const n=g.useRef(document.createElement("div")),[c,f]=g.useState(0);w(n,e,{...z,...u}),g.useEffect(()=>{document.body.appendChild(n.current);const{width:p}=n.current.getBoundingClientRect();return f(p),()=>{document.body.removeChild(n.current)}},[]);const d=re(i),m=g.useMemo(()=>d==null?J({...$,...t,...j,...o,maxHeight:a,minWidth:r}):Z({...$,...t,...X,...o,anchorRect:d,maxHeight:a,minWidth:r,portalWidth:c}),[a,o,t,c,d,r]);return{popover:n.current,config:m}},"usePopover"),ae=s(e=>{const[t,o]=g.useState(!1),[i,a]=g.useState(!1);return g.useEffect(()=>{let r;return e?(o(!0),r=setTimeout(()=>{a(!0)},100)):(a(!1),r=setTimeout(()=>{o(!1)},500)),()=>{clearTimeout(r)}},[e]),{isOpen:t,isAnimatedOpen:i}},"useAnimatedToggle"),R=s(e=>typeof e=="string"&&isNaN(Number(e))?e:`${e??0}px`,"getStylesValue"),se=s(({position:e="absolute",top:t="auto",left:o="auto",bottom:i="auto",right:a="auto",translateX:r=0,translateY:u=0,maxHeight:n="auto",minWidth:c="auto"})=>{const f=R(t),d=R(i),m=R(o),p=R(a),T=R(r),O=R(u),h=R(n);return k(`
    position: ${e};
    top: ${f};
    bottom: ${d};
    left: ${m};
    right: ${p};
    overflow: hidden;
    overflow-y: auto;
    background: #FFFFFF;
    box-shadow: 0px 24px 38px rgba(58, 71, 78, 0.1);
    border-radius: 12px;
    z-index: 10000;
    max-height: ${h};
    transform: translate(${T}, ${O});
    width: max-content;
    ${c!=null?`min-width: ${c==="auto"?"auto":`${c}px`};`:""}
  `)},"createRootStyles"),ue=k(`
  opacity: 0;
  transition: opacity .5s, left 0.2s;
  transition-delay: opacity .2s;
  
  &.cf-animated-open {
    opacity: 1;
  }
`),ce=s(e=>({open:t,className:o,...i})=>{const{isOpen:a,isAnimatedOpen:r}=ae(t);return a?Y(e,{className:q(ue,r?"cf-animated-open":"",o),...i}):null},"PopoverHOC"),L=s(({children:e,className:t,...o})=>{const{popover:i,config:a}=ie(o),r=g.useMemo(()=>se(a),[a]);return i.className=q(r,t),D.createPortal(e,i)},"Popover"),Ce=ce(L);try{L.displayName="Popover",L.__docgenInfo={description:"",displayName:"Popover",props:{anchorEl:{defaultValue:null,description:"",name:"anchorEl",required:!1,type:{name:"HTMLElement | null"}},open:{defaultValue:null,description:"",name:"open",required:!0,type:{name:"boolean"}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}},onClose:{defaultValue:null,description:"",name:"onClose",required:!1,type:{name:"(() => void)"}},placement:{defaultValue:null,description:"",name:"placement",required:!1,type:{name:"Partial<PlacementProps>"}},transform:{defaultValue:null,description:"",name:"transform",required:!1,type:{name:"Partial<Coords>"}},maxHeight:{defaultValue:null,description:"",name:"maxHeight",required:!1,type:{name:'number | "auto"'}},minWidth:{defaultValue:null,description:"",name:"minWidth",required:!1,type:{name:"number"}},outsideClickConfig:{defaultValue:null,description:"",name:"outsideClickConfig",required:!1,type:{name:"UseOutsideClickConfig"}}}}}catch{}export{Ce as P};
//# sourceMappingURL=index-83aa0180.js.map