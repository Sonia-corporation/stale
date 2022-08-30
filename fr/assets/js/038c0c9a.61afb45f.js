"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[1945],{4137:(e,t,r)=>{r.d(t,{Zo:()=>p,kt:()=>d});var n=r(7294);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function s(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?s(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):s(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function a(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},s=Object.keys(e);for(n=0;n<s.length;n++)r=s[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(n=0;n<s.length;n++)r=s[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var i=n.createContext({}),c=function(e){var t=n.useContext(i),r=t;return e&&(r="function"==typeof e?e(t):l(l({},t),e)),r},p=function(e){var t=c(e.components);return n.createElement(i.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},u=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,s=e.originalType,i=e.parentName,p=a(e,["components","mdxType","originalType","parentName"]),u=c(r),d=o,f=u["".concat(i,".").concat(d)]||u[d]||m[d]||s;return r?n.createElement(f,l(l({ref:t},p),{},{components:r})):n.createElement(f,l({ref:t},p))}));function d(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var s=r.length,l=new Array(s);l[0]=u;var a={};for(var i in t)hasOwnProperty.call(t,i)&&(a[i]=t[i]);a.originalType=e,a.mdxType="string"==typeof e?e:o,l[1]=a;for(var c=2;c<s;c++)l[c]=r[c];return n.createElement.apply(null,l)}return n.createElement.apply(null,r)}u.displayName="MDXCreateElement"},1960:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>i,contentTitle:()=>l,default:()=>m,frontMatter:()=>s,metadata:()=>a,toc:()=>c});var n=r(7462),o=(r(7294),r(4137));const s={id:"multiple-cron-example",title:"Multiple cron jobs",description:"Example to process only the issues that belongs to specific projects.\nThey will not be process at the same rate due to the different workflows.\n",tags:["Issues","Projects","Examples","Cron"]},l=void 0,a={unversionedId:"examples/multiple-cron-example",id:"examples/multiple-cron-example",title:"Multiple cron jobs",description:"Example to process only the issues that belongs to specific projects.\nThey will not be process at the same rate due to the different workflows.\n",source:"@site/docs/09-examples/02-multiple-cron.mdx",sourceDirName:"09-examples",slug:"/examples/multiple-cron-example",permalink:"/stale/fr/docs/examples/multiple-cron-example",draft:!1,editUrl:"https://github.com/Sonia-corporation/stale/tree/develop/documentation/docs/09-examples/02-multiple-cron.mdx",tags:[{label:"Issues",permalink:"/stale/fr/docs/tags/issues"},{label:"Projects",permalink:"/stale/fr/docs/tags/projects"},{label:"Examples",permalink:"/stale/fr/docs/tags/examples"},{label:"Cron",permalink:"/stale/fr/docs/tags/cron"}],version:"current",sidebarPosition:2,frontMatter:{id:"multiple-cron-example",title:"Multiple cron jobs",description:"Example to process only the issues that belongs to specific projects.\nThey will not be process at the same rate due to the different workflows.\n",tags:["Issues","Projects","Examples","Cron"]},sidebar:"tutorialSidebar",previous:{title:"Stale with comments except if assigned",permalink:"/stale/fr/docs/examples/stale-with-comments-except-if-assigned-example"},next:{title:"Statistics",permalink:"/stale/fr/docs/statistics"}},i={},c=[{value:"Stale sooner based on the project",id:"stale-sooner-based-on-the-project",level:2},{value:"Description",id:"description",level:3},{value:"Example",id:"example",level:3}],p={toc:c};function m(e){let{components:t,...r}=e;return(0,o.kt)("wrapper",(0,n.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h2",{id:"stale-sooner-based-on-the-project"},"Stale sooner based on the project"),(0,o.kt)("h3",{id:"description"},"Description"),(0,o.kt)("p",null,"The issues belonging to the project X will be stale after only 20 days.",(0,o.kt)("br",{parentName:"p"}),"\n","The issues belonging to the project Y will be stale after 50 days.",(0,o.kt)("br",{parentName:"p"}),"\n","All the other issues will be ignored from the processing."),(0,o.kt)("h3",{id:"example"},"Example"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-yml",metastring:'title=".github/workflows/stale-project-x.yml"',title:'".github/workflows/stale-project-x.yml"'},"name: Stale project X\non:\n  schedule:\n    - cron: '0 12 * * *'\njobs:\n  name: Stale\n  id: stale\n  uses: sonia-corporation/stale@latest\n  with:\n    issue-only-any-project-cards: project-x\n    issue-days-before-stale: 20\n")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-yml",metastring:'title=".github/workflows/stale-project-y.yml"',title:'".github/workflows/stale-project-y.yml"'},"name: Stale project Y\non:\n  schedule:\n    - cron: '0 12 * * *'\njobs:\n  name: Stale\n  id: stale\n  uses: sonia-corporation/stale@latest\n  with:\n    issue-only-any-project-cards: project-y\n    issue-days-before-stale: 50\n")))}m.isMDXComponent=!0}}]);