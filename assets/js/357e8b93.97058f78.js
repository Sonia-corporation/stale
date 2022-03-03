"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[5303],{4137:function(e,t,n){n.d(t,{Zo:function(){return p},kt:function(){return f}});var r=n(7294);function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function u(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){l(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,r,l=function(e,t){if(null==e)return{};var n,r,l={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(l[n]=e[n]);return l}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(l[n]=e[n])}return l}var i=r.createContext({}),s=function(e){var t=r.useContext(i),n=t;return e&&(n="function"==typeof e?e(t):u(u({},t),e)),n},p=function(e){var t=s(e.components);return r.createElement(i.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,l=e.mdxType,a=e.originalType,i=e.parentName,p=o(e,["components","mdxType","originalType","parentName"]),d=s(n),f=l,m=d["".concat(i,".").concat(f)]||d[f]||c[f]||a;return n?r.createElement(m,u(u({ref:t},p),{},{components:n})):r.createElement(m,u({ref:t},p))}));function f(e,t){var n=arguments,l=t&&t.mdxType;if("string"==typeof e||l){var a=n.length,u=new Array(a);u[0]=d;var o={};for(var i in t)hasOwnProperty.call(t,i)&&(o[i]=t[i]);o.originalType=e,o.mdxType="string"==typeof e?e:l,u[1]=o;for(var s=2;s<a;s++)u[s]=n[s];return r.createElement.apply(null,u)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},4216:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return o},contentTitle:function(){return i},metadata:function(){return s},assets:function(){return p},toc:function(){return c},default:function(){return f}});var r=n(7462),l=n(3366),a=(n(7294),n(4137)),u=["components"],o={id:"pull-request-delete-branch-after-close-input",title:"Delete pull request branch after close input",description:"All the information you need to know about the delete pull request branch after close input.\nIncluding a detailed description and an example.\n",tags:["Pull requests","Inputs","Branches"]},i=void 0,s={unversionedId:"pull-requests/inputs/pull-request-delete-branch-after-close-input",id:"pull-requests/inputs/pull-request-delete-branch-after-close-input",title:"Delete pull request branch after close input",description:"All the information you need to know about the delete pull request branch after close input.\nIncluding a detailed description and an example.\n",source:"@site/docs/08-pull-requests/01-inputs/15-delete-branch-after-close-input.mdx",sourceDirName:"08-pull-requests/01-inputs",slug:"/pull-requests/inputs/pull-request-delete-branch-after-close-input",permalink:"/stale/docs/pull-requests/inputs/pull-request-delete-branch-after-close-input",editUrl:"https://github.com/Sonia-corporation/stale/tree/develop/documentation/docs/08-pull-requests/01-inputs/15-delete-branch-after-close-input.mdx",tags:[{label:"Pull requests",permalink:"/stale/docs/tags/pull-requests"},{label:"Inputs",permalink:"/stale/docs/tags/inputs"},{label:"Branches",permalink:"/stale/docs/tags/branches"}],version:"current",sidebarPosition:15,frontMatter:{id:"pull-request-delete-branch-after-close-input",title:"Delete pull request branch after close input",description:"All the information you need to know about the delete pull request branch after close input.\nIncluding a detailed description and an example.\n",tags:["Pull requests","Inputs","Branches"]},sidebar:"tutorialSidebar",previous:{title:"Close pull request comment input",permalink:"/stale/docs/pull-requests/inputs/pull-request-close-comment-input"},next:{title:"Add pull request labels after stale input",permalink:"/stale/docs/pull-requests/inputs/pull-request-add-labels-after-stale-input"}},p={},c=[{value:"Input",id:"input",level:3},{value:"Description",id:"description",level:3},{value:"Example",id:"example",level:3}],d={toc:c};function f(e){var t=e.components,n=(0,l.Z)(e,u);return(0,a.kt)("wrapper",(0,r.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h3",{id:"input"},"Input"),(0,a.kt)("p",null,"Name: ",(0,a.kt)("inlineCode",{parentName:"p"},"pull-request-delete-branch-after-close"),(0,a.kt)("br",{parentName:"p"}),"\n","Type: ",(0,a.kt)("inlineCode",{parentName:"p"},"boolean"),(0,a.kt)("br",{parentName:"p"}),"\n","Default value: ",(0,a.kt)("inlineCode",{parentName:"p"},"false")),(0,a.kt)("h3",{id:"description"},"Description"),(0,a.kt)("p",null,"This input will let you delete the branch associated to your pull requests when the processing close them.",(0,a.kt)("br",{parentName:"p"}),"\n","This can be useful when you didn't enable the auto-deletion of branches and want to avoid having stale branches after some time."),(0,a.kt)("h3",{id:"example"},"Example"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-yml",metastring:"{6}","{6}":!0},"# ...\nname: Stale\nid: stale\nuses: sonia-corporation/stale@latest\nwith:\n  pull-request-delete-branch-after-close: true\n")))}f.isMDXComponent=!0}}]);