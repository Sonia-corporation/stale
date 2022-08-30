"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[7235],{4137:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>m});var s=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function u(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);t&&(s=s.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,s)}return n}function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?u(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):u(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function a(e,t){if(null==e)return{};var n,s,o=function(e,t){if(null==e)return{};var n,s,o={},u=Object.keys(e);for(s=0;s<u.length;s++)n=u[s],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var u=Object.getOwnPropertySymbols(e);for(s=0;s<u.length;s++)n=u[s],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var i=s.createContext({}),c=function(e){var t=s.useContext(i),n=t;return e&&(n="function"==typeof e?e(t):r(r({},t),e)),n},p=function(e){var t=c(e.components);return s.createElement(i.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return s.createElement(s.Fragment,{},t)}},l=s.forwardRef((function(e,t){var n=e.components,o=e.mdxType,u=e.originalType,i=e.parentName,p=a(e,["components","mdxType","originalType","parentName"]),l=c(n),m=o,f=l["".concat(i,".").concat(m)]||l[m]||d[m]||u;return n?s.createElement(f,r(r({ref:t},p),{},{components:n})):s.createElement(f,r({ref:t},p))}));function m(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var u=n.length,r=new Array(u);r[0]=l;var a={};for(var i in t)hasOwnProperty.call(t,i)&&(a[i]=t[i]);a.originalType=e,a.mdxType="string"==typeof e?e:o,r[1]=a;for(var c=2;c<u;c++)r[c]=n[c];return s.createElement.apply(null,r)}return s.createElement.apply(null,n)}l.displayName="MDXCreateElement"},5546:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>i,contentTitle:()=>r,default:()=>d,frontMatter:()=>u,metadata:()=>a,toc:()=>c});var s=n(7462),o=(n(7294),n(4137));const u={id:"added-issues-comments-count-output",title:"Added issues comments count output",description:"All the information you need to know about the added issues comments count output.\nIncluding a detailed description and an example.\n",tags:["Issues","Outputs"]},r=void 0,a={unversionedId:"issues/outputs/added-issues-comments-count-output",id:"issues/outputs/added-issues-comments-count-output",title:"Added issues comments count output",description:"All the information you need to know about the added issues comments count output.\nIncluding a detailed description and an example.\n",source:"@site/docs/06-issues/02-outputs/09-added-issues-comments-count-output.mdx",sourceDirName:"06-issues/02-outputs",slug:"/issues/outputs/added-issues-comments-count-output",permalink:"/stale/fr/docs/issues/outputs/added-issues-comments-count-output",draft:!1,editUrl:"https://github.com/Sonia-corporation/stale/tree/develop/documentation/docs/06-issues/02-outputs/09-added-issues-comments-count-output.mdx",tags:[{label:"Issues",permalink:"/stale/fr/docs/tags/issues"},{label:"Outputs",permalink:"/stale/fr/docs/tags/outputs"}],version:"current",sidebarPosition:9,frontMatter:{id:"added-issues-comments-count-output",title:"Added issues comments count output",description:"All the information you need to know about the added issues comments count output.\nIncluding a detailed description and an example.\n",tags:["Issues","Outputs"]},sidebar:"tutorialSidebar",previous:{title:"Close issues count output",permalink:"/stale/fr/docs/issues/outputs/close-issues-count-output"},next:{title:"Issues labels count output",permalink:"/stale/fr/docs/issues/outputs/issues-labels-count-output"}},i={},c=[{value:"Output",id:"output",level:3},{value:"Description",id:"description",level:3},{value:"Example",id:"example",level:3}],p={toc:c};function d(e){let{components:t,...n}=e;return(0,o.kt)("wrapper",(0,s.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h3",{id:"output"},"Output"),(0,o.kt)("p",null,"Name: ",(0,o.kt)("inlineCode",{parentName:"p"},"added-issues-comments-count"),(0,o.kt)("br",{parentName:"p"}),"\n","Type: ",(0,o.kt)("inlineCode",{parentName:"p"},"number")),(0,o.kt)("h3",{id:"description"},"Description"),(0,o.kt)("p",null,"This output will expose the number of added issues comments."),(0,o.kt)("h3",{id:"example"},"Example"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-yml",metastring:"{6-7}","{6-7}":!0},'# ...\nsteps:\n  - name: Stale\n    id: stale\n    uses: sonia-corporation/stale@latest\n  - name: Count\n    run: echo "${{ steps.Stale.outputs.added-issues-comments-count }}"\n')))}d.isMDXComponent=!0}}]);