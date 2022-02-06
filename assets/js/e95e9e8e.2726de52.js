"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[6691],{3905:function(e,n,t){t.d(n,{Zo:function(){return p},kt:function(){return g}});var r=t(7294);function s(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function l(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){s(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function u(e,n){if(null==e)return{};var t,r,s=function(e,n){if(null==e)return{};var t,r,s={},i=Object.keys(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||(s[t]=e[t]);return s}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(s[t]=e[t])}return s}var a=r.createContext({}),o=function(e){var n=r.useContext(a),t=n;return e&&(t="function"==typeof e?e(n):l(l({},n),e)),t},p=function(e){var n=o(e.components);return r.createElement(a.Provider,{value:n},e.children)},c={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},d=r.forwardRef((function(e,n){var t=e.components,s=e.mdxType,i=e.originalType,a=e.parentName,p=u(e,["components","mdxType","originalType","parentName"]),d=o(t),g=s,m=d["".concat(a,".").concat(g)]||d[g]||c[g]||i;return t?r.createElement(m,l(l({ref:n},p),{},{components:t})):r.createElement(m,l({ref:n},p))}));function g(e,n){var t=arguments,s=n&&n.mdxType;if("string"==typeof e||s){var i=t.length,l=new Array(i);l[0]=d;var u={};for(var a in n)hasOwnProperty.call(n,a)&&(u[a]=n[a]);u.originalType=e,u.mdxType="string"==typeof e?e:s,l[1]=u;for(var o=2;o<i;o++)l[o]=t[o];return r.createElement.apply(null,l)}return r.createElement.apply(null,t)}d.displayName="MDXCreateElement"},5487:function(e,n,t){t.r(n),t.d(n,{frontMatter:function(){return u},contentTitle:function(){return a},metadata:function(){return o},toc:function(){return p},default:function(){return d}});var r=t(7462),s=t(3366),i=(t(7294),t(3905)),l=["components"],u={id:"pull-request-ignore-any-assignees-input",title:"Ignore any pull request assignees input",description:"All the information you need to know about the ignore any pull request assignees input.\nIncluding a detailed description and an example.\n",tags:["Pull requests","Inputs"]},a=void 0,o={unversionedId:"pull-requests/inputs/pull-request-ignore-any-assignees-input",id:"pull-requests/inputs/pull-request-ignore-any-assignees-input",title:"Ignore any pull request assignees input",description:"All the information you need to know about the ignore any pull request assignees input.\nIncluding a detailed description and an example.\n",source:"@site/docs/08-pull-requests/01-inputs/06-ignore-any-assignees-input.mdx",sourceDirName:"08-pull-requests/01-inputs",slug:"/pull-requests/inputs/pull-request-ignore-any-assignees-input",permalink:"/stale/docs/pull-requests/inputs/pull-request-ignore-any-assignees-input",editUrl:"https://github.com/Sonia-corporation/stale/tree/develop/documentation/docs/08-pull-requests/01-inputs/06-ignore-any-assignees-input.mdx",tags:[{label:"Pull requests",permalink:"/stale/docs/tags/pull-requests"},{label:"Inputs",permalink:"/stale/docs/tags/inputs"}],version:"current",sidebarPosition:6,frontMatter:{id:"pull-request-ignore-any-assignees-input",title:"Ignore any pull request assignees input",description:"All the information you need to know about the ignore any pull request assignees input.\nIncluding a detailed description and an example.\n",tags:["Pull requests","Inputs"]},sidebar:"tutorialSidebar",previous:{title:"Ignore all pull request assignees input",permalink:"/stale/docs/pull-requests/inputs/pull-request-ignore-all-assignees-input"},next:{title:"Ignore all pull request project cards input",permalink:"/stale/docs/pull-requests/inputs/pull-request-ignore-all-project-cards-input"}},p=[{value:"Input",id:"input",children:[],level:3},{value:"Description",id:"description",children:[],level:3},{value:"Example",id:"example",children:[],level:3}],c={toc:p};function d(e){var n=e.components,t=(0,s.Z)(e,l);return(0,i.kt)("wrapper",(0,r.Z)({},c,t,{components:n,mdxType:"MDXLayout"}),(0,i.kt)("h3",{id:"input"},"Input"),(0,i.kt)("p",null,"Name: ",(0,i.kt)("inlineCode",{parentName:"p"},"pull-request-ignore-any-assignees"),(0,i.kt)("br",{parentName:"p"}),"\n","Type: ",(0,i.kt)("inlineCode",{parentName:"p"},"string[]"),(0,i.kt)("br",{parentName:"p"}),"\n","Default value: ",(0,i.kt)("inlineCode",{parentName:"p"},"[]")),(0,i.kt)("h3",{id:"description"},"Description"),(0,i.kt)("p",null,"This input will let you ignore the processing of the pull requests which have at least one of the assignee from this list.",(0,i.kt)("br",{parentName:"p"}),"\n","This can be useful when you use assignees to assign the pull requests to some members of your repository which will for sure close or at least process the pull requests very soon."),(0,i.kt)("h3",{id:"example"},"Example"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-yml",metastring:"{6-8}","{6-8}":!0},"# ...\nname: Stale\nid: stale\nuses: sonia-corporation/stale@latest\nwith:\n  pull-request-ignore-any-assignees: |\n    C0ZEN\n    maintainers\n")))}d.isMDXComponent=!0}}]);