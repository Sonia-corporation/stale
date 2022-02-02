"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[7280],{3905:function(e,t,r){r.d(t,{Zo:function(){return c},kt:function(){return f}});var n=r(7294);function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function s(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?s(Object(r),!0).forEach((function(t){i(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):s(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function a(e,t){if(null==e)return{};var r,n,i=function(e,t){if(null==e)return{};var r,n,i={},s=Object.keys(e);for(n=0;n<s.length;n++)r=s[n],t.indexOf(r)>=0||(i[r]=e[r]);return i}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(n=0;n<s.length;n++)r=s[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(i[r]=e[r])}return i}var l=n.createContext({}),u=function(e){var t=n.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},c=function(e){var t=u(e.components);return n.createElement(l.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var r=e.components,i=e.mdxType,s=e.originalType,l=e.parentName,c=a(e,["components","mdxType","originalType","parentName"]),d=u(r),f=i,m=d["".concat(l,".").concat(f)]||d[f]||p[f]||s;return r?n.createElement(m,o(o({ref:t},c),{},{components:r})):n.createElement(m,o({ref:t},c))}));function f(e,t){var r=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var s=r.length,o=new Array(s);o[0]=d;var a={};for(var l in t)hasOwnProperty.call(t,l)&&(a[l]=t[l]);a.originalType=e,a.mdxType="string"==typeof e?e:i,o[1]=a;for(var u=2;u<s;u++)o[u]=r[u];return n.createElement.apply(null,o)}return n.createElement.apply(null,r)}d.displayName="MDXCreateElement"},976:function(e,t,r){r.r(t),r.d(t,{frontMatter:function(){return a},contentTitle:function(){return l},metadata:function(){return u},toc:function(){return c},default:function(){return d}});var n=r(7462),i=r(3366),s=(r(7294),r(3905)),o=["components"],a={id:"statistics",title:"Statistics",tags:["Logs","Statistics","Tips"]},l=void 0,u={unversionedId:"statistics",id:"statistics",title:"Statistics",description:"Know your workflow with the help of statistics",source:"@site/docs/10-statistics.mdx",sourceDirName:".",slug:"/statistics",permalink:"/stale/docs/statistics",editUrl:"https://github.com/Sonia-corporation/stale/tree/develop/documentation/docs/10-statistics.mdx",tags:[{label:"Logs",permalink:"/stale/docs/tags/logs"},{label:"Statistics",permalink:"/stale/docs/tags/statistics"},{label:"Tips",permalink:"/stale/docs/tags/tips"}],version:"current",sidebarPosition:10,frontMatter:{id:"statistics",title:"Statistics",tags:["Logs","Statistics","Tips"]},sidebar:"tutorialSidebar",previous:{title:"Issues configuration examples",permalink:"/stale/docs/examples/issues-examples"}},c=[{value:"Know your workflow with the help of statistics",id:"know-your-workflow-with-the-help-of-statistics",children:[{value:"Dry-run mode",id:"dry-run-mode",children:[],level:3},{value:"Limited API calls",id:"limited-api-calls",children:[],level:3},{value:"Example",id:"example",children:[],level:3}],level:2}],p={toc:c};function d(e){var t=e.components,r=(0,i.Z)(e,o);return(0,s.kt)("wrapper",(0,n.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,s.kt)("h2",{id:"know-your-workflow-with-the-help-of-statistics"},"Know your workflow with the help of statistics"),(0,s.kt)("p",null,"To have an oversight vision of your workflow, you can check out the logs.",(0,s.kt)("br",{parentName:"p"}),"\n","There is, at the end, a list of statistics listing the main events that occurred during the run."),(0,s.kt)("h3",{id:"dry-run-mode"},"Dry-run mode"),(0,s.kt)("p",null,"This feature can be very helpful when you are not sure how the workflow will behave based on your configuration.",(0,s.kt)("br",{parentName:"p"}),"\n","In such case, enable the ",(0,s.kt)("a",{parentName:"p",href:"dry-run-input"},"dry-run mode")," to avoid altering your repository, execute the workflow, and then analyse the statistics."),(0,s.kt)("h3",{id:"limited-api-calls"},"Limited API calls"),(0,s.kt)("p",null,"You can also simply limit the number of API queries calls for your ",(0,s.kt)("a",{parentName:"p",href:"issues/inputs/issue-limit-api-queries-count-input"},"issues")," and ",(0,s.kt)("a",{parentName:"p",href:"pull-requests/inputs/pull-request-limit-api-queries-count-input"},"pull requests")," to alter your repository on a reduced scope."),(0,s.kt)("h3",{id:"example"},"Example"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre"},"Issues statistics\n\u251c\u2500\u2500 Processed issues 28\n\u251c\u2500\u2500 Ignored issues   3\n\u2514\u2500\u2500 Unaltered issues 25\nPull rrequests statistics\n\u251c\u2500\u2500 Processed pull requests 5\n\u2514\u2500\u2500 Ignored pull requests   5\n")))}d.isMDXComponent=!0}}]);