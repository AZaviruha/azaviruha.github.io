var wt=Object.defineProperty;var a=(r,n)=>wt(r,"name",{value:n,configurable:!0});import{c as Xr}from"./_commonjsHelpers-df0bf62c.js";import{w as B}from"./index-a2fa05d1.js";import{d as Tt}from"./index-32ac9e7b.js";import{e as Pt,u as jt}from"./iframe-1e31e50d.js";import"./_commonjs-dynamic-modules-fefbfc1c.js";import"./preload-helper-d51aff73.js";import"./index-3e51028f.js";var L=a(function(r){return r&&r.Math==Math&&r},"check"),m=L(typeof globalThis=="object"&&globalThis)||L(typeof window=="object"&&window)||L(typeof self=="object"&&self)||L(typeof Xr=="object"&&Xr)||function(){return this}()||Function("return this")(),U={},Mt={get exports(){return U},set exports(r){U=r}},Zr=m,_t=Object.defineProperty,wr=a(function(r,n){try{_t(Zr,r,{value:n,configurable:!0,writable:!0})}catch{Zr[r]=n}return n},"defineGlobalProperty$3"),At=m,Rt=wr,Jr="__core-js_shared__",Ct=At[Jr]||Rt(Jr,{}),Tr=Ct,Qr=Tr;(Mt.exports=function(r,n){return Qr[r]||(Qr[r]=n!==void 0?n:{})})("versions",[]).push({version:"3.27.2",mode:"global",copyright:"© 2014-2023 Denis Pushkarev (zloirock.ru)",license:"https://github.com/zloirock/core-js/blob/v3.27.2/LICENSE",source:"https://github.com/zloirock/core-js"});var f=a(function(r){try{return!!r()}catch{return!0}},"fails$f"),Lt=f,Pr=!Lt(function(){var r=function(){}.bind();return typeof r!="function"||r.hasOwnProperty("prototype")}),Rn=Pr,Cn=Function.prototype,mr=Cn.call,Nt=Rn&&Cn.bind.bind(mr,mr),c=Rn?Nt:function(r){return function(){return mr.apply(r,arguments)}},Ln=a(function(r){return r==null},"isNullOrUndefined$2"),Dt=Ln,Ft=TypeError,Nn=a(function(r){if(Dt(r))throw Ft("Can't call method on "+r);return r},"requireObjectCoercible$2"),Bt=Nn,Gt=Object,Dn=a(function(r){return Gt(Bt(r))},"toObject$2"),Kt=c,kt=Dn,Ut=Kt({}.hasOwnProperty),S=Object.hasOwn||a(function(n,t){return Ut(kt(n),t)},"hasOwn"),Vt=c,zt=0,Ht=Math.random(),Wt=Vt(1 .toString),jr=a(function(r){return"Symbol("+(r===void 0?"":r)+")_"+Wt(++zt+Ht,36)},"uid$3"),qt=typeof navigator<"u"&&String(navigator.userAgent)||"",Fn=m,J=qt,Yr=Fn.process,rn=Fn.Deno,nn=Yr&&Yr.versions||rn&&rn.version,tn=nn&&nn.v8,d,V;tn&&(d=tn.split("."),V=d[0]>0&&d[0]<4?1:+(d[0]+d[1]));!V&&J&&(d=J.match(/Edge\/(\d+)/),(!d||d[1]>=74)&&(d=J.match(/Chrome\/(\d+)/),d&&(V=+d[1])));var Bn=V,en=Bn,Xt=f,Gn=!!Object.getOwnPropertySymbols&&!Xt(function(){var r=Symbol();return!String(r)||!(Object(r)instanceof Symbol)||!Symbol.sham&&en&&en<41}),Zt=Gn,Kn=Zt&&!Symbol.sham&&typeof Symbol.iterator=="symbol",Jt=m,Qt=U,an=S,Yt=jr,re=Gn,ne=Kn,E=Jt.Symbol,Q=Qt("wks"),te=ne?E.for||E:E&&E.withoutSetter||Yt,I=a(function(r){return an(Q,r)||(Q[r]=re&&an(E,r)?E[r]:te("Symbol."+r)),Q[r]},"wellKnownSymbol$6"),ee=I,ae=ee("toStringTag"),kn={};kn[ae]="z";var Mr=String(kn)==="[object z]",br=typeof document=="object"&&document.all,ie=typeof br>"u"&&br!==void 0,Un={all:br,IS_HTMLDDA:ie},Vn=Un,oe=Vn.all,p=Vn.IS_HTMLDDA?function(r){return typeof r=="function"||r===oe}:function(r){return typeof r=="function"},w={},ue=f,O=!ue(function(){return Object.defineProperty({},1,{get:function(){return 7}})[1]!=7}),on=p,zn=Un,le=zn.all,b=zn.IS_HTMLDDA?function(r){return typeof r=="object"?r!==null:on(r)||r===le}:function(r){return typeof r=="object"?r!==null:on(r)},ve=m,un=b,$r=ve.document,fe=un($r)&&un($r.createElement),Hn=a(function(r){return fe?$r.createElement(r):{}},"documentCreateElement$1"),ce=O,se=f,pe=Hn,Wn=!ce&&!se(function(){return Object.defineProperty(pe("div"),"a",{get:function(){return 7}}).a!=7}),de=O,ye=f,me=de&&ye(function(){return Object.defineProperty(function(){},"prototype",{value:42,writable:!1}).prototype!=42}),be=b,$e=String,ge=TypeError,qn=a(function(r){if(be(r))return r;throw ge($e(r)+" is not an object")},"anObject$2"),Se=Pr,N=Function.prototype.call,_r=Se?N.bind(N):function(){return N.apply(N,arguments)},Y=m,he=p,Oe=a(function(r){return he(r)?r:void 0},"aFunction"),Ar=a(function(r,n){return arguments.length<2?Oe(Y[r]):Y[r]&&Y[r][n]},"getBuiltIn$3"),xe=c,Ee=xe({}.isPrototypeOf),Ie=Ar,we=p,Te=Ee,Pe=Kn,je=Object,Xn=Pe?function(r){return typeof r=="symbol"}:function(r){var n=Ie("Symbol");return we(n)&&Te(n.prototype,je(r))},Me=String,_e=a(function(r){try{return Me(r)}catch{return"Object"}},"tryToString$1"),Ae=p,Re=_e,Ce=TypeError,Zn=a(function(r){if(Ae(r))return r;throw Ce(Re(r)+" is not a function")},"aCallable$2"),Le=Zn,Ne=Ln,De=a(function(r,n){var t=r[n];return Ne(t)?void 0:Le(t)},"getMethod$1"),rr=_r,nr=p,tr=b,Fe=TypeError,Be=a(function(r,n){var t,e;if(n==="string"&&nr(t=r.toString)&&!tr(e=rr(t,r))||nr(t=r.valueOf)&&!tr(e=rr(t,r))||n!=="string"&&nr(t=r.toString)&&!tr(e=rr(t,r)))return e;throw Fe("Can't convert object to primitive value")},"ordinaryToPrimitive$1"),Ge=_r,ln=b,vn=Xn,Ke=De,ke=Be,Ue=I,Ve=TypeError,ze=Ue("toPrimitive"),He=a(function(r,n){if(!ln(r)||vn(r))return r;var t=Ke(r,ze),e;if(t){if(n===void 0&&(n="default"),e=Ge(t,r,n),!ln(e)||vn(e))return e;throw Ve("Can't convert object to primitive value")}return n===void 0&&(n="number"),ke(r,n)},"toPrimitive$1"),We=He,qe=Xn,Rr=a(function(r){var n=We(r,"string");return qe(n)?n:n+""},"toPropertyKey$3"),Xe=O,Ze=Wn,Je=me,D=qn,fn=Rr,Qe=TypeError,er=Object.defineProperty,Ye=Object.getOwnPropertyDescriptor,ar="enumerable",ir="configurable",or="writable";w.f=Xe?Je?a(function(n,t,e){if(D(n),t=fn(t),D(e),typeof n=="function"&&t==="prototype"&&"value"in e&&or in e&&!e[or]){var i=Ye(n,t);i&&i[or]&&(n[t]=e.value,e={configurable:ir in e?e[ir]:i[ir],enumerable:ar in e?e[ar]:i[ar],writable:!1})}return er(n,t,e)},"defineProperty"):er:a(function(n,t,e){if(D(n),t=fn(t),D(e),Ze)try{return er(n,t,e)}catch{}if("get"in e||"set"in e)throw Qe("Accessors not supported");return"value"in e&&(n[t]=e.value),n},"defineProperty");var gr={},ra={get exports(){return gr},set exports(r){gr=r}},Sr=O,na=S,Jn=Function.prototype,ta=Sr&&Object.getOwnPropertyDescriptor,Cr=na(Jn,"name"),ea=Cr&&a(function(){},"something").name==="something",aa=Cr&&(!Sr||Sr&&ta(Jn,"name").configurable),ia={EXISTS:Cr,PROPER:ea,CONFIGURABLE:aa},oa=c,ua=p,hr=Tr,la=oa(Function.toString);ua(hr.inspectSource)||(hr.inspectSource=function(r){return la(r)});var Qn=hr.inspectSource,va=m,fa=p,cn=va.WeakMap,ca=fa(cn)&&/native code/.test(String(cn)),Lr=a(function(r,n){return{enumerable:!(r&1),configurable:!(r&2),writable:!(r&4),value:n}},"createPropertyDescriptor$3"),sa=O,pa=w,da=Lr,Nr=sa?function(r,n,t){return pa.f(r,n,da(1,t))}:function(r,n,t){return r[n]=t,r},ya=U,ma=jr,sn=ya("keys"),ba=a(function(r){return sn[r]||(sn[r]=ma(r))},"sharedKey$1"),Dr={},$a=ca,Yn=m,ga=b,Sa=Nr,ur=S,lr=Tr,ha=ba,Oa=Dr,pn="Object already initialized",Or=Yn.TypeError,xa=Yn.WeakMap,z,_,H,Ea=a(function(r){return H(r)?_(r):z(r,{})},"enforce"),Ia=a(function(r){return function(n){var t;if(!ga(n)||(t=_(n)).type!==r)throw Or("Incompatible receiver, "+r+" required");return t}},"getterFor");if($a||lr.state){var y=lr.state||(lr.state=new xa);y.get=y.get,y.has=y.has,y.set=y.set,z=a(function(r,n){if(y.has(r))throw Or(pn);return n.facade=r,y.set(r,n),n},"set"),_=a(function(r){return y.get(r)||{}},"get"),H=a(function(r){return y.has(r)},"has")}else{var x=ha("state");Oa[x]=!0,z=a(function(r,n){if(ur(r,x))throw Or(pn);return n.facade=r,Sa(r,x,n),n},"set"),_=a(function(r){return ur(r,x)?r[x]:{}},"get"),H=a(function(r){return ur(r,x)},"has")}var wa={set:z,get:_,has:H,enforce:Ea,getterFor:Ia},Fr=c,Ta=f,Pa=p,F=S,xr=O,ja=ia.CONFIGURABLE,Ma=Qn,rt=wa,_a=rt.enforce,Aa=rt.get,dn=String,G=Object.defineProperty,Ra=Fr("".slice),Ca=Fr("".replace),La=Fr([].join),Na=xr&&!Ta(function(){return G(function(){},"length",{value:8}).length!==8}),Da=String(String).split("String"),Fa=ra.exports=function(r,n,t){Ra(dn(n),0,7)==="Symbol("&&(n="["+Ca(dn(n),/^Symbol\(([^)]*)\)/,"$1")+"]"),t&&t.getter&&(n="get "+n),t&&t.setter&&(n="set "+n),(!F(r,"name")||ja&&r.name!==n)&&(xr?G(r,"name",{value:n,configurable:!0}):r.name=n),Na&&t&&F(t,"arity")&&r.length!==t.arity&&G(r,"length",{value:t.arity});try{t&&F(t,"constructor")&&t.constructor?xr&&G(r,"prototype",{writable:!1}):r.prototype&&(r.prototype=void 0)}catch{}var e=_a(r);return F(e,"source")||(e.source=La(Da,typeof n=="string"?n:"")),r};Function.prototype.toString=Fa(a(function(){return Pa(this)&&Aa(this).source||Ma(this)},"toString"),"toString");var Ba=p,Ga=w,Ka=gr,ka=wr,nt=a(function(r,n,t,e){e||(e={});var i=e.enumerable,u=e.name!==void 0?e.name:n;if(Ba(t)&&Ka(t,u,e),e.global)i?r[n]=t:ka(n,t);else{try{e.unsafe?r[n]&&(i=!0):delete r[n]}catch{}i?r[n]=t:Ga.f(r,n,{value:t,enumerable:!1,configurable:!e.nonConfigurable,writable:!e.nonWritable})}return r},"defineBuiltIn$2"),tt=c,Ua=tt({}.toString),Va=tt("".slice),T=a(function(r){return Va(Ua(r),8,-1)},"classofRaw$2"),za=Mr,Ha=p,K=T,Wa=I,qa=Wa("toStringTag"),Xa=Object,Za=K(function(){return arguments}())=="Arguments",Ja=a(function(r,n){try{return r[n]}catch{}},"tryGet"),et=za?K:function(r){var n,t,e;return r===void 0?"Undefined":r===null?"Null":typeof(t=Ja(n=Xa(r),qa))=="string"?t:Za?K(n):(e=K(n))=="Object"&&Ha(n.callee)?"Arguments":e},Qa=Mr,Ya=et,ri=Qa?{}.toString:a(function(){return"[object "+Ya(this)+"]"},"toString"),ni=Mr,ti=nt,ei=ri;ni||ti(Object.prototype,"toString",ei,{unsafe:!0});var ai={CSSRuleList:0,CSSStyleDeclaration:0,CSSValueList:0,ClientRectList:0,DOMRectList:0,DOMStringList:0,DOMTokenList:1,DataTransferItemList:0,FileList:0,HTMLAllCollection:0,HTMLCollection:0,HTMLFormElement:0,HTMLSelectElement:0,MediaList:0,MimeTypeArray:0,NamedNodeMap:0,NodeList:1,PaintRequestList:0,Plugin:0,PluginArray:0,SVGLengthList:0,SVGNumberList:0,SVGPathSegList:0,SVGPointList:0,SVGStringList:0,SVGTransformList:0,SourceBufferList:0,StyleSheetList:0,TextTrackCueList:0,TextTrackList:0,TouchList:0},ii=Hn,vr=ii("span").classList,yn=vr&&vr.constructor&&vr.constructor.prototype,oi=yn===Object.prototype?void 0:yn,ui=T,li=c,vi=a(function(r){if(ui(r)==="Function")return li(r)},"functionUncurryThisClause"),mn=vi,fi=Zn,ci=Pr,si=mn(mn.bind),pi=a(function(r,n){return fi(r),n===void 0?r:ci?si(r,n):function(){return r.apply(n,arguments)}},"functionBindContext"),di=c,yi=f,mi=T,fr=Object,bi=di("".split),at=yi(function(){return!fr("z").propertyIsEnumerable(0)})?function(r){return mi(r)=="String"?bi(r,""):fr(r)}:fr,$i=Math.ceil,gi=Math.floor,Si=Math.trunc||a(function(n){var t=+n;return(t>0?gi:$i)(t)},"trunc"),hi=Si,it=a(function(r){var n=+r;return n!==n||n===0?0:hi(n)},"toIntegerOrInfinity$2"),Oi=it,xi=Math.min,Ei=a(function(r){return r>0?xi(Oi(r),9007199254740991):0},"toLength$1"),Ii=Ei,W=a(function(r){return Ii(r.length)},"lengthOfArrayLike$4"),wi=T,ot=Array.isArray||a(function(n){return wi(n)=="Array"},"isArray"),Ti=c,Pi=f,ut=p,ji=et,Mi=Ar,_i=Qn,lt=a(function(){},"noop"),Ai=[],vt=Mi("Reflect","construct"),Br=/^\s*(?:class|function)\b/,Ri=Ti(Br.exec),Ci=!Br.exec(lt),M=a(function(n){if(!ut(n))return!1;try{return vt(lt,Ai,n),!0}catch{return!1}},"isConstructor"),ft=a(function(n){if(!ut(n))return!1;switch(ji(n)){case"AsyncFunction":case"GeneratorFunction":case"AsyncGeneratorFunction":return!1}try{return Ci||!!Ri(Br,_i(n))}catch{return!0}},"isConstructor");ft.sham=!0;var ct=!vt||Pi(function(){var r;return M(M.call)||!M(Object)||!M(function(){r=!0})||r})?ft:M,bn=ot,Li=ct,Ni=b,Di=I,Fi=Di("species"),$n=Array,Bi=a(function(r){var n;return bn(r)&&(n=r.constructor,Li(n)&&(n===$n||bn(n.prototype))?n=void 0:Ni(n)&&(n=n[Fi],n===null&&(n=void 0))),n===void 0?$n:n},"arraySpeciesConstructor$1"),Gi=Bi,Ki=a(function(r,n){return new(Gi(r))(n===0?0:n)},"arraySpeciesCreate$1"),ki=pi,Ui=c,Vi=at,zi=Dn,Hi=W,Wi=Ki,gn=Ui([].push),g=a(function(r){var n=r==1,t=r==2,e=r==3,i=r==4,u=r==6,l=r==7,o=r==5||u;return function(v,s,P,Et){for(var Hr=zi(v),X=Vi(Hr),It=ki(s,P),Wr=Hi(X),h=0,qr=Et||Wi,C=n?qr(v,Wr):t||l?qr(v,0):void 0,j,Z;Wr>h;h++)if((o||h in X)&&(j=X[h],Z=It(j,h,Hr),r))if(n)C[h]=Z;else if(Z)switch(r){case 3:return!0;case 5:return j;case 6:return h;case 2:gn(C,j)}else switch(r){case 4:return!1;case 7:gn(C,j)}return u?-1:e||i?i:C}},"createMethod$1"),qi={forEach:g(0),map:g(1),filter:g(2),some:g(3),every:g(4),find:g(5),findIndex:g(6),filterReject:g(7)},Xi=f,Zi=a(function(r,n){var t=[][r];return!!t&&Xi(function(){t.call(null,n||function(){return 1},1)})},"arrayMethodIsStrict$1"),Ji=qi.forEach,Qi=Zi,Yi=Qi("forEach"),ro=Yi?[].forEach:a(function(n){return Ji(this,n,arguments.length>1?arguments[1]:void 0)},"forEach"),Sn=m,hn=ai,no=oi,cr=ro,to=Nr,st=a(function(r){if(r&&r.forEach!==cr)try{to(r,"forEach",cr)}catch{r.forEach=cr}},"handlePrototype");for(var sr in hn)hn[sr]&&st(Sn[sr]&&Sn[sr].prototype);st(no);var On=a(function(n){var t=Array.isArray(n)?n:[n];t.forEach(eo)},"clearStyles"),eo=a(function(n){var t=B.document.getElementById(n);t&&t.parentElement&&t.parentElement.removeChild(t)},"clearStyle"),ao=a(function(n,t){var e=B.document.getElementById(n);if(e)e.innerHTML!==t&&(e.innerHTML=t);else{var i=B.document.createElement("style");i.setAttribute("id",n),i.innerHTML=t,B.document.head.appendChild(i)}},"addOutlineStyles"),pt="outline",Gr={},dt={},yt={}.propertyIsEnumerable,mt=Object.getOwnPropertyDescriptor,io=mt&&!yt.call({1:2},1);dt.f=io?a(function(n){var t=mt(this,n);return!!t&&t.enumerable},"propertyIsEnumerable"):yt;var oo=at,uo=Nn,A=a(function(r){return oo(uo(r))},"toIndexedObject$5"),lo=O,vo=_r,fo=dt,co=Lr,so=A,po=Rr,yo=S,mo=Wn,xn=Object.getOwnPropertyDescriptor;Gr.f=lo?xn:a(function(n,t){if(n=so(n),t=po(t),mo)try{return xn(n,t)}catch{}if(yo(n,t))return co(!vo(fo.f,n,t),n[t])},"getOwnPropertyDescriptor");var q={},bo=it,$o=Math.max,go=Math.min,Kr=a(function(r,n){var t=bo(r);return t<0?$o(t+n,0):go(t,n)},"toAbsoluteIndex$3"),So=A,ho=Kr,Oo=W,En=a(function(r){return function(n,t,e){var i=So(n),u=Oo(i),l=ho(e,u),o;if(r&&t!=t){for(;u>l;)if(o=i[l++],o!=o)return!0}else for(;u>l;l++)if((r||l in i)&&i[l]===t)return r||l||0;return!r&&-1}},"createMethod"),xo={includes:En(!0),indexOf:En(!1)},Eo=c,pr=S,Io=A,wo=xo.indexOf,To=Dr,In=Eo([].push),Po=a(function(r,n){var t=Io(r),e=0,i=[],u;for(u in t)!pr(To,u)&&pr(t,u)&&In(i,u);for(;n.length>e;)pr(t,u=n[e++])&&(~wo(i,u)||In(i,u));return i},"objectKeysInternal"),jo=["constructor","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"],Mo=Po,_o=jo,Ao=_o.concat("length","prototype");q.f=Object.getOwnPropertyNames||a(function(n){return Mo(n,Ao)},"getOwnPropertyNames");var bt={};bt.f=Object.getOwnPropertySymbols;var Ro=Ar,Co=c,Lo=q,No=bt,Do=qn,Fo=Co([].concat),Bo=Ro("Reflect","ownKeys")||a(function(n){var t=Lo.f(Do(n)),e=No.f;return e?Fo(t,e(n)):t},"ownKeys"),wn=S,Go=Bo,Ko=Gr,ko=w,Uo=a(function(r,n,t){for(var e=Go(n),i=ko.f,u=Ko.f,l=0;l<e.length;l++){var o=e[l];!wn(r,o)&&!(t&&wn(t,o))&&i(r,o,u(n,o))}},"copyConstructorProperties$1"),Vo=f,zo=p,Ho=/#|\.prototype\./,R=a(function(r,n){var t=qo[Wo(r)];return t==Zo?!0:t==Xo?!1:zo(n)?Vo(n):!!n},"isForced$1"),Wo=R.normalize=function(r){return String(r).replace(Ho,".").toLowerCase()},qo=R.data={},Xo=R.NATIVE="N",Zo=R.POLYFILL="P",Jo=R,dr=m,Qo=Gr.f,Yo=Nr,ru=nt,nu=wr,tu=Uo,eu=Jo,kr=a(function(r,n){var t=r.target,e=r.global,i=r.stat,u,l,o,v,s,P;if(e?l=dr:i?l=dr[t]||nu(t,{}):l=(dr[t]||{}).prototype,l)for(o in n){if(s=n[o],r.dontCallGetSet?(P=Qo(l,o),v=P&&P.value):v=l[o],u=eu(e?o:t+(i?".":"#")+o,r.forced),!u&&v!==void 0){if(typeof s==typeof v)continue;tu(s,v)}(r.sham||v&&v.sham)&&Yo(s,"sham",!0),ru(l,o,s,r)}},"_export"),au=Rr,iu=w,ou=Lr,$t=a(function(r,n,t){var e=au(n);e in r?iu.f(r,e,ou(0,t)):r[e]=t},"createProperty$2"),uu=f,lu=I,vu=Bn,fu=lu("species"),cu=a(function(r){return vu>=51||!uu(function(){var n=[],t=n.constructor={};return t[fu]=function(){return{foo:1}},n[r](Boolean).foo!==1})},"arrayMethodHasSpeciesSupport$1"),su=c,pu=su([].slice),du=kr,Tn=ot,yu=ct,mu=b,Pn=Kr,bu=W,$u=A,gu=$t,Su=I,hu=cu,Ou=pu,xu=hu("slice"),Eu=Su("species"),yr=Array,Iu=Math.max;du({target:"Array",proto:!0,forced:!xu},{slice:a(function(n,t){var e=$u(this),i=bu(e),u=Pn(n,i),l=Pn(t===void 0?i:t,i),o,v,s;if(Tn(e)&&(o=e.constructor,yu(o)&&(o===yr||Tn(o.prototype))?o=void 0:mu(o)&&(o=o[Eu],o===null&&(o=void 0)),o===yr||o===void 0))return Ou(e,u,l);for(v=new(o===void 0?yr:o)(Iu(l-u,0)),s=0;u<l;u++,s++)u in e&&gu(v,s,e[u]);return v.length=s,v},"slice")});var wu=f,gt=!wu(function(){return Object.isExtensible(Object.preventExtensions({}))}),Er={},Tu={get exports(){return Er},set exports(r){Er=r}},St={},jn=Kr,Pu=W,ju=$t,Mu=Array,_u=Math.max,Au=a(function(r,n,t){for(var e=Pu(r),i=jn(n,e),u=jn(t===void 0?e:t,e),l=Mu(_u(u-i,0)),o=0;i<u;i++,o++)ju(l,o,r[i]);return l.length=o,l},"arraySliceSimple"),Ru=T,Cu=A,ht=q.f,Lu=Au,Ot=typeof window=="object"&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],Nu=a(function(r){try{return ht(r)}catch{return Lu(Ot)}},"getWindowNames");St.f=a(function(n){return Ot&&Ru(n)=="Window"?Nu(n):ht(Cu(n))},"getOwnPropertyNames");var Du=f,Fu=Du(function(){if(typeof ArrayBuffer=="function"){var r=new ArrayBuffer(8);Object.isExtensible(r)&&Object.defineProperty(r,"a",{value:8})}}),Bu=f,Gu=b,Ku=T,Mn=Fu,k=Object.isExtensible,ku=Bu(function(){k(1)}),Uu=ku||Mn?a(function(n){return!Gu(n)||Mn&&Ku(n)=="ArrayBuffer"?!1:k?k(n):!0},"isExtensible"):k,Vu=kr,zu=c,Hu=Dr,Wu=b,Ur=S,qu=w.f,_n=q,Xu=St,Vr=Uu,Zu=jr,Ju=gt,xt=!1,$=Zu("meta"),Qu=0,zr=a(function(r){qu(r,$,{value:{objectID:"O"+Qu++,weakData:{}}})},"setMetadata"),Yu=a(function(r,n){if(!Wu(r))return typeof r=="symbol"?r:(typeof r=="string"?"S":"P")+r;if(!Ur(r,$)){if(!Vr(r))return"F";if(!n)return"E";zr(r)}return r[$].objectID},"fastKey"),rl=a(function(r,n){if(!Ur(r,$)){if(!Vr(r))return!0;if(!n)return!1;zr(r)}return r[$].weakData},"getWeakData"),nl=a(function(r){return Ju&&xt&&Vr(r)&&!Ur(r,$)&&zr(r),r},"onFreeze$1"),tl=a(function(){el.enable=function(){},xt=!0;var r=_n.f,n=zu([].splice),t={};t[$]=1,r(t).length&&(_n.f=function(e){for(var i=r(e),u=0,l=i.length;u<l;u++)if(i[u]===$){n(i,u,1);break}return i},Vu({target:"Object",stat:!0,forced:!0},{getOwnPropertyNames:Xu.f}))},"enable"),el=Tu.exports={enable:tl,fastKey:Yu,getWeakData:rl,onFreeze:nl};Hu[$]=!0;var al=kr,il=gt,ol=f,ul=b,ll=Er.onFreeze,Ir=Object.freeze,vl=ol(function(){Ir(1)});al({target:"Object",stat:!0,forced:vl,sham:!il},{freeze:a(function(n){return Ir&&ul(n)?Ir(ll(n)):n},"freeze")});var An;function fl(r,n){return n||(n=r.slice(0)),Object.freeze(Object.defineProperties(r,{raw:{value:Object.freeze(n)}}))}a(fl,"_taggedTemplateLiteral");function cl(r){return Tt(An||(An=fl([`
    `,` body {
      outline: 1px solid #2980b9 !important;
    }

    `,` article {
      outline: 1px solid #3498db !important;
    }

    `,` nav {
      outline: 1px solid #0088c3 !important;
    }

    `,` aside {
      outline: 1px solid #33a0ce !important;
    }

    `,` section {
      outline: 1px solid #66b8da !important;
    }

    `,` header {
      outline: 1px solid #99cfe7 !important;
    }

    `,` footer {
      outline: 1px solid #cce7f3 !important;
    }

    `,` h1 {
      outline: 1px solid #162544 !important;
    }

    `,` h2 {
      outline: 1px solid #314e6e !important;
    }

    `,` h3 {
      outline: 1px solid #3e5e85 !important;
    }

    `,` h4 {
      outline: 1px solid #449baf !important;
    }

    `,` h5 {
      outline: 1px solid #c7d1cb !important;
    }

    `,` h6 {
      outline: 1px solid #4371d0 !important;
    }

    `,` main {
      outline: 1px solid #2f4f90 !important;
    }

    `,` address {
      outline: 1px solid #1a2c51 !important;
    }

    `,` div {
      outline: 1px solid #036cdb !important;
    }

    `,` p {
      outline: 1px solid #ac050b !important;
    }

    `,` hr {
      outline: 1px solid #ff063f !important;
    }

    `,` pre {
      outline: 1px solid #850440 !important;
    }

    `,` blockquote {
      outline: 1px solid #f1b8e7 !important;
    }

    `,` ol {
      outline: 1px solid #ff050c !important;
    }

    `,` ul {
      outline: 1px solid #d90416 !important;
    }

    `,` li {
      outline: 1px solid #d90416 !important;
    }

    `,` dl {
      outline: 1px solid #fd3427 !important;
    }

    `,` dt {
      outline: 1px solid #ff0043 !important;
    }

    `,` dd {
      outline: 1px solid #e80174 !important;
    }

    `,` figure {
      outline: 1px solid #ff00bb !important;
    }

    `,` figcaption {
      outline: 1px solid #bf0032 !important;
    }

    `,` table {
      outline: 1px solid #00cc99 !important;
    }

    `,` caption {
      outline: 1px solid #37ffc4 !important;
    }

    `,` thead {
      outline: 1px solid #98daca !important;
    }

    `,` tbody {
      outline: 1px solid #64a7a0 !important;
    }

    `,` tfoot {
      outline: 1px solid #22746b !important;
    }

    `,` tr {
      outline: 1px solid #86c0b2 !important;
    }

    `,` th {
      outline: 1px solid #a1e7d6 !important;
    }

    `,` td {
      outline: 1px solid #3f5a54 !important;
    }

    `,` col {
      outline: 1px solid #6c9a8f !important;
    }

    `,` colgroup {
      outline: 1px solid #6c9a9d !important;
    }

    `,` button {
      outline: 1px solid #da8301 !important;
    }

    `,` datalist {
      outline: 1px solid #c06000 !important;
    }

    `,` fieldset {
      outline: 1px solid #d95100 !important;
    }

    `,` form {
      outline: 1px solid #d23600 !important;
    }

    `,` input {
      outline: 1px solid #fca600 !important;
    }

    `,` keygen {
      outline: 1px solid #b31e00 !important;
    }

    `,` label {
      outline: 1px solid #ee8900 !important;
    }

    `,` legend {
      outline: 1px solid #de6d00 !important;
    }

    `,` meter {
      outline: 1px solid #e8630c !important;
    }

    `,` optgroup {
      outline: 1px solid #b33600 !important;
    }

    `,` option {
      outline: 1px solid #ff8a00 !important;
    }

    `,` output {
      outline: 1px solid #ff9619 !important;
    }

    `,` progress {
      outline: 1px solid #e57c00 !important;
    }

    `,` select {
      outline: 1px solid #e26e0f !important;
    }

    `,` textarea {
      outline: 1px solid #cc5400 !important;
    }

    `,` details {
      outline: 1px solid #33848f !important;
    }

    `,` summary {
      outline: 1px solid #60a1a6 !important;
    }

    `,` command {
      outline: 1px solid #438da1 !important;
    }

    `,` menu {
      outline: 1px solid #449da6 !important;
    }

    `,` del {
      outline: 1px solid #bf0000 !important;
    }

    `,` ins {
      outline: 1px solid #400000 !important;
    }

    `,` img {
      outline: 1px solid #22746b !important;
    }

    `,` iframe {
      outline: 1px solid #64a7a0 !important;
    }

    `,` embed {
      outline: 1px solid #98daca !important;
    }

    `,` object {
      outline: 1px solid #00cc99 !important;
    }

    `,` param {
      outline: 1px solid #37ffc4 !important;
    }

    `,` video {
      outline: 1px solid #6ee866 !important;
    }

    `,` audio {
      outline: 1px solid #027353 !important;
    }

    `,` source {
      outline: 1px solid #012426 !important;
    }

    `,` canvas {
      outline: 1px solid #a2f570 !important;
    }

    `,` track {
      outline: 1px solid #59a600 !important;
    }

    `,` map {
      outline: 1px solid #7be500 !important;
    }

    `,` area {
      outline: 1px solid #305900 !important;
    }

    `,` a {
      outline: 1px solid #ff62ab !important;
    }

    `,` em {
      outline: 1px solid #800b41 !important;
    }

    `,` strong {
      outline: 1px solid #ff1583 !important;
    }

    `,` i {
      outline: 1px solid #803156 !important;
    }

    `,` b {
      outline: 1px solid #cc1169 !important;
    }

    `,` u {
      outline: 1px solid #ff0430 !important;
    }

    `,` s {
      outline: 1px solid #f805e3 !important;
    }

    `,` small {
      outline: 1px solid #d107b2 !important;
    }

    `,` abbr {
      outline: 1px solid #4a0263 !important;
    }

    `,` q {
      outline: 1px solid #240018 !important;
    }

    `,` cite {
      outline: 1px solid #64003c !important;
    }

    `,` dfn {
      outline: 1px solid #b4005a !important;
    }

    `,` sub {
      outline: 1px solid #dba0c8 !important;
    }

    `,` sup {
      outline: 1px solid #cc0256 !important;
    }

    `,` time {
      outline: 1px solid #d6606d !important;
    }

    `,` code {
      outline: 1px solid #e04251 !important;
    }

    `,` kbd {
      outline: 1px solid #5e001f !important;
    }

    `,` samp {
      outline: 1px solid #9c0033 !important;
    }

    `,` var {
      outline: 1px solid #d90047 !important;
    }

    `,` mark {
      outline: 1px solid #ff0053 !important;
    }

    `,` bdi {
      outline: 1px solid #bf3668 !important;
    }

    `,` bdo {
      outline: 1px solid #6f1400 !important;
    }

    `,` ruby {
      outline: 1px solid #ff7b93 !important;
    }

    `,` rt {
      outline: 1px solid #ff2f54 !important;
    }

    `,` rp {
      outline: 1px solid #803e49 !important;
    }

    `,` span {
      outline: 1px solid #cc2643 !important;
    }

    `,` br {
      outline: 1px solid #db687d !important;
    }

    `,` wbr {
      outline: 1px solid #db175b !important;
    }`])),r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r)}a(cl,"outlineCSS");var sl=a(function(n,t){var e=t.globals,i=e[pt]===!0,u=t.viewMode==="docs",l=Pt(function(){var o=u?"#anchor--".concat(t.id," .docs-story"):".sb-show-main";return cl(o)},[t]);return jt(function(){var o=u?"addon-outline-docs-".concat(t.id):"addon-outline";return i?ao(o,l):On(o),function(){On(o)}},[i,l,t]),n()},"withOutline");function pl(r,n,t){return n in r?Object.defineProperty(r,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):r[n]=t,r}a(pl,"_defineProperty");var Ol=[sl],xl=pl({},pt,!1);export{Ol as decorators,xl as globals};
//# sourceMappingURL=preview-85296ebc.js.map
