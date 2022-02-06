"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[7432],{3905:function(e,t,u){u.d(t,{Zo:function(){return i},kt:function(){return m}});var n=u(7294);function r(e,t,u){return t in e?Object.defineProperty(e,t,{value:u,enumerable:!0,configurable:!0,writable:!0}):e[t]=u,e}function l(e,t){var u=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),u.push.apply(u,n)}return u}function o(e){for(var t=1;t<arguments.length;t++){var u=null!=arguments[t]?arguments[t]:{};t%2?l(Object(u),!0).forEach((function(t){r(e,t,u[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(u)):l(Object(u)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(u,t))}))}return e}function a(e,t){if(null==e)return{};var u,n,r=function(e,t){if(null==e)return{};var u,n,r={},l=Object.keys(e);for(n=0;n<l.length;n++)u=l[n],t.indexOf(u)>=0||(r[u]=e[u]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(n=0;n<l.length;n++)u=l[n],t.indexOf(u)>=0||Object.prototype.propertyIsEnumerable.call(e,u)&&(r[u]=e[u])}return r}var s=n.createContext({}),p=function(e){var t=n.useContext(s),u=t;return e&&(u="function"==typeof e?e(t):o(o({},t),e)),u},i=function(e){var t=p(e.components);return n.createElement(s.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var u=e.components,r=e.mdxType,l=e.originalType,s=e.parentName,i=a(e,["components","mdxType","originalType","parentName"]),d=p(u),m=r,f=d["".concat(s,".").concat(m)]||d[m]||c[m]||l;return u?n.createElement(f,o(o({ref:t},i),{},{components:u})):n.createElement(f,o({ref:t},i))}));function m(e,t){var u=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var l=u.length,o=new Array(l);o[0]=d;var a={};for(var s in t)hasOwnProperty.call(t,s)&&(a[s]=t[s]);a.originalType=e,a.mdxType="string"==typeof e?e:r,o[1]=a;for(var p=2;p<l;p++)o[p]=u[p];return n.createElement.apply(null,o)}return n.createElement.apply(null,u)}d.displayName="MDXCreateElement"},2271:function(e,t,u){u.r(t),u.d(t,{frontMatter:function(){return a},contentTitle:function(){return s},metadata:function(){return p},toc:function(){return i},default:function(){return d}});var n=u(7462),r=u(3366),l=(u(7294),u(3905)),o=["components"],a={id:"already-stale-pull-requests-count-output",title:"Already stale pull requests count output",description:"All the information you need to know about the already stale pull requests count output.\nIncluding a detailed description and an example.\n",tags:["Pull requests","Outputs"]},s=void 0,p={unversionedId:"pull-requests/outputs/already-stale-pull-requests-count-output",id:"pull-requests/outputs/already-stale-pull-requests-count-output",title:"Already stale pull requests count output",description:"All the information you need to know about the already stale pull requests count output.\nIncluding a detailed description and an example.\n",source:"@site/docs/08-pull-requests/02-outputs/06-already-stale-pull-requests-count-output.mdx",sourceDirName:"08-pull-requests/02-outputs",slug:"/pull-requests/outputs/already-stale-pull-requests-count-output",permalink:"/stale/docs/pull-requests/outputs/already-stale-pull-requests-count-output",editUrl:"https://github.com/Sonia-corporation/stale/tree/develop/documentation/docs/08-pull-requests/02-outputs/06-already-stale-pull-requests-count-output.mdx",tags:[{label:"Pull requests",permalink:"/stale/docs/tags/pull-requests"},{label:"Outputs",permalink:"/stale/docs/tags/outputs"}],version:"current",sidebarPosition:6,frontMatter:{id:"already-stale-pull-requests-count-output",title:"Already stale pull requests count output",description:"All the information you need to know about the already stale pull requests count output.\nIncluding a detailed description and an example.\n",tags:["Pull requests","Outputs"]},sidebar:"tutorialSidebar",previous:{title:"Stale pull requests count output",permalink:"/stale/docs/pull-requests/outputs/stale-pull-requests-count-output"},next:{title:"Remove stale pull requests count output",permalink:"/stale/docs/pull-requests/outputs/remove-stale-pull-requests-count-output"}},i=[{value:"Output",id:"output",children:[],level:3},{value:"Description",id:"description",children:[],level:3},{value:"Example",id:"example",children:[],level:3}],c={toc:i};function d(e){var t=e.components,u=(0,r.Z)(e,o);return(0,l.kt)("wrapper",(0,n.Z)({},c,u,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("h3",{id:"output"},"Output"),(0,l.kt)("p",null,"Name: ",(0,l.kt)("inlineCode",{parentName:"p"},"already-stale-pull-requests-count"),(0,l.kt)("br",{parentName:"p"}),"\n","Type: ",(0,l.kt)("inlineCode",{parentName:"p"},"number")),(0,l.kt)("h3",{id:"description"},"Description"),(0,l.kt)("p",null,"This output will expose the number of pull requests processed which were already stale."),(0,l.kt)("h3",{id:"example"},"Example"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-yml",metastring:"{6}","{6}":!0},'# ...\nsteps:\n  - name: Stale\n    id: stale\n    uses: sonia-corporation/stale@latest\n  - name: Count\n    run: echo "${{ steps.Stale.outputs.already-stale-pull-requests-count }}"\n')))}d.isMDXComponent=!0}}]);