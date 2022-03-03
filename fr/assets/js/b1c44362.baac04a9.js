"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[9052],{4137:function(e,t,u){u.d(t,{Zo:function(){return c},kt:function(){return m}});var n=u(7294);function r(e,t,u){return t in e?Object.defineProperty(e,t,{value:u,enumerable:!0,configurable:!0,writable:!0}):e[t]=u,e}function o(e,t){var u=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),u.push.apply(u,n)}return u}function l(e){for(var t=1;t<arguments.length;t++){var u=null!=arguments[t]?arguments[t]:{};t%2?o(Object(u),!0).forEach((function(t){r(e,t,u[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(u)):o(Object(u)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(u,t))}))}return e}function s(e,t){if(null==e)return{};var u,n,r=function(e,t){if(null==e)return{};var u,n,r={},o=Object.keys(e);for(n=0;n<o.length;n++)u=o[n],t.indexOf(u)>=0||(r[u]=e[u]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)u=o[n],t.indexOf(u)>=0||Object.prototype.propertyIsEnumerable.call(e,u)&&(r[u]=e[u])}return r}var p=n.createContext({}),a=function(e){var t=n.useContext(p),u=t;return e&&(u="function"==typeof e?e(t):l(l({},t),e)),u},c=function(e){var t=a(e.components);return n.createElement(p.Provider,{value:t},e.children)},i={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var u=e.components,r=e.mdxType,o=e.originalType,p=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),d=a(u),m=r,f=d["".concat(p,".").concat(m)]||d[m]||i[m]||o;return u?n.createElement(f,l(l({ref:t},c),{},{components:u})):n.createElement(f,l({ref:t},c))}));function m(e,t){var u=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=u.length,l=new Array(o);l[0]=d;var s={};for(var p in t)hasOwnProperty.call(t,p)&&(s[p]=t[p]);s.originalType=e,s.mdxType="string"==typeof e?e:r,l[1]=s;for(var a=2;a<o;a++)l[a]=u[a];return n.createElement.apply(null,l)}return n.createElement.apply(null,u)}d.displayName="MDXCreateElement"},2104:function(e,t,u){u.r(t),u.d(t,{frontMatter:function(){return s},contentTitle:function(){return p},metadata:function(){return a},assets:function(){return c},toc:function(){return i},default:function(){return m}});var n=u(7462),r=u(3366),o=(u(7294),u(4137)),l=["components"],s={id:"close-pull-requests-count-output",title:"Close pull requests count output",description:"All the information you need to know about the close pull requests count output.\nIncluding a detailed description and an example.\n",tags:["Pull requests","Outputs"]},p=void 0,a={unversionedId:"pull-requests/outputs/close-pull-requests-count-output",id:"pull-requests/outputs/close-pull-requests-count-output",title:"Close pull requests count output",description:"All the information you need to know about the close pull requests count output.\nIncluding a detailed description and an example.\n",source:"@site/docs/08-pull-requests/02-outputs/08-close-pull-requests-count-output.mdx",sourceDirName:"08-pull-requests/02-outputs",slug:"/pull-requests/outputs/close-pull-requests-count-output",permalink:"/stale/fr/docs/pull-requests/outputs/close-pull-requests-count-output",editUrl:"https://github.com/Sonia-corporation/stale/tree/develop/documentation/docs/08-pull-requests/02-outputs/08-close-pull-requests-count-output.mdx",tags:[{label:"Pull requests",permalink:"/stale/fr/docs/tags/pull-requests"},{label:"Outputs",permalink:"/stale/fr/docs/tags/outputs"}],version:"current",sidebarPosition:8,frontMatter:{id:"close-pull-requests-count-output",title:"Close pull requests count output",description:"All the information you need to know about the close pull requests count output.\nIncluding a detailed description and an example.\n",tags:["Pull requests","Outputs"]},sidebar:"tutorialSidebar",previous:{title:"Remove stale pull requests count output",permalink:"/stale/fr/docs/pull-requests/outputs/remove-stale-pull-requests-count-output"},next:{title:"Deleted pull requests branches count output",permalink:"/stale/fr/docs/pull-requests/outputs/deleted-pull-requests-branches-count-output"}},c={},i=[{value:"Output",id:"output",level:3},{value:"Description",id:"description",level:3},{value:"Example",id:"example",level:3}],d={toc:i};function m(e){var t=e.components,u=(0,r.Z)(e,l);return(0,o.kt)("wrapper",(0,n.Z)({},d,u,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h3",{id:"output"},"Output"),(0,o.kt)("p",null,"Name: ",(0,o.kt)("inlineCode",{parentName:"p"},"close-pull-requests-count"),(0,o.kt)("br",{parentName:"p"}),"\n","Type: ",(0,o.kt)("inlineCode",{parentName:"p"},"number")),(0,o.kt)("h3",{id:"description"},"Description"),(0,o.kt)("p",null,"This output will expose the number of pull requests closed."),(0,o.kt)("h3",{id:"example"},"Example"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-yml",metastring:"{6-7}","{6-7}":!0},'# ...\nsteps:\n  - name: Stale\n    id: stale\n    uses: sonia-corporation/stale@latest\n  - name: Count\n    run: echo "${{ steps.Stale.outputs.close-pull-requests-count }}"\n')))}m.isMDXComponent=!0}}]);