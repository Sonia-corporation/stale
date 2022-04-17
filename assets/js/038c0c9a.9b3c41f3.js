"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[1945],{4137:function(e,t,n){n.d(t,{Zo:function(){return p},kt:function(){return d}});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function a(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},s=Object.keys(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var i=r.createContext({}),c=function(e){var t=r.useContext(i),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},p=function(e){var t=c(e.components);return r.createElement(i.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,s=e.originalType,i=e.parentName,p=a(e,["components","mdxType","originalType","parentName"]),m=c(n),d=o,f=m["".concat(i,".").concat(d)]||m[d]||u[d]||s;return n?r.createElement(f,l(l({ref:t},p),{},{components:n})):r.createElement(f,l({ref:t},p))}));function d(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var s=n.length,l=new Array(s);l[0]=m;var a={};for(var i in t)hasOwnProperty.call(t,i)&&(a[i]=t[i]);a.originalType=e,a.mdxType="string"==typeof e?e:o,l[1]=a;for(var c=2;c<s;c++)l[c]=n[c];return r.createElement.apply(null,l)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},1960:function(e,t,n){n.r(t),n.d(t,{assets:function(){return p},contentTitle:function(){return i},default:function(){return d},frontMatter:function(){return a},metadata:function(){return c},toc:function(){return u}});var r=n(7462),o=n(3366),s=(n(7294),n(4137)),l=["components"],a={id:"multiple-cron-example",title:"Multiple cron jobs",description:"Example to process only the issues that belongs to specific projects.\nThey will not be process at the same rate due to the different workflows.\n",tags:["Issues","Projects","Examples","Cron"]},i=void 0,c={unversionedId:"examples/multiple-cron-example",id:"examples/multiple-cron-example",title:"Multiple cron jobs",description:"Example to process only the issues that belongs to specific projects.\nThey will not be process at the same rate due to the different workflows.\n",source:"@site/docs/09-examples/02-multiple-cron.mdx",sourceDirName:"09-examples",slug:"/examples/multiple-cron-example",permalink:"/stale/docs/examples/multiple-cron-example",editUrl:"https://github.com/Sonia-corporation/stale/tree/develop/documentation/docs/09-examples/02-multiple-cron.mdx",tags:[{label:"Issues",permalink:"/stale/docs/tags/issues"},{label:"Projects",permalink:"/stale/docs/tags/projects"},{label:"Examples",permalink:"/stale/docs/tags/examples"},{label:"Cron",permalink:"/stale/docs/tags/cron"}],version:"current",sidebarPosition:2,frontMatter:{id:"multiple-cron-example",title:"Multiple cron jobs",description:"Example to process only the issues that belongs to specific projects.\nThey will not be process at the same rate due to the different workflows.\n",tags:["Issues","Projects","Examples","Cron"]},sidebar:"tutorialSidebar",previous:{title:"Stale with comments except if assigned",permalink:"/stale/docs/examples/stale-with-comments-except-if-assigned-example"},next:{title:"Statistics",permalink:"/stale/docs/statistics"}},p={},u=[{value:"Stale sooner based on the project",id:"stale-sooner-based-on-the-project",level:2},{value:"Description",id:"description",level:3},{value:"Example",id:"example",level:3}],m={toc:u};function d(e){var t=e.components,n=(0,o.Z)(e,l);return(0,s.kt)("wrapper",(0,r.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,s.kt)("h2",{id:"stale-sooner-based-on-the-project"},"Stale sooner based on the project"),(0,s.kt)("h3",{id:"description"},"Description"),(0,s.kt)("p",null,"The issues belonging to the project X will be stale after only 20 days.",(0,s.kt)("br",{parentName:"p"}),"\n","The issues belonging to the project Y will be stale after 50 days.",(0,s.kt)("br",{parentName:"p"}),"\n","All the other issues will be ignored from the processing."),(0,s.kt)("h3",{id:"example"},"Example"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-yml",metastring:'title=".github/workflows/stale-project-x.yml"',title:'".github/workflows/stale-project-x.yml"'},"name: Stale project X\non:\n  schedule:\n    - cron: '0 12 * * *'\njobs:\n  name: Stale\n  id: stale\n  uses: sonia-corporation/stale@latest\n  with:\n    issue-only-any-project-cards: project-x\n    issue-days-before-stale: 20\n")),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-yml",metastring:'title=".github/workflows/stale-project-y.yml"',title:'".github/workflows/stale-project-y.yml"'},"name: Stale project Y\non:\n  schedule:\n    - cron: '0 12 * * *'\njobs:\n  name: Stale\n  id: stale\n  uses: sonia-corporation/stale@latest\n  with:\n    issue-only-any-project-cards: project-y\n    issue-days-before-stale: 50\n")))}d.isMDXComponent=!0}}]);