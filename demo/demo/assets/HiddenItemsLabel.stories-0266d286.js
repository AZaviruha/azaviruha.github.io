var M=Object.defineProperty;var n=(t,o)=>M(t,"name",{value:o,configurable:!0});import{r as m,R as h}from"./index-13f3a07b.js";import{c as e,A as S,S as x,M as E}from"./Props-42e8e9cb.js";import{j as f,a as v,F as H}from"./jsx-runtime-d0e2239a.js";import"./es.promise.resolve-04d58763.js";import"./index-3e51028f.js";import{P as C}from"./index-83aa0180.js";import{c as g,a as y}from"./ui-6e300fc6.js";import"./_commonjsHelpers-df0bf62c.js";import"./iframe-1e31e50d.js";import"./preload-helper-d51aff73.js";import"./index-32ac9e7b.js";import"./index-a2fa05d1.js";import"./_commonjs-dynamic-modules-fefbfc1c.js";import"./index-681e4b07-43c39e59.js";import"./index-aa905caf.js";import"./string-d2fe5096.js";import"./index-d5fbfd5b.js";import"./useClickOutside-38d34b76.js";import"./_MapCache-7e836c94.js";import"./isArray-6de4a062.js";import"./now-f5237b2a.js";import"./_getTag-9b3eabd6.js";import"./isSymbol-3167caec.js";const O="/assets/black_down_arrow-d758e54a.svg",A=g(`
  display: inline-flex;
  align-items: center;
  padding: 2px 8px 2px 8px;
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #212121; 
  line-height: 16px;
  font-weight: 400;
  font-size: 12px;
  color: #212121;
  
  img {
    margin-left: 8px;
  }
`),T=g(`
  padding: 16px;
`),W=184,a=n(({text:t,content:o=null,className:s="",popoverProps:r={},icon:p=null})=>{const[d,c]=m.useState(null),I=m.useCallback(({currentTarget:P})=>{c(P)},[]),N=m.useCallback(()=>{c(null)},[]),u=o!=null,L=m.useMemo(()=>p??f("img",{src:O,alt:"down_arrow"}),[p]);return v(H,{children:[t!=null&&v("p",{className:y(A,s),onMouseOver:I,onMouseLeave:N,children:[t,u&&L]}),u&&f(C,{open:d!=null,anchorEl:d,minWidth:W,className:y(T,(r==null?void 0:r.className)??""),...r,children:o})]})},"HiddenItemsLabel");try{a.displayName="HiddenItemsLabel",a.__docgenInfo={description:"",displayName:"HiddenItemsLabel",props:{text:{defaultValue:null,description:"",name:"text",required:!0,type:{name:"string"}},icon:{defaultValue:{value:"null"},description:"",name:"icon",required:!1,type:{name:"ReactNode"}},content:{defaultValue:{value:"null"},description:"",name:"content",required:!1,type:{name:"ReactNode"}},popoverProps:{defaultValue:{value:"{}"},description:"",name:"popoverProps",required:!1,type:{name:'Omit<PopoverProps, "onClose" | "anchorEl" | "open">'}},className:{defaultValue:{value:""},description:"",name:"className",required:!1,type:{name:"string"}}}}}catch{}function l(){return l=Object.assign?Object.assign.bind():function(t){for(var o=1;o<arguments.length;o++){var s=arguments[o];for(var r in s)Object.prototype.hasOwnProperty.call(s,r)&&(t[r]=s[r])}return t},l.apply(this,arguments)}n(l,"_extends");const V={},j="wrapper";function _({components:t,...o}){return e(j,l({},V,o,{components:t,mdxType:"MDXLayout"}),e(E,{title:"Hidden items label",mdxType:"Meta"}),e(x,{name:"Without popover",mdxType:"Story"},e(a,{text:"+2 more items",mdxType:"HiddenItemsLabel"})),e(x,{name:"With popover",mdxType:"Story"},e(a,{text:"+2 more items",content:e(h.Fragment,null,e("div",null,"Item 1"),e("div",null,"Item 2")),mdxType:"HiddenItemsLabel"})))}n(_,"MDXContent");_.isMDXComponent=!0;const b=n(()=>e(a,{text:"+2 more items"}),"withoutPopover");b.storyName="Without popover";b.parameters={storySource:{source:"<HiddenItemsLabel text='+2 more items' />"}};const w=n(()=>e(a,{text:"+2 more items",content:e(h.Fragment,null,e("div",null,"Item 1"),e("div",null,"Item 2"))}),"withPopover");w.storyName="With popover";w.parameters={storySource:{source:`<HiddenItemsLabel text='+2 more items' content={<>
        <div>Item 1</div>
        <div>Item 2</div>
      </>} />`}};const i={title:"Hidden items label",includeStories:["withoutPopover","withPopover"]},R={"Without popover":"withoutPopover","With popover":"withPopover"};i.parameters=i.parameters||{};i.parameters.docs={...i.parameters.docs||{},page:()=>e(S,{mdxStoryNameToKey:R,mdxComponentAnnotations:i},e(_,null))};const le=["withoutPopover","withPopover"];export{le as __namedExportsOrder,i as default,w as withPopover,b as withoutPopover};
//# sourceMappingURL=HiddenItemsLabel.stories-0266d286.js.map
