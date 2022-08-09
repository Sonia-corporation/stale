"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[8408],{4137:(e,t,n)=>{n.d(t,{Zo:()=>s,kt:()=>d});var o=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function u(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},i=Object.keys(e);for(o=0;o<i.length;o++)n=i[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(o=0;o<i.length;o++)n=i[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var p=o.createContext({}),l=function(e){var t=o.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},s=function(e){var t=l(e.components);return o.createElement(p.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},m=o.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,p=e.parentName,s=u(e,["components","mdxType","originalType","parentName"]),m=l(n),d=r,b=m["".concat(p,".").concat(d)]||m[d]||c[d]||i;return n?o.createElement(b,a(a({ref:t},s),{},{components:n})):o.createElement(b,a({ref:t},s))}));function d(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,a=new Array(i);a[0]=m;var u={};for(var p in t)hasOwnProperty.call(t,p)&&(u[p]=t[p]);u.originalType=e,u.mdxType="string"==typeof e?e:r,a[1]=u;for(var l=2;l<i;l++)a[l]=n[l];return o.createElement.apply(null,a)}return o.createElement.apply(null,n)}m.displayName="MDXCreateElement"},9640:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>a,default:()=>c,frontMatter:()=>i,metadata:()=>u,toc:()=>l});var o=n(7462),r=(n(7294),n(4137));const i={id:"github-token-input",title:"GitHub token input",description:"All the information you need to know about the GitHub token common input.\nIncluding a detailed description and an example.\n",tags:["Common","Inputs"]},a=void 0,u={unversionedId:"github-token-input",id:"github-token-input",title:"GitHub token input",description:"All the information you need to know about the GitHub token common input.\nIncluding a detailed description and an example.\n",source:"@site/docs/05-github-token-input.mdx",sourceDirName:".",slug:"/github-token-input",permalink:"/stale/fr/docs/github-token-input",draft:!1,editUrl:"https://github.com/Sonia-corporation/stale/tree/develop/documentation/docs/05-github-token-input.mdx",tags:[{label:"Common",permalink:"/stale/fr/docs/tags/common"},{label:"Inputs",permalink:"/stale/fr/docs/tags/inputs"}],version:"current",sidebarPosition:5,frontMatter:{id:"github-token-input",title:"GitHub token input",description:"All the information you need to know about the GitHub token common input.\nIncluding a detailed description and an example.\n",tags:["Common","Inputs"]},sidebar:"tutorialSidebar",previous:{title:"All outputs",permalink:"/stale/fr/docs/all-outputs"},next:{title:"Dry-run input",permalink:"/stale/fr/docs/dry-run-input"}},p={},l=[{value:"Input",id:"input",level:3},{value:"Description",id:"description",level:3},{value:"Example",id:"example",level:3}],s={toc:l};function c(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,o.Z)({},s,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h3",{id:"input"},"Input"),(0,r.kt)("p",null,"Name: ",(0,r.kt)("inlineCode",{parentName:"p"},"github-token"),(0,r.kt)("br",{parentName:"p"}),"\n","Type: ",(0,r.kt)("inlineCode",{parentName:"p"},"string"),(0,r.kt)("br",{parentName:"p"}),"\n","Default value: ",(0,r.kt)("inlineCode",{parentName:"p"},"${{ github.token }}")),(0,r.kt)("h3",{id:"description"},"Description"),(0,r.kt)("p",null,"This input will let you define what GitHub token to use to perform the calls to the GitHub API.",(0,r.kt)("br",{parentName:"p"}),"\n","You can also read the ",(0,r.kt)("a",{parentName:"p",href:"https://docs.github.com/en/actions/security-guides/automatic-token-authentication"},"automatic token authentication")," to have more information."),(0,r.kt)("admonition",{type:"caution"},(0,r.kt)("p",{parentName:"admonition"},"Based on your configuration, make sure to give the proper ",(0,r.kt)("a",{parentName:"p",href:"https://docs.github.com/en/rest/reference/permissions-required-for-github-apps"},"permissions")," to your GitHub token.",(0,r.kt)("br",{parentName:"p"}),"\n","If not, you may end up having weird behaviours, where some data will be missing from the queries."),(0,r.kt)("p",{parentName:"admonition"},"Note that if you have unusual behaviours, a debug log is exposing the queried data from your issues and pull request.",(0,r.kt)("br",{parentName:"p"}),"\n","This may be very helpful to debug your workflow, before creating a ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/Sonia-corporation/stale/issues/new/choose"},"new issue"),".")),(0,r.kt)("admonition",{type:"info"},(0,r.kt)("p",{parentName:"admonition"},"Under the hood, the value will be consumed by the ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/actions/toolkit/tree/main/packages/github"},"@actions/github"),", through the ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/actions/toolkit/blob/fcb8c4ca798bd0d81a9b07e2f7dffee8397c4707/packages/github/src/github.ts#L15-L20"},"getOctokit method"),".")),(0,r.kt)("h3",{id:"example"},"Example"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yml",metastring:"{6}","{6}":!0},"# ...\nname: Stale\nid: stale\nuses: sonia-corporation/stale@latest\nwith:\n  github-token: ${{ env.GITHUB_TOKEN }}\n")))}c.isMDXComponent=!0}}]);