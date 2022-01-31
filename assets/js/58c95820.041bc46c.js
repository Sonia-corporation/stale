"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[5468],{3905:function(e,t,n){n.d(t,{Zo:function(){return p},kt:function(){return d}});var s=n(7294);function u(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);t&&(s=s.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,s)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){u(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,s,u=function(e,t){if(null==e)return{};var n,s,u={},r=Object.keys(e);for(s=0;s<r.length;s++)n=r[s],t.indexOf(n)>=0||(u[n]=e[n]);return u}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(s=0;s<r.length;s++)n=r[s],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(u[n]=e[n])}return u}var a=s.createContext({}),l=function(e){var t=s.useContext(a),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},p=function(e){var t=l(e.components);return s.createElement(a.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return s.createElement(s.Fragment,{},t)}},m=s.forwardRef((function(e,t){var n=e.components,u=e.mdxType,r=e.originalType,a=e.parentName,p=i(e,["components","mdxType","originalType","parentName"]),m=l(n),d=u,f=m["".concat(a,".").concat(d)]||m[d]||c[d]||r;return n?s.createElement(f,o(o({ref:t},p),{},{components:n})):s.createElement(f,o({ref:t},p))}));function d(e,t){var n=arguments,u=t&&t.mdxType;if("string"==typeof e||u){var r=n.length,o=new Array(r);o[0]=m;var i={};for(var a in t)hasOwnProperty.call(t,a)&&(i[a]=t[a]);i.originalType=e,i.mdxType="string"==typeof e?e:u,o[1]=i;for(var l=2;l<r;l++)o[l]=n[l];return s.createElement.apply(null,o)}return s.createElement.apply(null,n)}m.displayName="MDXCreateElement"},4722:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return i},contentTitle:function(){return a},metadata:function(){return l},toc:function(){return p},default:function(){return m}});var s=n(7462),u=n(3366),r=(n(7294),n(3905)),o=["components"],i={id:"remove-stale-issues-count-output",title:"Remove stale issues count output",tags:["Issues","Outputs"]},a=void 0,l={unversionedId:"issues/outputs/remove-stale-issues-count-output",id:"issues/outputs/remove-stale-issues-count-output",title:"Remove stale issues count output",description:"Output",source:"@site/docs/06-issues/02-outputs/07-remove-stale-issues-count-output.mdx",sourceDirName:"06-issues/02-outputs",slug:"/issues/outputs/remove-stale-issues-count-output",permalink:"/stale/docs/issues/outputs/remove-stale-issues-count-output",editUrl:"https://github.com/Sonia-corporation/stale/tree/develop/documentation/docs/06-issues/02-outputs/07-remove-stale-issues-count-output.mdx",tags:[{label:"Issues",permalink:"/stale/docs/tags/issues"},{label:"Outputs",permalink:"/stale/docs/tags/outputs"}],version:"current",sidebarPosition:7,frontMatter:{id:"remove-stale-issues-count-output",title:"Remove stale issues count output",tags:["Issues","Outputs"]},sidebar:"tutorialSidebar",previous:{title:"Already stale issues count output",permalink:"/stale/docs/issues/outputs/already-stale-issues-count-output"},next:{title:"Close issues count output",permalink:"/stale/docs/issues/outputs/close-issues-count-output"}},p=[{value:"Output",id:"output",children:[],level:3},{value:"Description",id:"description",children:[],level:3},{value:"Example",id:"example",children:[],level:3}],c={toc:p};function m(e){var t=e.components,n=(0,u.Z)(e,o);return(0,r.kt)("wrapper",(0,s.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h3",{id:"output"},"Output"),(0,r.kt)("p",null,"Name: ",(0,r.kt)("inlineCode",{parentName:"p"},"remove-stale-issues-count"),(0,r.kt)("br",{parentName:"p"}),"\n","Type: ",(0,r.kt)("inlineCode",{parentName:"p"},"number")),(0,r.kt)("h3",{id:"description"},"Description"),(0,r.kt)("p",null,"This output will expose the number of issues from where the stale state was removed."),(0,r.kt)("h3",{id:"example"},"Example"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yml",metastring:"{6}","{6}":!0},'# ...\nsteps:\n  - name: Stale\n    id: stale\n    uses: sonia-corporation/stale@latest\n  - name: Count\n    run: echo "${{ steps.Stale.outputs.remove-stale-issues-count }}"\n')))}m.isMDXComponent=!0}}]);