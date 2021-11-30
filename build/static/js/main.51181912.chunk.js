(this["webpackJsonplogin-hint-token-generator"]=this["webpackJsonplogin-hint-token-generator"]||[]).push([[0],{115:function(e,t,a){},117:function(e,t){},128:function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),i=a(14),r=a.n(i),l=(a(115),a(15)),o=a(199),s=a(193),u=a(180),j=a(195),b=a(182),p=a(196),d=a(192),g=a(185),m=a(98),h=a.n(m),O=a(97),f=a.n(O),x=a(194),v=a(82),y=a(93),S=a.n(y),k=a(197),N=a(200),C=a(184),A=a(183),T=a(186),D=a(177),P=(a(90),a(91)),E=a.n(P),I=a(78),w=a.n(I),M=a(92),W=a.n(M),_=a(81),F=a.n(_),J=a(3),L=Object(D.a)((function(e){return{root:{display:"flex",flexDirection:"column",alignItems:"stretch",justifyContent:"space-around",color:"#2E4355"},innerMain:{display:"flex",margin:"0",flexDirection:"column",alignItems:"center",justifyContent:"space-around",color:"#2E4355"},image:{backgroundImage:"url(https://pingidentity.com/content/dam/ping-6-2-assets/open-graph-images/2019/P14C-Build-OG.png)",backgroundRepeat:"no-repeat",backgroundColor:"#576877",backgroundSize:"cover",backgroundPosition:"center",maxHeight:"20%"},avatar:{margin:e.spacing(1),backgroundColor:"#2E4355"},form:{width:"100%",marginTop:"0"},submit:{backgroundColor:"#2E4355",margin:e.spacing(1,0,1)},typography:{color:"#2E4355",fontSize:"1%"},errorMessage:{color:"red"},input:{margin:e.spacing(0,0,1)},linkText:{margin:e.spacing(1,0,1),textAlign:"center",fontSize:"2rem"},customInputLabel:{"& legend":{visibility:"visible"},margin:e.spacing(0,0,1)}}}));function U(){var e=L(),t=Object(n.useState)(""),a=Object(l.a)(t,2),c=a[0],i=a[1],r=Object(n.useState)(""),m=Object(l.a)(r,2),O=m[0],y=m[1],D=Object(n.useState)(""),P=Object(l.a)(D,2),I=P[0],M=P[1],_=Object(n.useState)(!1),U=Object(l.a)(_,2),q=U[0],R=U[1],z=Object(n.useState)(""),B=Object(l.a)(z,2),H=B[0],G=B[1],V=Object(n.useState)("NA"),Y=Object(l.a)(V,2),$=Y[0],K=Y[1],Q=Object(n.useState)(""),X=Object(l.a)(Q,2),Z=X[0],ee=X[1],te=Object(n.useState)(""),ae=Object(l.a)(te,2),ne=ae[0],ce=ae[1],ie=function(e,t,a,n,c){var i=re(c),r=a,l=Math.floor(Date.now()/1e3),o={iss:t,aud:"".concat(i,"/").concat(e,"/as"),sub:n,iat:l-300,exp:l+86400},s=w.a.parse(JSON.stringify({typ:"JWT",alg:"HS256"})),u=le(s),j=w.a.parse(JSON.stringify(o)),b=le(j),p="".concat(u,".").concat(b),d=W()(p,r);d=le(d);var g="".concat(p,".").concat(d),m=i.replace("auth","apps"),h="".concat(m,"/").concat(e,"/myaccount/?login_hint_token=").concat(g,"#mfa"),O={};return O.login_hint_token=g,O.myaccount=h,O},re=function(e){switch(e=e.toLowerCase()){case"na":return"https://auth.pingone.com";case"eu":return"https://auth.pingone.eu";case"ap":return"https://auth.pingone.asia";case"ca":return"https://auth.pingone.ca";case"ort":return"https://auth-staging.pingone.com";case"test":return"https://auth-test.pingone.com"}},le=function(e){var t=E.a.stringify(e);return t=(t=(t=t.replace(/=+$/,"")).replace(/\+/g,"-")).replace(/\//g,"_")};return Object(J.jsx)(u.a,{spacing:0,className:e.root,children:Object(J.jsxs)(b.a,{container:!0,display:"flex",component:"main",className:e.innerMain,direction:"column",children:[Object(J.jsx)(b.a,{item:!0,justify:"center",style:{flex:"1 1 1"},children:Object(J.jsx)(o.a,{className:e.avatar,children:Object(J.jsx)(S.a,{})})}),Object(J.jsx)(b.a,{item:!0,container:!0,display:"flex",direction:"column",justify:"center",alignItems:"stretch",style:{flex:"10 1 auto"},children:Object(J.jsx)("form",{className:e.form,noValidate:!0,onSubmit:function(e){e.preventDefault();try{var t=ie(O,c,I,H,$);ee(t.login_hint_token),ce(t.myaccount)}catch(n){var a=JSON.stringify(n);console.error(n),console.error(a)}},children:Object(J.jsxs)(A.a,{fullWidth:!0,children:[Object(J.jsx)(b.a,{item:!0,className:e.input,justify:"center",alignSelf:"center",children:Object(J.jsxs)(N.a,{row:!0,"aria-label":"geo",name:"geo",value:$,onChange:function(e){e.preventDefault(),K(e.target.value)},style:{justifyContent:"center"},children:[Object(J.jsx)(C.a,{value:"NA",control:Object(J.jsx)(k.a,{color:"primary"}),label:"NA",labelPlacement:"top"}),Object(J.jsx)(C.a,{value:"EU",control:Object(J.jsx)(k.a,{color:"primary"}),label:"EU",labelPlacement:"top"}),Object(J.jsx)(C.a,{value:"AP",control:Object(J.jsx)(k.a,{color:"primary"}),label:"AP",labelPlacement:"top"}),Object(J.jsx)(C.a,{value:"CA",control:Object(J.jsx)(k.a,{color:"primary"}),label:"CA",labelPlacement:"top"}),Object(J.jsx)(C.a,{value:"ORT",control:Object(J.jsx)(k.a,{color:"primary"}),label:"ORT",labelPlacement:"top"}),Object(J.jsx)(C.a,{value:"Test",control:Object(J.jsx)(k.a,{color:"primary"}),label:"TEST",labelPlacement:"top"})]})}),Object(J.jsx)(b.a,{item:!0,className:e.input,children:Object(J.jsx)(j.a,{id:"env-id",label:"Environment ID",variant:"outlined",value:O,onChange:function(e){e.preventDefault(),y(e.target.value)},fullWidth:!0,required:!0})}),Object(J.jsx)(b.a,{item:!0,className:e.input,children:Object(J.jsx)(j.a,{id:"app-id",label:"Application ID",variant:"outlined",value:c,onChange:function(e){e.preventDefault(),i(e.target.value)},fullWidth:!0,required:!0})}),Object(J.jsx)(b.a,{item:!0,className:e.input,children:Object(J.jsx)(p.a,{id:"outlined-adornment-app-secret",label:"Application Secret",placeholder:"Application Secret *",variant:"outlined",value:I,onChange:function(e){e.preventDefault(),M(e.target.value)},classes:{focused:e.customInputLabel},fullWidth:!0,required:!0,type:q?"text":"password",endAdornment:Object(J.jsx)(d.a,{position:"end",children:Object(J.jsx)(g.a,{"aria-label":"toggle password visibility",onClick:function(e){R(!q)},onMouseDown:function(e){e.preventDefault()},edge:"end",children:q?Object(J.jsx)(f.a,{}):Object(J.jsx)(h.a,{})})})})}),Object(J.jsx)(b.a,{item:!0,className:e.input,children:Object(J.jsx)(j.a,{id:"user-id",label:"User ID/Username",variant:"outlined",value:H,onChange:function(e){e.preventDefault(),G(e.target.value)},fullWidth:!0,required:!0})}),Object(J.jsx)(b.a,{item:!0,className:e.input,children:Object(J.jsx)(s.a,{type:"submit",variant:"contained",color:"primary",fullWidth:!0,className:e.submit,children:"Generate"})}),Object(J.jsx)(b.a,{item:!0,className:e.input,children:Object(J.jsx)(j.a,{id:"login-hint-token",label:"Login Hint Token",variant:"outlined",value:Z,multiline:!0,fullWidth:!0})}),Object(J.jsx)(T.a,{children:"If MyAccount fails to open, check:"}),Object(J.jsx)(T.a,{children:" 1. The user is enabled and MFA is enabled for the user"}),Object(J.jsx)(T.a,{children:" 2. The app is enabled"}),Object(J.jsx)(T.a,{children:" 3. You selected the right geography (NA, EU, AP, ORT, TEST)"}),Object(J.jsx)(b.a,{item:!0,className:e.input,children:ne.length>1?Object(J.jsx)(v.a,{className:e.linkText,children:Object(J.jsxs)(x.a,{href:ne,target:"_blank",rel:"noreferrer noopener",color:"inherit",variant:"inherit",children:[Object(J.jsx)(F.a,{}),"My Account",Object(J.jsx)(F.a,{})]})}):Object(J.jsx)(J.Fragment,{})})]})})})]})})}var q=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,202)).then((function(t){var a=t.getCLS,n=t.getFID,c=t.getFCP,i=t.getLCP,r=t.getTTFB;a(e),n(e),c(e),i(e),r(e)}))};r.a.render(Object(J.jsx)(c.a.StrictMode,{children:Object(J.jsx)(U,{})}),document.getElementById("root")),q()}},[[128,1,2]]]);
//# sourceMappingURL=main.51181912.chunk.js.map