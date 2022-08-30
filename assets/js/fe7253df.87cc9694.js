"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[4901],{4137:(e,t,u)=>{u.d(t,{Zo:()=>i,kt:()=>m});var n=u(7294);function l(e,t,u){return t in e?Object.defineProperty(e,t,{value:u,enumerable:!0,configurable:!0,writable:!0}):e[t]=u,e}function r(e,t){var u=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),u.push.apply(u,n)}return u}function o(e){for(var t=1;t<arguments.length;t++){var u=null!=arguments[t]?arguments[t]:{};t%2?r(Object(u),!0).forEach((function(t){l(e,t,u[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(u)):r(Object(u)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(u,t))}))}return e}function s(e,t){if(null==e)return{};var u,n,l=function(e,t){if(null==e)return{};var u,n,l={},r=Object.keys(e);for(n=0;n<r.length;n++)u=r[n],t.indexOf(u)>=0||(l[u]=e[u]);return l}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(n=0;n<r.length;n++)u=r[n],t.indexOf(u)>=0||Object.prototype.propertyIsEnumerable.call(e,u)&&(l[u]=e[u])}return l}var a=n.createContext({}),p=function(e){var t=n.useContext(a),u=t;return e&&(u="function"==typeof e?e(t):o(o({},t),e)),u},i=function(e){var t=p(e.components);return n.createElement(a.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var u=e.components,l=e.mdxType,r=e.originalType,a=e.parentName,i=s(e,["components","mdxType","originalType","parentName"]),d=p(u),m=l,b=d["".concat(a,".").concat(m)]||d[m]||c[m]||r;return u?n.createElement(b,o(o({ref:t},i),{},{components:u})):n.createElement(b,o({ref:t},i))}));function m(e,t){var u=arguments,l=t&&t.mdxType;if("string"==typeof e||l){var r=u.length,o=new Array(r);o[0]=d;var s={};for(var a in t)hasOwnProperty.call(t,a)&&(s[a]=t[a]);s.originalType=e,s.mdxType="string"==typeof e?e:l,o[1]=s;for(var p=2;p<r;p++)o[p]=u[p];return n.createElement.apply(null,o)}return n.createElement.apply(null,u)}d.displayName="MDXCreateElement"},6092:(e,t,u)=>{u.r(t),u.d(t,{assets:()=>a,contentTitle:()=>o,default:()=>c,frontMatter:()=>r,metadata:()=>s,toc:()=>p});var n=u(7462),l=(u(7294),u(4137));const r={id:"pull-requests-labels-count-output",title:"Pull requests labels count output",description:"All the information you need to know about the mutated pull requests labels count output.\nIncluding a detailed description and an example.\n",tags:["Pull requests","Outputs"]},o=void 0,s={unversionedId:"pull-requests/outputs/pull-requests-labels-count-output",id:"pull-requests/outputs/pull-requests-labels-count-output",title:"Pull requests labels count output",description:"All the information you need to know about the mutated pull requests labels count output.\nIncluding a detailed description and an example.\n",source:"@site/docs/08-pull-requests/02-outputs/11-pull-requests-labels-count-output.mdx",sourceDirName:"08-pull-requests/02-outputs",slug:"/pull-requests/outputs/pull-requests-labels-count-output",permalink:"/stale/docs/pull-requests/outputs/pull-requests-labels-count-output",draft:!1,editUrl:"https://github.com/Sonia-corporation/stale/tree/develop/documentation/docs/08-pull-requests/02-outputs/11-pull-requests-labels-count-output.mdx",tags:[{label:"Pull requests",permalink:"/stale/docs/tags/pull-requests"},{label:"Outputs",permalink:"/stale/docs/tags/outputs"}],version:"current",sidebarPosition:11,frontMatter:{id:"pull-requests-labels-count-output",title:"Pull requests labels count output",description:"All the information you need to know about the mutated pull requests labels count output.\nIncluding a detailed description and an example.\n",tags:["Pull requests","Outputs"]},sidebar:"tutorialSidebar",previous:{title:"Added pull requests comments count output",permalink:"/stale/docs/pull-requests/outputs/added-pull-requests-comments-count-output"},next:{title:"Added pull requests labels count output",permalink:"/stale/docs/pull-requests/outputs/added-pull-requests-labels-count-output"}},a={},p=[{value:"Output",id:"output",level:3},{value:"Description",id:"description",level:3},{value:"Example",id:"example",level:3}],i={toc:p};function c(e){let{components:t,...u}=e;return(0,l.kt)("wrapper",(0,n.Z)({},i,u,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("h3",{id:"output"},"Output"),(0,l.kt)("p",null,"Name: ",(0,l.kt)("inlineCode",{parentName:"p"},"pull-requests-labels-count"),(0,l.kt)("br",{parentName:"p"}),"\n","Type: ",(0,l.kt)("inlineCode",{parentName:"p"},"number")),(0,l.kt)("h3",{id:"description"},"Description"),(0,l.kt)("p",null,"This output will expose the number of mutated pull requests labels (added or removed)."),(0,l.kt)("h3",{id:"example"},"Example"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-yml",metastring:"{6-7}","{6-7}":!0},'# ...\nsteps:\n  - name: Stale\n    id: stale\n    uses: sonia-corporation/stale@latest\n  - name: Count\n    run: echo "${{ steps.Stale.outputs.pull-requests-labels-count }}"\n')))}c.isMDXComponent=!0}}]);