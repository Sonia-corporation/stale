"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[8750],{3905:function(e,t,n){n.d(t,{Zo:function(){return l},kt:function(){return d}});var i=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function u(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,i,r=function(e,t){if(null==e)return{};var n,i,r={},s=Object.keys(e);for(i=0;i<s.length;i++)n=s[i],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(i=0;i<s.length;i++)n=s[i],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var a=i.createContext({}),p=function(e){var t=i.useContext(a),n=t;return e&&(n="function"==typeof e?e(t):u(u({},t),e)),n},l=function(e){var t=p(e.components);return i.createElement(a.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return i.createElement(i.Fragment,{},t)}},m=i.forwardRef((function(e,t){var n=e.components,r=e.mdxType,s=e.originalType,a=e.parentName,l=o(e,["components","mdxType","originalType","parentName"]),m=p(n),d=r,f=m["".concat(a,".").concat(d)]||m[d]||c[d]||s;return n?i.createElement(f,u(u({ref:t},l),{},{components:n})):i.createElement(f,u({ref:t},l))}));function d(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var s=n.length,u=new Array(s);u[0]=m;var o={};for(var a in t)hasOwnProperty.call(t,a)&&(o[a]=t[a]);o.originalType=e,o.mdxType="string"==typeof e?e:r,u[1]=o;for(var p=2;p<s;p++)u[p]=n[p];return i.createElement.apply(null,u)}return i.createElement.apply(null,n)}m.displayName="MDXCreateElement"},5919:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return o},contentTitle:function(){return a},metadata:function(){return p},toc:function(){return l},default:function(){return m}});var i=n(7462),r=n(3366),s=(n(7294),n(3905)),u=["components"],o={id:"issue-limit-api-queries-count-input",title:"Issue limit api queries count input",description:"All the information you need to know about the issue limit api queries count input.\nIncluding a detailed description and an example.\n",tags:["Issues","Inputs"]},a=void 0,p={unversionedId:"issues/inputs/issue-limit-api-queries-count-input",id:"issues/inputs/issue-limit-api-queries-count-input",title:"Issue limit api queries count input",description:"All the information you need to know about the issue limit api queries count input.\nIncluding a detailed description and an example.\n",source:"@site/docs/06-issues/01-inputs/17-limit-api-queries-count-input.mdx",sourceDirName:"06-issues/01-inputs",slug:"/issues/inputs/issue-limit-api-queries-count-input",permalink:"/stale/fr/docs/issues/inputs/issue-limit-api-queries-count-input",editUrl:"https://github.com/Sonia-corporation/stale/tree/develop/documentation/docs/06-issues/01-inputs/17-limit-api-queries-count-input.mdx",tags:[{label:"Issues",permalink:"/stale/fr/docs/tags/issues"},{label:"Inputs",permalink:"/stale/fr/docs/tags/inputs"}],version:"current",sidebarPosition:17,frontMatter:{id:"issue-limit-api-queries-count-input",title:"Issue limit api queries count input",description:"All the information you need to know about the issue limit api queries count input.\nIncluding a detailed description and an example.\n",tags:["Issues","Inputs"]},sidebar:"tutorialSidebar",previous:{title:"Issue processing input",permalink:"/stale/fr/docs/issues/inputs/issue-processing-input"},next:{title:"Issue limit api mutations count input",permalink:"/stale/fr/docs/issues/inputs/issue-limit-api-mutations-count-input"}},l=[{value:"Input",id:"input",children:[],level:3},{value:"Description",id:"description",children:[],level:3},{value:"Example",id:"example",children:[],level:3}],c={toc:l};function m(e){var t=e.components,n=(0,r.Z)(e,u);return(0,s.kt)("wrapper",(0,i.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,s.kt)("h3",{id:"input"},"Input"),(0,s.kt)("p",null,"Name: ",(0,s.kt)("inlineCode",{parentName:"p"},"issue-limit-api-queries-count"),(0,s.kt)("br",{parentName:"p"}),"\n","Type: ",(0,s.kt)("inlineCode",{parentName:"p"},"number"),(0,s.kt)("br",{parentName:"p"}),"\n","Default value: ",(0,s.kt)("inlineCode",{parentName:"p"},"-1")),(0,s.kt)("h3",{id:"description"},"Description"),(0,s.kt)("p",null,"This input will let you define a limit count of issues API queries (read) calls performed during the processing.",(0,s.kt)("br",{parentName:"p"}),"\n","If the limit is reached, the ongoing processed issue will finish it's processing then all other issues will be ignored.",(0,s.kt)("br",{parentName:"p"}),"\n","This can be useful when you want to play it safe with this action.",(0,s.kt)("br",{parentName:"p"}),"\n","This can be also very useful if you have a lot of issues to process, and you want to limit the quotas of your associated ",(0,s.kt)("a",{parentName:"p",href:"../../github-token-input"},"GitHub token"),"."),(0,s.kt)("h3",{id:"example"},"Example"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-yml",metastring:"{6}","{6}":!0},"# ...\nname: Stale\nid: stale\nuses: sonia-corporation/stale@latest\nwith:\n  issue-limit-api-queries-count: 100\n")))}m.isMDXComponent=!0}}]);