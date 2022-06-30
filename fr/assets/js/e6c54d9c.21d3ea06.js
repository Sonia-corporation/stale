"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[2296],{4137:(e,t,u)=>{u.d(t,{Zo:()=>i,kt:()=>d});var r=u(7294);function n(e,t,u){return t in e?Object.defineProperty(e,t,{value:u,enumerable:!0,configurable:!0,writable:!0}):e[t]=u,e}function o(e,t){var u=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),u.push.apply(u,r)}return u}function l(e){for(var t=1;t<arguments.length;t++){var u=null!=arguments[t]?arguments[t]:{};t%2?o(Object(u),!0).forEach((function(t){n(e,t,u[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(u)):o(Object(u)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(u,t))}))}return e}function s(e,t){if(null==e)return{};var u,r,n=function(e,t){if(null==e)return{};var u,r,n={},o=Object.keys(e);for(r=0;r<o.length;r++)u=o[r],t.indexOf(u)>=0||(n[u]=e[u]);return n}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)u=o[r],t.indexOf(u)>=0||Object.prototype.propertyIsEnumerable.call(e,u)&&(n[u]=e[u])}return n}var a=r.createContext({}),p=function(e){var t=r.useContext(a),u=t;return e&&(u="function"==typeof e?e(t):l(l({},t),e)),u},i=function(e){var t=p(e.components);return r.createElement(a.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var u=e.components,n=e.mdxType,o=e.originalType,a=e.parentName,i=s(e,["components","mdxType","originalType","parentName"]),m=p(u),d=n,f=m["".concat(a,".").concat(d)]||m[d]||c[d]||o;return u?r.createElement(f,l(l({ref:t},i),{},{components:u})):r.createElement(f,l({ref:t},i))}));function d(e,t){var u=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var o=u.length,l=new Array(o);l[0]=m;var s={};for(var a in t)hasOwnProperty.call(t,a)&&(s[a]=t[a]);s.originalType=e,s.mdxType="string"==typeof e?e:n,l[1]=s;for(var p=2;p<o;p++)l[p]=u[p];return r.createElement.apply(null,l)}return r.createElement.apply(null,u)}m.displayName="MDXCreateElement"},8824:(e,t,u)=>{u.r(t),u.d(t,{assets:()=>a,contentTitle:()=>l,default:()=>c,frontMatter:()=>o,metadata:()=>s,toc:()=>p});var r=u(7462),n=(u(7294),u(4137));const o={id:"remove-stale-pull-requests-count-output",title:"Remove stale pull requests count output",description:"All the information you need to know about the remove stale pull requests count output.\nIncluding a detailed description and an example.\n",tags:["Pull requests","Outputs"]},l=void 0,s={unversionedId:"pull-requests/outputs/remove-stale-pull-requests-count-output",id:"pull-requests/outputs/remove-stale-pull-requests-count-output",title:"Remove stale pull requests count output",description:"All the information you need to know about the remove stale pull requests count output.\nIncluding a detailed description and an example.\n",source:"@site/docs/08-pull-requests/02-outputs/07-remove-stale-pull-requests-count-output.mdx",sourceDirName:"08-pull-requests/02-outputs",slug:"/pull-requests/outputs/remove-stale-pull-requests-count-output",permalink:"/stale/fr/docs/pull-requests/outputs/remove-stale-pull-requests-count-output",draft:!1,editUrl:"https://github.com/Sonia-corporation/stale/tree/develop/documentation/docs/08-pull-requests/02-outputs/07-remove-stale-pull-requests-count-output.mdx",tags:[{label:"Pull requests",permalink:"/stale/fr/docs/tags/pull-requests"},{label:"Outputs",permalink:"/stale/fr/docs/tags/outputs"}],version:"current",sidebarPosition:7,frontMatter:{id:"remove-stale-pull-requests-count-output",title:"Remove stale pull requests count output",description:"All the information you need to know about the remove stale pull requests count output.\nIncluding a detailed description and an example.\n",tags:["Pull requests","Outputs"]},sidebar:"tutorialSidebar",previous:{title:"Already stale pull requests count output",permalink:"/stale/fr/docs/pull-requests/outputs/already-stale-pull-requests-count-output"},next:{title:"Close pull requests count output",permalink:"/stale/fr/docs/pull-requests/outputs/close-pull-requests-count-output"}},a={},p=[{value:"Output",id:"output",level:3},{value:"Description",id:"description",level:3},{value:"Example",id:"example",level:3}],i={toc:p};function c(e){let{components:t,...u}=e;return(0,n.kt)("wrapper",(0,r.Z)({},i,u,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("h3",{id:"output"},"Output"),(0,n.kt)("p",null,"Name: ",(0,n.kt)("inlineCode",{parentName:"p"},"remove-stale-pull-requests-count"),(0,n.kt)("br",{parentName:"p"}),"\n","Type: ",(0,n.kt)("inlineCode",{parentName:"p"},"number")),(0,n.kt)("h3",{id:"description"},"Description"),(0,n.kt)("p",null,"This output will expose the number of pull requests from where the stale state was removed."),(0,n.kt)("h3",{id:"example"},"Example"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-yml",metastring:"{6-7}","{6-7}":!0},'# ...\nsteps:\n  - name: Stale\n    id: stale\n    uses: sonia-corporation/stale@latest\n  - name: Count\n    run: echo "${{ steps.Stale.outputs.remove-stale-pull-requests-count }}"\n')))}c.isMDXComponent=!0}}]);