"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[9052],{4137:(e,t,u)=>{u.d(t,{Zo:()=>c,kt:()=>m});var n=u(7294);function o(e,t,u){return t in e?Object.defineProperty(e,t,{value:u,enumerable:!0,configurable:!0,writable:!0}):e[t]=u,e}function l(e,t){var u=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),u.push.apply(u,n)}return u}function r(e){for(var t=1;t<arguments.length;t++){var u=null!=arguments[t]?arguments[t]:{};t%2?l(Object(u),!0).forEach((function(t){o(e,t,u[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(u)):l(Object(u)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(u,t))}))}return e}function s(e,t){if(null==e)return{};var u,n,o=function(e,t){if(null==e)return{};var u,n,o={},l=Object.keys(e);for(n=0;n<l.length;n++)u=l[n],t.indexOf(u)>=0||(o[u]=e[u]);return o}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(n=0;n<l.length;n++)u=l[n],t.indexOf(u)>=0||Object.prototype.propertyIsEnumerable.call(e,u)&&(o[u]=e[u])}return o}var p=n.createContext({}),a=function(e){var t=n.useContext(p),u=t;return e&&(u="function"==typeof e?e(t):r(r({},t),e)),u},c=function(e){var t=a(e.components);return n.createElement(p.Provider,{value:t},e.children)},i={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var u=e.components,o=e.mdxType,l=e.originalType,p=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),d=a(u),m=o,f=d["".concat(p,".").concat(m)]||d[m]||i[m]||l;return u?n.createElement(f,r(r({ref:t},c),{},{components:u})):n.createElement(f,r({ref:t},c))}));function m(e,t){var u=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var l=u.length,r=new Array(l);r[0]=d;var s={};for(var p in t)hasOwnProperty.call(t,p)&&(s[p]=t[p]);s.originalType=e,s.mdxType="string"==typeof e?e:o,r[1]=s;for(var a=2;a<l;a++)r[a]=u[a];return n.createElement.apply(null,r)}return n.createElement.apply(null,u)}d.displayName="MDXCreateElement"},2104:(e,t,u)=>{u.r(t),u.d(t,{assets:()=>p,contentTitle:()=>r,default:()=>i,frontMatter:()=>l,metadata:()=>s,toc:()=>a});var n=u(7462),o=(u(7294),u(4137));const l={id:"close-pull-requests-count-output",title:"Close pull requests count output",description:"All the information you need to know about the close pull requests count output.\nIncluding a detailed description and an example.\n",tags:["Pull requests","Outputs","Closing"]},r=void 0,s={unversionedId:"pull-requests/outputs/close-pull-requests-count-output",id:"pull-requests/outputs/close-pull-requests-count-output",title:"Close pull requests count output",description:"All the information you need to know about the close pull requests count output.\nIncluding a detailed description and an example.\n",source:"@site/docs/08-pull-requests/02-outputs/08-close-pull-requests-count-output.mdx",sourceDirName:"08-pull-requests/02-outputs",slug:"/pull-requests/outputs/close-pull-requests-count-output",permalink:"/stale/docs/pull-requests/outputs/close-pull-requests-count-output",draft:!1,editUrl:"https://github.com/Sonia-corporation/stale/tree/develop/documentation/docs/08-pull-requests/02-outputs/08-close-pull-requests-count-output.mdx",tags:[{label:"Pull requests",permalink:"/stale/docs/tags/pull-requests"},{label:"Outputs",permalink:"/stale/docs/tags/outputs"},{label:"Closing",permalink:"/stale/docs/tags/closing"}],version:"current",sidebarPosition:8,frontMatter:{id:"close-pull-requests-count-output",title:"Close pull requests count output",description:"All the information you need to know about the close pull requests count output.\nIncluding a detailed description and an example.\n",tags:["Pull requests","Outputs","Closing"]},sidebar:"tutorialSidebar",previous:{title:"Remove stale pull requests count output",permalink:"/stale/docs/pull-requests/outputs/remove-stale-pull-requests-count-output"},next:{title:"Deleted pull requests branches count output",permalink:"/stale/docs/pull-requests/outputs/deleted-pull-requests-branches-count-output"}},p={},a=[{value:"Output",id:"output",level:3},{value:"Description",id:"description",level:3},{value:"Example",id:"example",level:3}],c={toc:a};function i(e){let{components:t,...u}=e;return(0,o.kt)("wrapper",(0,n.Z)({},c,u,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h3",{id:"output"},"Output"),(0,o.kt)("p",null,"Name: ",(0,o.kt)("inlineCode",{parentName:"p"},"close-pull-requests-count"),(0,o.kt)("br",{parentName:"p"}),"\n","Type: ",(0,o.kt)("inlineCode",{parentName:"p"},"number")),(0,o.kt)("h3",{id:"description"},"Description"),(0,o.kt)("p",null,"This output will expose the number of pull requests closed."),(0,o.kt)("h3",{id:"example"},"Example"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-yml",metastring:"{6-7}","{6-7}":!0},'# ...\nsteps:\n  - name: Stale\n    id: stale\n    uses: sonia-corporation/stale@latest\n  - name: Count\n    run: echo "${{ steps.Stale.outputs.close-pull-requests-count }}"\n')))}i.isMDXComponent=!0}}]);