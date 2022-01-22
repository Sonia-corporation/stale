"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[876],{3905:function(t,e,n){n.d(e,{Zo:function(){return u},kt:function(){return w}});var r=n(7294);function o(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function a(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function i(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?a(Object(n),!0).forEach((function(e){o(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function l(t,e){if(null==t)return{};var n,r,o=function(t,e){if(null==t)return{};var n,r,o={},a=Object.keys(t);for(r=0;r<a.length;r++)n=a[r],e.indexOf(n)>=0||(o[n]=t[n]);return o}(t,e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);for(r=0;r<a.length;r++)n=a[r],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(o[n]=t[n])}return o}var c=r.createContext({}),s=function(t){var e=r.useContext(c),n=e;return t&&(n="function"==typeof t?t(e):i(i({},e),t)),n},u=function(t){var e=s(t.components);return r.createElement(c.Provider,{value:e},t.children)},f={inlineCode:"code",wrapper:function(t){var e=t.children;return r.createElement(r.Fragment,{},e)}},p=r.forwardRef((function(t,e){var n=t.components,o=t.mdxType,a=t.originalType,c=t.parentName,u=l(t,["components","mdxType","originalType","parentName"]),p=s(n),w=o,g=p["".concat(c,".").concat(w)]||p[w]||f[w]||a;return n?r.createElement(g,i(i({ref:e},u),{},{components:n})):r.createElement(g,i({ref:e},u))}));function w(t,e){var n=arguments,o=e&&e.mdxType;if("string"==typeof t||o){var a=n.length,i=new Array(a);i[0]=p;var l={};for(var c in e)hasOwnProperty.call(e,c)&&(l[c]=e[c]);l.originalType=t,l.mdxType="string"==typeof t?t:o,i[1]=l;for(var s=2;s<a;s++)i[s]=n[s];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}p.displayName="MDXCreateElement"},1550:function(t,e,n){n.r(e),n.d(e,{frontMatter:function(){return l},contentTitle:function(){return c},metadata:function(){return s},toc:function(){return u},default:function(){return p}});var r=n(7462),o=n(3366),a=(n(7294),n(3905)),i=["components"],l={id:"workflow-creation",title:"Workflow creation",tags:["Getting started","Workflow configuration"]},c=void 0,s={unversionedId:"getting-started/workflow-creation",id:"getting-started/workflow-creation",title:"Workflow creation",description:"The first step to start with this stale action is to create your GitHub workflow.",source:"@site/docs/02-getting-started/01-workflow-creation.mdx",sourceDirName:"02-getting-started",slug:"/getting-started/workflow-creation",permalink:"/fr/docs/getting-started/workflow-creation",editUrl:"https://github.com/Sonia-corporation/stale/tree/develop/documentation/docs/02-getting-started/01-workflow-creation.mdx",tags:[{label:"Getting started",permalink:"/fr/docs/tags/getting-started"},{label:"Workflow configuration",permalink:"/fr/docs/tags/workflow-configuration"}],version:"current",sidebarPosition:1,frontMatter:{id:"workflow-creation",title:"Workflow creation",tags:["Getting started","Workflow configuration"]},sidebar:"tutorialSidebar",previous:{title:"Introduction",permalink:"/fr/docs/introduction"},next:{title:"Workflow testing",permalink:"/fr/docs/getting-started/workflow-testing"}},u=[{value:"Create the workflow file",id:"create-the-workflow-file",children:[],level:2},{value:"Create the default stale action",id:"create-the-default-stale-action",children:[],level:2},{value:"Configure how to trigger your workflow",id:"configure-how-to-trigger-your-workflow",children:[],level:2}],f={toc:u};function p(t){var e=t.components,n=(0,o.Z)(t,i);return(0,a.kt)("wrapper",(0,r.Z)({},f,n,{components:e,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"The first step to start with this stale action is to create your GitHub workflow."),(0,a.kt)("h2",{id:"create-the-workflow-file"},"Create the workflow file"),(0,a.kt)("p",null,"On your repository, create a new workflow inside the ",(0,a.kt)("em",{parentName:"p"},".github/workflows")," folder.",(0,a.kt)("br",{parentName:"p"}),"\n","For example: ",(0,a.kt)("em",{parentName:"p"},"stale.yml"),"."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},".\n\u2514\u2500\u2500 .github\n    \u2514\u2500\u2500 workflows\n        \u2514\u2500\u2500 stale.yml\n")),(0,a.kt)("h2",{id:"create-the-default-stale-action"},"Create the default stale action"),(0,a.kt)("p",null,"Now you can create the stale action with the ",(0,a.kt)("a",{parentName:"p",href:"../introduction#default-configuration"},"default configuration"),"."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-yml",metastring:'title=".github/workflows/stale.yml"',title:'".github/workflows/stale.yml"'},'name: Stale\njobs:\n  Stale:\n    runs-on: ubuntu-latest\n    name: Run stale\n    steps:\n      - name: Checkout\n        id: checkout\n        uses: actions/checkout@v2\n      - name: Stale\n        id: stale\n        # We suggest replacing "latest" with the latest major tag like "sonia-corporation/stale@1"\n        # This will avoid in the future a risk to break your workflow when a new major (breaking change) occur or worst, by altering your items in a way that doesn\'t suit you\n        uses: sonia-corporation/stale@latest\n')),(0,a.kt)("div",{className:"admonition admonition-caution alert alert--warning"},(0,a.kt)("div",{parentName:"div",className:"admonition-heading"},(0,a.kt)("h5",{parentName:"div"},(0,a.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,a.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 16 16"},(0,a.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M8.893 1.5c-.183-.31-.52-.5-.887-.5s-.703.19-.886.5L.138 13.499a.98.98 0 0 0 0 1.001c.193.31.53.501.886.501h13.964c.367 0 .704-.19.877-.5a1.03 1.03 0 0 0 .01-1.002L8.893 1.5zm.133 11.497H6.987v-2.003h2.039v2.003zm0-3.004H6.987V5.987h2.039v4.006z"}))),"caution")),(0,a.kt)("div",{parentName:"div",className:"admonition-content"},(0,a.kt)("p",{parentName:"div"},"Make sure to acknowledge the comment regarding the ",(0,a.kt)("inlineCode",{parentName:"p"},"latest")," tag, this is for our own good \ud83d\ude09"))),(0,a.kt)("h2",{id:"configure-how-to-trigger-your-workflow"},"Configure how to trigger your workflow"),(0,a.kt)("p",null,"From the ",(0,a.kt)("a",{parentName:"p",href:"#create-the-default-stale-action"},"previous step configuration"),", your workflow will work but will never be triggered.",(0,a.kt)("br",{parentName:"p"}),"\n","You must define how/when you wish to run the stale action."),(0,a.kt)("p",null,"For most repositories, running the action on daily basis and allowing it also to be ",(0,a.kt)("a",{parentName:"p",href:"https://github.blog/changelog/2020-07-06-github-actions-manual-triggers-with-workflow_dispatch/"},"run manually")," is a good choice."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-yml",metastring:'{2-8} title=".github/workflows/stale.yml"',"{2-8}":!0,title:'".github/workflows/stale.yml"'},"name: Stale\non:\n  # Allow to run it manually on GitHub (a button will be visible)\n  # See https://github.blog/changelog/2020-07-06-github-actions-manual-triggers-with-workflow_dispatch/\n  workflow_dispatch:\n  # Schedule a cron job to be run each day at noon\n  schedule:\n    - cron: '0 12 * * *'\njobs:\n  # ...\n")))}p.isMDXComponent=!0}}]);