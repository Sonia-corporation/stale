"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[6648],{4137:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>d});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},s=Object.keys(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var o=r.createContext({}),u=function(e){var t=r.useContext(o),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=u(e.components);return r.createElement(o.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,s=e.originalType,o=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),m=u(n),d=a,f=m["".concat(o,".").concat(d)]||m[d]||c[d]||s;return n?r.createElement(f,i(i({ref:t},p),{},{components:n})):r.createElement(f,i({ref:t},p))}));function d(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var s=n.length,i=new Array(s);i[0]=m;var l={};for(var o in t)hasOwnProperty.call(t,o)&&(l[o]=t[o]);l.originalType=e,l.mdxType="string"==typeof e?e:a,i[1]=l;for(var u=2;u<s;u++)i[u]=n[u];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},8873:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>o,contentTitle:()=>i,default:()=>c,frontMatter:()=>s,metadata:()=>l,toc:()=>u});var r=n(7462),a=(n(7294),n(4137));const s={id:"issue-remove-labels-after-stale-input",title:"Remove issue labels after stale input",description:"All the information you need to know about the remove issue labels after stale input.\nIncluding a detailed description and an example.\n",tags:["Issues","Inputs","Labels"]},i=void 0,l={unversionedId:"issues/inputs/issue-remove-labels-after-stale-input",id:"issues/inputs/issue-remove-labels-after-stale-input",title:"Remove issue labels after stale input",description:"All the information you need to know about the remove issue labels after stale input.\nIncluding a detailed description and an example.\n",source:"@site/docs/06-issues/01-inputs/73-remove-labels-after-stale-input.mdx",sourceDirName:"06-issues/01-inputs",slug:"/issues/inputs/issue-remove-labels-after-stale-input",permalink:"/stale/fr/docs/issues/inputs/issue-remove-labels-after-stale-input",draft:!1,editUrl:"https://github.com/Sonia-corporation/stale/tree/develop/documentation/docs/06-issues/01-inputs/73-remove-labels-after-stale-input.mdx",tags:[{label:"Issues",permalink:"/stale/fr/docs/tags/issues"},{label:"Inputs",permalink:"/stale/fr/docs/tags/inputs"},{label:"Labels",permalink:"/stale/fr/docs/tags/labels"}],version:"current",sidebarPosition:73,frontMatter:{id:"issue-remove-labels-after-stale-input",title:"Remove issue labels after stale input",description:"All the information you need to know about the remove issue labels after stale input.\nIncluding a detailed description and an example.\n",tags:["Issues","Inputs","Labels"]},sidebar:"tutorialSidebar",previous:{title:"Add issue labels after stale input",permalink:"/stale/fr/docs/issues/inputs/issue-add-labels-after-stale-input"},next:{title:"Add issue labels after close input",permalink:"/stale/fr/docs/issues/inputs/issue-add-labels-after-close-input"}},o={},u=[{value:"Input",id:"input",level:3},{value:"Description",id:"description",level:3},{value:"Example",id:"example",level:3}],p={toc:u};function c(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h3",{id:"input"},"Input"),(0,a.kt)("p",null,"Name: ",(0,a.kt)("inlineCode",{parentName:"p"},"issue-remove-labels-after-stale"),(0,a.kt)("br",{parentName:"p"}),"\n","Type: ",(0,a.kt)("inlineCode",{parentName:"p"},"string[]"),(0,a.kt)("br",{parentName:"p"}),"\n","Default value: ",(0,a.kt)("inlineCode",{parentName:"p"},"[]")),(0,a.kt)("h3",{id:"description"},"Description"),(0,a.kt)("p",null,"This input will let you remove extra labels when the processing stale the issues.",(0,a.kt)("br",{parentName:"p"}),"\n","This can be useful if you wish to easily remove extra labels to improve your triage post-stale."),(0,a.kt)("admonition",{type:"caution"},(0,a.kt)("p",{parentName:"admonition"},"The labels must be real labels, existing inside your repository list of labels (",(0,a.kt)("em",{parentName:"p"},"github.com/your-organization/your-repository/labels"),").",(0,a.kt)("br",{parentName:"p"}),"\n","If not, the GitHub API will throw an error.")),(0,a.kt)("h3",{id:"example"},"Example"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-yml",metastring:"{6-8}","{6-8}":!0},"# ...\nname: Stale\nid: stale\nuses: sonia-corporation/stale@latest\nwith:\n  issue-remove-labels-after-stale: |\n    triage\n    new\n")))}c.isMDXComponent=!0}}]);