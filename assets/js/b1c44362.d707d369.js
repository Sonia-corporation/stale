"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[9052],{3905:function(e,t,u){u.d(t,{Zo:function(){return a},kt:function(){return m}});var r=u(7294);function n(e,t,u){return t in e?Object.defineProperty(e,t,{value:u,enumerable:!0,configurable:!0,writable:!0}):e[t]=u,e}function o(e,t){var u=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),u.push.apply(u,r)}return u}function l(e){for(var t=1;t<arguments.length;t++){var u=null!=arguments[t]?arguments[t]:{};t%2?o(Object(u),!0).forEach((function(t){n(e,t,u[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(u)):o(Object(u)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(u,t))}))}return e}function s(e,t){if(null==e)return{};var u,r,n=function(e,t){if(null==e)return{};var u,r,n={},o=Object.keys(e);for(r=0;r<o.length;r++)u=o[r],t.indexOf(u)>=0||(n[u]=e[u]);return n}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)u=o[r],t.indexOf(u)>=0||Object.prototype.propertyIsEnumerable.call(e,u)&&(n[u]=e[u])}return n}var p=r.createContext({}),c=function(e){var t=r.useContext(p),u=t;return e&&(u="function"==typeof e?e(t):l(l({},t),e)),u},a=function(e){var t=c(e.components);return r.createElement(p.Provider,{value:t},e.children)},i={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var u=e.components,n=e.mdxType,o=e.originalType,p=e.parentName,a=s(e,["components","mdxType","originalType","parentName"]),d=c(u),m=n,f=d["".concat(p,".").concat(m)]||d[m]||i[m]||o;return u?r.createElement(f,l(l({ref:t},a),{},{components:u})):r.createElement(f,l({ref:t},a))}));function m(e,t){var u=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var o=u.length,l=new Array(o);l[0]=d;var s={};for(var p in t)hasOwnProperty.call(t,p)&&(s[p]=t[p]);s.originalType=e,s.mdxType="string"==typeof e?e:n,l[1]=s;for(var c=2;c<o;c++)l[c]=u[c];return r.createElement.apply(null,l)}return r.createElement.apply(null,u)}d.displayName="MDXCreateElement"},1768:function(e,t,u){u.r(t),u.d(t,{frontMatter:function(){return s},contentTitle:function(){return p},metadata:function(){return c},toc:function(){return a},default:function(){return d}});var r=u(7462),n=u(3366),o=(u(7294),u(3905)),l=["components"],s={id:"close-pull-requests-count-output",title:"Close pull requests count output",tags:["Pull requests","Outputs"]},p=void 0,c={unversionedId:"pull-requests/outputs/close-pull-requests-count-output",id:"pull-requests/outputs/close-pull-requests-count-output",title:"Close pull requests count output",description:"Output",source:"@site/docs/08-pull-requests/02-outputs/08-close-pull-requests-count-output.mdx",sourceDirName:"08-pull-requests/02-outputs",slug:"/pull-requests/outputs/close-pull-requests-count-output",permalink:"/stale/docs/pull-requests/outputs/close-pull-requests-count-output",editUrl:"https://github.com/Sonia-corporation/stale/tree/develop/documentation/docs/08-pull-requests/02-outputs/08-close-pull-requests-count-output.mdx",tags:[{label:"Pull requests",permalink:"/stale/docs/tags/pull-requests"},{label:"Outputs",permalink:"/stale/docs/tags/outputs"}],version:"current",sidebarPosition:8,frontMatter:{id:"close-pull-requests-count-output",title:"Close pull requests count output",tags:["Pull requests","Outputs"]},sidebar:"tutorialSidebar",previous:{title:"Remove stale pull requests count output",permalink:"/stale/docs/pull-requests/outputs/remove-stale-pull-requests-count-output"},next:{title:"Deleted pull requests branches count output",permalink:"/stale/docs/pull-requests/outputs/deleted-pull-requests-branches-count-output"}},a=[{value:"Output",id:"output",children:[],level:3},{value:"Description",id:"description",children:[],level:3},{value:"Example",id:"example",children:[],level:3}],i={toc:a};function d(e){var t=e.components,u=(0,n.Z)(e,l);return(0,o.kt)("wrapper",(0,r.Z)({},i,u,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h3",{id:"output"},"Output"),(0,o.kt)("p",null,"Name: ",(0,o.kt)("inlineCode",{parentName:"p"},"close-pull-requests-count"),(0,o.kt)("br",{parentName:"p"}),"\n","Type: ",(0,o.kt)("inlineCode",{parentName:"p"},"number")),(0,o.kt)("h3",{id:"description"},"Description"),(0,o.kt)("p",null,"This output will expose the number of pull requests closed."),(0,o.kt)("h3",{id:"example"},"Example"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-yml",metastring:"{6}","{6}":!0},'# ...\nsteps:\n  - name: Stale\n    id: stale\n    uses: sonia-corporation/stale@latest\n  - name: Count\n    run: echo "${{ steps.Stale.outputs.close-pull-requests-count }}"\n')))}d.isMDXComponent=!0}}]);