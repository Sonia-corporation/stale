"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[279],{4137:function(e,n,t){t.d(n,{Zo:function(){return p},kt:function(){return g}});var s=t(7294);function i(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function r(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);n&&(s=s.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,s)}return t}function a(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?r(Object(t),!0).forEach((function(n){i(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):r(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function o(e,n){if(null==e)return{};var t,s,i=function(e,n){if(null==e)return{};var t,s,i={},r=Object.keys(e);for(s=0;s<r.length;s++)t=r[s],n.indexOf(t)>=0||(i[t]=e[t]);return i}(e,n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(s=0;s<r.length;s++)t=r[s],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(i[t]=e[t])}return i}var u=s.createContext({}),l=function(e){var n=s.useContext(u),t=n;return e&&(t="function"==typeof e?e(n):a(a({},n),e)),t},p=function(e){var n=l(e.components);return s.createElement(u.Provider,{value:n},e.children)},c={inlineCode:"code",wrapper:function(e){var n=e.children;return s.createElement(s.Fragment,{},n)}},d=s.forwardRef((function(e,n){var t=e.components,i=e.mdxType,r=e.originalType,u=e.parentName,p=o(e,["components","mdxType","originalType","parentName"]),d=l(t),g=i,m=d["".concat(u,".").concat(g)]||d[g]||c[g]||r;return t?s.createElement(m,a(a({ref:n},p),{},{components:t})):s.createElement(m,a({ref:n},p))}));function g(e,n){var t=arguments,i=n&&n.mdxType;if("string"==typeof e||i){var r=t.length,a=new Array(r);a[0]=d;var o={};for(var u in n)hasOwnProperty.call(n,u)&&(o[u]=n[u]);o.originalType=e,o.mdxType="string"==typeof e?e:i,a[1]=o;for(var l=2;l<r;l++)a[l]=t[l];return s.createElement.apply(null,a)}return s.createElement.apply(null,t)}d.displayName="MDXCreateElement"},7829:function(e,n,t){t.r(n),t.d(n,{frontMatter:function(){return o},contentTitle:function(){return u},metadata:function(){return l},assets:function(){return p},toc:function(){return c},default:function(){return g}});var s=t(7462),i=t(3366),r=(t(7294),t(4137)),a=["components"],o={id:"issue-ignore-any-assignees-input",title:"Ignore any issue assignees input",description:"All the information you need to know about the ignore any issue assignees input.\nIncluding a detailed description and an example.\n",tags:["Issues","Inputs","Assignees"]},u=void 0,l={unversionedId:"issues/inputs/issue-ignore-any-assignees-input",id:"issues/inputs/issue-ignore-any-assignees-input",title:"Ignore any issue assignees input",description:"All the information you need to know about the ignore any issue assignees input.\nIncluding a detailed description and an example.\n",source:"@site/docs/06-issues/01-inputs/06-ignore-any-assignees-input.mdx",sourceDirName:"06-issues/01-inputs",slug:"/issues/inputs/issue-ignore-any-assignees-input",permalink:"/stale/docs/issues/inputs/issue-ignore-any-assignees-input",editUrl:"https://github.com/Sonia-corporation/stale/tree/develop/documentation/docs/06-issues/01-inputs/06-ignore-any-assignees-input.mdx",tags:[{label:"Issues",permalink:"/stale/docs/tags/issues"},{label:"Inputs",permalink:"/stale/docs/tags/inputs"},{label:"Assignees",permalink:"/stale/docs/tags/assignees"}],version:"current",sidebarPosition:6,frontMatter:{id:"issue-ignore-any-assignees-input",title:"Ignore any issue assignees input",description:"All the information you need to know about the ignore any issue assignees input.\nIncluding a detailed description and an example.\n",tags:["Issues","Inputs","Assignees"]},sidebar:"tutorialSidebar",previous:{title:"Ignore all issue assignees input",permalink:"/stale/docs/issues/inputs/issue-ignore-all-assignees-input"},next:{title:"Ignore all issue project cards input",permalink:"/stale/docs/issues/inputs/issue-ignore-all-project-cards-input"}},p={},c=[{value:"Input",id:"input",level:3},{value:"Description",id:"description",level:3},{value:"Example",id:"example",level:3}],d={toc:c};function g(e){var n=e.components,t=(0,i.Z)(e,a);return(0,r.kt)("wrapper",(0,s.Z)({},d,t,{components:n,mdxType:"MDXLayout"}),(0,r.kt)("h3",{id:"input"},"Input"),(0,r.kt)("p",null,"Name: ",(0,r.kt)("inlineCode",{parentName:"p"},"issue-ignore-any-assignees"),(0,r.kt)("br",{parentName:"p"}),"\n","Type: ",(0,r.kt)("inlineCode",{parentName:"p"},"string[]"),(0,r.kt)("br",{parentName:"p"}),"\n","Default value: ",(0,r.kt)("inlineCode",{parentName:"p"},"[]")),(0,r.kt)("h3",{id:"description"},"Description"),(0,r.kt)("p",null,"This input will let you ignore the processing of the issues which have at least one of the assignee from this list.",(0,r.kt)("br",{parentName:"p"}),"\n","This can be useful when you use assignees to assign the issues to some members of your repository which will for sure close or at least process the issues very soon."),(0,r.kt)("h3",{id:"example"},"Example"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yml",metastring:"{6-8}","{6-8}":!0},"# ...\nname: Stale\nid: stale\nuses: sonia-corporation/stale@latest\nwith:\n  issue-ignore-any-assignees: |\n    C0ZEN\n    maintainers\n")))}g.isMDXComponent=!0}}]);