var F=Object.defineProperty;var i=(e,t)=>F(e,"name",{value:t,configurable:!0});const V=i(e=>Object.keys(e),"keys"),p=i((e,t)=>{if(t==null)return{...e};if(typeof t=="object")return{...e,...t};const o={...e};for(const r of V(o))o[r]=t;return o},"mergeObjectOrString"),E="en-US",v={allowNegative:!0,allowZero:!0,emptyValues:{emptyString:"",negativeValue:"",nullValue:"",zeroValue:"",invalidValue:"-"},mantissa:2,postfix:{negative:"",positive:""},prefix:{negative:"",positive:""}},Z=i((e,t)=>{if(e===t)return{...e};const o=p(e.emptyValues,t.emptyValues),r=p(e.prefix,t.prefix),n=p(e.postfix,t.postfix),a=t.allowNegative??e.allowNegative,l=t.allowZero??e.allowZero,m=t.mantissa??e.mantissa;return{allowNegative:a,allowZero:l,emptyValues:o,mantissa:m,postfix:n,prefix:r}},"mergeFormatterConfig"),f=i((e,t=v)=>{const o=Z(v,t),{emptyValues:r,postfix:n,prefix:a}=o,l=o.allowNegative??!0,m=o.allowZero??!0,c=o.mantissa??2;if(e==null)return r.nullValue;if(e==="")return r.emptyString;const s=Number(e);if(Number.isNaN(s))return r.invalidValue;const g=s===0,u=s<0;if(g&&!m)return r.zeroValue;if(u&&!l)return r.negativeValue;const N={minimumFractionDigits:c,maximumFractionDigits:c},w=u?n.negative:n.positive,x=u?a.negative:a.positive,y=new Intl.NumberFormat(E,N).format(Math.abs(s));return`${x}${y}${w}`},"formatNumber"),D={prefix:{positive:"",negative:"-"},allowZero:!1,mantissa:0,emptyValues:{zeroValue:"0",invalidValue:""}},I=i((e,t)=>f(e,{...D,...t}),"formatInteger"),A={prefix:{positive:"",negative:"-"},allowZero:!1,emptyValues:{zeroValue:"0.00",invalidValue:""}},L=i((e,t)=>f(e,{...A,...t}),"formatDecimal");export{I as a,L as f};
//# sourceMappingURL=numbers2-7b780f3b.js.map
