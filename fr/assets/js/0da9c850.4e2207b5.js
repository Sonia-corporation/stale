"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[2417],{4137:(e,n,t)=>{t.d(n,{Zo:()=>p,kt:()=>m});var i=t(7294);function s(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function r(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);n&&(i=i.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,i)}return t}function a(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?r(Object(t),!0).forEach((function(n){s(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):r(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,i,s=function(e,n){if(null==e)return{};var t,i,s={},r=Object.keys(e);for(i=0;i<r.length;i++)t=r[i],n.indexOf(t)>=0||(s[t]=e[t]);return s}(e,n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(i=0;i<r.length;i++)t=r[i],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(s[t]=e[t])}return s}var o=i.createContext({}),u=function(e){var n=i.useContext(o),t=n;return e&&(t="function"==typeof e?e(n):a(a({},n),e)),t},p=function(e){var n=u(e.components);return i.createElement(o.Provider,{value:n},e.children)},c={inlineCode:"code",wrapper:function(e){var n=e.children;return i.createElement(i.Fragment,{},n)}},d=i.forwardRef((function(e,n){var t=e.components,s=e.mdxType,r=e.originalType,o=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),d=u(t),m=s,b=d["".concat(o,".").concat(m)]||d[m]||c[m]||r;return t?i.createElement(b,a(a({ref:n},p),{},{components:t})):i.createElement(b,a({ref:n},p))}));function m(e,n){var t=arguments,s=n&&n.mdxType;if("string"==typeof e||s){var r=t.length,a=new Array(r);a[0]=d;var l={};for(var o in n)hasOwnProperty.call(n,o)&&(l[o]=n[o]);l.originalType=e,l.mdxType="string"==typeof e?e:s,a[1]=l;for(var u=2;u<r;u++)a[u]=t[u];return i.createElement.apply(null,a)}return i.createElement.apply(null,t)}d.displayName="MDXCreateElement"},8161:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>o,contentTitle:()=>a,default:()=>c,frontMatter:()=>r,metadata:()=>l,toc:()=>u});var i=t(7462),s=(t(7294),t(4137));const r={id:"issue-ignore-any-labels-input",title:"Ignore any issue labels input",description:"All the information you need to know about the ignore any issue labels input.\nIncluding a detailed description and an example.\n",tags:["Issues","Inputs","Labels"]},a=void 0,l={unversionedId:"issues/inputs/issue-ignore-any-labels-input",id:"issues/inputs/issue-ignore-any-labels-input",title:"Ignore any issue labels input",description:"All the information you need to know about the ignore any issue labels input.\nIncluding a detailed description and an example.\n",source:"@site/docs/06-issues/01-inputs/04-ignore-any-labels-input.mdx",sourceDirName:"06-issues/01-inputs",slug:"/issues/inputs/issue-ignore-any-labels-input",permalink:"/stale/fr/docs/issues/inputs/issue-ignore-any-labels-input",draft:!1,editUrl:"https://github.com/Sonia-corporation/stale/tree/develop/documentation/docs/06-issues/01-inputs/04-ignore-any-labels-input.mdx",tags:[{label:"Issues",permalink:"/stale/fr/docs/tags/issues"},{label:"Inputs",permalink:"/stale/fr/docs/tags/inputs"},{label:"Labels",permalink:"/stale/fr/docs/tags/labels"}],version:"current",sidebarPosition:4,frontMatter:{id:"issue-ignore-any-labels-input",title:"Ignore any issue labels input",description:"All the information you need to know about the ignore any issue labels input.\nIncluding a detailed description and an example.\n",tags:["Issues","Inputs","Labels"]},sidebar:"tutorialSidebar",previous:{title:"Ignore all issue labels input",permalink:"/stale/fr/docs/issues/inputs/issue-ignore-all-labels-input"},next:{title:"Ignore all issue assignees input",permalink:"/stale/fr/docs/issues/inputs/issue-ignore-all-assignees-input"}},o={},u=[{value:"Input",id:"input",level:3},{value:"Description",id:"description",level:3},{value:"Example",id:"example",level:3}],p={toc:u};function c(e){let{components:n,...t}=e;return(0,s.kt)("wrapper",(0,i.Z)({},p,t,{components:n,mdxType:"MDXLayout"}),(0,s.kt)("h3",{id:"input"},"Input"),(0,s.kt)("p",null,"Name: ",(0,s.kt)("inlineCode",{parentName:"p"},"issue-ignore-any-labels"),(0,s.kt)("br",{parentName:"p"}),"\n","Type: ",(0,s.kt)("inlineCode",{parentName:"p"},"string[]"),(0,s.kt)("br",{parentName:"p"}),"\n","Default value: ",(0,s.kt)("inlineCode",{parentName:"p"},"[]")),(0,s.kt)("h3",{id:"description"},"Description"),(0,s.kt)("p",null,"This input will let you ignore the processing of the issues which have at least one of the label from this list.",(0,s.kt)("br",{parentName:"p"}),"\n","This can be useful when you use labels for triage."),(0,s.kt)("h3",{id:"example"},"Example"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-yml",metastring:"{6-8}","{6-8}":!0},"# ...\nname: Stale\nid: stale\nuses: sonia-corporation/stale@latest\nwith:\n  issue-ignore-any-labels: |\n    need help\n    bug\n")))}c.isMDXComponent=!0}}]);