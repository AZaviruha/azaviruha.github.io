var S=Object.defineProperty;var l=(n,r)=>S(n,"name",{value:r,configurable:!0});import{r as f}from"./index-13f3a07b.js";import{c as e,A as B,M as I,S as u}from"./Props-42e8e9cb.js";import{a as _,j as s}from"./jsx-runtime-d0e2239a.js";import"./es.promise.resolve-04d58763.js";import"./index-3e51028f.js";import{c as M,a as E}from"./ui-6e300fc6.js";import"./_commonjsHelpers-df0bf62c.js";import"./iframe-1e31e50d.js";import"./preload-helper-d51aff73.js";import"./index-32ac9e7b.js";import"./index-a2fa05d1.js";import"./_commonjs-dynamic-modules-fefbfc1c.js";import"./index-681e4b07-43c39e59.js";import"./index-aa905caf.js";import"./string-d2fe5096.js";const i=l(()=>_("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[s("g",{clipPath:"url(#clip0_44454_53948)",children:s("path",{d:"M18 8H17V6C17 3.24 14.76 1 12 1C9.24 1 7 3.24 7 6V8H6C4.9 8 4 8.9 4 10V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V10C20 8.9 19.1 8 18 8ZM12 17C10.9 17 10 16.1 10 15C10 13.9 10.9 13 12 13C13.1 13 14 13.9 14 15C14 16.1 13.1 17 12 17ZM15.1 8H8.9V6C8.9 4.29 10.29 2.9 12 2.9C13.71 2.9 15.1 4.29 15.1 6V8Z",fill:"#458FFF"})}),s("defs",{children:s("clipPath",{id:"clip0_44454_53948",children:s("rect",{width:"24",height:"24",fill:"white"})})})]}),"LockIcon");try{i.displayName="LockIcon",i.__docgenInfo={description:"DD-NOTE: used solely for Storybook testing",displayName:"LockIcon",props:{}}}catch{}const a={blue:"#458FFF",red:"#B00020",green:"#219653"},g="cf-banner-appeared",O=M(`
  &:after {
    content: '';
    height: 24px;
    display: block;
  }

  height: auto;
  transform: scale(0.5);
  opacity: 0;
  max-height: 0px;

  transition: opacity, transform, max-height;
  transition-duration: 200ms, 250ms, 0ms;
  transition-delay: 0ms, 0ms, 250ms;
  transition-timing-function: ease-out;

  &.${g} {
    transform: scale(1);
    opacity: 1;
    max-height: 500px;
    transition-delay: 0ms;
  }

  .cf-banner-content {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;

    box-sizing: border-box;
    border-radius: 12px;
    padding: 0px 8px;
    
    @media (min-width: 768px) {
      padding: 0px 20px;
    }

    &.cf-banner-type-error {
      border: 1px solid ${a.red};
      background: #FFF4F6;

      & * {
        color: ${a.red};
        fill: ${a.red};
      }
    }

    &.cf-banner-type-info {
      border: 1px solid ${a.blue};
      background: #ECF4FF;

      & * {
        color: ${a.blue};
        fill: ${a.blue};
      }
    }

    &.cf-banner-type-success {
      border: 1px solid ${a.green};
      background: #E9F4E9;

      & * {
        color: ${a.green};
        fill: ${a.green};
      }
    }

    .cf-banner-start-adornment {
      justify-self: flex-start;
      height: 24px;
    }

    .cf-banner-message {
      font-family: Roboto, sans-serif;
      font-size: 16px;
      font-weight: 400;
      line-height: 24px;

      margin: 0 12px;

      &:after, &:before {
        content: '';
        height: 16px;
        display: block;
      }
    }

    .cf-banner-end-adornment {
      margin-left: auto;
      margin-right: 12px;
      font-family: Roboto, sans-serif;
      font-size: 16px;
      font-weight: 500;
      line-height: 24px;
    }
  }
`),o=l(({message:n,isOpen:r=!0,type:c="info",isScrolledIntoView:m=c==="error",className:C,startAdornment:h,endAdornment:x,dataTestId:b})=>{const t=f.useRef(null);return f.useEffect(()=>{var p,w;r?(p=t==null?void 0:t.current)==null||p.classList.add(g):(w=t==null?void 0:t.current)==null||w.classList.remove(g)},[r]),f.useEffect(()=>{var p;r&&m&&((p=t==null?void 0:t.current)==null||p.scrollIntoView({block:"center",behavior:"smooth"}))},[r,m]),s("div",{ref:t,className:E(O,C),"data-testid":b,"data-test-id":b,children:_("div",{className:E("cf-banner-content",`cf-banner-type-${c}`),children:[h!=null&&s("div",{className:"cf-banner-start-adornment",children:h}),s("div",{className:"cf-banner-message",children:n}),x!=null&&s("div",{className:"cf-banner-end-adornment",children:x})]})})},"Banner");try{o.displayName="Banner",o.__docgenInfo={description:`By default only 'error' Banners are scrolled into view.

It is better if Banner is always present in DOM for 'close' animations.
When closed it does not take any height.`,displayName:"Banner",props:{message:{defaultValue:null,description:"",name:"message",required:!0,type:{name:"ReactNode"}},isOpen:{defaultValue:{value:"true"},description:"",name:"isOpen",required:!1,type:{name:"boolean"}},type:{defaultValue:{value:"info"},description:"",name:"type",required:!1,type:{name:"enum",value:[{value:'"error"'},{value:'"info"'},{value:'"success"'}]}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}},isScrolledIntoView:{defaultValue:{value:"type === 'error'"},description:"",name:"isScrolledIntoView",required:!1,type:{name:"boolean"}},startAdornment:{defaultValue:null,description:"",name:"startAdornment",required:!1,type:{name:"ReactNode"}},endAdornment:{defaultValue:null,description:"",name:"endAdornment",required:!1,type:{name:"ReactNode"}},dataTestId:{defaultValue:null,description:"",name:"dataTestId",required:!1,type:{name:"string"}}}}}catch{}function y(){return y=Object.assign?Object.assign.bind():function(n){for(var r=1;r<arguments.length;r++){var c=arguments[r];for(var m in c)Object.prototype.hasOwnProperty.call(c,m)&&(n[m]=c[m])}return n},y.apply(this,arguments)}l(y,"_extends");const V={},L="wrapper";function A({components:n,...r}){return e(L,y({},V,r,{components:n,mdxType:"MDXLayout"}),e(I,{title:"Banner",component:o,mdxType:"Meta"}),e("h1",null,"Banner"),e("p",null,"A simple component that shows info/error/success information on top of the page."),e(u,{name:"Success Example",mdxType:"Story"},e(o,{startAdornment:e(i,{color:"green",mdxType:"LockIcon"}),type:"success",isOpen:!0,message:"All right!",endAdornment:e("a",{href:"https://google.com",target:"_blank",rel:"noopener noreferrer"},"Review"),mdxType:"Banner"})),e(u,{name:"Info Example",mdxType:"Story"},e(o,{startAdornment:e(i,{mdxType:"LockIcon"}),type:"info",isOpen:!0,message:"Customer lost as of 01/09/2022 11:30 AM. Do not call.",endAdornment:e("a",{href:"https://google.com",target:"_blank",rel:"noopener noreferrer"},"Review"),mdxType:"Banner"})),e(u,{name:"Error Example",mdxType:"Story"},e(o,{startAdornment:e(i,{color:"red",mdxType:"LockIcon"}),type:"error",isOpen:!0,message:"Something went wrong with your payment. Please try again.",endAdornment:e("a",{href:"https://google.com",target:"_blank",rel:"noopener noreferrer"},"Review"),mdxType:"Banner"})))}l(A,"MDXContent");A.isMDXComponent=!0;const v=l(()=>e(o,{startAdornment:e(i,{color:"green"}),type:"success",isOpen:!0,message:"All right!",endAdornment:e("a",{href:"https://google.com",target:"_blank",rel:"noopener noreferrer"},"Review")}),"successExample");v.storyName="Success Example";v.parameters={storySource:{source:"<Banner startAdornment={<LockIcon color='green' />} type='success' isOpen message='All right!' endAdornment={<a href='https://google.com' target='_blank' rel='noopener noreferrer'>Review</a>} />"}};const k=l(()=>e(o,{startAdornment:e(i,null),type:"info",isOpen:!0,message:"Customer lost as of 01/09/2022 11:30 AM. Do not call.",endAdornment:e("a",{href:"https://google.com",target:"_blank",rel:"noopener noreferrer"},"Review")}),"infoExample");k.storyName="Info Example";k.parameters={storySource:{source:"<Banner startAdornment={<LockIcon />} type='info' isOpen message='Customer lost as of 01/09/2022 11:30 AM. Do not call.' endAdornment={<a href='https://google.com' target='_blank' rel='noopener noreferrer'>Review</a>} />"}};const N=l(()=>e(o,{startAdornment:e(i,{color:"red"}),type:"error",isOpen:!0,message:"Something went wrong with your payment. Please try again.",endAdornment:e("a",{href:"https://google.com",target:"_blank",rel:"noopener noreferrer"},"Review")}),"errorExample");N.storyName="Error Example";N.parameters={storySource:{source:"<Banner startAdornment={<LockIcon color='red' />} type='error' isOpen message='Something went wrong with your payment. Please try again.' endAdornment={<a href='https://google.com' target='_blank' rel='noopener noreferrer'>Review</a>} />"}};const d={title:"Banner",component:o,includeStories:["successExample","infoExample","errorExample"]},T={"Success Example":"successExample","Info Example":"infoExample","Error Example":"errorExample"};d.parameters=d.parameters||{};d.parameters.docs={...d.parameters.docs||{},page:()=>e(B,{mdxStoryNameToKey:T,mdxComponentAnnotations:d},e(A,null))};const U=["successExample","infoExample","errorExample"];export{U as __namedExportsOrder,d as default,N as errorExample,k as infoExample,v as successExample};
//# sourceMappingURL=Banner.stories-d0e19daf.js.map
