"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[2586],{4137:function(e,t,n){n.d(t,{Zo:function(){return i},kt:function(){return m}});var r=n(7294);function u(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){u(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,u=function(e,t){if(null==e)return{};var n,r,u={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(u[n]=e[n]);return u}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(u[n]=e[n])}return u}var p=r.createContext({}),a=function(e){var t=r.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},i=function(e){var t=a(e.components);return r.createElement(p.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,u=e.mdxType,o=e.originalType,p=e.parentName,i=l(e,["components","mdxType","originalType","parentName"]),d=a(n),m=u,f=d["".concat(p,".").concat(m)]||d[m]||c[m]||o;return n?r.createElement(f,s(s({ref:t},i),{},{components:n})):r.createElement(f,s({ref:t},i))}));function m(e,t){var n=arguments,u=t&&t.mdxType;if("string"==typeof e||u){var o=n.length,s=new Array(o);s[0]=d;var l={};for(var p in t)hasOwnProperty.call(t,p)&&(l[p]=t[p]);l.originalType=e,l.mdxType="string"==typeof e?e:u,s[1]=l;for(var a=2;a<o;a++)s[a]=n[a];return r.createElement.apply(null,s)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},953:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return l},contentTitle:function(){return p},metadata:function(){return a},assets:function(){return i},toc:function(){return c},default:function(){return m}});var r=n(7462),u=n(3366),o=(n(7294),n(4137)),s=["components"],l={id:"processed-pull-requests-count-output",title:"Processed pull requests count output",description:"All the information you need to know about the\nIncluding a detailed description and an example.\n",tags:["Pull requests","Outputs"]},p=void 0,a={unversionedId:"pull-requests/outputs/processed-pull-requests-count-output",id:"pull-requests/outputs/processed-pull-requests-count-output",title:"Processed pull requests count output",description:"All the information you need to know about the\nIncluding a detailed description and an example.\n",source:"@site/docs/08-pull-requests/02-outputs/02-processed-pull-requests-count-output.mdx",sourceDirName:"08-pull-requests/02-outputs",slug:"/pull-requests/outputs/processed-pull-requests-count-output",permalink:"/stale/fr/docs/pull-requests/outputs/processed-pull-requests-count-output",editUrl:"https://github.com/Sonia-corporation/stale/tree/develop/documentation/docs/08-pull-requests/02-outputs/02-processed-pull-requests-count-output.mdx",tags:[{label:"Pull requests",permalink:"/stale/fr/docs/tags/pull-requests"},{label:"Outputs",permalink:"/stale/fr/docs/tags/outputs"}],version:"current",sidebarPosition:2,frontMatter:{id:"processed-pull-requests-count-output",title:"Processed pull requests count output",description:"All the information you need to know about the\nIncluding a detailed description and an example.\n",tags:["Pull requests","Outputs"]},sidebar:"tutorialSidebar",previous:{title:"All pull requests outputs",permalink:"/stale/fr/docs/pull-requests/outputs/all-pull-requests-outputs"},next:{title:"Ignored pull requests count output",permalink:"/stale/fr/docs/pull-requests/outputs/ignored-pull-requests-count-output"}},i={},c=[{value:"Output",id:"output",level:3},{value:"Description",id:"description",level:3},{value:"Example",id:"example",level:3}],d={toc:c};function m(e){var t=e.components,n=(0,u.Z)(e,s);return(0,o.kt)("wrapper",(0,r.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h3",{id:"output"},"Output"),(0,o.kt)("p",null,"Name: ",(0,o.kt)("inlineCode",{parentName:"p"},"processed-pull-requests-count"),(0,o.kt)("br",{parentName:"p"}),"\n","Type: ",(0,o.kt)("inlineCode",{parentName:"p"},"number")),(0,o.kt)("h3",{id:"description"},"Description"),(0,o.kt)("p",null,"This output will expose the number of pull requests processed."),(0,o.kt)("h3",{id:"example"},"Example"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-yml",metastring:"{6-7}","{6-7}":!0},'# ...\nsteps:\n  - name: Stale\n    id: stale\n    uses: sonia-corporation/stale@latest\n  - name: Count\n    run: echo "${{ steps.Stale.outputs.processed-pull-requests-count }}"\n')))}m.isMDXComponent=!0}}]);