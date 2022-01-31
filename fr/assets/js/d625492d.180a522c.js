"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[4511],{3905:function(e,t,n){n.d(t,{Zo:function(){return c},kt:function(){return d}});var r=n(7294);function s(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){s(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function u(e,t){if(null==e)return{};var n,r,s=function(e,t){if(null==e)return{};var n,r,s={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(s[n]=e[n]);return s}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(s[n]=e[n])}return s}var a=r.createContext({}),l=function(e){var t=r.useContext(a),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},c=function(e){var t=l(e.components);return r.createElement(a.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,s=e.mdxType,i=e.originalType,a=e.parentName,c=u(e,["components","mdxType","originalType","parentName"]),m=l(n),d=s,f=m["".concat(a,".").concat(d)]||m[d]||p[d]||i;return n?r.createElement(f,o(o({ref:t},c),{},{components:n})):r.createElement(f,o({ref:t},c))}));function d(e,t){var n=arguments,s=t&&t.mdxType;if("string"==typeof e||s){var i=n.length,o=new Array(i);o[0]=m;var u={};for(var a in t)hasOwnProperty.call(t,a)&&(u[a]=t[a]);u.originalType=e,u.mdxType="string"==typeof e?e:s,o[1]=u;for(var l=2;l<i;l++)o[l]=n[l];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},1940:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return u},contentTitle:function(){return a},metadata:function(){return l},toc:function(){return c},default:function(){return m}});var r=n(7462),s=n(3366),i=(n(7294),n(3905)),o=["components"],u={id:"issue-close-comment-input",title:"Close issue comment input",tags:["Issues","Inputs"]},a=void 0,l={unversionedId:"issues/inputs/issue-close-comment-input",id:"issues/inputs/issue-close-comment-input",title:"Close issue comment input",description:"Input",source:"@site/docs/06-issues/01-inputs/13-close-comment-input.mdx",sourceDirName:"06-issues/01-inputs",slug:"/issues/inputs/issue-close-comment-input",permalink:"/stale/fr/docs/issues/inputs/issue-close-comment-input",editUrl:"https://github.com/Sonia-corporation/stale/tree/develop/documentation/docs/06-issues/01-inputs/13-close-comment-input.mdx",tags:[{label:"Issues",permalink:"/stale/fr/docs/tags/issues"},{label:"Inputs",permalink:"/stale/fr/docs/tags/inputs"}],version:"current",sidebarPosition:13,frontMatter:{id:"issue-close-comment-input",title:"Close issue comment input",tags:["Issues","Inputs"]},sidebar:"tutorialSidebar",previous:{title:"Days before issue close input",permalink:"/stale/fr/docs/issues/inputs/issue-days-before-close-input"},next:{title:"Add issue labels after stale input",permalink:"/stale/fr/docs/issues/inputs/issue-add-labels-after-stale-input"}},c=[{value:"Input",id:"input",children:[],level:3},{value:"Description",id:"description",children:[],level:3},{value:"Example",id:"example",children:[],level:3}],p={toc:c};function m(e){var t=e.components,n=(0,s.Z)(e,o);return(0,i.kt)("wrapper",(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h3",{id:"input"},"Input"),(0,i.kt)("p",null,"Name: ",(0,i.kt)("inlineCode",{parentName:"p"},"issue-close-comment"),(0,i.kt)("br",{parentName:"p"}),"\n","Type: ",(0,i.kt)("inlineCode",{parentName:"p"},"string"),(0,i.kt)("br",{parentName:"p"}),"\n","Default value: ",(0,i.kt)("inlineCode",{parentName:"p"},"''")),(0,i.kt)("h3",{id:"description"},"Description"),(0,i.kt)("p",null,"This input will let you define the comment that will be added on the issues when they are closed after being stale for too long during the processing.",(0,i.kt)("br",{parentName:"p"}),"\n","This can be useful if you wish to improve the communication and the process on how to handle an unwanted closed issue."),(0,i.kt)("h3",{id:"example"},"Example"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-yml",metastring:"{6}","{6}":!0},"# ...\nname: Stale\nid: stale\nuses: sonia-corporation/stale@latest\nwith:\n  issue-close-comment: |\n    This issue is now closed due to a lack of activity!\n")))}m.isMDXComponent=!0}}]);