"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[2823],{4137:function(e,t,n){n.d(t,{Zo:function(){return c},kt:function(){return d}});var i=n(7294);function s(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){s(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function a(e,t){if(null==e)return{};var n,i,s=function(e,t){if(null==e)return{};var n,i,s={},r=Object.keys(e);for(i=0;i<r.length;i++)n=r[i],t.indexOf(n)>=0||(s[n]=e[n]);return s}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(i=0;i<r.length;i++)n=r[i],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(s[n]=e[n])}return s}var u=i.createContext({}),l=function(e){var t=i.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},c=function(e){var t=l(e.components);return i.createElement(u.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return i.createElement(i.Fragment,{},t)}},m=i.forwardRef((function(e,t){var n=e.components,s=e.mdxType,r=e.originalType,u=e.parentName,c=a(e,["components","mdxType","originalType","parentName"]),m=l(n),d=s,f=m["".concat(u,".").concat(d)]||m[d]||p[d]||r;return n?i.createElement(f,o(o({ref:t},c),{},{components:n})):i.createElement(f,o({ref:t},c))}));function d(e,t){var n=arguments,s=t&&t.mdxType;if("string"==typeof e||s){var r=n.length,o=new Array(r);o[0]=m;var a={};for(var u in t)hasOwnProperty.call(t,u)&&(a[u]=t[u]);a.originalType=e,a.mdxType="string"==typeof e?e:s,o[1]=a;for(var l=2;l<r;l++)o[l]=n[l];return i.createElement.apply(null,o)}return i.createElement.apply(null,n)}m.displayName="MDXCreateElement"},3872:function(e,t,n){n.r(t),n.d(t,{assets:function(){return c},contentTitle:function(){return u},default:function(){return d},frontMatter:function(){return a},metadata:function(){return l},toc:function(){return p}});var i=n(7462),s=n(3366),r=(n(7294),n(4137)),o=["components"],a={id:"issue-stale-comment-input",title:"Stale issue comment input",description:"All the information you need to know about the stale issue comment input.\nIncluding a detailed description and an example.\n",tags:["Issues","Inputs","Comments"]},u=void 0,l={unversionedId:"issues/inputs/issue-stale-comment-input",id:"issues/inputs/issue-stale-comment-input",title:"Stale issue comment input",description:"All the information you need to know about the stale issue comment input.\nIncluding a detailed description and an example.\n",source:"@site/docs/06-issues/01-inputs/11-stale-comment-input.mdx",sourceDirName:"06-issues/01-inputs",slug:"/issues/inputs/issue-stale-comment-input",permalink:"/stale/docs/issues/inputs/issue-stale-comment-input",editUrl:"https://github.com/Sonia-corporation/stale/tree/develop/documentation/docs/06-issues/01-inputs/11-stale-comment-input.mdx",tags:[{label:"Issues",permalink:"/stale/docs/tags/issues"},{label:"Inputs",permalink:"/stale/docs/tags/inputs"},{label:"Comments",permalink:"/stale/docs/tags/comments"}],version:"current",sidebarPosition:11,frontMatter:{id:"issue-stale-comment-input",title:"Stale issue comment input",description:"All the information you need to know about the stale issue comment input.\nIncluding a detailed description and an example.\n",tags:["Issues","Inputs","Comments"]},sidebar:"tutorialSidebar",previous:{title:"Days before issue stale input",permalink:"/stale/docs/issues/inputs/issue-days-before-stale-input"},next:{title:"Days before issue close input",permalink:"/stale/docs/issues/inputs/issue-days-before-close-input"}},c={},p=[{value:"Input",id:"input",level:3},{value:"Description",id:"description",level:3},{value:"Example",id:"example",level:3}],m={toc:p};function d(e){var t=e.components,n=(0,s.Z)(e,o);return(0,r.kt)("wrapper",(0,i.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h3",{id:"input"},"Input"),(0,r.kt)("p",null,"Name: ",(0,r.kt)("inlineCode",{parentName:"p"},"issue-stale-comment"),(0,r.kt)("br",{parentName:"p"}),"\n","Type: ",(0,r.kt)("inlineCode",{parentName:"p"},"string"),(0,r.kt)("br",{parentName:"p"}),"\n","Default value: ",(0,r.kt)("inlineCode",{parentName:"p"},"''")),(0,r.kt)("h3",{id:"description"},"Description"),(0,r.kt)("p",null,"This input will let you define the comment that will be added on the issues when they are stale during the processing.\nThis can be useful if you wish to improve the call to action so that watchers can be aware that their issues may be closed soon."),(0,r.kt)("h3",{id:"example"},"Example"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yml",metastring:"{6}","{6}":!0},"# ...\nname: Stale\nid: stale\nuses: sonia-corporation/stale@latest\nwith:\n  issue-stale-comment: |\n    This issue is now stale due to a lack of activity!\n")))}d.isMDXComponent=!0}}]);