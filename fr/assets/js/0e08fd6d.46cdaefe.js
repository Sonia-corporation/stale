"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[4207],{4137:function(e,n,t){t.d(n,{Zo:function(){return p},kt:function(){return d}});var i=t(7294);function s(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function r(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);n&&(i=i.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,i)}return t}function o(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?r(Object(t),!0).forEach((function(n){s(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):r(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,i,s=function(e,n){if(null==e)return{};var t,i,s={},r=Object.keys(e);for(i=0;i<r.length;i++)t=r[i],n.indexOf(t)>=0||(s[t]=e[t]);return s}(e,n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(i=0;i<r.length;i++)t=r[i],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(s[t]=e[t])}return s}var a=i.createContext({}),u=function(e){var n=i.useContext(a),t=n;return e&&(t="function"==typeof e?e(n):o(o({},n),e)),t},p=function(e){var n=u(e.components);return i.createElement(a.Provider,{value:n},e.children)},c={inlineCode:"code",wrapper:function(e){var n=e.children;return i.createElement(i.Fragment,{},n)}},m=i.forwardRef((function(e,n){var t=e.components,s=e.mdxType,r=e.originalType,a=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),m=u(t),d=s,f=m["".concat(a,".").concat(d)]||m[d]||c[d]||r;return t?i.createElement(f,o(o({ref:n},p),{},{components:t})):i.createElement(f,o({ref:n},p))}));function d(e,n){var t=arguments,s=n&&n.mdxType;if("string"==typeof e||s){var r=t.length,o=new Array(r);o[0]=m;var l={};for(var a in n)hasOwnProperty.call(n,a)&&(l[a]=n[a]);l.originalType=e,l.mdxType="string"==typeof e?e:s,o[1]=l;for(var u=2;u<r;u++)o[u]=t[u];return i.createElement.apply(null,o)}return i.createElement.apply(null,t)}m.displayName="MDXCreateElement"},2534:function(e,n,t){t.r(n),t.d(n,{assets:function(){return p},contentTitle:function(){return a},default:function(){return d},frontMatter:function(){return l},metadata:function(){return u},toc:function(){return c}});var i=t(7462),s=t(3366),r=(t(7294),t(4137)),o=["components"],l={id:"issue-ignore-all-milestones-input",title:"Ignore all issue milestones input",description:"All the information you need to know about the ignore all issue milestones input.\nIncluding a detailed description and an example.\n",tags:["Issues","Inputs","Milestones"]},a=void 0,u={unversionedId:"issues/inputs/issue-ignore-all-milestones-input",id:"issues/inputs/issue-ignore-all-milestones-input",title:"Ignore all issue milestones input",description:"All the information you need to know about the ignore all issue milestones input.\nIncluding a detailed description and an example.\n",source:"@site/docs/06-issues/01-inputs/22-ignore-all-milestones-input.mdx",sourceDirName:"06-issues/01-inputs",slug:"/issues/inputs/issue-ignore-all-milestones-input",permalink:"/stale/fr/docs/issues/inputs/issue-ignore-all-milestones-input",editUrl:"https://github.com/Sonia-corporation/stale/tree/develop/documentation/docs/06-issues/01-inputs/22-ignore-all-milestones-input.mdx",tags:[{label:"Issues",permalink:"/stale/fr/docs/tags/issues"},{label:"Inputs",permalink:"/stale/fr/docs/tags/inputs"},{label:"Milestones",permalink:"/stale/fr/docs/tags/milestones"}],version:"current",sidebarPosition:22,frontMatter:{id:"issue-ignore-all-milestones-input",title:"Ignore all issue milestones input",description:"All the information you need to know about the ignore all issue milestones input.\nIncluding a detailed description and an example.\n",tags:["Issues","Inputs","Milestones"]},sidebar:"tutorialSidebar",previous:{title:"Ignore any issue milestones input",permalink:"/stale/fr/docs/issues/inputs/issue-ignore-any-milestones-input"},next:{title:"Issue only any assignees input",permalink:"/stale/fr/docs/issues/inputs/issue-only-any-assignees-input"}},p={},c=[{value:"Input",id:"input",level:3},{value:"Description",id:"description",level:3},{value:"Example",id:"example",level:3}],m={toc:c};function d(e){var n=e.components,t=(0,s.Z)(e,o);return(0,r.kt)("wrapper",(0,i.Z)({},m,t,{components:n,mdxType:"MDXLayout"}),(0,r.kt)("h3",{id:"input"},"Input"),(0,r.kt)("p",null,"Name: ",(0,r.kt)("inlineCode",{parentName:"p"},"issue-ignore-all-milestones"),(0,r.kt)("br",{parentName:"p"}),"\n","Type: ",(0,r.kt)("inlineCode",{parentName:"p"},"boolean"),(0,r.kt)("br",{parentName:"p"}),"\n","Default value: ",(0,r.kt)("inlineCode",{parentName:"p"},"false")),(0,r.kt)("h3",{id:"description"},"Description"),(0,r.kt)("p",null,"This input will let you ignore the processing of the issues which have at least one milestone.",(0,r.kt)("br",{parentName:"p"}),"\n","This can be useful when you use milestones for triage."),(0,r.kt)("h3",{id:"example"},"Example"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yml",metastring:"{6}","{6}":!0},"# ...\nname: Stale\nid: stale\nuses: sonia-corporation/stale@latest\nwith:\n  issue-ignore-all-milestones: true\n")))}d.isMDXComponent=!0}}]);