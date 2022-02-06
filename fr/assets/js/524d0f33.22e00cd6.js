"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[7235],{3905:function(e,t,n){n.d(t,{Zo:function(){return d},kt:function(){return m}});var o=n(7294);function u(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){u(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,o,u=function(e,t){if(null==e)return{};var n,o,u={},s=Object.keys(e);for(o=0;o<s.length;o++)n=s[o],t.indexOf(n)>=0||(u[n]=e[n]);return u}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(o=0;o<s.length;o++)n=s[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(u[n]=e[n])}return u}var a=o.createContext({}),c=function(e){var t=o.useContext(a),n=t;return e&&(n="function"==typeof e?e(t):r(r({},t),e)),n},d=function(e){var t=c(e.components);return o.createElement(a.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},l=o.forwardRef((function(e,t){var n=e.components,u=e.mdxType,s=e.originalType,a=e.parentName,d=i(e,["components","mdxType","originalType","parentName"]),l=c(n),m=u,f=l["".concat(a,".").concat(m)]||l[m]||p[m]||s;return n?o.createElement(f,r(r({ref:t},d),{},{components:n})):o.createElement(f,r({ref:t},d))}));function m(e,t){var n=arguments,u=t&&t.mdxType;if("string"==typeof e||u){var s=n.length,r=new Array(s);r[0]=l;var i={};for(var a in t)hasOwnProperty.call(t,a)&&(i[a]=t[a]);i.originalType=e,i.mdxType="string"==typeof e?e:u,r[1]=i;for(var c=2;c<s;c++)r[c]=n[c];return o.createElement.apply(null,r)}return o.createElement.apply(null,n)}l.displayName="MDXCreateElement"},850:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return i},contentTitle:function(){return a},metadata:function(){return c},toc:function(){return d},default:function(){return l}});var o=n(7462),u=n(3366),s=(n(7294),n(3905)),r=["components"],i={id:"added-issues-comments-count-output",title:"Added issues comments count output",description:"All the information you need to know about the added issues comments count output.\nIncluding a detailed description and an example.\n",tags:["Issues","Outputs"]},a=void 0,c={unversionedId:"issues/outputs/added-issues-comments-count-output",id:"issues/outputs/added-issues-comments-count-output",title:"Added issues comments count output",description:"All the information you need to know about the added issues comments count output.\nIncluding a detailed description and an example.\n",source:"@site/docs/06-issues/02-outputs/09-added-issues-comments-count-output.mdx",sourceDirName:"06-issues/02-outputs",slug:"/issues/outputs/added-issues-comments-count-output",permalink:"/stale/fr/docs/issues/outputs/added-issues-comments-count-output",editUrl:"https://github.com/Sonia-corporation/stale/tree/develop/documentation/docs/06-issues/02-outputs/09-added-issues-comments-count-output.mdx",tags:[{label:"Issues",permalink:"/stale/fr/docs/tags/issues"},{label:"Outputs",permalink:"/stale/fr/docs/tags/outputs"}],version:"current",sidebarPosition:9,frontMatter:{id:"added-issues-comments-count-output",title:"Added issues comments count output",description:"All the information you need to know about the added issues comments count output.\nIncluding a detailed description and an example.\n",tags:["Issues","Outputs"]},sidebar:"tutorialSidebar",previous:{title:"Close issues count output",permalink:"/stale/fr/docs/issues/outputs/close-issues-count-output"},next:{title:"Added issues labels count output",permalink:"/stale/fr/docs/issues/outputs/added-issues-labels-count-output"}},d=[{value:"Output",id:"output",children:[],level:3},{value:"Description",id:"description",children:[],level:3},{value:"Example",id:"example",children:[],level:3}],p={toc:d};function l(e){var t=e.components,n=(0,u.Z)(e,r);return(0,s.kt)("wrapper",(0,o.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,s.kt)("h3",{id:"output"},"Output"),(0,s.kt)("p",null,"Name: ",(0,s.kt)("inlineCode",{parentName:"p"},"added-issues-comments-count"),(0,s.kt)("br",{parentName:"p"}),"\n","Type: ",(0,s.kt)("inlineCode",{parentName:"p"},"number")),(0,s.kt)("h3",{id:"description"},"Description"),(0,s.kt)("p",null,"This output will expose the number of added issues comments."),(0,s.kt)("h3",{id:"example"},"Example"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-yml",metastring:"{6}","{6}":!0},'# ...\nsteps:\n  - name: Stale\n    id: stale\n    uses: sonia-corporation/stale@latest\n  - name: Count\n    run: echo "${{ steps.Stale.outputs.added-issues-comments-count }}"\n')))}l.isMDXComponent=!0}}]);