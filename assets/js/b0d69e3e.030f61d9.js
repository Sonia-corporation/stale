"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[7898],{4137:(e,t,n)=>{n.d(t,{Zo:()=>l,kt:()=>f});var i=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,i,r=function(e,t){if(null==e)return{};var n,i,r={},o=Object.keys(e);for(i=0;i<o.length;i++)n=o[i],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(i=0;i<o.length;i++)n=o[i],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var u=i.createContext({}),p=function(e){var t=i.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},l=function(e){var t=p(e.components);return i.createElement(u.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return i.createElement(i.Fragment,{},t)}},d=i.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,u=e.parentName,l=s(e,["components","mdxType","originalType","parentName"]),d=p(n),f=r,m=d["".concat(u,".").concat(f)]||d[f]||c[f]||o;return n?i.createElement(m,a(a({ref:t},l),{},{components:n})):i.createElement(m,a({ref:t},l))}));function f(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,a=new Array(o);a[0]=d;var s={};for(var u in t)hasOwnProperty.call(t,u)&&(s[u]=t[u]);s.originalType=e,s.mdxType="string"==typeof e?e:r,a[1]=s;for(var p=2;p<o;p++)a[p]=n[p];return i.createElement.apply(null,a)}return i.createElement.apply(null,n)}d.displayName="MDXCreateElement"},7582:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>u,contentTitle:()=>a,default:()=>c,frontMatter:()=>o,metadata:()=>s,toc:()=>p});var i=n(7462),r=(n(7294),n(4137));const o={id:"issue-ignore-before-creation-date-input",title:"Ignore issue before creation date input",description:"All the information you need to know about the ignore issue before creation date input.\nIncluding a detailed description and an example.\n",tags:["Issues","Inputs","Creation date"]},a=void 0,s={unversionedId:"issues/inputs/issue-ignore-before-creation-date-input",id:"issues/inputs/issue-ignore-before-creation-date-input",title:"Ignore issue before creation date input",description:"All the information you need to know about the ignore issue before creation date input.\nIncluding a detailed description and an example.\n",source:"@site/docs/06-issues/01-inputs/62-ignore-before-creation-date-input.mdx",sourceDirName:"06-issues/01-inputs",slug:"/issues/inputs/issue-ignore-before-creation-date-input",permalink:"/stale/docs/issues/inputs/issue-ignore-before-creation-date-input",draft:!1,editUrl:"https://github.com/Sonia-corporation/stale/tree/develop/documentation/docs/06-issues/01-inputs/62-ignore-before-creation-date-input.mdx",tags:[{label:"Issues",permalink:"/stale/docs/tags/issues"},{label:"Inputs",permalink:"/stale/docs/tags/inputs"},{label:"Creation date",permalink:"/stale/docs/tags/creation-date"}],version:"current",sidebarPosition:62,frontMatter:{id:"issue-ignore-before-creation-date-input",title:"Ignore issue before creation date input",description:"All the information you need to know about the ignore issue before creation date input.\nIncluding a detailed description and an example.\n",tags:["Issues","Inputs","Creation date"]},sidebar:"tutorialSidebar",previous:{title:"Issue limit api mutations count input",permalink:"/stale/docs/issues/inputs/issue-limit-api-mutations-count-input"},next:{title:"Issue processing input",permalink:"/stale/docs/issues/inputs/issue-processing-input"}},u={},p=[{value:"Input",id:"input",level:3},{value:"Description",id:"description",level:3},{value:"Example",id:"example",level:3}],l={toc:p};function c(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,i.Z)({},l,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h3",{id:"input"},"Input"),(0,r.kt)("p",null,"Name: ",(0,r.kt)("inlineCode",{parentName:"p"},"issue-ignore-before-creation-date"),(0,r.kt)("br",{parentName:"p"}),"\n","Type: ",(0,r.kt)("inlineCode",{parentName:"p"},"string"),(0,r.kt)("br",{parentName:"p"}),"\n","Default value: ",(0,r.kt)("inlineCode",{parentName:"p"},"''")),(0,r.kt)("h3",{id:"description"},"Description"),(0,r.kt)("p",null,"This input will let you ignore the processing of the issues which were created before this date.",(0,r.kt)("br",{parentName:"p"}),"\n","This can be useful when you are configuring this action for the first time, and you wish to keep it safe!",(0,r.kt)("br",{parentName:"p"}),"\n","Let the processing handle the newest issues first to see if your configuration seems good!"),(0,r.kt)("h3",{id:"example"},"Example"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yml",metastring:"{6}","{6}":!0},"# ...\nname: Stale\nid: stale\nuses: sonia-corporation/stale@latest\nwith:\n  issue-ignore-before-creation-date: 2020-04\n")))}c.isMDXComponent=!0}}]);