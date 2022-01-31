"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[1045],{3905:function(e,t,n){n.d(t,{Zo:function(){return c},kt:function(){return f}});var r=n(7294);function u(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){u(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,u=function(e,t){if(null==e)return{};var n,r,u={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(u[n]=e[n]);return u}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(u[n]=e[n])}return u}var a=r.createContext({}),p=function(e){var t=r.useContext(a),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},c=function(e){var t=p(e.components);return r.createElement(a.Provider,{value:t},e.children)},l={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,u=e.mdxType,o=e.originalType,a=e.parentName,c=i(e,["components","mdxType","originalType","parentName"]),d=p(n),f=u,m=d["".concat(a,".").concat(f)]||d[f]||l[f]||o;return n?r.createElement(m,s(s({ref:t},c),{},{components:n})):r.createElement(m,s({ref:t},c))}));function f(e,t){var n=arguments,u=t&&t.mdxType;if("string"==typeof e||u){var o=n.length,s=new Array(o);s[0]=d;var i={};for(var a in t)hasOwnProperty.call(t,a)&&(i[a]=t[a]);i.originalType=e,i.mdxType="string"==typeof e?e:u,s[1]=i;for(var p=2;p<o;p++)s[p]=n[p];return r.createElement.apply(null,s)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},734:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return i},contentTitle:function(){return a},metadata:function(){return p},toc:function(){return c},default:function(){return d}});var r=n(7462),u=n(3366),o=(n(7294),n(3905)),s=["components"],i={id:"ignored-issues-count-output",title:"Ignored issues count output",tags:["Issues","Outputs"]},a=void 0,p={unversionedId:"issues/outputs/ignored-issues-count-output",id:"issues/outputs/ignored-issues-count-output",title:"Ignored issues count output",description:"Output",source:"@site/docs/06-issues/02-outputs/03-ignored-issues-count-output.mdx",sourceDirName:"06-issues/02-outputs",slug:"/issues/outputs/ignored-issues-count-output",permalink:"/stale/fr/docs/issues/outputs/ignored-issues-count-output",editUrl:"https://github.com/Sonia-corporation/stale/tree/develop/documentation/docs/06-issues/02-outputs/03-ignored-issues-count-output.mdx",tags:[{label:"Issues",permalink:"/stale/fr/docs/tags/issues"},{label:"Outputs",permalink:"/stale/fr/docs/tags/outputs"}],version:"current",sidebarPosition:3,frontMatter:{id:"ignored-issues-count-output",title:"Ignored issues count output",tags:["Issues","Outputs"]},sidebar:"tutorialSidebar",previous:{title:"Processed issues count output",permalink:"/stale/fr/docs/issues/outputs/processed-issues-count-output"},next:{title:"Unaltered issues count output",permalink:"/stale/fr/docs/issues/outputs/unaltered-issues-count-output"}},c=[{value:"Output",id:"output",children:[],level:3},{value:"Description",id:"description",children:[],level:3},{value:"Example",id:"example",children:[],level:3}],l={toc:c};function d(e){var t=e.components,n=(0,u.Z)(e,s);return(0,o.kt)("wrapper",(0,r.Z)({},l,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h3",{id:"output"},"Output"),(0,o.kt)("p",null,"Name: ",(0,o.kt)("inlineCode",{parentName:"p"},"ignored-issues-count"),(0,o.kt)("br",{parentName:"p"}),"\n","Type: ",(0,o.kt)("inlineCode",{parentName:"p"},"number")),(0,o.kt)("h3",{id:"description"},"Description"),(0,o.kt)("p",null,"This output will expose the number of issues ignored."),(0,o.kt)("h3",{id:"example"},"Example"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-yml",metastring:"{6}","{6}":!0},'# ...\nsteps:\n  - name: Stale\n    id: stale\n    uses: sonia-corporation/stale@latest\n  - name: Count\n    run: echo "${{ steps.Stale.outputs.ignored-issues-count }}"\n')))}d.isMDXComponent=!0}}]);