"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[2907],{4137:function(e,t,n){n.d(t,{Zo:function(){return l},kt:function(){return m}});var o=n(7294);function s(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function u(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?u(Object(n),!0).forEach((function(t){s(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):u(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,o,s=function(e,t){if(null==e)return{};var n,o,s={},u=Object.keys(e);for(o=0;o<u.length;o++)n=u[o],t.indexOf(n)>=0||(s[n]=e[n]);return s}(e,t);if(Object.getOwnPropertySymbols){var u=Object.getOwnPropertySymbols(e);for(o=0;o<u.length;o++)n=u[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(s[n]=e[n])}return s}var a=o.createContext({}),c=function(e){var t=o.useContext(a),n=t;return e&&(n="function"==typeof e?e(t):r(r({},t),e)),n},l=function(e){var t=c(e.components);return o.createElement(a.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},d=o.forwardRef((function(e,t){var n=e.components,s=e.mdxType,u=e.originalType,a=e.parentName,l=i(e,["components","mdxType","originalType","parentName"]),d=c(n),m=s,f=d["".concat(a,".").concat(m)]||d[m]||p[m]||u;return n?o.createElement(f,r(r({ref:t},l),{},{components:n})):o.createElement(f,r({ref:t},l))}));function m(e,t){var n=arguments,s=t&&t.mdxType;if("string"==typeof e||s){var u=n.length,r=new Array(u);r[0]=d;var i={};for(var a in t)hasOwnProperty.call(t,a)&&(i[a]=t[a]);i.originalType=e,i.mdxType="string"==typeof e?e:s,r[1]=i;for(var c=2;c<u;c++)r[c]=n[c];return o.createElement.apply(null,r)}return o.createElement.apply(null,n)}d.displayName="MDXCreateElement"},6601:function(e,t,n){n.r(t),n.d(t,{assets:function(){return l},contentTitle:function(){return a},default:function(){return m},frontMatter:function(){return i},metadata:function(){return c},toc:function(){return p}});var o=n(7462),s=n(3366),u=(n(7294),n(4137)),r=["components"],i={id:"close-issues-count-output",title:"Close issues count output",description:"All the information you need to know about the close issues count output.\nIncluding a detailed description and an example.\n",tags:["Issues","Outputs"]},a=void 0,c={unversionedId:"issues/outputs/close-issues-count-output",id:"issues/outputs/close-issues-count-output",title:"Close issues count output",description:"All the information you need to know about the close issues count output.\nIncluding a detailed description and an example.\n",source:"@site/docs/06-issues/02-outputs/08-close-issues-count-output.mdx",sourceDirName:"06-issues/02-outputs",slug:"/issues/outputs/close-issues-count-output",permalink:"/stale/docs/issues/outputs/close-issues-count-output",editUrl:"https://github.com/Sonia-corporation/stale/tree/develop/documentation/docs/06-issues/02-outputs/08-close-issues-count-output.mdx",tags:[{label:"Issues",permalink:"/stale/docs/tags/issues"},{label:"Outputs",permalink:"/stale/docs/tags/outputs"}],version:"current",sidebarPosition:8,frontMatter:{id:"close-issues-count-output",title:"Close issues count output",description:"All the information you need to know about the close issues count output.\nIncluding a detailed description and an example.\n",tags:["Issues","Outputs"]},sidebar:"tutorialSidebar",previous:{title:"Remove stale issues count output",permalink:"/stale/docs/issues/outputs/remove-stale-issues-count-output"},next:{title:"Added issues comments count output",permalink:"/stale/docs/issues/outputs/added-issues-comments-count-output"}},l={},p=[{value:"Output",id:"output",level:3},{value:"Description",id:"description",level:3},{value:"Example",id:"example",level:3}],d={toc:p};function m(e){var t=e.components,n=(0,s.Z)(e,r);return(0,u.kt)("wrapper",(0,o.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,u.kt)("h3",{id:"output"},"Output"),(0,u.kt)("p",null,"Name: ",(0,u.kt)("inlineCode",{parentName:"p"},"close-issues-count"),(0,u.kt)("br",{parentName:"p"}),"\n","Type: ",(0,u.kt)("inlineCode",{parentName:"p"},"number")),(0,u.kt)("h3",{id:"description"},"Description"),(0,u.kt)("p",null,"This output will expose the number of issues closed."),(0,u.kt)("h3",{id:"example"},"Example"),(0,u.kt)("pre",null,(0,u.kt)("code",{parentName:"pre",className:"language-yml",metastring:"{6-7}","{6-7}":!0},'# ...\nsteps:\n  - name: Stale\n    id: stale\n    uses: sonia-corporation/stale@latest\n  - name: Count\n    run: echo "${{ steps.Stale.outputs.close-issues-count }}"\n')))}m.isMDXComponent=!0}}]);