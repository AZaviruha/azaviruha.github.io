var O=Object.defineProperty;var n=(e,t)=>O(e,"name",{value:t,configurable:!0});import{r as o}from"./index-13f3a07b.js";import{c as l,A as D,M as A,S as P}from"./Props-42e8e9cb.js";import{a as p,j as u}from"./jsx-runtime-d0e2239a.js";import"./es.promise.resolve-04d58763.js";import"./index-3e51028f.js";import{B as v}from"./index-48c9bdec.js";import{c as I}from"./ui-6e300fc6.js";import"./styles-8f60b454.js";import"./_commonjsHelpers-df0bf62c.js";import"./iframe-1e31e50d.js";import"./preload-helper-d51aff73.js";import"./index-32ac9e7b.js";import"./index-a2fa05d1.js";import"./_commonjs-dynamic-modules-fefbfc1c.js";import"./index-681e4b07-43c39e59.js";import"./index-aa905caf.js";import"./string-d2fe5096.js";import"./index-79c39802.js";import"./ripple-dd5edb05.js";const w=n(()=>{const e={},t=new Promise((r,s)=>{e.resolve=r,e.reject=s});return e.promise=t,e},"defer"),h=n(()=>{const[e,t]=o.useState(0),r=o.useRef(w()),s=o.useCallback(()=>{r.current=w(),t(c=>c+1)},[]),a=o.useCallback(c=>{var d,m;(m=(d=r.current).resolve)==null||m.call(d,c)},[]),i=o.useCallback(async()=>await r.current.promise,[]);return o.useMemo(()=>({getResult:i,send:s,signal:{triggers:e,respond:a}}),[i,e,a,s])},"useCommand");var C=(e=>(e.Ok="Ok",e.Fail="Fail",e))(C||{});const j=n(e=>({kind:C.Fail,result:e}),"fail"),q=n(e=>({kind:C.Ok,result:e}),"ok"),R=n(e=>(e==null?void 0:e.kind)===C.Ok,"isOk"),S=n((e,t)=>{const r=o.useRef(e.triggers),s=o.useRef(t);o.useEffect(()=>{const a=n(async()=>{try{const i=await s.current();e.respond(q(i))}catch(i){e.respond(j(i))}},"runEffect");e.triggers>r.current&&(r.current++,a())},[e.triggers,e.respond]),o.useEffect(()=>{s.current=t},[t])},"useCommandListener"),T=I(`
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  background-color: rgba(51, 153, 204, 0.3);
  padding: 16px;
  padding-top: 48px;
  position: relative;
  margin-top: 10px;

  .block-label {
    position: absolute;
    padding: 4px 8px;
    top: -16px;
    left: -10px;
    border: 1px solid gray;
    border-radius: 4px;
    background-color: yellow;
    width: fit-content;

    &.right {
      left: unset;
      right: -10px;
    }
  }

  .computation-worker {
    position: relative;
    border: 1px solid gray;
    border-radius: 4px;
    padding: 24px;
    margin-bottom: 48px;

    label {
      margin-right: 16px;
    }

    progress {
      -webkit-appearance: none;
       appearance: none;

      border-radius: 7px; 
      width: 80%;
      height: 22px;
      box-shadow: 1px 1px 4px rgba( 0, 0, 0, 0.2 );
    }

    progress::-webkit-progress-bar {
      background-color: lightgreen;
      border-radius: 7px;
    }

    progress::-webkit-progress-value {
      background-color: rebeccapurple;
      border-radius: 7px;
    }

  }

  .result {
    margin-top: 24px;
  }

  .action-buttons {
    display: flex;
    margin-top: 24px;

    .cf-button-root {
      margin-right: 24px;
    }
  }
`),N=100,_="not started",f=n(()=>{const e=h(),t=h(),r=h(),[s,a]=o.useState(_),[i,c]=o.useState(!1),d=o.useCallback(async()=>{c(!0),a("in prgress"),r.send(),await r.getResult(),e.send();const x=await e.getResult();t.send();const k=await t.getResult();R(x)&&R(k)?a(`${x.result+k.result}`):a("failed"),c(!1)},[e.send,e.getResult,t.send,t.getResult]),m=o.useCallback(async()=>{r.send(),await r.getResult(),a(_),c(!1)},[r.send]);return p("div",{className:T,children:[u("div",{className:"block-label",children:"Parent"}),p("div",{className:"progress-bars",children:[u(b,{id:"worker1",startCommand:e.signal,resetCommand:r.signal}),u(b,{id:"worker2",startCommand:t.signal,resetCommand:r.signal})]}),p("div",{className:"result",children:["Result: ",s]}),p("div",{className:"action-buttons",children:[u(v,{isDisabled:i,onClick:d,variant:"outlined",children:"Start"}),u(v,{onClick:m,variant:"outlined",children:"Reset All"})]})]})},"ParentComponent"),b=n(({id:e,resetCommand:t,startCommand:r})=>{const[s,a]=o.useState(0),i=o.useRef(0),c=o.useCallback(async()=>(console.info(`Child "${e}" received "Start computation" command`),await new Promise(d=>{const m=setInterval(()=>{i.current<N?(i.current++,a(x=>x+1)):(clearInterval(m),d(Math.random()))},10)})),[]);return S(r,c),S(t,async()=>{console.info(`Child "${e}" received "Reset state" command`),i.current=0,a(0)}),p("div",{className:"computation-worker",children:[p("div",{className:"block-label right",children:['Child component "',e,'"']}),u("label",{htmlFor:"progress",children:"Computation:"}),p("progress",{id:"progress",max:N,value:s,children:[s,"%"]})]})},"ChildComponent");try{b.displayName="ChildComponent",b.__docgenInfo={description:"",displayName:"ChildComponent",props:{id:{defaultValue:null,description:"",name:"id",required:!0,type:{name:"string"}},startCommand:{defaultValue:null,description:"",name:"startCommand",required:!0,type:{name:"CommandRequest<number>"}},resetCommand:{defaultValue:null,description:"",name:"resetCommand",required:!0,type:{name:"CommandRequest<void>"}}}}}catch{}function y(){return y=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var s in r)Object.prototype.hasOwnProperty.call(r,s)&&(e[s]=r[s])}return e},y.apply(this,arguments)}n(y,"_extends");const L={},X="wrapper";function E({components:e,...t}){return l(X,y({},L,t,{components:e,mdxType:"MDXLayout"}),l(A,{title:"Hooks/useCommand",component:f,mdxType:"Meta"}),l("h1",null,"useCommand"),l("p",null,"Demo of ",l("inlineCode",{parentName:"p"},"useCommand")," usage"),l(P,{name:"Example",mdxType:"Story"},l(f,{mdxType:"Demo"})))}n(E,"MDXContent");E.isMDXComponent=!0;const M=n(()=>l(f,null),"example");M.storyName="Example";M.parameters={storySource:{source:"<Demo />"}};const g={title:"Hooks/useCommand",component:f,includeStories:["example"]},F={Example:"example"};g.parameters=g.parameters||{};g.parameters.docs={...g.parameters.docs||{},page:()=>l(D,{mdxStoryNameToKey:F,mdxComponentAnnotations:g},l(E,null))};const ie=["example"];export{ie as __namedExportsOrder,g as default,M as example};
//# sourceMappingURL=useCommand.stories-afb2454a.js.map
