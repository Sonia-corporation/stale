"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[2313],{4137:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>m});var u=n(7294);function s(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var u=Object.getOwnPropertySymbols(e);t&&(u=u.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,u)}return n}function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){s(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function a(e,t){if(null==e)return{};var n,u,s=function(e,t){if(null==e)return{};var n,u,s={},o=Object.keys(e);for(u=0;u<o.length;u++)n=o[u],t.indexOf(n)>=0||(s[n]=e[n]);return s}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(u=0;u<o.length;u++)n=o[u],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(s[n]=e[n])}return s}var i=u.createContext({}),l=function(e){var t=u.useContext(i),n=t;return e&&(n="function"==typeof e?e(t):r(r({},t),e)),n},p=function(e){var t=l(e.components);return u.createElement(i.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return u.createElement(u.Fragment,{},t)}},d=u.forwardRef((function(e,t){var n=e.components,s=e.mdxType,o=e.originalType,i=e.parentName,p=a(e,["components","mdxType","originalType","parentName"]),d=l(n),m=s,f=d["".concat(i,".").concat(m)]||d[m]||c[m]||o;return n?u.createElement(f,r(r({ref:t},p),{},{components:n})):u.createElement(f,r({ref:t},p))}));function m(e,t){var n=arguments,s=t&&t.mdxType;if("string"==typeof e||s){var o=n.length,r=new Array(o);r[0]=d;var a={};for(var i in t)hasOwnProperty.call(t,i)&&(a[i]=t[i]);a.originalType=e,a.mdxType="string"==typeof e?e:s,r[1]=a;for(var l=2;l<o;l++)r[l]=n[l];return u.createElement.apply(null,r)}return u.createElement.apply(null,n)}d.displayName="MDXCreateElement"},8187:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>i,contentTitle:()=>r,default:()=>c,frontMatter:()=>o,metadata:()=>a,toc:()=>l});var u=n(7462),s=(n(7294),n(4137));const o={id:"called-api-issues-count-output",title:"Called api issues count output",description:"All the information you need to know about the called api issues count output.\nIncluding a detailed description and an example.\n",tags:["Issues","Outputs"]},r=void 0,a={unversionedId:"issues/outputs/called-api-issues-count-output",id:"issues/outputs/called-api-issues-count-output",title:"Called api issues count output",description:"All the information you need to know about the called api issues count output.\nIncluding a detailed description and an example.\n",source:"@site/docs/06-issues/02-outputs/13-called-api-issues-count-output.mdx",sourceDirName:"06-issues/02-outputs",slug:"/issues/outputs/called-api-issues-count-output",permalink:"/stale/fr/docs/issues/outputs/called-api-issues-count-output",draft:!1,editUrl:"https://github.com/Sonia-corporation/stale/tree/develop/documentation/docs/06-issues/02-outputs/13-called-api-issues-count-output.mdx",tags:[{label:"Issues",permalink:"/stale/fr/docs/tags/issues"},{label:"Outputs",permalink:"/stale/fr/docs/tags/outputs"}],version:"current",sidebarPosition:13,frontMatter:{id:"called-api-issues-count-output",title:"Called api issues count output",description:"All the information you need to know about the called api issues count output.\nIncluding a detailed description and an example.\n",tags:["Issues","Outputs"]},sidebar:"tutorialSidebar",previous:{title:"Removed issues labels count output",permalink:"/stale/fr/docs/issues/outputs/removed-issues-labels-count-output"},next:{title:"Called api issues queries count output",permalink:"/stale/fr/docs/issues/outputs/called-api-issues-queries-count-output"}},i={},l=[{value:"Output",id:"output",level:3},{value:"Description",id:"description",level:3},{value:"Example",id:"example",level:3}],p={toc:l};function c(e){let{components:t,...n}=e;return(0,s.kt)("wrapper",(0,u.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,s.kt)("h3",{id:"output"},"Output"),(0,s.kt)("p",null,"Name: ",(0,s.kt)("inlineCode",{parentName:"p"},"called-api-issues-count"),(0,s.kt)("br",{parentName:"p"}),"\n","Type: ",(0,s.kt)("inlineCode",{parentName:"p"},"number")),(0,s.kt)("h3",{id:"description"},"Description"),(0,s.kt)("p",null,"This output will expose the number of GitHub API calls performed for the issues."),(0,s.kt)("h3",{id:"example"},"Example"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-yml",metastring:"{6-7}","{6-7}":!0},'# ...\nsteps:\n  - name: Stale\n    id: stale\n    uses: sonia-corporation/stale@latest\n  - name: Count\n    run: echo "${{ steps.Stale.outputs.called-api-issues-count }}"\n')))}c.isMDXComponent=!0}}]);