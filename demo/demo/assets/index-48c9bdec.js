var N=Object.defineProperty;var n=(r,a)=>N(r,"name",{value:a,configurable:!0});import{c as k,a as w}from"./ui-6e300fc6.js";import{L as f}from"./index-79c39802.js";import{c as S}from"./ripple-dd5edb05.js";import{j as t,a as p,F as V}from"./jsx-runtime-d0e2239a.js";const q=k(`
  --cf-button-color-primary: #000000;
  --cf-button-color-primary-hover: #212121;
  --cf-button-color-secondary: #C99B86;
  --cf-button-color-secondary-hover: #DDB3A0;
  --cf-button-disabled-color: rgba(0, 0, 0, 0.3);
  --cf-button-disabled-background: #f3f3f3;
  --cf-button-adornment-size: 16px;

  &.cf-button-root {
    position: relative;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;

    border-radius: 12px;
    box-sizing: border-box;
    border: 0px;
    outline: 0px;
    margin: 0px;
    padding: 20px;

    min-width: 150px;
    height: 56px;
  
    :hover {
      cursor: pointer;
    }

    // VARIANT STYLES

    &.cf-button-variant-contained {
      span, span * {
        color: #fff;
        fill: #fff;
      }

      &.cf-button-color-primary {
        background-color: var(--cf-button-color-primary);

        :hover {
          background-color: var(--cf-button-color-primary-hover);
        }
      }

      &.cf-button-color-secondary {
        background-color: var(--cf-button-color-secondary);

        :hover {
          background-color: var(--cf-button-color-secondary-hover);
        }
      }

      .cf-button-loader .cf-animated-wrapper {
        color: #fff;
      }

      &.cf-button-disabled, &.cf-button-disabled:hover {
        background-color: var(--cf-button-disabled-background);
        cursor: default;

        span, span * {
          color: var(--cf-button-disabled-color);
          fill: var(--cf-button-disabled-color);
        }
      }
    }

    &.cf-button-variant-outlined {
      border-width: 1px;
      border-style: solid;
      background-color: #fff;

      :hover {
        background-color: #fff;
      }

      span, span * {
        color: var(--cf-button-color-primary);
      }

      &.cf-button-color-primary {
        border-color: var(--cf-button-color-primary);

        :hover {
          border-color: var(--cf-button-color-primary-hover);
        }
      }

      &.cf-button-color-secondary {
        border-color: var(--cf-button-color-secondary);

        :hover {
          border-color: var(--cf-button-color-secondary-hover);
        }
      }

      .cf-button-loader .cf-animated-wrapper {
        color: #000;
      }

      &.cf-button-disabled, &.cf-button-disabled:hover {
        border-color: var(--cf-button-disabled-color);
        cursor: default;

        span, span * {
          color: var(--cf-button-disabled-color);
          fill: var(--cf-button-disabled-color);
        }
      }
    }

    &.cf-button-variant-text {
      background-color: unset;
      overflow: visible;
      height: 24px;
      line-height: 24px;
      font-size: 16px;
      letter-spacing: 0.15px;
      min-width: unset;
      padding: 0px;
      width: auto;
      text-decoration: underline;
      text-underline-position: under;
      color: #000;
      border-radius: 0px;

      :hover {
        color: #212121;
      }

      span {
        white-space: nowrap;
      }

      &.cf-button-disabled, &.cf-button-disabled:hover {
        color: rgba(0, 0, 0, 0.38);
        cursor: default;
      }

      .cf-button-start-adornment, .cf-button-end-adornment {
        margin: unset;
      }

      &.cf-button-loading {
        .cf-button-content {
          position: relative;
        }

        .cf-button-loader {
          transform: none;
          right: -24px;
          left: unset;
          top: 0px;
          height: 24px;
          
          .cf-animated-wrapper {
            color: #000;
            width: 16px;
            height: 16px;
          }
        }
      }
    }

    // CONTENT SIZED STYLES

    &.cf-button-content-sized {
      min-width: 80px;
      padding: 12px;
      height: 40px;
    }

    // LOADER SPECIFIC STYLES

    &.cf-button-loading .cf-button-loader {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    .cf-button-start-adornment {
      margin: 0px 12px 0px auto;
    }

    .cf-button-content {
      margin: 0px;
    }

    .cf-button-end-adornment {
      margin: 0px auto 0px 12px;
    }

    .cf-button-start-adornment, .cf-button-end-adornment {
      height: var(--cf-button-adornment-size);

      * {
        width: 100%;
        height: 100%;
      }
    }
  }
`),b=n(({children:r,color:a="primary",className:m,dataTestId:v,endAdornment:d,isContentSized:h,isDisabled:c,isLoading:o,isRippleDisabled:x,onClick:g,startAdornment:i,variant:e="contained"})=>{const u=x===!0||c===!0||o===!0||e==="text"?"none":e==="contained"?"light":"dark",y=n(l=>{c===!0||o===!0||g(l)},"onClick"),s=n(l=>{u!=="none"&&S(l)},"onMouseDown");return t("button",{className:w(q,m,`cf-ripple-container-${u}`,`cf-button-variant-${e}`,`cf-button-color-${a}`,h===!0?"cf-button-content-sized":"",c===!0?"cf-button-disabled":"",o===!0?"cf-button-loading":"","cf-button-root"),"data-test-id":v,onClick:y,onMouseDown:s,onTouchStart:s,children:o===!0&&e!=="text"?t(f,{className:"cf-button-loader"}):p(V,{children:[t("span",{className:"cf-button-start-adornment",children:i??null}),p("span",{className:"cf-button-content",children:[r,o===!0&&e==="text"&&t(f,{className:"cf-button-loader"})]}),t("span",{className:"cf-button-end-adornment",children:d??null})]})})},"Button");try{b.displayName="Button",b.__docgenInfo={description:"",displayName:"Button",props:{className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}},color:{defaultValue:{value:"primary"},description:"",name:"color",required:!1,type:{name:"enum",value:[{value:'"primary"'},{value:'"secondary"'}]}},dataTestId:{defaultValue:null,description:"",name:"dataTestId",required:!1,type:{name:"string"}},endAdornment:{defaultValue:null,description:"",name:"endAdornment",required:!1,type:{name:"ReactNode"}},isContentSized:{defaultValue:null,description:"",name:"isContentSized",required:!1,type:{name:"boolean"}},isDisabled:{defaultValue:null,description:"",name:"isDisabled",required:!1,type:{name:"boolean"}},isLoading:{defaultValue:null,description:"",name:"isLoading",required:!1,type:{name:"boolean"}},isRippleDisabled:{defaultValue:null,description:"",name:"isRippleDisabled",required:!1,type:{name:"boolean"}},onClick:{defaultValue:null,description:"",name:"onClick",required:!0,type:{name:"(e?: MouseEvent<Element, MouseEvent> | undefined) => void"}},startAdornment:{defaultValue:null,description:"",name:"startAdornment",required:!1,type:{name:"ReactNode"}},variant:{defaultValue:{value:"contained"},description:"",name:"variant",required:!1,type:{name:"enum",value:[{value:'"contained"'},{value:'"outlined"'},{value:'"text"'}]}}}}}catch{}export{b as B};
//# sourceMappingURL=index-48c9bdec.js.map
