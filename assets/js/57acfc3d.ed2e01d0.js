"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[2217],{4137:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>m});var s=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);t&&(s=s.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,s)}return n}function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,s,a=function(e,t){if(null==e)return{};var n,s,a={},i=Object.keys(e);for(s=0;s<i.length;s++)n=i[s],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(s=0;s<i.length;s++)n=i[s],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var o=s.createContext({}),u=function(e){var t=s.useContext(o),n=t;return e&&(n="function"==typeof e?e(t):r(r({},t),e)),n},p=function(e){var t=u(e.components);return s.createElement(o.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return s.createElement(s.Fragment,{},t)}},d=s.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,o=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),d=u(n),m=a,f=d["".concat(o,".").concat(m)]||d[m]||c[m]||i;return n?s.createElement(f,r(r({ref:t},p),{},{components:n})):s.createElement(f,r({ref:t},p))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,r=new Array(i);r[0]=d;var l={};for(var o in t)hasOwnProperty.call(t,o)&&(l[o]=t[o]);l.originalType=e,l.mdxType="string"==typeof e?e:a,r[1]=l;for(var u=2;u<i;u++)r[u]=n[u];return s.createElement.apply(null,r)}return s.createElement.apply(null,n)}d.displayName="MDXCreateElement"},5235:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>o,contentTitle:()=>r,default:()=>c,frontMatter:()=>i,metadata:()=>l,toc:()=>u});var s=n(7462),a=(n(7294),n(4137));const i={id:"issue-add-labels-after-close-input",title:"Add issue labels after close input",description:"All the information you need to know about the add issue labels after close input.\nIncluding a detailed description and an example.\n",tags:["Issues","Inputs","Labels"]},r=void 0,l={unversionedId:"issues/inputs/issue-add-labels-after-close-input",id:"issues/inputs/issue-add-labels-after-close-input",title:"Add issue labels after close input",description:"All the information you need to know about the add issue labels after close input.\nIncluding a detailed description and an example.\n",source:"@site/docs/06-issues/01-inputs/53-add-labels-after-close-input.mdx",sourceDirName:"06-issues/01-inputs",slug:"/issues/inputs/issue-add-labels-after-close-input",permalink:"/stale/docs/issues/inputs/issue-add-labels-after-close-input",draft:!1,editUrl:"https://github.com/Sonia-corporation/stale/tree/develop/documentation/docs/06-issues/01-inputs/53-add-labels-after-close-input.mdx",tags:[{label:"Issues",permalink:"/stale/docs/tags/issues"},{label:"Inputs",permalink:"/stale/docs/tags/inputs"},{label:"Labels",permalink:"/stale/docs/tags/labels"}],version:"current",sidebarPosition:53,frontMatter:{id:"issue-add-labels-after-close-input",title:"Add issue labels after close input",description:"All the information you need to know about the add issue labels after close input.\nIncluding a detailed description and an example.\n",tags:["Issues","Inputs","Labels"]},sidebar:"tutorialSidebar",previous:{title:"Days before issue close input",permalink:"/stale/docs/issues/inputs/issue-days-before-close-input"},next:{title:"Issue limit api queries count input",permalink:"/stale/docs/issues/inputs/issue-limit-api-queries-count-input"}},o={},u=[{value:"Input",id:"input",level:3},{value:"Description",id:"description",level:3},{value:"Example",id:"example",level:3}],p={toc:u};function c(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,s.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h3",{id:"input"},"Input"),(0,a.kt)("p",null,"Name: ",(0,a.kt)("inlineCode",{parentName:"p"},"issue-add-labels-after-close"),(0,a.kt)("br",{parentName:"p"}),"\n","Type: ",(0,a.kt)("inlineCode",{parentName:"p"},"string[]"),(0,a.kt)("br",{parentName:"p"}),"\n","Default value: ",(0,a.kt)("inlineCode",{parentName:"p"},"[]")),(0,a.kt)("h3",{id:"description"},"Description"),(0,a.kt)("p",null,"This input will let you add extra labels when the processing close the issues.",(0,a.kt)("br",{parentName:"p"}),"\n","This can be useful if you wish to easily add extra labels to improve your triage post-closing."),(0,a.kt)("admonition",{type:"caution"},(0,a.kt)("p",{parentName:"admonition"},"The labels must be real labels, existing inside your repository list of labels (",(0,a.kt)("em",{parentName:"p"},"github.com/your-organization/your-repository/labels"),").",(0,a.kt)("br",{parentName:"p"}),"\n","If not, the GitHub API will throw an error.")),(0,a.kt)("h3",{id:"example"},"Example"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-yml",metastring:"{6-8}","{6-8}":!0},"# ...\nname: Stale\nid: stale\nuses: sonia-corporation/stale@latest\nwith:\n  issue-add-labels-after-close: |\n    do not reopen\n    please-create if needed\n")))}c.isMDXComponent=!0}}]);