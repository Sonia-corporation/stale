"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[9363],{4137:function(t,e,n){n.d(e,{Zo:function(){return p},kt:function(){return m}});var u=n(7294);function r(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function o(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var u=Object.getOwnPropertySymbols(t);e&&(u=u.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,u)}return n}function l(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?o(Object(n),!0).forEach((function(e){r(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function a(t,e){if(null==t)return{};var n,u,r=function(t,e){if(null==t)return{};var n,u,r={},o=Object.keys(t);for(u=0;u<o.length;u++)n=o[u],e.indexOf(n)>=0||(r[n]=t[n]);return r}(t,e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);for(u=0;u<o.length;u++)n=o[u],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(r[n]=t[n])}return r}var s=u.createContext({}),i=function(t){var e=u.useContext(s),n=e;return t&&(n="function"==typeof t?t(e):l(l({},e),t)),n},p=function(t){var e=i(t.components);return u.createElement(s.Provider,{value:e},t.children)},c={inlineCode:"code",wrapper:function(t){var e=t.children;return u.createElement(u.Fragment,{},e)}},d=u.forwardRef((function(t,e){var n=t.components,r=t.mdxType,o=t.originalType,s=t.parentName,p=a(t,["components","mdxType","originalType","parentName"]),d=i(n),m=r,f=d["".concat(s,".").concat(m)]||d[m]||c[m]||o;return n?u.createElement(f,l(l({ref:e},p),{},{components:n})):u.createElement(f,l({ref:e},p))}));function m(t,e){var n=arguments,r=e&&e.mdxType;if("string"==typeof t||r){var o=n.length,l=new Array(o);l[0]=d;var a={};for(var s in e)hasOwnProperty.call(e,s)&&(a[s]=e[s]);a.originalType=t,a.mdxType="string"==typeof t?t:r,l[1]=a;for(var i=2;i<o;i++)l[i]=n[i];return u.createElement.apply(null,l)}return u.createElement.apply(null,n)}d.displayName="MDXCreateElement"},4263:function(t,e,n){n.r(e),n.d(e,{frontMatter:function(){return a},contentTitle:function(){return s},metadata:function(){return i},assets:function(){return p},toc:function(){return c},default:function(){return m}});var u=n(7462),r=n(3366),o=(n(7294),n(4137)),l=["components"],a={id:"called-api-pull-requests-mutations-count-output",title:"Called api pull requests mutations count output",description:"All the information you need to know about the called api pull requests mutations count output.\nIncluding a detailed description and an example.\n",tags:["Pull requests","Outputs"]},s=void 0,i={unversionedId:"pull-requests/outputs/called-api-pull-requests-mutations-count-output",id:"pull-requests/outputs/called-api-pull-requests-mutations-count-output",title:"Called api pull requests mutations count output",description:"All the information you need to know about the called api pull requests mutations count output.\nIncluding a detailed description and an example.\n",source:"@site/docs/08-pull-requests/02-outputs/15-called-api-pull-requests-mutations-count-output.mdx",sourceDirName:"08-pull-requests/02-outputs",slug:"/pull-requests/outputs/called-api-pull-requests-mutations-count-output",permalink:"/stale/fr/docs/pull-requests/outputs/called-api-pull-requests-mutations-count-output",editUrl:"https://github.com/Sonia-corporation/stale/tree/develop/documentation/docs/08-pull-requests/02-outputs/15-called-api-pull-requests-mutations-count-output.mdx",tags:[{label:"Pull requests",permalink:"/stale/fr/docs/tags/pull-requests"},{label:"Outputs",permalink:"/stale/fr/docs/tags/outputs"}],version:"current",sidebarPosition:15,frontMatter:{id:"called-api-pull-requests-mutations-count-output",title:"Called api pull requests mutations count output",description:"All the information you need to know about the called api pull requests mutations count output.\nIncluding a detailed description and an example.\n",tags:["Pull requests","Outputs"]},sidebar:"tutorialSidebar",previous:{title:"Called api pull requests queries count output",permalink:"/stale/fr/docs/pull-requests/outputs/called-api-pull-requests-queries-count-output"},next:{title:"Stale with comments except if assigned",permalink:"/stale/fr/docs/examples/stale-with-comments-except-if-assigned-example"}},p={},c=[{value:"Output",id:"output",level:3},{value:"Description",id:"description",level:3},{value:"Example",id:"example",level:3}],d={toc:c};function m(t){var e=t.components,n=(0,r.Z)(t,l);return(0,o.kt)("wrapper",(0,u.Z)({},d,n,{components:e,mdxType:"MDXLayout"}),(0,o.kt)("h3",{id:"output"},"Output"),(0,o.kt)("p",null,"Name: ",(0,o.kt)("inlineCode",{parentName:"p"},"called-api-pull-requests-mutations-count"),(0,o.kt)("br",{parentName:"p"}),"\n","Type: ",(0,o.kt)("inlineCode",{parentName:"p"},"number")),(0,o.kt)("h3",{id:"description"},"Description"),(0,o.kt)("p",null,"This output will expose the number of GitHub API mutations calls performed for the pull requests."),(0,o.kt)("h3",{id:"example"},"Example"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-yml",metastring:"{6-7}","{6-7}":!0},'# ...\nsteps:\n  - name: Stale\n    id: stale\n    uses: sonia-corporation/stale@latest\n  - name: Count\n    run: echo "${{ steps.Stale.outputs.called-api-pull-requests-mutations-count }}"\n')))}m.isMDXComponent=!0}}]);