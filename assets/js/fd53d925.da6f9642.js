"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[5090],{4137:(e,t,l)=>{l.d(t,{Zo:()=>p,kt:()=>b});var n=l(7294);function a(e,t,l){return t in e?Object.defineProperty(e,t,{value:l,enumerable:!0,configurable:!0,writable:!0}):e[t]=l,e}function r(e,t){var l=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),l.push.apply(l,n)}return l}function s(e){for(var t=1;t<arguments.length;t++){var l=null!=arguments[t]?arguments[t]:{};t%2?r(Object(l),!0).forEach((function(t){a(e,t,l[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(l)):r(Object(l)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(l,t))}))}return e}function i(e,t){if(null==e)return{};var l,n,a=function(e,t){if(null==e)return{};var l,n,a={},r=Object.keys(e);for(n=0;n<r.length;n++)l=r[n],t.indexOf(l)>=0||(a[l]=e[l]);return a}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(n=0;n<r.length;n++)l=r[n],t.indexOf(l)>=0||Object.prototype.propertyIsEnumerable.call(e,l)&&(a[l]=e[l])}return a}var u=n.createContext({}),o=function(e){var t=n.useContext(u),l=t;return e&&(l="function"==typeof e?e(t):s(s({},t),e)),l},p=function(e){var t=o(e.components);return n.createElement(u.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var l=e.components,a=e.mdxType,r=e.originalType,u=e.parentName,p=i(e,["components","mdxType","originalType","parentName"]),d=o(l),b=a,m=d["".concat(u,".").concat(b)]||d[b]||c[b]||r;return l?n.createElement(m,s(s({ref:t},p),{},{components:l})):n.createElement(m,s({ref:t},p))}));function b(e,t){var l=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var r=l.length,s=new Array(r);s[0]=d;var i={};for(var u in t)hasOwnProperty.call(t,u)&&(i[u]=t[u]);i.originalType=e,i.mdxType="string"==typeof e?e:a,s[1]=i;for(var o=2;o<r;o++)s[o]=l[o];return n.createElement.apply(null,s)}return n.createElement.apply(null,l)}d.displayName="MDXCreateElement"},3837:(e,t,l)=>{l.r(t),l.d(t,{assets:()=>u,contentTitle:()=>s,default:()=>c,frontMatter:()=>r,metadata:()=>i,toc:()=>o});var n=l(7462),a=(l(7294),l(4137));const r={id:"pull-request-stale-label-input",title:"Stale pull request label input",description:"All the information you need to know about the stale pull request label input.\nIncluding a detailed description and an example.\n",tags:["Pull requests","Inputs","Labels","Cache"]},s=void 0,i={unversionedId:"pull-requests/inputs/pull-request-stale-label-input",id:"pull-requests/inputs/pull-request-stale-label-input",title:"Stale pull request label input",description:"All the information you need to know about the stale pull request label input.\nIncluding a detailed description and an example.\n",source:"@site/docs/08-pull-requests/01-inputs/02-stale-label-input.mdx",sourceDirName:"08-pull-requests/01-inputs",slug:"/pull-requests/inputs/pull-request-stale-label-input",permalink:"/stale/docs/pull-requests/inputs/pull-request-stale-label-input",draft:!1,editUrl:"https://github.com/Sonia-corporation/stale/tree/develop/documentation/docs/08-pull-requests/01-inputs/02-stale-label-input.mdx",tags:[{label:"Pull requests",permalink:"/stale/docs/tags/pull-requests"},{label:"Inputs",permalink:"/stale/docs/tags/inputs"},{label:"Labels",permalink:"/stale/docs/tags/labels"},{label:"Cache",permalink:"/stale/docs/tags/cache"}],version:"current",sidebarPosition:2,frontMatter:{id:"pull-request-stale-label-input",title:"Stale pull request label input",description:"All the information you need to know about the stale pull request label input.\nIncluding a detailed description and an example.\n",tags:["Pull requests","Inputs","Labels","Cache"]},sidebar:"tutorialSidebar",previous:{title:"All pull requests inputs",permalink:"/stale/docs/pull-requests/inputs/all-pull-requests-inputs"},next:{title:"Ignore all pull request labels input",permalink:"/stale/docs/pull-requests/inputs/pull-request-ignore-all-labels-input"}},u={},o=[{value:"Input",id:"input",level:3},{value:"Description",id:"description",level:3},{value:"Cache",id:"cache",level:3},{value:"Example",id:"example",level:3}],p={toc:o};function c(e){let{components:t,...l}=e;return(0,a.kt)("wrapper",(0,n.Z)({},p,l,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h3",{id:"input"},"Input"),(0,a.kt)("p",null,"Name: ",(0,a.kt)("inlineCode",{parentName:"p"},"pull-request-stale-label"),(0,a.kt)("br",{parentName:"p"}),"\n","Type: ",(0,a.kt)("inlineCode",{parentName:"p"},"string"),(0,a.kt)("br",{parentName:"p"}),"\n","Default value: ",(0,a.kt)("inlineCode",{parentName:"p"},"stale")),(0,a.kt)("h3",{id:"description"},"Description"),(0,a.kt)("p",null,"This input will let you define the label (by name) that will be added to your pull requests when they are considered as stale."),(0,a.kt)("p",null,"If the label is added to a pull request (based on the ",(0,a.kt)("a",{parentName:"p",href:"pull-request-days-before-stale-input"},"days before stale input"),"), the next time the pull request is processed, the workflow will process it as a candidate for un-stale.",(0,a.kt)("br",{parentName:"p"}),"\n","If the pull request was updated after the addition of the label, the pull request will be un-stale, and the label will be removed."),(0,a.kt)("p",null,"Once the un-stale processing is done, if the pull request is still stale, the workflow will then process it as a candidate for closing.",(0,a.kt)("br",{parentName:"p"}),"\n","If the pull request is stale for too long (based on the ",(0,a.kt)("a",{parentName:"p",href:"pull-request-days-before-close-input"},"days before close input"),"), the pull request will be closed."),(0,a.kt)("admonition",{type:"caution"},(0,a.kt)("p",{parentName:"admonition"},"The label must be a real label, existing inside your repository list of labels (",(0,a.kt)("em",{parentName:"p"},"github.com/your-organization/your-repository/labels"),").",(0,a.kt)("br",{parentName:"p"}),"\n","If not, the GitHub API will throw an error.")),(0,a.kt)("admonition",{type:"tip"},(0,a.kt)("p",{parentName:"admonition"},"You may find useful to ",(0,a.kt)("a",{parentName:"p",href:"pull-request-to-draft-instead-of-stale-input"},"convert your pull requests to draft")," instead of stale.")),(0,a.kt)("h3",{id:"cache"},"Cache"),(0,a.kt)("p",null,"The label will be cached during the workflow.",(0,a.kt)("br",{parentName:"p"}),"\n","This will reduce the number of calls made to the GitHub API, which will also reduce the quotas consumed for your GitHub token, avoiding reaching rate limits."),(0,a.kt)("h3",{id:"example"},"Example"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-yml",metastring:"{6}","{6}":!0},"# ...\nname: Stale\nid: stale\nuses: sonia-corporation/stale@latest\nwith:\n  pull-request-stale-label: stale-label\n")))}c.isMDXComponent=!0}}]);