"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[6842],{3905:function(t,e,n){n.d(e,{Zo:function(){return p},kt:function(){return f}});var u=n(7294);function s(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function r(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var u=Object.getOwnPropertySymbols(t);e&&(u=u.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,u)}return n}function o(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?r(Object(n),!0).forEach((function(e){s(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function i(t,e){if(null==t)return{};var n,u,s=function(t,e){if(null==t)return{};var n,u,s={},r=Object.keys(t);for(u=0;u<r.length;u++)n=r[u],e.indexOf(n)>=0||(s[n]=t[n]);return s}(t,e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);for(u=0;u<r.length;u++)n=r[u],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(s[n]=t[n])}return s}var a=u.createContext({}),l=function(t){var e=u.useContext(a),n=e;return t&&(n="function"==typeof t?t(e):o(o({},e),t)),n},p=function(t){var e=l(t.components);return u.createElement(a.Provider,{value:e},t.children)},c={inlineCode:"code",wrapper:function(t){var e=t.children;return u.createElement(u.Fragment,{},e)}},d=u.forwardRef((function(t,e){var n=t.components,s=t.mdxType,r=t.originalType,a=t.parentName,p=i(t,["components","mdxType","originalType","parentName"]),d=l(n),f=s,m=d["".concat(a,".").concat(f)]||d[f]||c[f]||r;return n?u.createElement(m,o(o({ref:e},p),{},{components:n})):u.createElement(m,o({ref:e},p))}));function f(t,e){var n=arguments,s=e&&e.mdxType;if("string"==typeof t||s){var r=n.length,o=new Array(r);o[0]=d;var i={};for(var a in e)hasOwnProperty.call(e,a)&&(i[a]=e[a]);i.originalType=t,i.mdxType="string"==typeof t?t:s,o[1]=i;for(var l=2;l<r;l++)o[l]=n[l];return u.createElement.apply(null,o)}return u.createElement.apply(null,n)}d.displayName="MDXCreateElement"},609:function(t,e,n){n.r(e),n.d(e,{frontMatter:function(){return i},contentTitle:function(){return a},metadata:function(){return l},toc:function(){return p},default:function(){return d}});var u=n(7462),s=n(3366),r=(n(7294),n(3905)),o=["components"],i={id:"stale-issues-count-output",title:"Stale issues count output",tags:["Issues","Outputs"]},a=void 0,l={unversionedId:"issues/outputs/stale-issues-count-output",id:"issues/outputs/stale-issues-count-output",title:"Stale issues count output",description:"Output",source:"@site/docs/06-issues/02-outputs/05-stale-issues-count-output.mdx",sourceDirName:"06-issues/02-outputs",slug:"/issues/outputs/stale-issues-count-output",permalink:"/stale/fr/docs/issues/outputs/stale-issues-count-output",editUrl:"https://github.com/Sonia-corporation/stale/tree/develop/documentation/docs/06-issues/02-outputs/05-stale-issues-count-output.mdx",tags:[{label:"Issues",permalink:"/stale/fr/docs/tags/issues"},{label:"Outputs",permalink:"/stale/fr/docs/tags/outputs"}],version:"current",sidebarPosition:5,frontMatter:{id:"stale-issues-count-output",title:"Stale issues count output",tags:["Issues","Outputs"]},sidebar:"tutorialSidebar",previous:{title:"Unaltered issues count output",permalink:"/stale/fr/docs/issues/outputs/unaltered-issues-count-output"},next:{title:"Already stale issues count output",permalink:"/stale/fr/docs/issues/outputs/already-stale-issues-count-output"}},p=[{value:"Output",id:"output",children:[],level:3},{value:"Description",id:"description",children:[],level:3},{value:"Example",id:"example",children:[],level:3}],c={toc:p};function d(t){var e=t.components,n=(0,s.Z)(t,o);return(0,r.kt)("wrapper",(0,u.Z)({},c,n,{components:e,mdxType:"MDXLayout"}),(0,r.kt)("h3",{id:"output"},"Output"),(0,r.kt)("p",null,"Name: ",(0,r.kt)("inlineCode",{parentName:"p"},"stale-issues-count"),(0,r.kt)("br",{parentName:"p"}),"\n","Type: ",(0,r.kt)("inlineCode",{parentName:"p"},"number")),(0,r.kt)("h3",{id:"description"},"Description"),(0,r.kt)("p",null,"This output will expose the number of issues stale."),(0,r.kt)("h3",{id:"example"},"Example"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yml",metastring:"{6}","{6}":!0},'# ...\nsteps:\n  - name: Stale\n    id: stale\n    uses: sonia-corporation/stale@latest\n  - name: Count\n    run: echo "${{ steps.Stale.outputs.stale-issues-count }}"\n')))}d.isMDXComponent=!0}}]);