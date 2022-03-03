"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[7280],{4137:function(t,e,n){n.d(e,{Zo:function(){return c},kt:function(){return m}});var r=n(7294);function i(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function o(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function s(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?o(Object(n),!0).forEach((function(e){i(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function a(t,e){if(null==t)return{};var n,r,i=function(t,e){if(null==t)return{};var n,r,i={},o=Object.keys(t);for(r=0;r<o.length;r++)n=o[r],e.indexOf(n)>=0||(i[n]=t[n]);return i}(t,e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);for(r=0;r<o.length;r++)n=o[r],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(i[n]=t[n])}return i}var l=r.createContext({}),u=function(t){var e=r.useContext(l),n=e;return t&&(n="function"==typeof t?t(e):s(s({},e),t)),n},c=function(t){var e=u(t.components);return r.createElement(l.Provider,{value:e},t.children)},p={inlineCode:"code",wrapper:function(t){var e=t.children;return r.createElement(r.Fragment,{},e)}},d=r.forwardRef((function(t,e){var n=t.components,i=t.mdxType,o=t.originalType,l=t.parentName,c=a(t,["components","mdxType","originalType","parentName"]),d=u(n),m=i,f=d["".concat(l,".").concat(m)]||d[m]||p[m]||o;return n?r.createElement(f,s(s({ref:e},c),{},{components:n})):r.createElement(f,s({ref:e},c))}));function m(t,e){var n=arguments,i=e&&e.mdxType;if("string"==typeof t||i){var o=n.length,s=new Array(o);s[0]=d;var a={};for(var l in e)hasOwnProperty.call(e,l)&&(a[l]=e[l]);a.originalType=t,a.mdxType="string"==typeof t?t:i,s[1]=a;for(var u=2;u<o;u++)s[u]=n[u];return r.createElement.apply(null,s)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},1046:function(t,e,n){n.r(e),n.d(e,{frontMatter:function(){return a},contentTitle:function(){return l},metadata:function(){return u},assets:function(){return c},toc:function(){return p},default:function(){return m}});var r=n(7462),i=n(3366),o=(n(7294),n(4137)),s=["components"],a={id:"statistics",title:"Statistics",description:"All the things you need to know regarding how this action leverage and expose the statistics in the logs to give you insights over your workflow and how it performed.\n",tags:["Logs","Statistics","Tips"]},l=void 0,u={unversionedId:"statistics",id:"statistics",title:"Statistics",description:"All the things you need to know regarding how this action leverage and expose the statistics in the logs to give you insights over your workflow and how it performed.\n",source:"@site/docs/10-statistics.mdx",sourceDirName:".",slug:"/statistics",permalink:"/stale/fr/docs/statistics",editUrl:"https://github.com/Sonia-corporation/stale/tree/develop/documentation/docs/10-statistics.mdx",tags:[{label:"Logs",permalink:"/stale/fr/docs/tags/logs"},{label:"Statistics",permalink:"/stale/fr/docs/tags/statistics"},{label:"Tips",permalink:"/stale/fr/docs/tags/tips"}],version:"current",sidebarPosition:10,frontMatter:{id:"statistics",title:"Statistics",description:"All the things you need to know regarding how this action leverage and expose the statistics in the logs to give you insights over your workflow and how it performed.\n",tags:["Logs","Statistics","Tips"]},sidebar:"tutorialSidebar",previous:{title:"Multiple cron jobs",permalink:"/stale/fr/docs/examples/multiple-cron-example"},next:{title:"Annotations",permalink:"/stale/fr/docs/annotations"}},c={},p=[{value:"Know your workflow with the help of statistics",id:"know-your-workflow-with-the-help-of-statistics",level:2},{value:"Dry-run mode",id:"dry-run-mode",level:3},{value:"Limited API calls",id:"limited-api-calls",level:3},{value:"Example",id:"example",level:3}],d={toc:p};function m(t){var e=t.components,n=(0,i.Z)(t,s);return(0,o.kt)("wrapper",(0,r.Z)({},d,n,{components:e,mdxType:"MDXLayout"}),(0,o.kt)("h2",{id:"know-your-workflow-with-the-help-of-statistics"},"Know your workflow with the help of statistics"),(0,o.kt)("p",null,"To have an oversight vision of your workflow, you can check out the logs.",(0,o.kt)("br",{parentName:"p"}),"\n","There is, at the end, a list of statistics listing the main events that occurred during the run."),(0,o.kt)("h3",{id:"dry-run-mode"},"Dry-run mode"),(0,o.kt)("p",null,"This feature can be very helpful when you are not sure how the workflow will behave based on your configuration.",(0,o.kt)("br",{parentName:"p"}),"\n","In such case, enable the ",(0,o.kt)("a",{parentName:"p",href:"dry-run-input"},"dry-run mode")," to avoid altering your repository, execute the workflow, and then analyse the statistics."),(0,o.kt)("h3",{id:"limited-api-calls"},"Limited API calls"),(0,o.kt)("p",null,"You can also simply limit the number of API queries calls for your ",(0,o.kt)("a",{parentName:"p",href:"issues/inputs/issue-limit-api-queries-count-input"},"issues")," and ",(0,o.kt)("a",{parentName:"p",href:"pull-requests/inputs/pull-request-limit-api-queries-count-input"},"pull requests"),", and a limit of API mutations calls for your ",(0,o.kt)("a",{parentName:"p",href:"issues/inputs/issue-limit-api-mutations-count-input"},"issues")," and ",(0,o.kt)("a",{parentName:"p",href:"pull-requests/inputs/pull-request-limit-api-mutations-count-input"},"pull requests")," to alter your repository on a reduced scope."),(0,o.kt)("h3",{id:"example"},"Example"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"Issues statistics\n\u251c\u2500\u2500 Processed issues 28\n\u251c\u2500\u2500 Ignored issues   3\n\u2514\u2500\u2500 Unaltered issues 25\nPull rrequests statistics\n\u251c\u2500\u2500 Processed pull requests 5\n\u2514\u2500\u2500 Ignored pull requests   5\n")),(0,o.kt)("div",{className:"admonition admonition-info alert alert--info"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"info")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"},(0,o.kt)("p",{parentName:"div"},"You can also retrieve those statistics in the ",(0,o.kt)("a",{parentName:"p",href:"./annotations"},"annotations"),"."))))}m.isMDXComponent=!0}}]);