"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[1138],{4137:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>g});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var l=r.createContext({}),c=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},u=function(e){var t=c(e.components);return r.createElement(l.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,l=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),m=c(n),g=o,d=m["".concat(l,".").concat(g)]||m[g]||p[g]||a;return n?r.createElement(d,i(i({ref:t},u),{},{components:n})):r.createElement(d,i({ref:t},u))}));function g(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,i=new Array(a);i[0]=m;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:o,i[1]=s;for(var c=2;c<a;c++)i[c]=n[c];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},9479:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>p,frontMatter:()=>a,metadata:()=>s,toc:()=>c});var r=n(7462),o=(n(7294),n(4137));const a={id:"migration-v1-to-v2",title:"v1 to v2",description:"All the things you need to know to migrate from v1 to v2.\n",tags:["Migrations","V2"]},i="Migration from v1 to v2",s={unversionedId:"migrations/migration-v1-to-v2",id:"migrations/migration-v1-to-v2",title:"v1 to v2",description:"All the things you need to know to migrate from v1 to v2.\n",source:"@site/docs/16-migrations/02-migration-to-2.md",sourceDirName:"16-migrations",slug:"/migrations/migration-v1-to-v2",permalink:"/stale/fr/docs/migrations/migration-v1-to-v2",draft:!1,editUrl:"https://github.com/Sonia-corporation/stale/tree/develop/documentation/docs/16-migrations/02-migration-to-2.md",tags:[{label:"Migrations",permalink:"/stale/fr/docs/tags/migrations"},{label:"V2",permalink:"/stale/fr/docs/tags/v-2"}],version:"current",sidebarPosition:2,frontMatter:{id:"migration-v1-to-v2",title:"v1 to v2",description:"All the things you need to know to migrate from v1 to v2.\n",tags:["Migrations","V2"]},sidebar:"tutorialSidebar",previous:{title:"Changelog",permalink:"/stale/fr/docs/changelog"},next:{title:"Project cards to projects v2",permalink:"/stale/fr/docs/migrations/migration-to-projects-v2"}},l={},c=[{value:"Migration",id:"migration",level:2},{value:"Close reason \ud83c\udf6c",id:"close-reason",level:3}],u={toc:c};function p(e){let{components:t,...n}=e;return(0,o.kt)("wrapper",(0,r.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"migration-from-v1-to-v2"},"Migration from v1 to v2"),(0,o.kt)("h2",{id:"migration"},"Migration"),(0,o.kt)("p",null,"From ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/Sonia-corporation/stale/releases/tag/1.61.0"},"v1")," to ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/Sonia-corporation/stale/releases/tag/2.0.0"},"v2"),"."),(0,o.kt)("h3",{id:"close-reason"},"Close reason \ud83c\udf6c"),(0,o.kt)("p",null,"One new input was introduced:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"../issues/inputs/issue-close-reason-input"},"issue-close-reason"))),(0,o.kt)("p",null,"It will allow you to define what is the reason when an issue is closed.",(0,o.kt)("br",{parentName:"p"}),"\n","This new feature is possible following the ",(0,o.kt)("a",{parentName:"p",href:"https://github.blog/changelog/2022-05-19-the-new-github-issues-may-19th-update/#%F0%9F%95%B5%F0%9F%8F%BD%E2%99%80%EF%B8%8F-issue-closed-reasons"},"May 19, 2022, update")," for the GitHub issues."),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Before:")),(0,o.kt)("p",null,"Every issue were closed with the default value in GitHub, which is ",(0,o.kt)("inlineCode",{parentName:"p"},"COMPLETED"),"."),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"After:")),(0,o.kt)("p",null,"Every issue will now be closed with ",(0,o.kt)("inlineCode",{parentName:"p"},"NOT_PLANNED")," as the default value.",(0,o.kt)("br",{parentName:"p"}),"\n","To change the behavior back to the previous one, you can configure your action as follows:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-yml",metastring:"{6}","{6}":!0},"# ...\nname: Stale\nid: stale\nuses: sonia-corporation/stale@latest\nwith:\n  issue-close-reason: 'not planned'\n")),(0,o.kt)("admonition",{type:"info"},(0,o.kt)("p",{parentName:"admonition"},"We decided to actually change the default value, because it makes more sense for most users to consider a closed issue as not planned.",(0,o.kt)("br",{parentName:"p"}),"\n","Like suggested by GitHub, they consider this value as a stale reason, which is actually why you are here. \ud83d\ude09")))}p.isMDXComponent=!0}}]);