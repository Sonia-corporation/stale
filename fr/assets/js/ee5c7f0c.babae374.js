"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[1056],{4137:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>f});var a=n(7294);function s(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){s(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,s=function(e,t){if(null==e)return{};var n,a,s={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(s[n]=e[n]);return s}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(s[n]=e[n])}return s}var o=a.createContext({}),u=function(e){var t=a.useContext(o),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=u(e.components);return a.createElement(o.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},c=a.forwardRef((function(e,t){var n=e.components,s=e.mdxType,r=e.originalType,o=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),c=u(n),f=s,m=c["".concat(o,".").concat(f)]||c[f]||d[f]||r;return n?a.createElement(m,i(i({ref:t},p),{},{components:n})):a.createElement(m,i({ref:t},p))}));function f(e,t){var n=arguments,s=t&&t.mdxType;if("string"==typeof e||s){var r=n.length,i=new Array(r);i[0]=c;var l={};for(var o in t)hasOwnProperty.call(t,o)&&(l[o]=t[o]);l.originalType=e,l.mdxType="string"==typeof e?e:s,i[1]=l;for(var u=2;u<r;u++)i[u]=n[u];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}c.displayName="MDXCreateElement"},9795:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>o,contentTitle:()=>i,default:()=>d,frontMatter:()=>r,metadata:()=>l,toc:()=>u});var a=n(7462),s=(n(7294),n(4137));const r={id:"issue-add-labels-after-stale-input",title:"Add issue labels after stale input",description:"All the information you need to know about the add issue labels after stale input.\nIncluding a detailed description and an example.\n",tags:["Issues","Inputs","Labels"]},i=void 0,l={unversionedId:"issues/inputs/issue-add-labels-after-stale-input",id:"issues/inputs/issue-add-labels-after-stale-input",title:"Add issue labels after stale input",description:"All the information you need to know about the add issue labels after stale input.\nIncluding a detailed description and an example.\n",source:"@site/docs/06-issues/01-inputs/72-add-labels-after-stale-input.mdx",sourceDirName:"06-issues/01-inputs",slug:"/issues/inputs/issue-add-labels-after-stale-input",permalink:"/stale/fr/docs/issues/inputs/issue-add-labels-after-stale-input",draft:!1,editUrl:"https://github.com/Sonia-corporation/stale/tree/develop/documentation/docs/06-issues/01-inputs/72-add-labels-after-stale-input.mdx",tags:[{label:"Issues",permalink:"/stale/fr/docs/tags/issues"},{label:"Inputs",permalink:"/stale/fr/docs/tags/inputs"},{label:"Labels",permalink:"/stale/fr/docs/tags/labels"}],version:"current",sidebarPosition:72,frontMatter:{id:"issue-add-labels-after-stale-input",title:"Add issue labels after stale input",description:"All the information you need to know about the add issue labels after stale input.\nIncluding a detailed description and an example.\n",tags:["Issues","Inputs","Labels"]},sidebar:"tutorialSidebar",previous:{title:"Issue close reason input",permalink:"/stale/fr/docs/issues/inputs/issue-close-reason-input"},next:{title:"Remove issue labels after stale input",permalink:"/stale/fr/docs/issues/inputs/issue-remove-labels-after-stale-input"}},o={},u=[{value:"Input",id:"input",level:3},{value:"Description",id:"description",level:3},{value:"Example",id:"example",level:3}],p={toc:u};function d(e){let{components:t,...n}=e;return(0,s.kt)("wrapper",(0,a.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,s.kt)("h3",{id:"input"},"Input"),(0,s.kt)("p",null,"Name: ",(0,s.kt)("inlineCode",{parentName:"p"},"issue-add-labels-after-stale"),(0,s.kt)("br",{parentName:"p"}),"\n","Type: ",(0,s.kt)("inlineCode",{parentName:"p"},"string[]"),(0,s.kt)("br",{parentName:"p"}),"\n","Default value: ",(0,s.kt)("inlineCode",{parentName:"p"},"[]")),(0,s.kt)("h3",{id:"description"},"Description"),(0,s.kt)("p",null,"This input will let you add extra labels when the processing stale the issues.",(0,s.kt)("br",{parentName:"p"}),"\n","This can be useful if you wish to easily add extra labels to improve your triage post-stale."),(0,s.kt)("admonition",{type:"caution"},(0,s.kt)("p",{parentName:"admonition"},"The labels must be real labels, existing inside your repository list of labels (",(0,s.kt)("em",{parentName:"p"},"github.com/your-organization/your-repository/labels"),").",(0,s.kt)("br",{parentName:"p"}),"\n","If not, the GitHub API will throw an error.")),(0,s.kt)("h3",{id:"example"},"Example"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-yml",metastring:"{6-8}","{6-8}":!0},"# ...\nname: Stale\nid: stale\nuses: sonia-corporation/stale@latest\nwith:\n  issue-add-labels-after-stale: |\n    warning\n    triage obsolete\n")))}d.isMDXComponent=!0}}]);