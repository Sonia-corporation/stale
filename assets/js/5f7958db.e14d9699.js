"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[9467],{4137:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>m});var s=n(7294);function u(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);t&&(s=s.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,s)}return n}function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){u(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function a(e,t){if(null==e)return{};var n,s,u=function(e,t){if(null==e)return{};var n,s,u={},o=Object.keys(e);for(s=0;s<o.length;s++)n=o[s],t.indexOf(n)>=0||(u[n]=e[n]);return u}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(s=0;s<o.length;s++)n=o[s],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(u[n]=e[n])}return u}var i=s.createContext({}),l=function(e){var t=s.useContext(i),n=t;return e&&(n="function"==typeof e?e(t):r(r({},t),e)),n},p=function(e){var t=l(e.components);return s.createElement(i.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return s.createElement(s.Fragment,{},t)}},d=s.forwardRef((function(e,t){var n=e.components,u=e.mdxType,o=e.originalType,i=e.parentName,p=a(e,["components","mdxType","originalType","parentName"]),d=l(n),m=u,b=d["".concat(i,".").concat(m)]||d[m]||c[m]||o;return n?s.createElement(b,r(r({ref:t},p),{},{components:n})):s.createElement(b,r({ref:t},p))}));function m(e,t){var n=arguments,u=t&&t.mdxType;if("string"==typeof e||u){var o=n.length,r=new Array(o);r[0]=d;var a={};for(var i in t)hasOwnProperty.call(t,i)&&(a[i]=t[i]);a.originalType=e,a.mdxType="string"==typeof e?e:u,r[1]=a;for(var l=2;l<o;l++)r[l]=n[l];return s.createElement.apply(null,r)}return s.createElement.apply(null,n)}d.displayName="MDXCreateElement"},4582:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>i,contentTitle:()=>r,default:()=>c,frontMatter:()=>o,metadata:()=>a,toc:()=>l});var s=n(7462),u=(n(7294),n(4137));const o={id:"issues-labels-count-output",title:"Issues labels count output",description:"All the information you need to know about the issues labels count output.\nIncluding a detailed description and an example.\n",tags:["Issues","Outputs"]},r=void 0,a={unversionedId:"issues/outputs/issues-labels-count-output",id:"issues/outputs/issues-labels-count-output",title:"Issues labels count output",description:"All the information you need to know about the issues labels count output.\nIncluding a detailed description and an example.\n",source:"@site/docs/06-issues/02-outputs/10-issues-labels-count-output.mdx",sourceDirName:"06-issues/02-outputs",slug:"/issues/outputs/issues-labels-count-output",permalink:"/stale/docs/issues/outputs/issues-labels-count-output",draft:!1,editUrl:"https://github.com/Sonia-corporation/stale/tree/develop/documentation/docs/06-issues/02-outputs/10-issues-labels-count-output.mdx",tags:[{label:"Issues",permalink:"/stale/docs/tags/issues"},{label:"Outputs",permalink:"/stale/docs/tags/outputs"}],version:"current",sidebarPosition:10,frontMatter:{id:"issues-labels-count-output",title:"Issues labels count output",description:"All the information you need to know about the issues labels count output.\nIncluding a detailed description and an example.\n",tags:["Issues","Outputs"]},sidebar:"tutorialSidebar",previous:{title:"Added issues comments count output",permalink:"/stale/docs/issues/outputs/added-issues-comments-count-output"},next:{title:"Added issues labels count output",permalink:"/stale/docs/issues/outputs/added-issues-labels-count-output"}},i={},l=[{value:"Output",id:"output",level:3},{value:"Description",id:"description",level:3},{value:"Example",id:"example",level:3}],p={toc:l};function c(e){let{components:t,...n}=e;return(0,u.kt)("wrapper",(0,s.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,u.kt)("h3",{id:"output"},"Output"),(0,u.kt)("p",null,"Name: ",(0,u.kt)("inlineCode",{parentName:"p"},"issues-labels-count"),(0,u.kt)("br",{parentName:"p"}),"\n","Type: ",(0,u.kt)("inlineCode",{parentName:"p"},"number")),(0,u.kt)("h3",{id:"description"},"Description"),(0,u.kt)("p",null,"This output will expose the number of mutated issues labels (added or removed)."),(0,u.kt)("h3",{id:"example"},"Example"),(0,u.kt)("pre",null,(0,u.kt)("code",{parentName:"pre",className:"language-yml",metastring:"{6-7}","{6-7}":!0},'# ...\nsteps:\n  - name: Stale\n    id: stale\n    uses: sonia-corporation/stale@latest\n  - name: Count\n    run: echo "${{ steps.Stale.outputs.issues-labels-count }}"\n')))}c.isMDXComponent=!0}}]);