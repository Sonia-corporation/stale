"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[1556],{3905:function(e,t,n){n.d(t,{Zo:function(){return p},kt:function(){return d}});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function u(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},l=Object.keys(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var s=r.createContext({}),a=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=a(e.components);return r.createElement(s.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,l=e.originalType,s=e.parentName,p=u(e,["components","mdxType","originalType","parentName"]),m=a(n),d=o,f=m["".concat(s,".").concat(d)]||m[d]||c[d]||l;return n?r.createElement(f,i(i({ref:t},p),{},{components:n})):r.createElement(f,i({ref:t},p))}));function d(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var l=n.length,i=new Array(l);i[0]=m;var u={};for(var s in t)hasOwnProperty.call(t,s)&&(u[s]=t[s]);u.originalType=e,u.mdxType="string"==typeof e?e:o,i[1]=u;for(var a=2;a<l;a++)i[a]=n[a];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},8187:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return u},contentTitle:function(){return s},metadata:function(){return a},toc:function(){return p},default:function(){return m}});var r=n(7462),o=n(3366),l=(n(7294),n(3905)),i=["components"],u={id:"pull-request-close-comment-option",title:"Close pull request comment option",tags:["Pull requests","Options"]},s=void 0,a={unversionedId:"pull-requests/pull-request-close-comment-option",id:"pull-requests/pull-request-close-comment-option",title:"Close pull request comment option",description:"Input",source:"@site/docs/07-pull-requests/14-close-comment-option.mdx",sourceDirName:"07-pull-requests",slug:"/pull-requests/pull-request-close-comment-option",permalink:"/stale/fr/docs/pull-requests/pull-request-close-comment-option",editUrl:"https://github.com/Sonia-corporation/stale/tree/develop/documentation/docs/07-pull-requests/14-close-comment-option.mdx",tags:[{label:"Pull requests",permalink:"/stale/fr/docs/tags/pull-requests"},{label:"Options",permalink:"/stale/fr/docs/tags/options"}],version:"current",sidebarPosition:14,frontMatter:{id:"pull-request-close-comment-option",title:"Close pull request comment option",tags:["Pull requests","Options"]},sidebar:"tutorialSidebar",previous:{title:"Days before pull request close option",permalink:"/stale/fr/docs/pull-requests/pull-request-days-before-close-option"},next:{title:"Delete pull request branch after close option",permalink:"/stale/fr/docs/pull-requests/pull-request-delete-branch-after-close-option"}},p=[{value:"Input",id:"input",children:[],level:3},{value:"Description",id:"description",children:[],level:3},{value:"Example",id:"example",children:[],level:3}],c={toc:p};function m(e){var t=e.components,n=(0,o.Z)(e,i);return(0,l.kt)("wrapper",(0,r.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("h3",{id:"input"},"Input"),(0,l.kt)("p",null,"Name: ",(0,l.kt)("inlineCode",{parentName:"p"},"pull-request-close-comment"),(0,l.kt)("br",{parentName:"p"}),"\n","Type: ",(0,l.kt)("inlineCode",{parentName:"p"},"string"),(0,l.kt)("br",{parentName:"p"}),"\n","Default value: ",(0,l.kt)("inlineCode",{parentName:"p"},"''")),(0,l.kt)("h3",{id:"description"},"Description"),(0,l.kt)("p",null,"This option will let you define the comment that will be added on the pull requests when they are closed after being stale for too long during the processing.",(0,l.kt)("br",{parentName:"p"}),"\n","This can be useful if you wish to improve the communication and the process on how to handle an unwanted closed pull request."),(0,l.kt)("h3",{id:"example"},"Example"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-yml",metastring:"{6}","{6}":!0},"# ...\nname: Stale\nid: stale\nuses: sonia-corporation/stale@latest\nwith:\n  pull-request-close-comment: |\n    This pull request is now closed due to a lack of activity!\n")))}m.isMDXComponent=!0}}]);