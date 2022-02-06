"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[2876],{3905:function(t,e,n){n.d(e,{Zo:function(){return u},kt:function(){return p}});var o=n(7294);function r(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function a(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,o)}return n}function i(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?a(Object(n),!0).forEach((function(e){r(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function l(t,e){if(null==t)return{};var n,o,r=function(t,e){if(null==t)return{};var n,o,r={},a=Object.keys(t);for(o=0;o<a.length;o++)n=a[o],e.indexOf(n)>=0||(r[n]=t[n]);return r}(t,e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);for(o=0;o<a.length;o++)n=a[o],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(r[n]=t[n])}return r}var s=o.createContext({}),c=function(t){var e=o.useContext(s),n=e;return t&&(n="function"==typeof t?t(e):i(i({},e),t)),n},u=function(t){var e=c(t.components);return o.createElement(s.Provider,{value:e},t.children)},g={inlineCode:"code",wrapper:function(t){var e=t.children;return o.createElement(o.Fragment,{},e)}},f=o.forwardRef((function(t,e){var n=t.components,r=t.mdxType,a=t.originalType,s=t.parentName,u=l(t,["components","mdxType","originalType","parentName"]),f=c(n),p=r,w=f["".concat(s,".").concat(p)]||f[p]||g[p]||a;return n?o.createElement(w,i(i({ref:e},u),{},{components:n})):o.createElement(w,i({ref:e},u))}));function p(t,e){var n=arguments,r=e&&e.mdxType;if("string"==typeof t||r){var a=n.length,i=new Array(a);i[0]=f;var l={};for(var s in e)hasOwnProperty.call(e,s)&&(l[s]=e[s]);l.originalType=t,l.mdxType="string"==typeof t?t:r,i[1]=l;for(var c=2;c<a;c++)i[c]=n[c];return o.createElement.apply(null,i)}return o.createElement.apply(null,n)}f.displayName="MDXCreateElement"},4259:function(t,e,n){n.r(e),n.d(e,{frontMatter:function(){return l},contentTitle:function(){return s},metadata:function(){return c},toc:function(){return u},default:function(){return f}});var o=n(7462),r=n(3366),a=(n(7294),n(3905)),i=["components"],l={id:"workflow-creation",title:"Workflow creation",description:"Explanation to create the stale action GitHub workflow and how to configure it. \nContains also a suggestion regarding the cron job.\n",tags:["Getting started","Workflow configuration"]},s=void 0,c={unversionedId:"getting-started/workflow-creation",id:"getting-started/workflow-creation",title:"Workflow creation",description:"Explanation to create the stale action GitHub workflow and how to configure it. \nContains also a suggestion regarding the cron job.\n",source:"@site/docs/02-getting-started/01-workflow-creation.mdx",sourceDirName:"02-getting-started",slug:"/getting-started/workflow-creation",permalink:"/stale/docs/getting-started/workflow-creation",editUrl:"https://github.com/Sonia-corporation/stale/tree/develop/documentation/docs/02-getting-started/01-workflow-creation.mdx",tags:[{label:"Getting started",permalink:"/stale/docs/tags/getting-started"},{label:"Workflow configuration",permalink:"/stale/docs/tags/workflow-configuration"}],version:"current",sidebarPosition:1,frontMatter:{id:"workflow-creation",title:"Workflow creation",description:"Explanation to create the stale action GitHub workflow and how to configure it. \nContains also a suggestion regarding the cron job.\n",tags:["Getting started","Workflow configuration"]},sidebar:"tutorialSidebar",previous:{title:"Introduction",permalink:"/stale/docs/introduction"},next:{title:"Workflow testing",permalink:"/stale/docs/getting-started/workflow-testing"}},u=[{value:"Create the workflow file",id:"create-the-workflow-file",children:[],level:2},{value:"Create the default stale action",id:"create-the-default-stale-action",children:[],level:2},{value:"Configure how to trigger your workflow",id:"configure-how-to-trigger-your-workflow",children:[],level:2}],g={toc:u};function f(t){var e=t.components,n=(0,r.Z)(t,i);return(0,a.kt)("wrapper",(0,o.Z)({},g,n,{components:e,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"The first step to start with this stale action is to create your GitHub workflow."),(0,a.kt)("h2",{id:"create-the-workflow-file"},"Create the workflow file"),(0,a.kt)("p",null,"On your repository, create a new workflow inside the ",(0,a.kt)("em",{parentName:"p"},".github/workflows")," folder.",(0,a.kt)("br",{parentName:"p"}),"\n","For example: ",(0,a.kt)("em",{parentName:"p"},"stale.yml"),"."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},".\n\u2514\u2500\u2500 .github\n    \u2514\u2500\u2500 workflows\n        \u2514\u2500\u2500 stale.yml\n")),(0,a.kt)("h2",{id:"create-the-default-stale-action"},"Create the default stale action"),(0,a.kt)("p",null,"Now you can create the stale action with the ",(0,a.kt)("a",{parentName:"p",href:"../introduction#default-configuration"},"default configuration"),"."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-yml",metastring:'title=".github/workflows/stale.yml"',title:'".github/workflows/stale.yml"'},'name: Stale\njobs:\n  Stale:\n    runs-on: ubuntu-latest\n    name: Run stale\n    steps:\n      - name: Checkout\n        id: checkout\n        uses: actions/checkout@v2\n      - name: Stale\n        id: stale\n        # We suggest replacing "latest" with the latest major tag like "sonia-corporation/stale@1"\n        # This will avoid in the future a risk to break your workflow when a new major (breaking change) occur or worst, by altering your items in a way that doesn\'t suit you\n        uses: sonia-corporation/stale@latest\n')),(0,a.kt)("div",{className:"admonition admonition-caution alert alert--warning"},(0,a.kt)("div",{parentName:"div",className:"admonition-heading"},(0,a.kt)("h5",{parentName:"div"},(0,a.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,a.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 16 16"},(0,a.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M8.893 1.5c-.183-.31-.52-.5-.887-.5s-.703.19-.886.5L.138 13.499a.98.98 0 0 0 0 1.001c.193.31.53.501.886.501h13.964c.367 0 .704-.19.877-.5a1.03 1.03 0 0 0 .01-1.002L8.893 1.5zm.133 11.497H6.987v-2.003h2.039v2.003zm0-3.004H6.987V5.987h2.039v4.006z"}))),"caution")),(0,a.kt)("div",{parentName:"div",className:"admonition-content"},(0,a.kt)("p",{parentName:"div"},"Make sure to acknowledge the comment regarding the ",(0,a.kt)("inlineCode",{parentName:"p"},"latest")," tag, this is for our own good \ud83d\ude09"))),(0,a.kt)("h2",{id:"configure-how-to-trigger-your-workflow"},"Configure how to trigger your workflow"),(0,a.kt)("p",null,"From the ",(0,a.kt)("a",{parentName:"p",href:"#create-the-default-stale-action"},"previous step configuration"),", your workflow will work but will never be triggered.",(0,a.kt)("br",{parentName:"p"}),"\n","You must define how/when you wish to run the stale action."),(0,a.kt)("p",null,"For most repositories, running the action on daily basis and allowing it also to be ",(0,a.kt)("a",{parentName:"p",href:"https://github.blog/changelog/2020-07-06-github-actions-manual-triggers-with-workflow_dispatch/"},"run manually")," is a good choice."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-yml",metastring:'{2-8} title=".github/workflows/stale.yml"',"{2-8}":!0,title:'".github/workflows/stale.yml"'},"name: Stale\non:\n  # Allow to run it manually on GitHub (a button will be visible)\n  # See https://github.blog/changelog/2020-07-06-github-actions-manual-triggers-with-workflow_dispatch/\n  workflow_dispatch:\n  # Schedule a cron job to be run each day at noon\n  schedule:\n    - cron: '0 12 * * *'\njobs:\n  # ...\n")))}f.isMDXComponent=!0}}]);