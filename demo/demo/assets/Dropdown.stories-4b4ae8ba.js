var L=Object.defineProperty;var a=(o,t)=>L(o,"name",{value:t,configurable:!0});import{r as b}from"./index-13f3a07b.js";import{c as i,A as D,M as _,S as w}from"./Props-42e8e9cb.js";import{a as y,j as n}from"./jsx-runtime-d0e2239a.js";import"./es.promise.resolve-04d58763.js";import"./index-3e51028f.js";import{D as d,a as C}from"./index-61afbe0e.js";import{r as N}from"./index-77fd1cfa.js";import{a as E}from"./ui-6e300fc6.js";import{m as S}from"./Paper-d6f10473.js";import"./_commonjsHelpers-df0bf62c.js";import"./iframe-1e31e50d.js";import"./preload-helper-d51aff73.js";import"./index-32ac9e7b.js";import"./index-a2fa05d1.js";import"./_commonjs-dynamic-modules-fefbfc1c.js";import"./index-681e4b07-43c39e59.js";import"./index-aa905caf.js";import"./string-d2fe5096.js";import"./index-1f100651.js";import"./index-d5fbfd5b.js";import"./useClickOutside-38d34b76.js";import"./index-79c39802.js";import"./index-4cb24bae.js";const v=S({root:{"& .cf-dropdown-add-item":{cursor:"pointer",userSelect:"none"}}}),u=a(({title:o,onClick:t})=>n("li",{className:"cf-dropdown-add-item MuiAutocomplete-option",role:"option",onClick:t,children:o}),"AddItemButton"),m=a(o=>{const t=v(),{children:s,...e}=o,r=E(e.className,t.root),x=b.useCallback(g=>{console.info("onClick :: ",g)},[]);return y("div",{...e,className:r,children:[n(u,{title:"+ Add Vendor",onClick:x}),n(u,{title:"+ Add Customer",onClick:x}),s]})},"CustomListbox"),c=a(()=>{const[o,t]=b.useState(null),s=N(1,20).map(e=>({id:e,name:`Item #${e}`}));return y("div",{children:[n("div",{style:{width:"180px",marginBottom:30},children:n(d,{id:"custom-listbox-demo",onChange:(e,r)=>t(r),value:o,label:"Item #",options:s,ListboxComponent:m,NoOptionsComponent:m,isExtendedListbox:!0})}),n("div",{style:{width:"220px",marginBottom:30},children:n(d,{id:"custom-listbox-demo",onChange:(e,r)=>t(r),value:o,label:"Item #",options:s,ListboxComponent:m,NoOptionsComponent:m,isExtendedListbox:!0})}),n("div",{style:{width:"380px",marginBottom:30},children:n(d,{id:"custom-listbox-demo",onChange:(e,r)=>t(r),value:o,label:"Item #",options:s,ListboxComponent:m,NoOptionsComponent:m,isExtendedListbox:!0})}),n("div",{style:{width:"500px",marginBottom:30},children:n(d,{id:"custom-listbox-demo",onChange:(e,r)=>t(r),value:o,label:"Item #",options:s,ListboxComponent:m,NoOptionsComponent:m,isExtendedListbox:!0})})]})},"CustomListboxDemo");try{c.displayName="CustomListboxDemo",c.__docgenInfo={description:"",displayName:"CustomListboxDemo",props:{}}}catch{}function l(){return l=Object.assign?Object.assign.bind():function(o){for(var t=1;t<arguments.length;t++){var s=arguments[t];for(var e in s)Object.prototype.hasOwnProperty.call(s,e)&&(o[e]=s[e])}return o},l.apply(this,arguments)}a(l,"_extends");const M={},O="wrapper";function h({components:o,...t}){return i(O,l({},M,t,{components:o,mdxType:"MDXLayout"}),i(_,{title:"Dropdown",component:C,mdxType:"Meta"}),i("p",null,"A simple Dropdown component."),i(w,{name:"Basic example",mdxType:"Story"},i(c,{mdxType:"CustomListboxDemo"})))}a(h,"MDXContent");h.isMDXComponent=!0;const f=a(()=>i(c,null),"basicExample");f.storyName="Basic example";f.parameters={storySource:{source:"<CustomListboxDemo />"}};const p={title:"Dropdown",component:C,includeStories:["basicExample"]},A={"Basic example":"basicExample"};p.parameters=p.parameters||{};p.parameters.docs={...p.parameters.docs||{},page:()=>i(D,{mdxStoryNameToKey:A,mdxComponentAnnotations:p},i(h,null))};const eo=["basicExample"];export{eo as __namedExportsOrder,f as basicExample,p as default};
//# sourceMappingURL=Dropdown.stories-4b4ae8ba.js.map