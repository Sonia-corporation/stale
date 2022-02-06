"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[1045],{3905:function(e,t,n){n.d(t,{Zo:function(){return c},kt:function(){return m}});var o=n(7294);function u(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){u(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,o,u=function(e,t){if(null==e)return{};var n,o,u={},r=Object.keys(e);for(o=0;o<r.length;o++)n=r[o],t.indexOf(n)>=0||(u[n]=e[n]);return u}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(o=0;o<r.length;o++)n=r[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(u[n]=e[n])}return u}var a=o.createContext({}),p=function(e){var t=o.useContext(a),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},c=function(e){var t=p(e.components);return o.createElement(a.Provider,{value:t},e.children)},l={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},d=o.forwardRef((function(e,t){var n=e.components,u=e.mdxType,r=e.originalType,a=e.parentName,c=i(e,["components","mdxType","originalType","parentName"]),d=p(n),m=u,f=d["".concat(a,".").concat(m)]||d[m]||l[m]||r;return n?o.createElement(f,s(s({ref:t},c),{},{components:n})):o.createElement(f,s({ref:t},c))}));function m(e,t){var n=arguments,u=t&&t.mdxType;if("string"==typeof e||u){var r=n.length,s=new Array(r);s[0]=d;var i={};for(var a in t)hasOwnProperty.call(t,a)&&(i[a]=t[a]);i.originalType=e,i.mdxType="string"==typeof e?e:u,s[1]=i;for(var p=2;p<r;p++)s[p]=n[p];return o.createElement.apply(null,s)}return o.createElement.apply(null,n)}d.displayName="MDXCreateElement"},734:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return i},contentTitle:function(){return a},metadata:function(){return p},toc:function(){return c},default:function(){return d}});var o=n(7462),u=n(3366),r=(n(7294),n(3905)),s=["components"],i={id:"ignored-issues-count-output",title:"Ignored issues count output",description:"All the information you need to know about the ignored issues count output.\nIncluding a detailed description and an example.\n",tags:["Issues","Outputs"]},a=void 0,p={unversionedId:"issues/outputs/ignored-issues-count-output",id:"issues/outputs/ignored-issues-count-output",title:"Ignored issues count output",description:"All the information you need to know about the ignored issues count output.\nIncluding a detailed description and an example.\n",source:"@site/docs/06-issues/02-outputs/03-ignored-issues-count-output.mdx",sourceDirName:"06-issues/02-outputs",slug:"/issues/outputs/ignored-issues-count-output",permalink:"/stale/docs/issues/outputs/ignored-issues-count-output",editUrl:"https://github.com/Sonia-corporation/stale/tree/develop/documentation/docs/06-issues/02-outputs/03-ignored-issues-count-output.mdx",tags:[{label:"Issues",permalink:"/stale/docs/tags/issues"},{label:"Outputs",permalink:"/stale/docs/tags/outputs"}],version:"current",sidebarPosition:3,frontMatter:{id:"ignored-issues-count-output",title:"Ignored issues count output",description:"All the information you need to know about the ignored issues count output.\nIncluding a detailed description and an example.\n",tags:["Issues","Outputs"]},sidebar:"tutorialSidebar",previous:{title:"Processed issues count output",permalink:"/stale/docs/issues/outputs/processed-issues-count-output"},next:{title:"Unaltered issues count output",permalink:"/stale/docs/issues/outputs/unaltered-issues-count-output"}},c=[{value:"Output",id:"output",children:[],level:3},{value:"Description",id:"description",children:[],level:3},{value:"Example",id:"example",children:[],level:3}],l={toc:c};function d(e){var t=e.components,n=(0,u.Z)(e,s);return(0,r.kt)("wrapper",(0,o.Z)({},l,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h3",{id:"output"},"Output"),(0,r.kt)("p",null,"Name: ",(0,r.kt)("inlineCode",{parentName:"p"},"ignored-issues-count"),(0,r.kt)("br",{parentName:"p"}),"\n","Type: ",(0,r.kt)("inlineCode",{parentName:"p"},"number")),(0,r.kt)("h3",{id:"description"},"Description"),(0,r.kt)("p",null,"This output will expose the number of issues ignored."),(0,r.kt)("h3",{id:"example"},"Example"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yml",metastring:"{6}","{6}":!0},'# ...\nsteps:\n  - name: Stale\n    id: stale\n    uses: sonia-corporation/stale@latest\n  - name: Count\n    run: echo "${{ steps.Stale.outputs.ignored-issues-count }}"\n')))}d.isMDXComponent=!0}}]);