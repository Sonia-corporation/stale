"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[6911],{4137:function(e,t,n){n.d(t,{Zo:function(){return p},kt:function(){return d}});var i=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function u(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,i,r=function(e,t){if(null==e)return{};var n,i,r={},a=Object.keys(e);for(i=0;i<a.length;i++)n=a[i],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(i=0;i<a.length;i++)n=a[i],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var o=i.createContext({}),s=function(e){var t=i.useContext(o),n=t;return e&&(n="function"==typeof e?e(t):u(u({},t),e)),n},p=function(e){var t=s(e.components);return i.createElement(o.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return i.createElement(i.Fragment,{},t)}},m=i.forwardRef((function(e,t){var n=e.components,r=e.mdxType,a=e.originalType,o=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),m=s(n),d=r,f=m["".concat(o,".").concat(d)]||m[d]||c[d]||a;return n?i.createElement(f,u(u({ref:t},p),{},{components:n})):i.createElement(f,u({ref:t},p))}));function d(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=n.length,u=new Array(a);u[0]=m;var l={};for(var o in t)hasOwnProperty.call(t,o)&&(l[o]=t[o]);l.originalType=e,l.mdxType="string"==typeof e?e:r,u[1]=l;for(var s=2;s<a;s++)u[s]=n[s];return i.createElement.apply(null,u)}return i.createElement.apply(null,n)}m.displayName="MDXCreateElement"},5003:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return l},contentTitle:function(){return o},metadata:function(){return s},assets:function(){return p},toc:function(){return c},default:function(){return d}});var i=n(7462),r=n(3366),a=(n(7294),n(4137)),u=["components"],l={id:"pull-request-limit-api-queries-count-input",title:"Pull request limit api queries count input",description:"All the information you need to know about the pull request limit api queries count input.\nIncluding a detailed description and an example.\n",tags:["Pull requests","Inputs","API","Cache"]},o=void 0,s={unversionedId:"pull-requests/inputs/pull-request-limit-api-queries-count-input",id:"pull-requests/inputs/pull-request-limit-api-queries-count-input",title:"Pull request limit api queries count input",description:"All the information you need to know about the pull request limit api queries count input.\nIncluding a detailed description and an example.\n",source:"@site/docs/08-pull-requests/01-inputs/20-limit-api-queries-count-input.mdx",sourceDirName:"08-pull-requests/01-inputs",slug:"/pull-requests/inputs/pull-request-limit-api-queries-count-input",permalink:"/stale/docs/pull-requests/inputs/pull-request-limit-api-queries-count-input",editUrl:"https://github.com/Sonia-corporation/stale/tree/develop/documentation/docs/08-pull-requests/01-inputs/20-limit-api-queries-count-input.mdx",tags:[{label:"Pull requests",permalink:"/stale/docs/tags/pull-requests"},{label:"Inputs",permalink:"/stale/docs/tags/inputs"},{label:"API",permalink:"/stale/docs/tags/api"},{label:"Cache",permalink:"/stale/docs/tags/cache"}],version:"current",sidebarPosition:20,frontMatter:{id:"pull-request-limit-api-queries-count-input",title:"Pull request limit api queries count input",description:"All the information you need to know about the pull request limit api queries count input.\nIncluding a detailed description and an example.\n",tags:["Pull requests","Inputs","API","Cache"]},sidebar:"tutorialSidebar",previous:{title:"Pull request to draft instead of stale input",permalink:"/stale/docs/pull-requests/inputs/pull-request-to-draft-instead-of-stale-input"},next:{title:"Pull request limit api mutations count input",permalink:"/stale/docs/pull-requests/inputs/pull-request-limit-api-mutations-count-input"}},p={},c=[{value:"Input",id:"input",level:3},{value:"Description",id:"description",level:3},{value:"Cache",id:"cache",level:3},{value:"Example",id:"example",level:3}],m={toc:c};function d(e){var t=e.components,n=(0,r.Z)(e,u);return(0,a.kt)("wrapper",(0,i.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h3",{id:"input"},"Input"),(0,a.kt)("p",null,"Name: ",(0,a.kt)("inlineCode",{parentName:"p"},"pull-request-limit-api-queries-count"),(0,a.kt)("br",{parentName:"p"}),"\n","Type: ",(0,a.kt)("inlineCode",{parentName:"p"},"number"),(0,a.kt)("br",{parentName:"p"}),"\n","Default value: ",(0,a.kt)("inlineCode",{parentName:"p"},"-1")," (unlimited)"),(0,a.kt)("h3",{id:"description"},"Description"),(0,a.kt)("p",null,"This input will let you define a limit count of pull requests API queries (read) calls performed during the processing.",(0,a.kt)("br",{parentName:"p"}),"\n","If the limit is reached, the ongoing processed pull request will finish it's processing then all other pull requests will be ignored.",(0,a.kt)("br",{parentName:"p"}),"\n","This can be useful when you want to play it safe with this action.",(0,a.kt)("br",{parentName:"p"}),"\n","This can be also very useful if you have a lot of pull requests to process, and you want to limit the quotas of your associated ",(0,a.kt)("a",{parentName:"p",href:"../../github-token-input"},"GitHub token"),"."),(0,a.kt)("div",{className:"admonition admonition-info alert alert--info"},(0,a.kt)("div",{parentName:"div",className:"admonition-heading"},(0,a.kt)("h5",{parentName:"div"},(0,a.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,a.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,a.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"info")),(0,a.kt)("div",{parentName:"div",className:"admonition-content"},(0,a.kt)("p",{parentName:"div"},"When the value is below ",(0,a.kt)("inlineCode",{parentName:"p"},"0"),", the input will have no effect."))),(0,a.kt)("h3",{id:"cache"},"Cache"),(0,a.kt)("p",null,"Some queries are cached during the workflow when loading static resources like the labels.",(0,a.kt)("br",{parentName:"p"}),"\n","This will reduce the number of calls made to the GitHub API, which will also reduce the quotas consumed for your GitHub token, avoiding reaching rate limits."),(0,a.kt)("h3",{id:"example"},"Example"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-yml",metastring:"{6}","{6}":!0},"# ...\nname: Stale\nid: stale\nuses: sonia-corporation/stale@latest\nwith:\n  pull-request-limit-api-queries-count: 100\n")))}d.isMDXComponent=!0}}]);