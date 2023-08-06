var ye=Object.defineProperty;var r=(e,t)=>ye(e,"name",{value:t,configurable:!0});import{r as o}from"./index-13f3a07b.js";import{c as j,b as I}from"./ui-6e300fc6.js";import"./index-77fd1cfa.js";import{j as i,a as D}from"./jsx-runtime-d0e2239a.js";import{a as ve}from"./_arrayReduce-b962fc90.js";import{t as B}from"./toString-40b958f3.js";function Ce(e){return function(t){return e==null?void 0:e[t]}}r(Ce,"basePropertyOf");var Ee={À:"A",Á:"A",Â:"A",Ã:"A",Ä:"A",Å:"A",à:"a",á:"a",â:"a",ã:"a",ä:"a",å:"a",Ç:"C",ç:"c",Ð:"D",ð:"d",È:"E",É:"E",Ê:"E",Ë:"E",è:"e",é:"e",ê:"e",ë:"e",Ì:"I",Í:"I",Î:"I",Ï:"I",ì:"i",í:"i",î:"i",ï:"i",Ñ:"N",ñ:"n",Ò:"O",Ó:"O",Ô:"O",Õ:"O",Ö:"O",Ø:"O",ò:"o",ó:"o",ô:"o",õ:"o",ö:"o",ø:"o",Ù:"U",Ú:"U",Û:"U",Ü:"U",ù:"u",ú:"u",û:"u",ü:"u",Ý:"Y",ý:"y",ÿ:"y",Æ:"Ae",æ:"ae",Þ:"Th",þ:"th",ß:"ss",Ā:"A",Ă:"A",Ą:"A",ā:"a",ă:"a",ą:"a",Ć:"C",Ĉ:"C",Ċ:"C",Č:"C",ć:"c",ĉ:"c",ċ:"c",č:"c",Ď:"D",Đ:"D",ď:"d",đ:"d",Ē:"E",Ĕ:"E",Ė:"E",Ę:"E",Ě:"E",ē:"e",ĕ:"e",ė:"e",ę:"e",ě:"e",Ĝ:"G",Ğ:"G",Ġ:"G",Ģ:"G",ĝ:"g",ğ:"g",ġ:"g",ģ:"g",Ĥ:"H",Ħ:"H",ĥ:"h",ħ:"h",Ĩ:"I",Ī:"I",Ĭ:"I",Į:"I",İ:"I",ĩ:"i",ī:"i",ĭ:"i",į:"i",ı:"i",Ĵ:"J",ĵ:"j",Ķ:"K",ķ:"k",ĸ:"k",Ĺ:"L",Ļ:"L",Ľ:"L",Ŀ:"L",Ł:"L",ĺ:"l",ļ:"l",ľ:"l",ŀ:"l",ł:"l",Ń:"N",Ņ:"N",Ň:"N",Ŋ:"N",ń:"n",ņ:"n",ň:"n",ŋ:"n",Ō:"O",Ŏ:"O",Ő:"O",ō:"o",ŏ:"o",ő:"o",Ŕ:"R",Ŗ:"R",Ř:"R",ŕ:"r",ŗ:"r",ř:"r",Ś:"S",Ŝ:"S",Ş:"S",Š:"S",ś:"s",ŝ:"s",ş:"s",š:"s",Ţ:"T",Ť:"T",Ŧ:"T",ţ:"t",ť:"t",ŧ:"t",Ũ:"U",Ū:"U",Ŭ:"U",Ů:"U",Ű:"U",Ų:"U",ũ:"u",ū:"u",ŭ:"u",ů:"u",ű:"u",ų:"u",Ŵ:"W",ŵ:"w",Ŷ:"Y",ŷ:"y",Ÿ:"Y",Ź:"Z",Ż:"Z",Ž:"Z",ź:"z",ż:"z",ž:"z",Ĳ:"IJ",ĳ:"ij",Œ:"Oe",œ:"oe",ŉ:"'n",ſ:"s"},we=Ce(Ee);const Ae=we;var Te=/[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g,Ie="\\u0300-\\u036f",Re="\\ufe20-\\ufe2f",Le="\\u20d0-\\u20ff",Me=Ie+Re+Le,Ve="["+Me+"]",He=RegExp(Ve,"g");function Oe(e){return e=B(e),e&&e.replace(Te,Ae).replace(He,"")}r(Oe,"deburr");var ke=/[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;function Ne(e){return e.match(ke)||[]}r(Ne,"asciiWords");var qe=/[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;function Se(e){return qe.test(e)}r(Se,"hasUnicodeWord");var K="\\ud800-\\udfff",ze="\\u0300-\\u036f",Ue="\\ufe20-\\ufe2f",Fe="\\u20d0-\\u20ff",_e=ze+Ue+Fe,Z="\\u2700-\\u27bf",$="a-z\\xdf-\\xf6\\xf8-\\xff",Pe="\\xac\\xb1\\xd7\\xf7",je="\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf",De="\\u2000-\\u206f",Be=" \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000",W="A-Z\\xc0-\\xd6\\xd8-\\xde",Ke="\\ufe0e\\ufe0f",G=Pe+je+De+Be,Y="['’]",S="["+G+"]",Ze="["+_e+"]",J="\\d+",$e="["+Z+"]",Q="["+$+"]",X="[^"+K+G+J+Z+$+W+"]",We="\\ud83c[\\udffb-\\udfff]",Ge="(?:"+Ze+"|"+We+")",Ye="[^"+K+"]",ee="(?:\\ud83c[\\udde6-\\uddff]){2}",te="[\\ud800-\\udbff][\\udc00-\\udfff]",c="["+W+"]",Je="\\u200d",z="(?:"+Q+"|"+X+")",Qe="(?:"+c+"|"+X+")",U="(?:"+Y+"(?:d|ll|m|re|s|t|ve))?",F="(?:"+Y+"(?:D|LL|M|RE|S|T|VE))?",ne=Ge+"?",re="["+Ke+"]?",Xe="(?:"+Je+"(?:"+[Ye,ee,te].join("|")+")"+re+ne+")*",et="\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])",tt="\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])",nt=re+ne+Xe,rt="(?:"+[$e,ee,te].join("|")+")"+nt,at=RegExp([c+"?"+Q+"+"+U+"(?="+[S,c,"$"].join("|")+")",Qe+"+"+F+"(?="+[S,c+z,"$"].join("|")+")",c+"?"+z+"+"+U,c+"+"+F,tt,et,J,rt].join("|"),"g");function ot(e){return e.match(at)||[]}r(ot,"unicodeWords");function ut(e,t,n){return e=B(e),t=n?void 0:t,t===void 0?Se(e)?ot(e):Ne(e):e.match(t)||[]}r(ut,"words");var lt="['’]",it=RegExp(lt,"g");function st(e){return function(t){return ve(ut(Oe(t).replace(it,"")),e,"")}}r(st,"createCompounder");var dt=st(function(e,t,n){return e+(n?"-":"")+t.toLowerCase()});const ae=dt,ct=/\p{Script_Extensions=Cyrillic}/u,l=r(e=>e!=null&&e!=="","isStringNotEmpty"),ft=r(e=>typeof e=="boolean"?e:l(e),"isError"),pt=r(e=>e.length===1,"isOnChangeByEvent"),mt={withoutCyrillic:{onKeyPress:e=>{ct.test(e.key)&&e.preventDefault()}}},xt=j(`
  --cf-input-height: 56px;
  --cf-input-line-height: 24px;
  --cf-input-color: #101010;
  --cf-label-color: rgba(33, 33, 33, 0.8);
  --cf-input-border-color: #DDB3A0;
  --cf-input-border-focus-color: #C99B86;
  --cf-input-background-color: #FAFAFA;
  --cf-input-disabled-color: rgba(21, 21, 21, 0.4);
  --cf-input-error-color: #B00020;
  --cf-input-border-radius: 12px;
  --cf-adornment-min-width: 10px;
  --cf-transition-speed: 0.3s;
  --cf-transition-func: cubic-bezier(0.2, 0.8, 0.25, 1);

  /* translate3d is used as it pushes animation to be rendered by GPU */

  &.cf-input-container {
    height: var(--cf-input-height);
    background-color: var(--cf-input-background-color);
    position: relative;
    display: flex;
    align-items: flex-start;
    font-family: Roboto, sans-serif;
    padding: 0px 16px;
    width: 100%;
    border-radius: var(--cf-input-border-radius);
    box-sizing: border-box;
    border: 1px solid transparent;
    transition: border-color var(--cf-transition-speed) var(--cf-transition-func);
  }

  .cf-input {
    color: var(--cf-input-color);
    height: var(--cf-input-line-height);
    width: 100%;
    background-color: transparent;
    font-weight: 400;
    font-size: 16px;
    padding: 16px 0px;
    box-sizing: content-box;
    border: none;
    outline: none;
    resize: none;
  }

  &:hover {
    border-color: var(--cf-input-border-color);
  }

  &.focused {
    border-color: var(--cf-input-border-focus-color);
  }

  .cf-input-adornment {
    font-size: inherit;
    font-weight: inherit;
    color: inherit;
    padding: 16px 0px;
    line-height: 24px;
  }

  .cf-start-adornment {
    padding-right: 4px;
    position: relative;
    visibility: visible;
  }

  .cf-end-adornment {
    font-size: 12px;
    font-weight: 400;
    white-space: nowrap;
    padding-left: 8px;
  }

  .cf-input-label {
    position: absolute;
    z-index: 2;
    line-height: 24px;
    left: 16px;
    top: 16px;
    font-size: 16px;
    width: max-content;
    color: var(--cf-label-color);
    pointer-events: none;
    will-change: transform;
    transition: transform var(--cf-transition-speed) var(--cf-transition-func);
  }

  &.with-label {  
    .cf-input {
      padding: 24px 0px 0px;
    }

    .cf-start-adornment {
      padding: 24px 4px 0px 0px;
      visibility: hidden;
      position: absolute;
    }
  }

  &.with-label-focused label {
    // 25% from starting size would shrink from both sides
    // 12.5% = 25% / 2 (to adjsut left side only)
    transform: translate3d(-12.5%, -16px, 0) scale(0.75);
  }

  &.with-adornment.with-label-focused .cf-start-adornment {
    position: relative;
    visibility: visible;
  }

  &.with-error {
    border-color: var(--cf-input-error-color);

    label, .cf-start-adornment {
      color: var(--cf-input-error-color);
    }
  }

  &.disabled {
    border-color: transparent;

    .cf-input-adornment, label, .cf-input {
      color: var(--cf-input-disabled-color);
    }
  }
`),bt=o.forwardRef(({value:e,...t},n)=>i("input",{...t,value:e===null?"":e,ref:n})),_=r(({preset:e,...t})=>{var q;const{className:n,dataTestId:f,defaultValue:p,disabled:b,endAdornment:h,error:g,id:s,InputComponent:d,inputProps:y,inputRef:m,label:u,maxLength:v,onFocus:C,onBlur:E,onChange:x,onKeyDown:w,placeholder:A,startAdornment:R,value:L,passInitialPlaceholder:oe=!1,...ue}={...e!=null&&mt[e],...t},T=(q=L??p)==null?void 0:q.toString(),[M,k]=o.useState(!1),[V,N]=o.useState(l(T)),le=o.useRef(null),ie=o.useRef(null),se=o.useRef(null),de=m??le,ce=d??bt,H=l(A)&&(M||u==null),fe=l(u)&&(M||V||l(T==null?void 0:T.toString()))?"with-label-focused":"",pe=H&&!V?A:"",me=o.useCallback(a=>{C==null||C(a),k(!0)},[C]),xe=o.useCallback(a=>{w==null||w(a),N(l(a.currentTarget.value))},[w]),be=o.useCallback(a=>{x!=null&&(pt(x)?x(a):x(a.target.getAttribute("id")??"",a.target.value))},[x]),he=o.useCallback(a=>{E==null||E(a),k(!1),N(l(a.target.value))},[E,H,u,A]),ge={...ue,...y,...v!=null?{maxLength:v}:void 0,...d==null?{ref:de}:void 0,className:"cf-input","data-test-id":f??ae(s),disabled:b,id:s,name:s,onBlur:he,onChange:be,onFocus:me,onKeyDown:xe,defaultValue:p,value:L===null?"":L};return D("div",{ref:ie,className:I(xt,M?"focused":"",H&&!V?"with-placeholder":"",R!=null?"with-adornment":"",l(u)?"with-label":"",fe,ft(g)?"with-error":"",b===!0?"disabled":"","cf-input-container",n),tabIndex:0,children:[R!=null&&i("div",{ref:se,className:I("cf-start-adornment","cf-input-adornment"),children:R}),i(ce,{...ge,...oe?{initialPlaceholder:A}:void 0,placeholder:pe}),u!=null&&i("label",{className:"cf-input-label",htmlFor:s,children:u}),h!=null&&i("div",{className:I("cf-end-adornment","cf-input-adornment"),children:h})]})},"Input");try{_.displayName="Input",_.__docgenInfo={description:"",displayName:"Input",props:{preset:{defaultValue:null,description:"",name:"preset",required:!1,type:{name:"enum",value:[{value:'"withoutCyrillic"'}]}},InputComponent:{defaultValue:null,description:"Component to be rendered instead a basic input",name:"InputComponent",required:!1,type:{name:"ElementType<any>"}},inputRef:{defaultValue:null,description:"Pass a ref to the `input` element.",name:"inputRef",required:!1,type:{name:"RefObject<HTMLInputElement>"}},passInitialPlaceholder:{defaultValue:null,description:`used only by other wrapper components to control edge case placeholder integrations.
Masked Inputs for example needs this to be passed.`,name:"passInitialPlaceholder",required:!1,type:{name:"boolean"}},onChange:{defaultValue:null,description:`OnChangeField -> (field: string, value: string) => void

OnChangeEvent -> (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void`,name:"onChange",required:!1,type:{name:"OnChangeEvent<HTMLInputElement | HTMLTextAreaElement> | OnChangeField<InputValue>"}},id:{defaultValue:null,description:"The id of the `input` element.",name:"id",required:!0,type:{name:"string"}},type:{defaultValue:null,description:"Type of the `input` element. It should be [a valid HTML5 input type]",name:"type",required:!1,type:{name:"string"}},className:{defaultValue:null,description:"className to override styles",name:"className",required:!1,type:{name:"string"}},startAdornment:{defaultValue:null,description:"Start `InputAdornment` for this component.",name:"startAdornment",required:!1,type:{name:"ReactNode"}},endAdornment:{defaultValue:null,description:"End `InputAdornment` for this component.",name:"endAdornment",required:!1,type:{name:"ReactNode"}},dataTestId:{defaultValue:null,description:"test id attribute",name:"dataTestId",required:!1,type:{name:"string"}},error:{defaultValue:null,description:"Indicate an error.",name:"error",required:!1,type:{name:"boolean"}},onClick:{defaultValue:null,description:"",name:"onClick",required:!1,type:{name:"MouseEventHandler<HTMLInputElement | HTMLTextAreaElement>"}},defaultValue:{defaultValue:null,description:"The default `input` element value. Use when the component is not controlled.",name:"defaultValue",required:!1,type:{name:"string"}},disabled:{defaultValue:null,description:"If `true`, the `input` element will be disabled.",name:"disabled",required:!1,type:{name:"boolean"}},onBlur:{defaultValue:null,description:"",name:"onBlur",required:!1,type:{name:"FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>"}},onFocus:{defaultValue:null,description:"",name:"onFocus",required:!1,type:{name:"FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>"}},value:{defaultValue:null,description:"The value of the `input` element, required for a controlled component.",name:"value",required:!1,type:{name:"InputValue"}},label:{defaultValue:null,description:"input label",name:"label",required:!1,type:{name:"string"}},placeholder:{defaultValue:null,description:"The short hint displayed in the input before the user enters a value.",name:"placeholder",required:!1,type:{name:"string"}},onKeyDown:{defaultValue:null,description:"",name:"onKeyDown",required:!1,type:{name:"KeyboardEventHandler<HTMLInputElement | HTMLTextAreaElement>"}},onKeyPress:{defaultValue:null,description:"",name:"onKeyPress",required:!1,type:{name:"KeyboardEventHandler<HTMLInputElement | HTMLTextAreaElement>"}},onKeyUp:{defaultValue:null,description:"",name:"onKeyUp",required:!1,type:{name:"KeyboardEventHandler<HTMLInputElement | HTMLTextAreaElement>"}},maxLength:{defaultValue:null,description:"max length of symbols which can be typed",name:"maxLength",required:!1,type:{name:"number"}},autoComplete:{defaultValue:null,description:"",name:"autoComplete",required:!1,type:{name:"string"}},autoFocus:{defaultValue:null,description:"If `true`, the `input` element will be focused during the first mount.",name:"autoFocus",required:!1,type:{name:"boolean"}},inputProps:{defaultValue:null,description:"[Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) applied to the `input` element.",name:"inputProps",required:!1,type:{name:"InputBaseComponentProps"}}}}}catch{}const ht=r(e=>e instanceof Date,"isDateObject"),gt=r(e=>e==null,"isNullOrUndefined"),yt=r(e=>typeof e=="object","isObjectType"),vt=r(e=>!gt(e)&&!Array.isArray(e)&&yt(e)&&!ht(e),"isObject");function O(e){if(vt(e)){let t=!1;const n=Object.keys(e);for(const f of n){if(t)return t;t=O(e[f])}return t}if(Array.isArray(e)){let t=!1;for(let n=0;n<e.length;n++){if(t)return t;t=O(e[n])}return t}return Boolean(e)}r(O,"deepContainsTruthy");const Ct=j(`
  --helper-error-text-line-height: 16px;
  --helper-error-text-bottom-offset: -4px;

  &.cf-form-field {
    position: relative;
    font-family: Roboto, sans-serif;

    .cf-form-field-helper {
      position: absolute;
      width: min-content;
      bottom: var(--helper-error-text-bottom-offset);
      transform: translateY(100%);
      margin: 0;
      color: rgba(33, 33, 33, 0.5);
      font-size: 12px;
      padding-left: 16px;
      word-break: keep-all;
      line-height: var(--helper-error-text-line-height);
      white-space: normal;
      width: 100%;
      box-sizing: border-box;
      letter-spacing: 0.4px;
    }

    .cf-form-field-error {
      position: absolute;
      width: min-content;
      bottom: var(--helper-error-text-bottom-offset);
      transform: translateY(100%);
      margin: 0;
      color: #B00020;
      font-size: 12px;
      padding-left: 16px;
      word-break: keep-all;
      line-height: var(--helper-error-text-line-height);
      white-space: normal;
      width: 100%;
      box-sizing: border-box;
      letter-spacing: 0.4px;
    }
  }
`);function P(e){return t=>{const{error:n,touched:f,disabled:p,showError:b,className:h,helper:g=null,dataTestId:s,errorMessage:d=typeof n=="string"?n:null,...y}=t,m=b??(p!==!0&&Boolean(f)&&O(n)),u=s??ae(y.id),v=d!==""&&d!=null;return D("div",{className:I(Ct,"cf-form-field",h??""),"data-test-id":u,children:[i(e,{...y,disabled:p,error:m?n:void 0}),!m&&g!=null&&i("div",{className:"cf-form-field-helper",children:g}),m&&v&&i("p",{className:"cf-form-field-error",children:d})]})}}r(P,"FormFieldHOC");try{P.displayName="FormFieldHOC",P.__docgenInfo={description:"Adds general form control wrapper over the Component and renders error or heper text inside the wrapper",displayName:"FormFieldHOC",props:{}}}catch{}export{P as F,_ as I,ft as a,pt as b,l as i};
//# sourceMappingURL=index-9c0e0d32.js.map
