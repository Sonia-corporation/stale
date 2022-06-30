"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[4956],{4137:(e,t,a)=>{a.d(t,{Zo:()=>p,kt:()=>m});var n=a(7294);function l(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function r(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function s(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?r(Object(a),!0).forEach((function(t){l(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):r(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function i(e,t){if(null==e)return{};var a,n,l=function(e,t){if(null==e)return{};var a,n,l={},r=Object.keys(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||(l[a]=e[a]);return l}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(l[a]=e[a])}return l}var u=n.createContext({}),o=function(e){var t=n.useContext(u),a=t;return e&&(a="function"==typeof e?e(t):s(s({},t),e)),a},p=function(e){var t=o(e.components);return n.createElement(u.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},c=n.forwardRef((function(e,t){var a=e.components,l=e.mdxType,r=e.originalType,u=e.parentName,p=i(e,["components","mdxType","originalType","parentName"]),c=o(a),m=l,f=c["".concat(u,".").concat(m)]||c[m]||d[m]||r;return a?n.createElement(f,s(s({ref:t},p),{},{components:a})):n.createElement(f,s({ref:t},p))}));function m(e,t){var a=arguments,l=t&&t.mdxType;if("string"==typeof e||l){var r=a.length,s=new Array(r);s[0]=c;var i={};for(var u in t)hasOwnProperty.call(t,u)&&(i[u]=t[u]);i.originalType=e,i.mdxType="string"==typeof e?e:l,s[1]=i;for(var o=2;o<r;o++)s[o]=a[o];return n.createElement.apply(null,s)}return n.createElement.apply(null,a)}c.displayName="MDXCreateElement"},4533:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>u,contentTitle:()=>s,default:()=>d,frontMatter:()=>r,metadata:()=>i,toc:()=>o});var n=a(7462),l=(a(7294),a(4137));const r={id:"pull-request-add-labels-after-stale-input",title:"Add pull request labels after stale input",description:"All the information you need to know about the add pull request labels after stale input.\nIncluding a detailed description and an example.\n",tags:["Pull requests","Inputs","Labels"]},s=void 0,i={unversionedId:"pull-requests/inputs/pull-request-add-labels-after-stale-input",id:"pull-requests/inputs/pull-request-add-labels-after-stale-input",title:"Add pull request labels after stale input",description:"All the information you need to know about the add pull request labels after stale input.\nIncluding a detailed description and an example.\n",source:"@site/docs/08-pull-requests/01-inputs/16-add-labels-after-stale-input.mdx",sourceDirName:"08-pull-requests/01-inputs",slug:"/pull-requests/inputs/pull-request-add-labels-after-stale-input",permalink:"/stale/fr/docs/pull-requests/inputs/pull-request-add-labels-after-stale-input",draft:!1,editUrl:"https://github.com/Sonia-corporation/stale/tree/develop/documentation/docs/08-pull-requests/01-inputs/16-add-labels-after-stale-input.mdx",tags:[{label:"Pull requests",permalink:"/stale/fr/docs/tags/pull-requests"},{label:"Inputs",permalink:"/stale/fr/docs/tags/inputs"},{label:"Labels",permalink:"/stale/fr/docs/tags/labels"}],version:"current",sidebarPosition:16,frontMatter:{id:"pull-request-add-labels-after-stale-input",title:"Add pull request labels after stale input",description:"All the information you need to know about the add pull request labels after stale input.\nIncluding a detailed description and an example.\n",tags:["Pull requests","Inputs","Labels"]},sidebar:"tutorialSidebar",previous:{title:"Delete pull request branch after close input",permalink:"/stale/fr/docs/pull-requests/inputs/pull-request-delete-branch-after-close-input"},next:{title:"Add pull request labels after close input",permalink:"/stale/fr/docs/pull-requests/inputs/pull-request-add-labels-after-close-input"}},u={},o=[{value:"Input",id:"input",level:3},{value:"Description",id:"description",level:3},{value:"Example",id:"example",level:3}],p={toc:o};function d(e){let{components:t,...a}=e;return(0,l.kt)("wrapper",(0,n.Z)({},p,a,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("h3",{id:"input"},"Input"),(0,l.kt)("p",null,"Name: ",(0,l.kt)("inlineCode",{parentName:"p"},"pull-request-add-labels-after-stale"),(0,l.kt)("br",{parentName:"p"}),"\n","Type: ",(0,l.kt)("inlineCode",{parentName:"p"},"string[]"),(0,l.kt)("br",{parentName:"p"}),"\n","Default value: ",(0,l.kt)("inlineCode",{parentName:"p"},"[]")),(0,l.kt)("h3",{id:"description"},"Description"),(0,l.kt)("p",null,"This input will let you add extra labels when the processing stale the pull requests.",(0,l.kt)("br",{parentName:"p"}),"\n","This can be useful if you wish to easily add extra labels to improve your triage post-stale."),(0,l.kt)("div",{className:"admonition admonition-caution alert alert--warning"},(0,l.kt)("div",{parentName:"div",className:"admonition-heading"},(0,l.kt)("h5",{parentName:"div"},(0,l.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,l.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 16 16"},(0,l.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M8.893 1.5c-.183-.31-.52-.5-.887-.5s-.703.19-.886.5L.138 13.499a.98.98 0 0 0 0 1.001c.193.31.53.501.886.501h13.964c.367 0 .704-.19.877-.5a1.03 1.03 0 0 0 .01-1.002L8.893 1.5zm.133 11.497H6.987v-2.003h2.039v2.003zm0-3.004H6.987V5.987h2.039v4.006z"}))),"caution")),(0,l.kt)("div",{parentName:"div",className:"admonition-content"},(0,l.kt)("p",{parentName:"div"},"The labels must be real labels, existing inside your repository list of labels (",(0,l.kt)("em",{parentName:"p"},"github.com/your-organization/your-repository/labels"),").",(0,l.kt)("br",{parentName:"p"}),"\n","If not, the GitHub API will throw an error."))),(0,l.kt)("h3",{id:"example"},"Example"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-yml",metastring:"{6-8}","{6-8}":!0},"# ...\nname: Stale\nid: stale\nuses: sonia-corporation/stale@latest\nwith:\n  pull-request-add-labels-after-stale: |\n    warning\n    triage obsolete\n")))}d.isMDXComponent=!0}}]);