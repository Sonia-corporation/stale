"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[242],{3905:function(t,e,n){n.d(e,{Zo:function(){return c},kt:function(){return d}});var o=n(7294);function r(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function i(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,o)}return n}function a(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?i(Object(n),!0).forEach((function(e){r(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function p(t,e){if(null==t)return{};var n,o,r=function(t,e){if(null==t)return{};var n,o,r={},i=Object.keys(t);for(o=0;o<i.length;o++)n=i[o],e.indexOf(n)>=0||(r[n]=t[n]);return r}(t,e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);for(o=0;o<i.length;o++)n=i[o],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(r[n]=t[n])}return r}var u=o.createContext({}),l=function(t){var e=o.useContext(u),n=e;return t&&(n="function"==typeof t?t(e):a(a({},e),t)),n},c=function(t){var e=l(t.components);return o.createElement(u.Provider,{value:e},t.children)},s={inlineCode:"code",wrapper:function(t){var e=t.children;return o.createElement(o.Fragment,{},e)}},m=o.forwardRef((function(t,e){var n=t.components,r=t.mdxType,i=t.originalType,u=t.parentName,c=p(t,["components","mdxType","originalType","parentName"]),m=l(n),d=r,f=m["".concat(u,".").concat(d)]||m[d]||s[d]||i;return n?o.createElement(f,a(a({ref:e},c),{},{components:n})):o.createElement(f,a({ref:e},c))}));function d(t,e){var n=arguments,r=e&&e.mdxType;if("string"==typeof t||r){var i=n.length,a=new Array(i);a[0]=m;var p={};for(var u in e)hasOwnProperty.call(e,u)&&(p[u]=e[u]);p.originalType=t,p.mdxType="string"==typeof t?t:r,a[1]=p;for(var l=2;l<i;l++)a[l]=n[l];return o.createElement.apply(null,a)}return o.createElement.apply(null,n)}m.displayName="MDXCreateElement"},9939:function(t,e,n){n.r(e),n.d(e,{frontMatter:function(){return p},contentTitle:function(){return u},metadata:function(){return l},toc:function(){return c},default:function(){return m}});var o=n(7462),r=n(3366),i=(n(7294),n(3905)),a=["components"],p={id:"github-token-option",title:"GitHub token option",tags:["Common","Options"]},u=void 0,l={unversionedId:"github-token-option",id:"github-token-option",title:"GitHub token option",description:"Input",source:"@site/docs/04-github-token-option.mdx",sourceDirName:".",slug:"/github-token-option",permalink:"/fr/docs/github-token-option",editUrl:"https://github.com/Sonia-corporation/stale/tree/develop/documentation/docs/04-github-token-option.mdx",tags:[{label:"Common",permalink:"/fr/docs/tags/common"},{label:"Options",permalink:"/fr/docs/tags/options"}],version:"current",sidebarPosition:4,frontMatter:{id:"github-token-option",title:"GitHub token option",tags:["Common","Options"]},sidebar:"tutorialSidebar",previous:{title:"All options",permalink:"/fr/docs/all-options"},next:{title:"Dry-run option",permalink:"/fr/docs/dry-run-option"}},c=[{value:"Input",id:"input",children:[],level:3},{value:"Description",id:"description",children:[],level:3},{value:"Example",id:"example",children:[],level:3}],s={toc:c};function m(t){var e=t.components,n=(0,r.Z)(t,a);return(0,i.kt)("wrapper",(0,o.Z)({},s,n,{components:e,mdxType:"MDXLayout"}),(0,i.kt)("h3",{id:"input"},"Input"),(0,i.kt)("p",null,"Name: ",(0,i.kt)("inlineCode",{parentName:"p"},"github-token"),(0,i.kt)("br",{parentName:"p"}),"\n","Type: ",(0,i.kt)("inlineCode",{parentName:"p"},"string"),(0,i.kt)("br",{parentName:"p"}),"\n","Default value: ",(0,i.kt)("inlineCode",{parentName:"p"},"${{ github.token }}")),(0,i.kt)("h3",{id:"description"},"Description"),(0,i.kt)("p",null,"This option will let you define what GitHub token to use to perform the calls to the GitHub API.",(0,i.kt)("br",{parentName:"p"}),"\n","You can also read the ",(0,i.kt)("a",{parentName:"p",href:"https://docs.github.com/en/actions/security-guides/automatic-token-authentication"},"Automatic token authentication")," to have more information."),(0,i.kt)("h3",{id:"example"},"Example"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-yml",metastring:"{6}","{6}":!0},"# ...\nname: Stale\nid: stale\nuses: sonia-corporation/stale@latest\nwith:\n  github-token: ${{ env.GITHUB_TOKEN }}\n")))}m.isMDXComponent=!0}}]);