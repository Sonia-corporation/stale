"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[859],{3905:function(t,e,n){n.d(e,{Zo:function(){return c},kt:function(){return m}});var r=n(7294);function o(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function i(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function a(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?i(Object(n),!0).forEach((function(e){o(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function s(t,e){if(null==t)return{};var n,r,o=function(t,e){if(null==t)return{};var n,r,o={},i=Object.keys(t);for(r=0;r<i.length;r++)n=i[r],e.indexOf(n)>=0||(o[n]=t[n]);return o}(t,e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);for(r=0;r<i.length;r++)n=i[r],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(o[n]=t[n])}return o}var l=r.createContext({}),u=function(t){var e=r.useContext(l),n=e;return t&&(n="function"==typeof t?t(e):a(a({},e),t)),n},c=function(t){var e=u(t.components);return r.createElement(l.Provider,{value:e},t.children)},p={inlineCode:"code",wrapper:function(t){var e=t.children;return r.createElement(r.Fragment,{},e)}},d=r.forwardRef((function(t,e){var n=t.components,o=t.mdxType,i=t.originalType,l=t.parentName,c=s(t,["components","mdxType","originalType","parentName"]),d=u(n),m=o,f=d["".concat(l,".").concat(m)]||d[m]||p[m]||i;return n?r.createElement(f,a(a({ref:e},c),{},{components:n})):r.createElement(f,a({ref:e},c))}));function m(t,e){var n=arguments,o=e&&e.mdxType;if("string"==typeof t||o){var i=n.length,a=new Array(i);a[0]=d;var s={};for(var l in e)hasOwnProperty.call(e,l)&&(s[l]=e[l]);s.originalType=t,s.mdxType="string"==typeof t?t:o,a[1]=s;for(var u=2;u<i;u++)a[u]=n[u];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},5394:function(t,e,n){n.r(e),n.d(e,{frontMatter:function(){return s},contentTitle:function(){return l},metadata:function(){return u},toc:function(){return c},default:function(){return d}});var r=n(7462),o=n(3366),i=(n(7294),n(3905)),a=["components"],s={id:"workflow-testing",title:"Workflow testing",description:"Explanation to test a newly configured stale workflow so that it's safer for your project. \nThe action can be risky if wrongly configured and may close all your issues for example.\nThe dry-run option is strongly suggested, but also the limit of operations.\n",tags:["Getting started","Workflow testing"]},l=void 0,u={unversionedId:"getting-started/workflow-testing",id:"getting-started/workflow-testing",title:"Workflow testing",description:"Explanation to test a newly configured stale workflow so that it's safer for your project. \nThe action can be risky if wrongly configured and may close all your issues for example.\nThe dry-run option is strongly suggested, but also the limit of operations.\n",source:"@site/docs/02-getting-started/02-workflow-testing.mdx",sourceDirName:"02-getting-started",slug:"/getting-started/workflow-testing",permalink:"/stale/docs/getting-started/workflow-testing",editUrl:"https://github.com/Sonia-corporation/stale/tree/develop/documentation/docs/02-getting-started/02-workflow-testing.mdx",tags:[{label:"Getting started",permalink:"/stale/docs/tags/getting-started"},{label:"Workflow testing",permalink:"/stale/docs/tags/workflow-testing"}],version:"current",sidebarPosition:2,frontMatter:{id:"workflow-testing",title:"Workflow testing",description:"Explanation to test a newly configured stale workflow so that it's safer for your project. \nThe action can be risky if wrongly configured and may close all your issues for example.\nThe dry-run option is strongly suggested, but also the limit of operations.\n",tags:["Getting started","Workflow testing"]},sidebar:"tutorialSidebar",previous:{title:"Workflow creation",permalink:"/stale/docs/getting-started/workflow-creation"},next:{title:"All inputs",permalink:"/stale/docs/all-inputs"}},c=[{value:"Test the workflow",id:"test-the-workflow",children:[{value:"Test it with the dry-run mode",id:"test-it-with-the-dry-run-mode",children:[],level:3},{value:"Test it with a limited amount of API calls",id:"test-it-with-a-limited-amount-of-api-calls",children:[],level:3}],level:2},{value:"Customize the behaviour",id:"customize-the-behaviour",children:[],level:2}],p={toc:c};function d(t){var e=t.components,n=(0,o.Z)(t,a);return(0,i.kt)("wrapper",(0,r.Z)({},p,n,{components:e,mdxType:"MDXLayout"}),(0,i.kt)("h2",{id:"test-the-workflow"},"Test the workflow"),(0,i.kt)("p",null,"At this point, you shall have a working stale action.",(0,i.kt)("br",{parentName:"p"}),"\n","Before going further into the customization, you may want to try it first."),(0,i.kt)("h3",{id:"test-it-with-the-dry-run-mode"},"Test it with the dry-run mode"),(0,i.kt)("p",null,"Use the ",(0,i.kt)("a",{parentName:"p",href:"../dry-run-input"},"dry-run")," mode to avoid altering your repository yet."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-yml",metastring:'{5-6} title=".github/workflows/stale.yml"',"{5-6}":!0,title:'".github/workflows/stale.yml"'},"# ...\nname: Stale\nid: stale\nuses: sonia-corporation/stale@latest\nwith:\n  dry-run: true\n")),(0,i.kt)("div",{className:"admonition admonition-tip alert alert--success"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"}))),"tip")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},"You can now check the logs, and especially the ",(0,i.kt)("a",{parentName:"p",href:"../statistics"},"statistics")," at the end.",(0,i.kt)("br",{parentName:"p"}),"\n","You will have a better idea over what to expect when a real run without the ",(0,i.kt)("a",{parentName:"p",href:"../dry-run-input"},"dry-run")," mode occur."))),(0,i.kt)("h3",{id:"test-it-with-a-limited-amount-of-api-calls"},"Test it with a limited amount of API calls"),(0,i.kt)("p",null,"If you still wish to play it safe, you can configure a limit of API queries calls for your ",(0,i.kt)("a",{parentName:"p",href:"../issues/inputs/issue-limit-api-queries-count-input"},"issues")," and ",(0,i.kt)("a",{parentName:"p",href:"../pull-requests/inputs/pull-request-limit-api-queries-count-input"},"pull requests"),", and a limit of API mutations calls for your ",(0,i.kt)("a",{parentName:"p",href:"../issues/inputs/issue-limit-api-mutations-count-input"},"issues")," and ",(0,i.kt)("a",{parentName:"p",href:"../pull-requests/inputs/pull-request-limit-api-mutations-count-input"},"pull requests")," to alter your repository on a reduced scope."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-yml",metastring:'{5-7} title=".github/workflows/stale.yml"',"{5-7}":!0,title:'".github/workflows/stale.yml"'},"# ...\nname: Stale\nid: stale\nuses: sonia-corporation/stale@latest\nwith:\n  issue-limit-api-queries-count: 30\n  pull-request-limit-api-queries-count: 30\n")),(0,i.kt)("h2",{id:"customize-the-behaviour"},"Customize the behaviour"),(0,i.kt)("p",null,"If the action was successful, you may wish now to configure it at your convenience.",(0,i.kt)("br",{parentName:"p"}),"\n","Follow the ",(0,i.kt)("a",{parentName:"p",href:"../all-inputs"},"next page")," to have access to all the inputs."),(0,i.kt)("div",{className:"admonition admonition-info alert alert--info"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"info")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},"The stale processing can be completely different between issues and pull requests."))))}d.isMDXComponent=!0}}]);