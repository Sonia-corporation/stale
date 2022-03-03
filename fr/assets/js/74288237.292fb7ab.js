"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[7778],{4137:function(e,t,n){n.d(t,{Zo:function(){return p},kt:function(){return d}});var r=n(7294);function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function u(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?u(Object(n),!0).forEach((function(t){l(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):u(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function a(e,t){if(null==e)return{};var n,r,l=function(e,t){if(null==e)return{};var n,r,l={},u=Object.keys(e);for(r=0;r<u.length;r++)n=u[r],t.indexOf(n)>=0||(l[n]=e[n]);return l}(e,t);if(Object.getOwnPropertySymbols){var u=Object.getOwnPropertySymbols(e);for(r=0;r<u.length;r++)n=u[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(l[n]=e[n])}return l}var i=r.createContext({}),s=function(e){var t=r.useContext(i),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},p=function(e){var t=s(e.components);return r.createElement(i.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,l=e.mdxType,u=e.originalType,i=e.parentName,p=a(e,["components","mdxType","originalType","parentName"]),m=s(n),d=l,f=m["".concat(i,".").concat(d)]||m[d]||c[d]||u;return n?r.createElement(f,o(o({ref:t},p),{},{components:n})):r.createElement(f,o({ref:t},p))}));function d(e,t){var n=arguments,l=t&&t.mdxType;if("string"==typeof e||l){var u=n.length,o=new Array(u);o[0]=m;var a={};for(var i in t)hasOwnProperty.call(t,i)&&(a[i]=t[i]);a.originalType=e,a.mdxType="string"==typeof e?e:l,o[1]=a;for(var s=2;s<u;s++)o[s]=n[s];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},6728:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return a},contentTitle:function(){return i},metadata:function(){return s},assets:function(){return p},toc:function(){return c},default:function(){return d}});var r=n(7462),l=n(3366),u=(n(7294),n(4137)),o=["components"],a={id:"pull-request-stale-comment-input",title:"Stale pull request comment input",description:"All the information you need to know about the stale pull request comment input.\nIncluding a detailed description and an example.\n",tags:["Pull requests","Inputs","Comments"]},i=void 0,s={unversionedId:"pull-requests/inputs/pull-request-stale-comment-input",id:"pull-requests/inputs/pull-request-stale-comment-input",title:"Stale pull request comment input",description:"All the information you need to know about the stale pull request comment input.\nIncluding a detailed description and an example.\n",source:"@site/docs/08-pull-requests/01-inputs/12-stale-comment-input.mdx",sourceDirName:"08-pull-requests/01-inputs",slug:"/pull-requests/inputs/pull-request-stale-comment-input",permalink:"/stale/fr/docs/pull-requests/inputs/pull-request-stale-comment-input",editUrl:"https://github.com/Sonia-corporation/stale/tree/develop/documentation/docs/08-pull-requests/01-inputs/12-stale-comment-input.mdx",tags:[{label:"Pull requests",permalink:"/stale/fr/docs/tags/pull-requests"},{label:"Inputs",permalink:"/stale/fr/docs/tags/inputs"},{label:"Comments",permalink:"/stale/fr/docs/tags/comments"}],version:"current",sidebarPosition:12,frontMatter:{id:"pull-request-stale-comment-input",title:"Stale pull request comment input",description:"All the information you need to know about the stale pull request comment input.\nIncluding a detailed description and an example.\n",tags:["Pull requests","Inputs","Comments"]},sidebar:"tutorialSidebar",previous:{title:"Days before pull request stale input",permalink:"/stale/fr/docs/pull-requests/inputs/pull-request-days-before-stale-input"},next:{title:"Days before pull request close input",permalink:"/stale/fr/docs/pull-requests/inputs/pull-request-days-before-close-input"}},p={},c=[{value:"Input",id:"input",level:3},{value:"Description",id:"description",level:3},{value:"Example",id:"example",level:3}],m={toc:c};function d(e){var t=e.components,n=(0,l.Z)(e,o);return(0,u.kt)("wrapper",(0,r.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,u.kt)("h3",{id:"input"},"Input"),(0,u.kt)("p",null,"Name: ",(0,u.kt)("inlineCode",{parentName:"p"},"pull-request-stale-comment"),(0,u.kt)("br",{parentName:"p"}),"\n","Type: ",(0,u.kt)("inlineCode",{parentName:"p"},"string"),(0,u.kt)("br",{parentName:"p"}),"\n","Default value: ",(0,u.kt)("inlineCode",{parentName:"p"},"''")),(0,u.kt)("h3",{id:"description"},"Description"),(0,u.kt)("p",null,"This input will let you define the comment that will be added on the pull requests when they are stale during the processing.\nThis can be useful if you wish to improve the call to action so that watchers can be aware that their pull requests may be closed soon."),(0,u.kt)("h3",{id:"example"},"Example"),(0,u.kt)("pre",null,(0,u.kt)("code",{parentName:"pre",className:"language-yml",metastring:"{6}","{6}":!0},"# ...\nname: Stale\nid: stale\nuses: sonia-corporation/stale@latest\nwith:\n  pull-request-stale-comment: |\n    This pull request is now stale due to a lack of activity!\n")))}d.isMDXComponent=!0}}]);