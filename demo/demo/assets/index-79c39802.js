var n=Object.defineProperty;var s=(e,r)=>n(e,"name",{value:r,configurable:!0});import{r as c}from"./index-13f3a07b.js";import{c as d,a as p}from"./ui-6e300fc6.js";import{j as a}from"./jsx-runtime-d0e2239a.js";const m=s(({size:e,color:r})=>d(`
  --color-loader-primary: #C99B86;
  --color-loader-dark: #101010;
  --color-loader-light: #ffffff;
  --color-loader-inherit: inherit;

  @keyframes circular-loader {
    0% {
      transform-origin: 50% 50%;
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes circular-dash {
    0% {
      stroke-dasharray: 1px, 200px;
      stroke-dashoffset: 0px;
    }
    50% {
      stroke-dasharray: 100px, 200px;
      stroke-dashoffset: -15px;
    }
    100% {
      stroke-dasharray: 100px, 200px;
      stroke-dashoffset: -125px;
    }
  }

  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;

  :hover {
    cursor: default;
  }

  .cf-animated-wrapper {
    animation: circular-loader 1.4s linear infinite;

    ${e!=null?`width: ${e}px;`:""}
    ${e!=null?`height: ${e}px;`:""}
    ${r!=null?`color: var(--color-loader-${r});`:""}

    svg {
      display: block;

      circle {
        animation: circular-dash 1.4s ease-in-out infinite;
        stroke-dasharray: 80px, 200px;
        stroke-dashoffset: 0px;
        stroke: currentColor;
      }
    }
  }
`),"createStyles"),f={small:16,medium:24,large:64},u="medium",l=s(({className:e="",color:r="primary",size:o=u})=>{const t=typeof o=="number"?o:f[o],i=c.useMemo(()=>m({size:t,color:r}),[t,r]);return a("div",{className:p(i,e,"cf-loader"),children:a("div",{className:"cf-animated-wrapper",role:"progressbar",children:a("svg",{viewBox:"22 22 44 44",children:a("circle",{cx:"44",cy:"44",r:"20",fill:"none",strokeWidth:"3.6"})})})})},"Loader");try{l.displayName="Loader",l.__docgenInfo={description:"",displayName:"Loader",props:{size:{defaultValue:null,description:"",name:"size",required:!1,type:{name:"number | LoaderSize"}},color:{defaultValue:{value:"primary"},description:"",name:"color",required:!1,type:{name:"enum",value:[{value:'"primary"'},{value:'"dark"'},{value:'"light"'},{value:'"inherit"'}]}},className:{defaultValue:{value:""},description:"",name:"className",required:!1,type:{name:"string"}}}}}catch{}export{l as L};
//# sourceMappingURL=index-79c39802.js.map
