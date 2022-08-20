"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[9634],{4137:(e,t,r)=>{r.d(t,{Zo:()=>p,kt:()=>m});var n=r(7294);function l(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function a(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){l(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,n,l=function(e,t){if(null==e)return{};var r,n,l={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(l[r]=e[r]);return l}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(l[r]=e[r])}return l}var i=n.createContext({}),u=function(e){var t=n.useContext(i),r=t;return e&&(r="function"==typeof e?e(t):a(a({},t),e)),r},p=function(e){var t=u(e.components);return n.createElement(i.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var r=e.components,l=e.mdxType,o=e.originalType,i=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),d=u(r),m=l,f=d["".concat(i,".").concat(m)]||d[m]||c[m]||o;return r?n.createElement(f,a(a({ref:t},p),{},{components:r})):n.createElement(f,a({ref:t},p))}));function m(e,t){var r=arguments,l=t&&t.mdxType;if("string"==typeof e||l){var o=r.length,a=new Array(o);a[0]=d;var s={};for(var i in t)hasOwnProperty.call(t,i)&&(s[i]=t[i]);s.originalType=e,s.mdxType="string"==typeof e?e:l,a[1]=s;for(var u=2;u<o;u++)a[u]=r[u];return n.createElement.apply(null,a)}return n.createElement.apply(null,r)}d.displayName="MDXCreateElement"},486:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>i,contentTitle:()=>a,default:()=>c,frontMatter:()=>o,metadata:()=>s,toc:()=>u});var n=r(7462),l=(r(7294),r(4137));const o={id:"pull-request-ignore-all-project-cards-input",title:"Ignore all pull request project cards input",description:"All the information you need to know about the ignore all pull request project cards input.\nIncluding a detailed description and an example.\n",tags:["Pull requests","Inputs","Projects"]},a=void 0,s={unversionedId:"pull-requests/inputs/pull-request-ignore-all-project-cards-input",id:"pull-requests/inputs/pull-request-ignore-all-project-cards-input",title:"Ignore all pull request project cards input",description:"All the information you need to know about the ignore all pull request project cards input.\nIncluding a detailed description and an example.\n",source:"@site/docs/08-pull-requests/01-inputs/20-ignore-all-project-cards-input.mdx",sourceDirName:"08-pull-requests/01-inputs",slug:"/pull-requests/inputs/pull-request-ignore-all-project-cards-input",permalink:"/stale/docs/pull-requests/inputs/pull-request-ignore-all-project-cards-input",draft:!1,editUrl:"https://github.com/Sonia-corporation/stale/tree/develop/documentation/docs/08-pull-requests/01-inputs/20-ignore-all-project-cards-input.mdx",tags:[{label:"Pull requests",permalink:"/stale/docs/tags/pull-requests"},{label:"Inputs",permalink:"/stale/docs/tags/inputs"},{label:"Projects",permalink:"/stale/docs/tags/projects"}],version:"current",sidebarPosition:20,frontMatter:{id:"pull-request-ignore-all-project-cards-input",title:"Ignore all pull request project cards input",description:"All the information you need to know about the ignore all pull request project cards input.\nIncluding a detailed description and an example.\n",tags:["Pull requests","Inputs","Projects"]},sidebar:"tutorialSidebar",previous:{title:"Pull request only any assignees input",permalink:"/stale/docs/pull-requests/inputs/pull-request-only-any-assignees-input"},next:{title:"Ignore any pull request project cards input",permalink:"/stale/docs/pull-requests/inputs/pull-request-ignore-any-project-cards-input"}},i={},u=[{value:"Input",id:"input",level:3},{value:"Description",id:"description",level:3},{value:"Example",id:"example",level:3}],p={toc:u};function c(e){let{components:t,...r}=e;return(0,l.kt)("wrapper",(0,n.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("h3",{id:"input"},"Input"),(0,l.kt)("p",null,"Name: ",(0,l.kt)("inlineCode",{parentName:"p"},"pull-request-ignore-all-project-cards"),(0,l.kt)("br",{parentName:"p"}),"\n","Type: ",(0,l.kt)("inlineCode",{parentName:"p"},"boolean"),(0,l.kt)("br",{parentName:"p"}),"\n","Default value: ",(0,l.kt)("inlineCode",{parentName:"p"},"false")),(0,l.kt)("h3",{id:"description"},"Description"),(0,l.kt)("p",null,"This input will let you ignore the processing of the pull requests which have at least one project card.",(0,l.kt)("br",{parentName:"p"}),"\n","This can be useful when you link your pull requests with your projects, and you know that you will for sure close or at least process the pull requests very soon."),(0,l.kt)("p",null,"However, if you are not certain that linking the pull requests with any project will result in the handling for sure of the processing of the pull requests, this input may not suit you.",(0,l.kt)("br",{parentName:"p"}),"\n","You may prefer to use instead the ",(0,l.kt)("a",{parentName:"p",href:"pull-request-ignore-any-project-cards-input"},"ignore any project cards input")," to list only some specific project cards or not use this input at all."),(0,l.kt)("h3",{id:"example"},"Example"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-yml",metastring:"{6}","{6}":!0},"# ...\nname: Stale\nid: stale\nuses: sonia-corporation/stale@latest\nwith:\n  pull-request-ignore-all-project-cards: true\n")))}c.isMDXComponent=!0}}]);