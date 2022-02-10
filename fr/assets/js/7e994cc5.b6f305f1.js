"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[5437],{3905:function(e,t,n){n.d(t,{Zo:function(){return p},kt:function(){return m}});var u=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var u=Object.getOwnPropertySymbols(e);t&&(u=u.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,u)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,u,r=function(e,t){if(null==e)return{};var n,u,r={},s=Object.keys(e);for(u=0;u<s.length;u++)n=s[u],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(u=0;u<s.length;u++)n=s[u],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var a=u.createContext({}),l=function(e){var t=u.useContext(a),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=l(e.components);return u.createElement(a.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return u.createElement(u.Fragment,{},t)}},d=u.forwardRef((function(e,t){var n=e.components,r=e.mdxType,s=e.originalType,a=e.parentName,p=o(e,["components","mdxType","originalType","parentName"]),d=l(n),m=r,f=d["".concat(a,".").concat(m)]||d[m]||c[m]||s;return n?u.createElement(f,i(i({ref:t},p),{},{components:n})):u.createElement(f,i({ref:t},p))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var s=n.length,i=new Array(s);i[0]=d;var o={};for(var a in t)hasOwnProperty.call(t,a)&&(o[a]=t[a]);o.originalType=e,o.mdxType="string"==typeof e?e:r,i[1]=o;for(var l=2;l<s;l++)i[l]=n[l];return u.createElement.apply(null,i)}return u.createElement.apply(null,n)}d.displayName="MDXCreateElement"},8789:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return o},contentTitle:function(){return a},metadata:function(){return l},toc:function(){return p},default:function(){return d}});var u=n(7462),r=n(3366),s=(n(7294),n(3905)),i=["components"],o={id:"called-api-issues-queries-count-output",title:"Called api issues queries count output",description:"All the information you need to know about the called api issues queries count output.\nIncluding a detailed description and an example.\n",tags:["Issues","Outputs"]},a=void 0,l={unversionedId:"issues/outputs/called-api-issues-queries-count-output",id:"issues/outputs/called-api-issues-queries-count-output",title:"Called api issues queries count output",description:"All the information you need to know about the called api issues queries count output.\nIncluding a detailed description and an example.\n",source:"@site/docs/06-issues/02-outputs/12-called-api-issues-queries-count-output.mdx",sourceDirName:"06-issues/02-outputs",slug:"/issues/outputs/called-api-issues-queries-count-output",permalink:"/stale/fr/docs/issues/outputs/called-api-issues-queries-count-output",editUrl:"https://github.com/Sonia-corporation/stale/tree/develop/documentation/docs/06-issues/02-outputs/12-called-api-issues-queries-count-output.mdx",tags:[{label:"Issues",permalink:"/stale/fr/docs/tags/issues"},{label:"Outputs",permalink:"/stale/fr/docs/tags/outputs"}],version:"current",sidebarPosition:12,frontMatter:{id:"called-api-issues-queries-count-output",title:"Called api issues queries count output",description:"All the information you need to know about the called api issues queries count output.\nIncluding a detailed description and an example.\n",tags:["Issues","Outputs"]},sidebar:"tutorialSidebar",previous:{title:"Called api issues count output",permalink:"/stale/fr/docs/issues/outputs/called-api-issues-count-output"},next:{title:"Called api issues mutations count output",permalink:"/stale/fr/docs/issues/outputs/called-api-issues-mutations-count-output"}},p=[{value:"Output",id:"output",children:[],level:3},{value:"Description",id:"description",children:[],level:3},{value:"Example",id:"example",children:[],level:3}],c={toc:p};function d(e){var t=e.components,n=(0,r.Z)(e,i);return(0,s.kt)("wrapper",(0,u.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,s.kt)("h3",{id:"output"},"Output"),(0,s.kt)("p",null,"Name: ",(0,s.kt)("inlineCode",{parentName:"p"},"called-api-issues-queries-count"),(0,s.kt)("br",{parentName:"p"}),"\n","Type: ",(0,s.kt)("inlineCode",{parentName:"p"},"number")),(0,s.kt)("h3",{id:"description"},"Description"),(0,s.kt)("p",null,"This output will expose the number of GitHub API queries calls performed for the issues."),(0,s.kt)("h3",{id:"example"},"Example"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-yml",metastring:"{6-7}","{6-7}":!0},'# ...\nsteps:\n  - name: Stale\n    id: stale\n    uses: sonia-corporation/stale@latest\n  - name: Count\n    run: echo "${{ steps.Stale.outputs.called-api-issues-queries-count }}"\n')))}d.isMDXComponent=!0}}]);