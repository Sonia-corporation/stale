"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[9223],{4137:function(e,t,n){n.d(t,{Zo:function(){return p},kt:function(){return m}});var a=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function r(e,t){if(null==e)return{};var n,a,i=function(e,t){if(null==e)return{};var n,a,i={},s=Object.keys(e);for(a=0;a<s.length;a++)n=s[a],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(a=0;a<s.length;a++)n=s[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var o=a.createContext({}),u=function(e){var t=a.useContext(o),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},p=function(e){var t=u(e.components);return a.createElement(o.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var n=e.components,i=e.mdxType,s=e.originalType,o=e.parentName,p=r(e,["components","mdxType","originalType","parentName"]),d=u(n),m=i,b=d["".concat(o,".").concat(m)]||d[m]||c[m]||s;return n?a.createElement(b,l(l({ref:t},p),{},{components:n})):a.createElement(b,l({ref:t},p))}));function m(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var s=n.length,l=new Array(s);l[0]=d;var r={};for(var o in t)hasOwnProperty.call(t,o)&&(r[o]=t[o]);r.originalType=e,r.mdxType="string"==typeof e?e:i,l[1]=r;for(var u=2;u<s;u++)l[u]=n[u];return a.createElement.apply(null,l)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},3220:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return r},contentTitle:function(){return o},metadata:function(){return u},assets:function(){return p},toc:function(){return c},default:function(){return m}});var a=n(7462),i=n(3366),s=(n(7294),n(4137)),l=["components"],r={id:"issue-stale-label-input",title:"Stale issue label input",description:"All the information you need to know about the stale issue label input.\nIncluding a detailed description and an example.\n",tags:["Issues","Inputs","Labels","Cache"]},o=void 0,u={unversionedId:"issues/inputs/issue-stale-label-input",id:"issues/inputs/issue-stale-label-input",title:"Stale issue label input",description:"All the information you need to know about the stale issue label input.\nIncluding a detailed description and an example.\n",source:"@site/docs/06-issues/01-inputs/02-stale-label-input.mdx",sourceDirName:"06-issues/01-inputs",slug:"/issues/inputs/issue-stale-label-input",permalink:"/stale/fr/docs/issues/inputs/issue-stale-label-input",editUrl:"https://github.com/Sonia-corporation/stale/tree/develop/documentation/docs/06-issues/01-inputs/02-stale-label-input.mdx",tags:[{label:"Issues",permalink:"/stale/fr/docs/tags/issues"},{label:"Inputs",permalink:"/stale/fr/docs/tags/inputs"},{label:"Labels",permalink:"/stale/fr/docs/tags/labels"},{label:"Cache",permalink:"/stale/fr/docs/tags/cache"}],version:"current",sidebarPosition:2,frontMatter:{id:"issue-stale-label-input",title:"Stale issue label input",description:"All the information you need to know about the stale issue label input.\nIncluding a detailed description and an example.\n",tags:["Issues","Inputs","Labels","Cache"]},sidebar:"tutorialSidebar",previous:{title:"All issues inputs",permalink:"/stale/fr/docs/issues/inputs/all-issues-inputs"},next:{title:"Ignore all issue labels input",permalink:"/stale/fr/docs/issues/inputs/issue-ignore-all-labels-input"}},p={},c=[{value:"Input",id:"input",level:3},{value:"Description",id:"description",level:3},{value:"Cache",id:"cache",level:3},{value:"Example",id:"example",level:3}],d={toc:c};function m(e){var t=e.components,n=(0,i.Z)(e,l);return(0,s.kt)("wrapper",(0,a.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,s.kt)("h3",{id:"input"},"Input"),(0,s.kt)("p",null,"Name: ",(0,s.kt)("inlineCode",{parentName:"p"},"issue-stale-label"),(0,s.kt)("br",{parentName:"p"}),"\n","Type: ",(0,s.kt)("inlineCode",{parentName:"p"},"string"),(0,s.kt)("br",{parentName:"p"}),"\n","Default value: ",(0,s.kt)("inlineCode",{parentName:"p"},"stale")),(0,s.kt)("h3",{id:"description"},"Description"),(0,s.kt)("p",null,"This input will let you define the label (by name) that will be added to your issues when they are considered as stale."),(0,s.kt)("p",null,"If the label is added to an issue (based on the ",(0,s.kt)("a",{parentName:"p",href:"issue-days-before-stale-input"},"days before stale input"),"), the next time the issue is processed, the workflow will process it as a candidate for un-stale.",(0,s.kt)("br",{parentName:"p"}),"\n","If the issue was updated after the addition of the label, the issue will be un-stale, and the label will be removed."),(0,s.kt)("p",null,"Once the un-stale processing is done, if the issue is still stale, the workflow will then process it as a candidate for closing.",(0,s.kt)("br",{parentName:"p"}),"\n","If the issue is stale for too long (based on the ",(0,s.kt)("a",{parentName:"p",href:"issue-days-before-close-input"},"days before close input"),"), the issue will be closed."),(0,s.kt)("div",{className:"admonition admonition-caution alert alert--warning"},(0,s.kt)("div",{parentName:"div",className:"admonition-heading"},(0,s.kt)("h5",{parentName:"div"},(0,s.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,s.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 16 16"},(0,s.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M8.893 1.5c-.183-.31-.52-.5-.887-.5s-.703.19-.886.5L.138 13.499a.98.98 0 0 0 0 1.001c.193.31.53.501.886.501h13.964c.367 0 .704-.19.877-.5a1.03 1.03 0 0 0 .01-1.002L8.893 1.5zm.133 11.497H6.987v-2.003h2.039v2.003zm0-3.004H6.987V5.987h2.039v4.006z"}))),"caution")),(0,s.kt)("div",{parentName:"div",className:"admonition-content"},(0,s.kt)("p",{parentName:"div"},"The label must be a real label, existing inside your repository list of labels (",(0,s.kt)("em",{parentName:"p"},"github.com/your-organization/your-repository/labels"),").",(0,s.kt)("br",{parentName:"p"}),"\n","If not, the GitHub API will throw an error."))),(0,s.kt)("h3",{id:"cache"},"Cache"),(0,s.kt)("p",null,"The label will be cached during the workflow.",(0,s.kt)("br",{parentName:"p"}),"\n","This will reduce the number of calls made to the GitHub API, which will also reduce the quotas consumed for your GitHub token, avoiding reaching rate limits."),(0,s.kt)("h3",{id:"example"},"Example"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-yml",metastring:"{6}","{6}":!0},"# ...\nname: Stale\nid: stale\nuses: sonia-corporation/stale@latest\nwith:\n  issue-stale-label: stale-label\n")))}m.isMDXComponent=!0}}]);