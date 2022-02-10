"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[7956],{3905:function(e,t,n){n.d(t,{Zo:function(){return c},kt:function(){return h}});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=a.createContext({}),u=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},c=function(e){var t=u(e.components);return a.createElement(l.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,l=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),d=u(n),h=r,f=d["".concat(l,".").concat(h)]||d[h]||p[h]||i;return n?a.createElement(f,o(o({ref:t},c),{},{components:n})):a.createElement(f,o({ref:t},c))}));function h(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,o=new Array(i);o[0]=d;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:r,o[1]=s;for(var u=2;u<i;u++)o[u]=n[u];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},5593:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return s},contentTitle:function(){return l},metadata:function(){return u},toc:function(){return c},default:function(){return d}});var a=n(7462),r=n(3366),i=(n(7294),n(3905)),o=["components"],s={id:"introduction",title:"Introduction",description:"Introduction and presentation of what is the Sonia-corporation stale action.\nWhat is the mindset behind this action.\nWhat are the main features.\nHow and why it was crated.\n",tags:["Introduction"]},l=void 0,u={unversionedId:"introduction",id:"introduction",title:"Introduction",description:"Introduction and presentation of what is the Sonia-corporation stale action.\nWhat is the mindset behind this action.\nWhat are the main features.\nHow and why it was crated.\n",source:"@site/docs/01-introduction.mdx",sourceDirName:".",slug:"/introduction",permalink:"/stale/fr/docs/introduction",editUrl:"https://github.com/Sonia-corporation/stale/tree/develop/documentation/docs/01-introduction.mdx",tags:[{label:"Introduction",permalink:"/stale/fr/docs/tags/introduction"}],version:"current",sidebarPosition:1,frontMatter:{id:"introduction",title:"Introduction",description:"Introduction and presentation of what is the Sonia-corporation stale action.\nWhat is the mindset behind this action.\nWhat are the main features.\nHow and why it was crated.\n",tags:["Introduction"]},sidebar:"tutorialSidebar",next:{title:"Workflow creation",permalink:"/stale/fr/docs/getting-started/workflow-creation"}},c=[{value:"Why?",id:"why",children:[],level:2},{value:"How?",id:"how",children:[],level:2},{value:"Default configuration",id:"default-configuration",children:[{value:"Issues",id:"issues",children:[],level:3},{value:"Pull requests",id:"pull-requests",children:[],level:3}],level:2},{value:"Getting started",id:"getting-started",children:[],level:2},{value:"Issues",id:"issues-1",children:[],level:2},{value:"Pull requests",id:"pull-requests-1",children:[],level:2},{value:"Original idea",id:"original-idea",children:[],level:2}],p={toc:c};function d(e){var t=e.components,n=(0,r.Z)(e,o);return(0,i.kt)("wrapper",(0,a.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h2",{id:"why"},"Why?"),(0,i.kt)("p",null,"This project aim to provide a GitHub action to help the maintainers of GitHub repositories to tackle and manage their open issues and pull requests which are inactive.",(0,i.kt)("br",{parentName:"p"}),"\n","The most basic example would be to automatically close inactive items after some days.",(0,i.kt)("br",{parentName:"p"}),"\n",'But this action provide way more options to customize how you wish to "flag" or manage an inactive item - we use the word ',(0,i.kt)("strong",{parentName:"p"},"stale")," to define this state."),(0,i.kt)("h2",{id:"how"},"How?"),(0,i.kt)("p",null,"This action will loop through your open issues and pull requests, try to ignore the processing of some of them based on your configuration and then will try to either stale them or close them when already stale."),(0,i.kt)("h2",{id:"default-configuration"},"Default configuration"),(0,i.kt)("h3",{id:"issues"},"Issues"),(0,i.kt)("p",null,"After 30 days (coming from ",(0,i.kt)("a",{parentName:"p",href:"issues/inputs/issue-days-before-stale-input"},"issue-days-before-stale"),") without any update on the issue, add a label ",(0,i.kt)("inlineCode",{parentName:"p"},"stale")," (coming from ",(0,i.kt)("a",{parentName:"p",href:"issues/inputs/issue-stale-label-input"},"issue-stale-label"),") on the issue to indicate that it is stale.",(0,i.kt)("br",{parentName:"p"}),"\n","If an update occur after being stale, the ",(0,i.kt)("inlineCode",{parentName:"p"},"stale")," label will be removed and the count will be reset back to 30 days.",(0,i.kt)("br",{parentName:"p"}),"\n","Removing the ",(0,i.kt)("inlineCode",{parentName:"p"},"stale")," label manually will also do the trick.",(0,i.kt)("br",{parentName:"p"}),"\n","If the ",(0,i.kt)("inlineCode",{parentName:"p"},"stale")," label on the issue is still here for more than 10 days (coming from ",(0,i.kt)("a",{parentName:"p",href:"issues/inputs/issue-days-before-close-input"},"issue-days-before-close"),"), the issue will be closed."),(0,i.kt)("h3",{id:"pull-requests"},"Pull requests"),(0,i.kt)("p",null,"After 30 days (coming from ",(0,i.kt)("a",{parentName:"p",href:"pull-requests/inputs/pull-request-days-before-stale-input"},"pull-request-days-before-stale"),") without any update on the pull request, add a label ",(0,i.kt)("inlineCode",{parentName:"p"},"stale")," (coming from ",(0,i.kt)("a",{parentName:"p",href:"pull-requests/inputs/pull-request-stale-label-input"},"pull-request-stale-label"),") on the pull request to indicate that it is stale.",(0,i.kt)("br",{parentName:"p"}),"\n","If an update occur after being stale, the ",(0,i.kt)("inlineCode",{parentName:"p"},"stale")," label will be removed and the count will be reset back to 30 days.",(0,i.kt)("br",{parentName:"p"}),"\n","Removing the ",(0,i.kt)("inlineCode",{parentName:"p"},"stale")," label manually will also do the trick.",(0,i.kt)("br",{parentName:"p"}),"\n","If the ",(0,i.kt)("inlineCode",{parentName:"p"},"stale")," label on the pull request is still here for more than 10 days (coming from ",(0,i.kt)("a",{parentName:"p",href:"pull-requests/inputs/pull-request-days-before-close-input"},"pull-request-days-before-close"),"), the pull request will be closed."),(0,i.kt)("h2",{id:"getting-started"},"Getting started"),(0,i.kt)("p",null,"If you didn't yet configure the stale action, we suggest you to start by reading the ",(0,i.kt)("a",{parentName:"p",href:"getting-started/workflow-creation"},"getting started documentation"),"."),(0,i.kt)("h2",{id:"issues-1"},"Issues"),(0,i.kt)("p",null,"You can also directly refer to the ",(0,i.kt)("a",{parentName:"p",href:"issues/inputs/all-issues-inputs"},"issues documentation"),"."),(0,i.kt)("h2",{id:"pull-requests-1"},"Pull requests"),(0,i.kt)("p",null,"You can also directly refer to the ",(0,i.kt)("a",{parentName:"p",href:"pull-requests/inputs/all-pull-requests-inputs"},"pull requests documentation"),"."),(0,i.kt)("h2",{id:"original-idea"},"Original idea"),(0,i.kt)("p",null,"This is not the first and maybe not the last project that aim to solve this stale issue on GitHub.",(0,i.kt)("br",{parentName:"p"}),"\n","This action was created to simply replace\u2014at least in terms of features\u2014the ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/actions/stale"},"action created by GitHub")," to stale.",(0,i.kt)("br",{parentName:"p"}),"\n",(0,i.kt)("a",{parentName:"p",href:"https://github.com/C0ZEN"},"Geoffrey 'C0ZEN' Testelin")," was originally one of the main contributor of this action, but due to different visions, he decided to go on his own to create this action instead.",(0,i.kt)("br",{parentName:"p"}),"\n","Our goal is to provide as many features as people need to make sure they can reduce the complexity of managing those stale items impediments."))}d.isMDXComponent=!0}}]);