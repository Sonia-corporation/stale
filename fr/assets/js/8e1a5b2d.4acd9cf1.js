"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[9672],{4137:(e,t,u)=>{u.d(t,{Zo:()=>i,kt:()=>m});var l=u(7294);function n(e,t,u){return t in e?Object.defineProperty(e,t,{value:u,enumerable:!0,configurable:!0,writable:!0}):e[t]=u,e}function r(e,t){var u=Object.keys(e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);t&&(l=l.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),u.push.apply(u,l)}return u}function o(e){for(var t=1;t<arguments.length;t++){var u=null!=arguments[t]?arguments[t]:{};t%2?r(Object(u),!0).forEach((function(t){n(e,t,u[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(u)):r(Object(u)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(u,t))}))}return e}function s(e,t){if(null==e)return{};var u,l,n=function(e,t){if(null==e)return{};var u,l,n={},r=Object.keys(e);for(l=0;l<r.length;l++)u=r[l],t.indexOf(u)>=0||(n[u]=e[u]);return n}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(l=0;l<r.length;l++)u=r[l],t.indexOf(u)>=0||Object.prototype.propertyIsEnumerable.call(e,u)&&(n[u]=e[u])}return n}var a=l.createContext({}),p=function(e){var t=l.useContext(a),u=t;return e&&(u="function"==typeof e?e(t):o(o({},t),e)),u},i=function(e){var t=p(e.components);return l.createElement(a.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return l.createElement(l.Fragment,{},t)}},c=l.forwardRef((function(e,t){var u=e.components,n=e.mdxType,r=e.originalType,a=e.parentName,i=s(e,["components","mdxType","originalType","parentName"]),c=p(u),m=n,b=c["".concat(a,".").concat(m)]||c[m]||d[m]||r;return u?l.createElement(b,o(o({ref:t},i),{},{components:u})):l.createElement(b,o({ref:t},i))}));function m(e,t){var u=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var r=u.length,o=new Array(r);o[0]=c;var s={};for(var a in t)hasOwnProperty.call(t,a)&&(s[a]=t[a]);s.originalType=e,s.mdxType="string"==typeof e?e:n,o[1]=s;for(var p=2;p<r;p++)o[p]=u[p];return l.createElement.apply(null,o)}return l.createElement.apply(null,u)}c.displayName="MDXCreateElement"},9331:(e,t,u)=>{u.r(t),u.d(t,{assets:()=>a,contentTitle:()=>o,default:()=>d,frontMatter:()=>r,metadata:()=>s,toc:()=>p});var l=u(7462),n=(u(7294),u(4137));const r={id:"added-pull-requests-labels-count-output",title:"Added pull requests labels count output",description:"All the information you need to know about the added pull requests labels count output.\nIncluding a detailed description and an example.\n",tags:["Pull requests","Outputs"]},o=void 0,s={unversionedId:"pull-requests/outputs/added-pull-requests-labels-count-output",id:"pull-requests/outputs/added-pull-requests-labels-count-output",title:"Added pull requests labels count output",description:"All the information you need to know about the added pull requests labels count output.\nIncluding a detailed description and an example.\n",source:"@site/docs/08-pull-requests/02-outputs/12-added-pull-requests-labels-count-output.mdx",sourceDirName:"08-pull-requests/02-outputs",slug:"/pull-requests/outputs/added-pull-requests-labels-count-output",permalink:"/stale/fr/docs/pull-requests/outputs/added-pull-requests-labels-count-output",draft:!1,editUrl:"https://github.com/Sonia-corporation/stale/tree/develop/documentation/docs/08-pull-requests/02-outputs/12-added-pull-requests-labels-count-output.mdx",tags:[{label:"Pull requests",permalink:"/stale/fr/docs/tags/pull-requests"},{label:"Outputs",permalink:"/stale/fr/docs/tags/outputs"}],version:"current",sidebarPosition:12,frontMatter:{id:"added-pull-requests-labels-count-output",title:"Added pull requests labels count output",description:"All the information you need to know about the added pull requests labels count output.\nIncluding a detailed description and an example.\n",tags:["Pull requests","Outputs"]},sidebar:"tutorialSidebar",previous:{title:"Pull requests labels count output",permalink:"/stale/fr/docs/pull-requests/outputs/pull-requests-labels-count-output"},next:{title:"Removed pull requests labels count output",permalink:"/stale/fr/docs/pull-requests/outputs/removed-pull-requests-labels-count-output"}},a={},p=[{value:"Output",id:"output",level:3},{value:"Description",id:"description",level:3},{value:"Example",id:"example",level:3}],i={toc:p};function d(e){let{components:t,...u}=e;return(0,n.kt)("wrapper",(0,l.Z)({},i,u,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("h3",{id:"output"},"Output"),(0,n.kt)("p",null,"Name: ",(0,n.kt)("inlineCode",{parentName:"p"},"added-pull-requests-labels-count"),(0,n.kt)("br",{parentName:"p"}),"\n","Type: ",(0,n.kt)("inlineCode",{parentName:"p"},"number")),(0,n.kt)("h3",{id:"description"},"Description"),(0,n.kt)("p",null,"This output will expose the number of added pull requests labels."),(0,n.kt)("h3",{id:"example"},"Example"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-yml",metastring:"{6-7}","{6-7}":!0},'# ...\nsteps:\n  - name: Stale\n    id: stale\n    uses: sonia-corporation/stale@latest\n  - name: Count\n    run: echo "${{ steps.Stale.outputs.added-pull-requests-labels-count }}"\n')))}d.isMDXComponent=!0}}]);