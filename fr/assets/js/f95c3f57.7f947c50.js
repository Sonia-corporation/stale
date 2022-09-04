"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[265],{4137:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>m});var l=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);t&&(l=l.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,l)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,l,r=function(e,t){if(null==e)return{};var n,l,r={},a=Object.keys(e);for(l=0;l<a.length;l++)n=a[l],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(l=0;l<a.length;l++)n=a[l],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var i=l.createContext({}),u=function(e){var t=l.useContext(i),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},p=function(e){var t=u(e.components);return l.createElement(i.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return l.createElement(l.Fragment,{},t)}},d=l.forwardRef((function(e,t){var n=e.components,r=e.mdxType,a=e.originalType,i=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),d=u(n),m=r,f=d["".concat(i,".").concat(m)]||d[m]||c[m]||a;return n?l.createElement(f,o(o({ref:t},p),{},{components:n})):l.createElement(f,o({ref:t},p))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=n.length,o=new Array(a);o[0]=d;var s={};for(var i in t)hasOwnProperty.call(t,i)&&(s[i]=t[i]);s.originalType=e,s.mdxType="string"==typeof e?e:r,o[1]=s;for(var u=2;u<a;u++)o[u]=n[u];return l.createElement.apply(null,o)}return l.createElement.apply(null,n)}d.displayName="MDXCreateElement"},5461:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>i,contentTitle:()=>o,default:()=>c,frontMatter:()=>a,metadata:()=>s,toc:()=>u});var l=n(7462),r=(n(7294),n(4137));const a={id:"pull-request-remove-labels-after-close-input",title:"Remove pull request labels after close input",description:"All the information you need to know about the remove pull request labels after close input.\nIncluding a detailed description and an example.\n",tags:["Pull requests","Inputs","Labels","Closing"]},o=void 0,s={unversionedId:"pull-requests/inputs/pull-request-remove-labels-after-close-input",id:"pull-requests/inputs/pull-request-remove-labels-after-close-input",title:"Remove pull request labels after close input",description:"All the information you need to know about the remove pull request labels after close input.\nIncluding a detailed description and an example.\n",source:"@site/docs/08-pull-requests/01-inputs/74-remove-labels-after-close-input.mdx",sourceDirName:"08-pull-requests/01-inputs",slug:"/pull-requests/inputs/pull-request-remove-labels-after-close-input",permalink:"/stale/fr/docs/pull-requests/inputs/pull-request-remove-labels-after-close-input",draft:!1,editUrl:"https://github.com/Sonia-corporation/stale/tree/develop/documentation/docs/08-pull-requests/01-inputs/74-remove-labels-after-close-input.mdx",tags:[{label:"Pull requests",permalink:"/stale/fr/docs/tags/pull-requests"},{label:"Inputs",permalink:"/stale/fr/docs/tags/inputs"},{label:"Labels",permalink:"/stale/fr/docs/tags/labels"},{label:"Closing",permalink:"/stale/fr/docs/tags/closing"}],version:"current",sidebarPosition:74,frontMatter:{id:"pull-request-remove-labels-after-close-input",title:"Remove pull request labels after close input",description:"All the information you need to know about the remove pull request labels after close input.\nIncluding a detailed description and an example.\n",tags:["Pull requests","Inputs","Labels","Closing"]},sidebar:"tutorialSidebar",previous:{title:"Add pull request labels after close input",permalink:"/stale/fr/docs/pull-requests/inputs/pull-request-add-labels-after-close-input"},next:{title:"Pull request to draft instead of stale input",permalink:"/stale/fr/docs/pull-requests/inputs/pull-request-to-draft-instead-of-stale-input"}},i={},u=[{value:"Input",id:"input",level:3},{value:"Description",id:"description",level:3},{value:"Example",id:"example",level:3}],p={toc:u};function c(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,l.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h3",{id:"input"},"Input"),(0,r.kt)("p",null,"Name: ",(0,r.kt)("inlineCode",{parentName:"p"},"pull-request-remove-labels-after-close"),(0,r.kt)("br",{parentName:"p"}),"\n","Type: ",(0,r.kt)("inlineCode",{parentName:"p"},"string[]"),(0,r.kt)("br",{parentName:"p"}),"\n","Default value: ",(0,r.kt)("inlineCode",{parentName:"p"},"[]")),(0,r.kt)("h3",{id:"description"},"Description"),(0,r.kt)("p",null,"This input will let you remove extra labels when the processing close the pull requests.",(0,r.kt)("br",{parentName:"p"}),"\n","This can be useful if you wish to easily remove extra labels to improve your triage post-closing."),(0,r.kt)("admonition",{type:"caution"},(0,r.kt)("p",{parentName:"admonition"},"The labels must be real labels, existing inside your repository list of labels (",(0,r.kt)("em",{parentName:"p"},"github.com/your-organization/your-repository/labels"),").",(0,r.kt)("br",{parentName:"p"}),"\n","If not, the GitHub API will throw an error.")),(0,r.kt)("admonition",{type:"info"},(0,r.kt)("p",{parentName:"admonition"},"You can also add a comment to explain why it was closed by using the ",(0,r.kt)("a",{parentName:"p",href:"pull-request-close-comment-input"},"close comment input"),",\nadd labels onto it by using the ",(0,r.kt)("a",{parentName:"p",href:"pull-request-add-labels-after-close-input"},"add labels after close input"),"\nand define the number of days before closing it by using the ",(0,r.kt)("a",{parentName:"p",href:"pull-request-days-before-close-input"},"days before close input"),".")),(0,r.kt)("h3",{id:"example"},"Example"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yml",metastring:"{6-8}","{6-8}":!0},"# ...\nname: Stale\nid: stale\nuses: sonia-corporation/stale@latest\nwith:\n  pull-request-remove-labels-after-close: |\n    new author feedback\n    closing soon!\n")))}c.isMDXComponent=!0}}]);