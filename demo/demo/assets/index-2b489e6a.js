var K=Object.defineProperty;var u=(e,a)=>K(e,"name",{value:a,configurable:!0});import{r}from"./index-13f3a07b.js";import{r as Z}from"./index-d5fbfd5b.js";import{C as U}from"./CloseIcon-19d53071.js";import{I as F}from"./index-c999a0f8.js";import{a as M,j as l}from"./jsx-runtime-d0e2239a.js";import{L as G}from"./index-79c39802.js";import{c as H,a as J}from"./ui-6e300fc6.js";function Q(e){const{isDraggable:a,constraintId:s,targetPadding:n=0,transform:o}=e,w=r.useRef(!1),f=r.useRef(null),$=r.useRef(null),d=r.useRef({startX:0,startY:0,lastX:0,lastY:0});return r.useEffect(()=>{if(!a)return;const i=document.getElementById(s),t=f.current,q=i??document.body,m=$.current;if(t==null)throw new Error("Element with given id does not exist");if(m==null)throw new Error("Element with given id does not exist");if(q==null)throw new Error("Element with given id does not exist");const p=q.getBoundingClientRect(),g=p.left-n,y=p.top-n;let h=y,L=g;o!=null&&(o.x!=null&&(L=o.x),o.y!=null&&(h=o.y)),t.style.top=`${h}px`,t.style.left=`${L}px`,d.current.lastX=t.offsetLeft,d.current.lastY=t.offsetTop;const N=u(v=>{w.current=!0,d.current.startX=v.clientX,d.current.startY=v.clientY},"onMouseDown"),x=u(()=>{w.current=!1,d.current.lastX=t.offsetLeft,d.current.lastY=t.offsetTop},"onMouseUp"),V=u(v=>{if(!w.current)return;const I=v.clientX-d.current.startX+d.current.lastX,E=v.clientY-d.current.startY+d.current.lastY;let C=I,b=E;const T=g,_=p.right-t.offsetWidth+n,B=y,c=p.bottom-t.offsetHeight+n;I<T?C=T:I>_&&(C=_),E<B?b=B:E>c&&(b=c),t.style.top=`${b}px`,t.style.left=`${C}px`},"onMouseMove");return m.addEventListener("mousedown",N),m.addEventListener("mouseup",x),t.addEventListener("mouseup",x),t.addEventListener("mousemove",V),t.addEventListener("mouseleave",x),u(()=>{m.removeEventListener("mousedown",N),m.removeEventListener("mouseup",x),t.removeEventListener("mouseup",x),t.removeEventListener("mousemove",V),t.removeEventListener("mouseleave",x)},"cleanup")},[a,s,n,o]),{targetRef:f,draggableRef:$}}u(Q,"useDragger");const X=u(()=>M("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[l("g",{clipPath:"url(#clip0_46016_67110)",children:l("path",{d:"M19 9H5C4.45 9 4 9.45 4 10C4 10.55 4.45 11 5 11H19C19.55 11 20 10.55 20 10C20 9.45 19.55 9 19 9ZM5 15H19C19.55 15 20 14.55 20 14C20 13.45 19.55 13 19 13H5C4.45 13 4 13.45 4 14C4 14.55 4.45 15 5 15Z",fill:"black",fillOpacity:"0.3"})}),l("defs",{children:l("clipPath",{id:"clip0_46016_67110",children:l("rect",{width:"24",height:"24",fill:"white"})})})]}),"DragIcon");try{X.displayName="DragIcon",X.__docgenInfo={description:"",displayName:"DragIcon",props:{}}}catch{}const W=u((e,a=0)=>{window.requestAnimationFrame(()=>{setTimeout(e,a)})},"delay"),j=225,ee=680,D=480,O=16,z=`
  min-height: 100vh;
  border-radius: unset;
  box-shadow: unset;
`,te=`
  border-radius: 12px;
  box-shadow: 0px 0px 8px 5px rgb(0 0 0 / 2%), 0px 10px 16px rgb(0 0 0 / 8%), 0px 6px 30px rgb(0 0 0 / 3%);
`,ne=`
  position: fixed;
  inset: 0px;
  background-color: rgba(0, 0, 0, 0.5);
`,ae=`
z-index: 1300;
`,oe=`
  position: fixed;
  inset: 0px;
`,S=u((e,a,s)=>a===!0?`max(100vw, ${e??0}px)`:e!=null?s===!0?"min-content":`${e}px`:"auto","geMinWidth"),le=u(({isFullscreen:e=!1,maxWidth:a=ee,minWidth:s,isDraggable:n=!1,withTitle:o})=>H(`
  opacity: 0;
  ${n?"":oe}
  transition: opacity ${j}ms cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  justify-content: center;

  &.cf-modal-appeared {
    opacity: 1;
  }

  .cf-modal-backdrop {
    z-index: -1;
    ${n?"":ne}
  }

  .cf-modal-content-scroll-wrapper {
    overflow: auto;
    width: ${S(s,e,!0)};
    position: ${n?"fixed":"relative"};
    display: flex;
    ${e?"":`padding: ${O}px;`}
    ${n?ae:""}
  }

  .cf-modal-root {
    ${e?z:te}
    position: relative;
    min-width: ${S(s,e)};
    margin: auto;
    width: 100%;
    max-width: ${a>=(s??0)?`${a}px`:"unset"};
    box-sizing: border-box;
    padding: 0px 0px 40px;
    background: #fff;
    overflow-y: auto;

    @media (max-width: ${D}px) {
      max-width: unset;
      min-width: 100vw;
      padding: 0px;
      margin: 0px auto;
      ${z}
    }

    :focus {
      outline: 0px;
    }
  }

  .cf-modal-title {
    display: grid;
    grid-template-columns: ${n?"30px 1fr 36px":"1fr 36px"};
    align-items: center;
    grid-column-gap: 16px;
    padding: 40px 40px 0px;
    cursor: ${n?"move":"default"};

    p, h6, h5, h4, h3, h2, h1, span {
      font-size: 34px;
      line-height: 36px;
      font-family: Roboto, sans-serif;
      font-weight: 400;
      margin: 0px;
    }

    @media (max-width: ${D}px) {
      padding: 20px;
      position: relative;

      p, h6, h5, h4, h3, h2, h1, span {
        font-size: 20px;
        line-height: 20px;
      }
    }

    .cf-icon-button {
      position: relative;
      width: 36px;
      height: 36px;
      align-self: flex-start;
      background: transparent;
      transition: .4s ease;
      
      :hover {
        background: rgb(240, 240, 240);
      }
    }
  }

  .cf-modal-content {
    margin: 0px auto;
    background: #fff;
    padding: ${o===!0?"32px 40px 0;":"40px 40px 0;"}

    @media (max-width: ${D}px) {
      padding: 0px 16px;
    }

    > .cf-loader {
      position: absolute;
      inset: 0;
      z-index: 100;
      background: rgba(255, 255, 255, 0.75);
    }
  }

  .cf-modal-footer {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 24px;
    margin-top: 48px;
    box-sizing: border-box;

    @media (max-width: ${D}px) {
      padding: 0px 16px;
    }
  }
`),"rootStyles"),re="Escape",Y=u(({children:e,className:a,closeByEsc:s=!0,closeByBackdropClick:n=!0,dataTestId:o="modal-window",isFullscreen:w=!1,isOpen:f=!0,keepContentMounted:$=!0,isLoading:d,onClose:i,isCloseIconVisible:t=i!=null,maxWidth:q,minWidth:m,renderFooterActions:p,title:g,isStopOverflow:y=!1,isDraggable:h=!1,constraintId:L="",titleDataTestId:N,transform:x})=>{const V=r.useRef(null),R=g!=null||t,v=p!=null,I=r.useMemo(()=>le({isFullscreen:w,maxWidth:q,minWidth:m,isDraggable:h,withTitle:R}),[w,q,m,h,R]),{targetRef:E,draggableRef:C}=Q({isDraggable:h,constraintId:L,targetPadding:O,transform:x});r.useEffect(()=>{V.current!=null&&W(()=>{var k;const P=f?"add":"remove";(k=V.current)==null||k.classList[P]("cf-modal-appeared")})},[f]),r.useEffect(()=>{var k;let c,P;return f&&((k=E.current)==null||k.focus(),y&&(c=document.body.style.overflow,P=document.body.style.paddingRight,document.body.style.paddingRight="6px",document.body.style.overflow="hidden")),()=>{y&&(document.body.style.overflow=c??"auto",document.body.style.paddingRight=P??"0px")}},[f,y]);const b=r.useCallback((c="closeIconClick")=>{if(typeof c=="object"){i==null||i("closeIconClick");return}y&&(document.body.style.overflow="auto",document.body.style.paddingRight="6px"),i==null||i(c)},[i,y]),T=r.useCallback(()=>{i==null||i("closeIconClick")},[i]),_=r.useCallback(()=>{n&&b("backdropClick")},[b,n]),B=r.useCallback(c=>{s&&c.key===re&&b("escapeKeyDown")},[b,s]);return M("div",{className:J(I,a,"cf-modal-container"),ref:V,children:[l("div",{className:"cf-modal-backdrop",onClick:_}),l("div",{className:"cf-modal-content-scroll-wrapper",ref:E,children:M("div",{role:"dialog",className:"cf-modal-root","data-test-id":o,onKeyDown:B,tabIndex:-1,children:[R&&M("div",{className:"cf-modal-title",ref:C,"data-test-id":N,children:[h&&l(X,{}),g!=null?typeof g=="string"?l("h3",{children:g}):g:l("div",{}),t&&l(F,{"aria-label":"close","data-test-id":"modal-btn-x",onClick:T,children:l(U,{})})]}),M("div",{className:"cf-modal-content",children:[d===!0&&l(G,{size:"large"}),f||$?e:null]}),v&&l("div",{className:"cf-modal-footer",children:p==null?void 0:p()})]})})]})},"Modal$1");try{Y.displayName="Modal",Y.__docgenInfo={description:"",displayName:"Modal",props:{className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}},closeByEsc:{defaultValue:{value:"true"},description:"",name:"closeByEsc",required:!1,type:{name:"boolean"}},closeByBackdropClick:{defaultValue:{value:"true"},description:"",name:"closeByBackdropClick",required:!1,type:{name:"boolean"}},dataTestId:{defaultValue:{value:"modal-window"},description:"",name:"dataTestId",required:!1,type:{name:"string"}},isCloseIconVisible:{defaultValue:{value:"_onClose != null"},description:"",name:"isCloseIconVisible",required:!1,type:{name:"boolean"}},isFullscreen:{defaultValue:{value:"false"},description:"",name:"isFullscreen",required:!1,type:{name:"boolean"}},isOpen:{defaultValue:{value:"true"},description:"",name:"isOpen",required:!1,type:{name:"boolean"}},keepContentMounted:{defaultValue:{value:"true"},description:"",name:"keepContentMounted",required:!1,type:{name:"boolean"}},isLoading:{defaultValue:null,description:"",name:"isLoading",required:!1,type:{name:"boolean"}},maxWidth:{defaultValue:null,description:"",name:"maxWidth",required:!1,type:{name:"number"}},minWidth:{defaultValue:null,description:"",name:"minWidth",required:!1,type:{name:"number"}},onClose:{defaultValue:null,description:"",name:"onClose",required:!1,type:{name:"((reason: MouseEvent | ModalCloseReason) => void)"}},renderFooterActions:{defaultValue:null,description:"",name:"renderFooterActions",required:!1,type:{name:"(() => ReactNode)"}},title:{defaultValue:null,description:"",name:"title",required:!1,type:{name:"ReactNode"}},titleDataTestId:{defaultValue:null,description:"",name:"titleDataTestId",required:!1,type:{name:"string"}},isDraggable:{defaultValue:{value:"false"},description:"",name:"isDraggable",required:!1,type:{name:"boolean"}},isStopOverflow:{defaultValue:{value:"false"},description:"",name:"isStopOverflow",required:!1,type:{name:"boolean"}},constraintId:{defaultValue:{value:""},description:"",name:"constraintId",required:!1,type:{name:"string"}},transform:{defaultValue:null,description:"",name:"transform",required:!1,type:{name:"{ x?: number; y?: number; } | undefined"}}}}}catch{}const ie=H(`
  z-index: 1300;
  position: fixed;
  inset: 0px;
  backdrop-filter: blur(7px);
`),A=u(e=>{const[a,s]=r.useState(null);return r.useEffect(()=>{if(e.isOpen!==!0)return;const n=document.body.style.overflow??"",o=document.createElement("div");return e.isDraggable!==!0&&o.classList.add(ie),o.setAttribute("role","presentation"),document.body.appendChild(o),s(o),()=>{document.body.style.overflow=n,W(()=>document.body.removeChild(o),j)}},[e.isOpen]),a==null?null:Z.createPortal(l(Y,{...e}),a)},"Modal");try{A.displayName="Modal",A.__docgenInfo={description:"",displayName:"Modal",props:{className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}},closeByEsc:{defaultValue:null,description:"",name:"closeByEsc",required:!1,type:{name:"boolean"}},closeByBackdropClick:{defaultValue:null,description:"",name:"closeByBackdropClick",required:!1,type:{name:"boolean"}},dataTestId:{defaultValue:null,description:"",name:"dataTestId",required:!1,type:{name:"string"}},isCloseIconVisible:{defaultValue:null,description:"",name:"isCloseIconVisible",required:!1,type:{name:"boolean"}},isFullscreen:{defaultValue:null,description:"",name:"isFullscreen",required:!1,type:{name:"boolean"}},isOpen:{defaultValue:null,description:"",name:"isOpen",required:!1,type:{name:"boolean"}},keepContentMounted:{defaultValue:null,description:"",name:"keepContentMounted",required:!1,type:{name:"boolean"}},isLoading:{defaultValue:null,description:"",name:"isLoading",required:!1,type:{name:"boolean"}},maxWidth:{defaultValue:null,description:"",name:"maxWidth",required:!1,type:{name:"number"}},minWidth:{defaultValue:null,description:"",name:"minWidth",required:!1,type:{name:"number"}},onClose:{defaultValue:null,description:"",name:"onClose",required:!1,type:{name:"((reason: MouseEvent | ModalCloseReason) => void)"}},renderFooterActions:{defaultValue:null,description:"",name:"renderFooterActions",required:!1,type:{name:"(() => ReactNode)"}},title:{defaultValue:null,description:"",name:"title",required:!1,type:{name:"ReactNode"}},titleDataTestId:{defaultValue:null,description:"",name:"titleDataTestId",required:!1,type:{name:"string"}},isDraggable:{defaultValue:null,description:"",name:"isDraggable",required:!1,type:{name:"boolean"}},isStopOverflow:{defaultValue:null,description:"",name:"isStopOverflow",required:!1,type:{name:"boolean"}},constraintId:{defaultValue:null,description:"",name:"constraintId",required:!1,type:{name:"string"}},transform:{defaultValue:null,description:"",name:"transform",required:!1,type:{name:"{ x?: number; y?: number; } | undefined"}}}}}catch{}export{A as M};
//# sourceMappingURL=index-2b489e6a.js.map
