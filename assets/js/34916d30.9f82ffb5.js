"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[7151],{4137:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>f});var r=n(7294);function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){l(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,r,l=function(e,t){if(null==e)return{};var n,r,l={},s=Object.keys(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||(l[n]=e[n]);return l}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(l[n]=e[n])}return l}var u=r.createContext({}),i=function(e){var t=r.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},p=function(e){var t=i(e.components);return r.createElement(u.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,l=e.mdxType,s=e.originalType,u=e.parentName,p=o(e,["components","mdxType","originalType","parentName"]),d=i(n),f=l,m=d["".concat(u,".").concat(f)]||d[f]||c[f]||s;return n?r.createElement(m,a(a({ref:t},p),{},{components:n})):r.createElement(m,a({ref:t},p))}));function f(e,t){var n=arguments,l=t&&t.mdxType;if("string"==typeof e||l){var s=n.length,a=new Array(s);a[0]=d;var o={};for(var u in t)hasOwnProperty.call(t,u)&&(o[u]=t[u]);o.originalType=e,o.mdxType="string"==typeof e?e:l,a[1]=o;for(var i=2;i<s;i++)a[i]=n[i];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},3950:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>u,contentTitle:()=>a,default:()=>c,frontMatter:()=>s,metadata:()=>o,toc:()=>i});var r=n(7462),l=(n(7294),n(4137));const s={id:"pull-request-days-before-close-input",title:"Days before pull request close input",description:"All the information you need to know about the days before pull request close input.\nIncluding a detailed description and an example.\n",tags:["Pull requests","Inputs"]},a=void 0,o={unversionedId:"pull-requests/inputs/pull-request-days-before-close-input",id:"pull-requests/inputs/pull-request-days-before-close-input",title:"Days before pull request close input",description:"All the information you need to know about the days before pull request close input.\nIncluding a detailed description and an example.\n",source:"@site/docs/08-pull-requests/01-inputs/52-days-before-close-input.mdx",sourceDirName:"08-pull-requests/01-inputs",slug:"/pull-requests/inputs/pull-request-days-before-close-input",permalink:"/stale/docs/pull-requests/inputs/pull-request-days-before-close-input",draft:!1,editUrl:"https://github.com/Sonia-corporation/stale/tree/develop/documentation/docs/08-pull-requests/01-inputs/52-days-before-close-input.mdx",tags:[{label:"Pull requests",permalink:"/stale/docs/tags/pull-requests"},{label:"Inputs",permalink:"/stale/docs/tags/inputs"}],version:"current",sidebarPosition:52,frontMatter:{id:"pull-request-days-before-close-input",title:"Days before pull request close input",description:"All the information you need to know about the days before pull request close input.\nIncluding a detailed description and an example.\n",tags:["Pull requests","Inputs"]},sidebar:"tutorialSidebar",previous:{title:"Add pull request labels after stale input",permalink:"/stale/docs/pull-requests/inputs/pull-request-add-labels-after-stale-input"},next:{title:"Add pull request labels after close input",permalink:"/stale/docs/pull-requests/inputs/pull-request-add-labels-after-close-input"}},u={},i=[{value:"Input",id:"input",level:3},{value:"Description",id:"description",level:3},{value:"Example",id:"example",level:3}],p={toc:i};function c(e){let{components:t,...n}=e;return(0,l.kt)("wrapper",(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("h3",{id:"input"},"Input"),(0,l.kt)("p",null,"Name: ",(0,l.kt)("inlineCode",{parentName:"p"},"pull-request-days-before-close"),(0,l.kt)("br",{parentName:"p"}),"\n","Type: ",(0,l.kt)("inlineCode",{parentName:"p"},"number"),(0,l.kt)("br",{parentName:"p"}),"\n","Default value: ",(0,l.kt)("inlineCode",{parentName:"p"},"30")),(0,l.kt)("h3",{id:"description"},"Description"),(0,l.kt)("p",null,"This input will let you define the number of days before processing the pull requests to close."),(0,l.kt)("p",null,"The number of days is calculated based on the stale date (the stale label creation date) from today."),(0,l.kt)("p",null,(0,l.kt)("strong",{parentName:"p"},"For example:")),(0,l.kt)("p",null,"Assuming that a pull request is stale since 9 days and this input is configured to close after 10 days.",(0,l.kt)("br",{parentName:"p"}),"\n","The pull request will be closed tomorrow if no update occur until then."),(0,l.kt)("h3",{id:"example"},"Example"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-yml",metastring:"{6}","{6}":!0},"# ...\nname: Stale\nid: stale\nuses: sonia-corporation/stale@latest\nwith:\n  pull-request-days-before-close: 10\n")))}c.isMDXComponent=!0}}]);