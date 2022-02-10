"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[4511],{3905:function(e,t,n){n.d(t,{Zo:function(){return c},kt:function(){return d}});var i=n(7294);function s(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){s(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function a(e,t){if(null==e)return{};var n,i,s=function(e,t){if(null==e)return{};var n,i,s={},o=Object.keys(e);for(i=0;i<o.length;i++)n=o[i],t.indexOf(n)>=0||(s[n]=e[n]);return s}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(i=0;i<o.length;i++)n=o[i],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(s[n]=e[n])}return s}var u=i.createContext({}),l=function(e){var t=i.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):r(r({},t),e)),n},c=function(e){var t=l(e.components);return i.createElement(u.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return i.createElement(i.Fragment,{},t)}},m=i.forwardRef((function(e,t){var n=e.components,s=e.mdxType,o=e.originalType,u=e.parentName,c=a(e,["components","mdxType","originalType","parentName"]),m=l(n),d=s,f=m["".concat(u,".").concat(d)]||m[d]||p[d]||o;return n?i.createElement(f,r(r({ref:t},c),{},{components:n})):i.createElement(f,r({ref:t},c))}));function d(e,t){var n=arguments,s=t&&t.mdxType;if("string"==typeof e||s){var o=n.length,r=new Array(o);r[0]=m;var a={};for(var u in t)hasOwnProperty.call(t,u)&&(a[u]=t[u]);a.originalType=e,a.mdxType="string"==typeof e?e:s,r[1]=a;for(var l=2;l<o;l++)r[l]=n[l];return i.createElement.apply(null,r)}return i.createElement.apply(null,n)}m.displayName="MDXCreateElement"},1940:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return a},contentTitle:function(){return u},metadata:function(){return l},toc:function(){return c},default:function(){return m}});var i=n(7462),s=n(3366),o=(n(7294),n(3905)),r=["components"],a={id:"issue-close-comment-input",title:"Close issue comment input",description:"All the information you need to know about the close issue comment input.\nIncluding a detailed description and an example.\n",tags:["Issues","Inputs","Comments"]},u=void 0,l={unversionedId:"issues/inputs/issue-close-comment-input",id:"issues/inputs/issue-close-comment-input",title:"Close issue comment input",description:"All the information you need to know about the close issue comment input.\nIncluding a detailed description and an example.\n",source:"@site/docs/06-issues/01-inputs/13-close-comment-input.mdx",sourceDirName:"06-issues/01-inputs",slug:"/issues/inputs/issue-close-comment-input",permalink:"/stale/docs/issues/inputs/issue-close-comment-input",editUrl:"https://github.com/Sonia-corporation/stale/tree/develop/documentation/docs/06-issues/01-inputs/13-close-comment-input.mdx",tags:[{label:"Issues",permalink:"/stale/docs/tags/issues"},{label:"Inputs",permalink:"/stale/docs/tags/inputs"},{label:"Comments",permalink:"/stale/docs/tags/comments"}],version:"current",sidebarPosition:13,frontMatter:{id:"issue-close-comment-input",title:"Close issue comment input",description:"All the information you need to know about the close issue comment input.\nIncluding a detailed description and an example.\n",tags:["Issues","Inputs","Comments"]},sidebar:"tutorialSidebar",previous:{title:"Days before issue close input",permalink:"/stale/docs/issues/inputs/issue-days-before-close-input"},next:{title:"Add issue labels after stale input",permalink:"/stale/docs/issues/inputs/issue-add-labels-after-stale-input"}},c=[{value:"Input",id:"input",children:[],level:3},{value:"Description",id:"description",children:[],level:3},{value:"Example",id:"example",children:[],level:3}],p={toc:c};function m(e){var t=e.components,n=(0,s.Z)(e,r);return(0,o.kt)("wrapper",(0,i.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h3",{id:"input"},"Input"),(0,o.kt)("p",null,"Name: ",(0,o.kt)("inlineCode",{parentName:"p"},"issue-close-comment"),(0,o.kt)("br",{parentName:"p"}),"\n","Type: ",(0,o.kt)("inlineCode",{parentName:"p"},"string"),(0,o.kt)("br",{parentName:"p"}),"\n","Default value: ",(0,o.kt)("inlineCode",{parentName:"p"},"''")),(0,o.kt)("h3",{id:"description"},"Description"),(0,o.kt)("p",null,"This input will let you define the comment that will be added on the issues when they are closed after being stale for too long during the processing.",(0,o.kt)("br",{parentName:"p"}),"\n","This can be useful if you wish to improve the communication and the process on how to handle an unwanted closed issue."),(0,o.kt)("h3",{id:"example"},"Example"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-yml",metastring:"{6}","{6}":!0},"# ...\nname: Stale\nid: stale\nuses: sonia-corporation/stale@latest\nwith:\n  issue-close-comment: |\n    This issue is now closed due to a lack of activity!\n")))}m.isMDXComponent=!0}}]);