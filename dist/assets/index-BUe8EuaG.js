const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-BEkT5X1i.js","assets/vue-Bh6gtTXA.js","assets/element-DIJzmqAM.js","assets/index.vue_vue_type_script_setup_true_lang-BnkSlaRs.js","assets/index-BJZkTSGB.css","assets/el-button-DhOMi8yW.css","assets/_plugin-vue_export-helper-DlAUqK2U.js","assets/index-CpacnSYR.css","assets/index-CCCZ515V.js","assets/index-D7Q5rzrw.css","assets/403-fdJwuGFz.js","assets/Layout-11A4KN1N.js","assets/Layout-B1k1dW0M.css","assets/404-ClsLxIh2.js","assets/index-BEdhi7jC.js","assets/axios-BBfbe_YL.js","assets/index-D0cbbIXy.css","assets/upload-ByxSx_7t.js","assets/upload-DBWeHy1f.css"])))=>i.map(i=>d[i]);
var M=Object.defineProperty;var W=(e,t,u)=>t in e?M(e,t,{enumerable:!0,configurable:!0,writable:!0,value:u}):e[t]=u;var g=(e,t,u)=>W(e,typeof t!="symbol"?t+"":t,u);import{aj as C,r as f,w as j,b as A,t as H,I as G,u as $,a8 as Y,v as k,J,L as z,x as q,A as K,ak as Q,al as X,am as Z,an as ee}from"./vue-Bh6gtTXA.js";import{E as te,a as ue,b as oe}from"./element-DIJzmqAM.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))a(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function u(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(o){if(o.ep)return;o.ep=!0;const s=u(o);fetch(o.href,s)}})();const _="v3-admin-vite";class l{}g(l,"TOKEN",`${_}-token-key`),g(l,"CONFIG_LAYOUT",`${_}-config-layout-key`),g(l,"SIDEBAR_STATUS",`${_}-sidebar-status-key`),g(l,"ACTIVE_THEME_NAME",`${_}-active-theme-name-key`),g(l,"VISITED_VIEWS",`${_}-visited-views-key`),g(l,"CACHED_VIEWS",`${_}-cached-views-key`);function ne(){const e=localStorage.getItem(l.CONFIG_LAYOUT);return e?JSON.parse(e):null}function re(e){localStorage.setItem(l.CONFIG_LAYOUT,JSON.stringify(e))}function Ke(){localStorage.removeItem(l.CONFIG_LAYOUT)}function Qe(){return localStorage.getItem(l.SIDEBAR_STATUS)}function Xe(e){localStorage.setItem(l.SIDEBAR_STATUS,e)}function se(){return localStorage.getItem(l.ACTIVE_THEME_NAME)}function ae(e){localStorage.setItem(l.ACTIVE_THEME_NAME,e)}function ie(){const e=localStorage.getItem(l.VISITED_VIEWS);return JSON.parse(e??"[]")}function ce(e){e.forEach(t=>{delete t.matched,delete t.redirectedFrom}),localStorage.setItem(l.VISITED_VIEWS,JSON.stringify(e))}function le(){const e=localStorage.getItem(l.CACHED_VIEWS);return JSON.parse(e??"[]")}function de(e){localStorage.setItem(l.CACHED_VIEWS,JSON.stringify(e))}const me={layoutMode:"left",showSettings:!0,showTagsView:!0,fixedHeader:!0,showFooter:!0,showLogo:!0,showNotify:!1,showThemeSwitch:!0,showScreenfull:!0,showSearchMenu:!0,cacheTagsView:!1,showWatermark:!0,showGreyMode:!1,showColorWeakness:!1},Ee={...me,...ne()},T=C("settings",()=>{const e={};for(const[u,a]of Object.entries(Ee)){const o=f(a);e[u]=o,j(o,()=>{const s=t();re(s)})}const t=()=>{const u={};for(const[a,o]of Object.entries(e))u[a]=o.value;return u};return e}),fe="grey-mode",he="color-weakness",I=document.documentElement.classList;function pe(){const e=T();A(()=>{I.toggle(fe,e.showGreyMode),I.toggle(he,e.showColorWeakness)})}function ge(){return{initGreyAndColorWeakness:pe}}const x="normal",P=[{title:"默认",name:x},{title:"黑暗",name:"dark"},{title:"深蓝",name:"dark-blue"}],B=f(se()||x);function ve(e){B.value=e}function _e(e){document.documentElement.classList.add(e)}function Fe(e){const t=P.map(u=>u.name).filter(u=>u!==e);document.documentElement.classList.remove(...t)}function De(){A(()=>{const e=B.value;Fe(e),_e(e),ae(e)})}function Ce(){return{themeList:P,activeThemeName:B,initTheme:De,setTheme:ve}}var we={name:"zh-cn",el:{breadcrumb:{label:"面包屑"},colorpicker:{confirm:"确定",clear:"清空",defaultLabel:"颜色选择器",description:"当前颜色 {color}，按 Enter 键选择新颜色",alphaLabel:"选择透明度的值"},datepicker:{now:"此刻",today:"今天",cancel:"取消",clear:"清空",confirm:"确定",dateTablePrompt:"使用方向键与 Enter 键可选择日期",monthTablePrompt:"使用方向键与 Enter 键可选择月份",yearTablePrompt:"使用方向键与 Enter 键可选择年份",selectedDate:"已选日期",selectDate:"选择日期",selectTime:"选择时间",startDate:"开始日期",startTime:"开始时间",endDate:"结束日期",endTime:"结束时间",prevYear:"前一年",nextYear:"后一年",prevMonth:"上个月",nextMonth:"下个月",year:"年",month1:"1 月",month2:"2 月",month3:"3 月",month4:"4 月",month5:"5 月",month6:"6 月",month7:"7 月",month8:"8 月",month9:"9 月",month10:"10 月",month11:"11 月",month12:"12 月",weeks:{sun:"日",mon:"一",tue:"二",wed:"三",thu:"四",fri:"五",sat:"六"},weeksFull:{sun:"星期日",mon:"星期一",tue:"星期二",wed:"星期三",thu:"星期四",fri:"星期五",sat:"星期六"},months:{jan:"一月",feb:"二月",mar:"三月",apr:"四月",may:"五月",jun:"六月",jul:"七月",aug:"八月",sep:"九月",oct:"十月",nov:"十一月",dec:"十二月"}},inputNumber:{decrease:"减少数值",increase:"增加数值"},select:{loading:"加载中",noMatch:"无匹配数据",noData:"无数据",placeholder:"请选择"},dropdown:{toggleDropdown:"切换下拉选项"},mention:{loading:"加载中"},cascader:{noMatch:"无匹配数据",loading:"加载中",placeholder:"请选择",noData:"暂无数据"},pagination:{goto:"前往",pagesize:"条/页",total:"共 {total} 条",pageClassifier:"页",page:"页",prev:"上一页",next:"下一页",currentPage:"第 {pager} 页",prevPages:"向前 {pager} 页",nextPages:"向后 {pager} 页",deprecationWarning:"你使用了一些已被废弃的用法，请参考 el-pagination 的官方文档"},dialog:{close:"关闭此对话框"},drawer:{close:"关闭此对话框"},messagebox:{title:"提示",confirm:"确定",cancel:"取消",error:"输入的数据不合法!",close:"关闭此对话框"},upload:{deleteTip:"按 delete 键可删除",delete:"删除",preview:"查看图片",continue:"继续上传"},slider:{defaultLabel:"滑块介于 {min} 至 {max}",defaultRangeStartLabel:"选择起始值",defaultRangeEndLabel:"选择结束值"},table:{emptyText:"暂无数据",confirmFilter:"筛选",resetFilter:"重置",clearFilter:"全部",sumText:"合计"},tour:{next:"下一步",previous:"上一步",finish:"结束导览"},tree:{emptyText:"暂无数据"},transfer:{noMatch:"无匹配数据",noData:"无数据",titles:["列表 1","列表 2"],filterPlaceholder:"请输入搜索内容",noCheckedFormat:"共 {total} 项",hasCheckedFormat:"已选 {checked}/{total} 项"},image:{error:"加载失败"},pageHeader:{title:"返回"},popconfirm:{confirmButtonText:"确定",cancelButtonText:"取消"},carousel:{leftArrow:"上一张幻灯片",rightArrow:"下一张幻灯片",indicator:"幻灯片切换至索引 {index}"}}};const Ae=H({__name:"App",setup(e){const{initTheme:t}=Ce(),{initGreyAndColorWeakness:u}=ge();return t(),u(),(a,o)=>{const s=Y("router-view"),n=te;return k(),G(n,{locale:$(we)},{default:J(()=>[z(s)]),_:1},8,["locale"])}}}),Te={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",style:{width:"1em",height:"1em",fill:"currentColor"}},Be=["xlink:href"];function Se(e,t){return k(),q("svg",Te,[K("use",{"xlink:href":"#"+e.name},null,8,Be)])}const Ve={name:"SvgIcon",props:{name:{type:String,required:!0}},render:Se};function ye(e){for(const[t,u]of Object.entries(ue))e.component(t,u)}const Ie={mounted(e,t){}};function Oe(e){e.directive("permission",Ie)}function Le(e){ye(e),Oe(e),e.component("SvgIcon",Ve)}const Re="modulepreload",ke=function(e){return"/"+e},O={},m=function(t,u,a){let o=Promise.resolve();if(u&&u.length>0){document.getElementsByTagName("link");const n=document.querySelector("meta[property=csp-nonce]"),c=(n==null?void 0:n.nonce)||(n==null?void 0:n.getAttribute("nonce"));o=Promise.allSettled(u.map(d=>{if(d=ke(d),d in O)return;O[d]=!0;const E=d.endsWith(".css"),h=E?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${d}"]${h}`))return;const r=document.createElement("link");if(r.rel=E?"stylesheet":Re,E||(r.as="script"),r.crossOrigin="",r.href=d,c&&r.setAttribute("nonce",c),document.head.appendChild(r),E)return new Promise((i,p)=>{r.addEventListener("load",i),r.addEventListener("error",()=>p(new Error(`Unable to preload CSS for ${d}`)))})}))}function s(n){const c=new Event("vite:preloadError",{cancelable:!0});if(c.payload=n,window.dispatchEvent(c),!c.defaultPrevented)throw n}return o.then(n=>{for(const c of n||[])c.status==="rejected"&&s(c.reason);return t().catch(s)})},xe="/v3-admin-vite/",S={history:Q(xe),dynamic:!0,defaultRoles:["DEFAULT_ROLE"],thirdLevelRouteCache:!1},Pe=["/login"],be=[];function Ne(e){return Pe.includes(e.path)||be.includes(e.name)}/*! js-cookie v3.0.5 | MIT */function F(e){for(var t=1;t<arguments.length;t++){var u=arguments[t];for(var a in u)e[a]=u[a]}return e}var Ue={read:function(e){return e[0]==='"'&&(e=e.slice(1,-1)),e.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent)},write:function(e){return encodeURIComponent(e).replace(/%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,decodeURIComponent)}};function w(e,t){function u(o,s,n){if(!(typeof document>"u")){n=F({},t,n),typeof n.expires=="number"&&(n.expires=new Date(Date.now()+n.expires*864e5)),n.expires&&(n.expires=n.expires.toUTCString()),o=encodeURIComponent(o).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape);var c="";for(var d in n)n[d]&&(c+="; "+d,n[d]!==!0&&(c+="="+n[d].split(";")[0]));return document.cookie=o+"="+e.write(s,o)+c}}function a(o){if(!(typeof document>"u"||arguments.length&&!o)){for(var s=document.cookie?document.cookie.split("; "):[],n={},c=0;c<s.length;c++){var d=s[c].split("="),E=d.slice(1).join("=");try{var h=decodeURIComponent(d[0]);if(n[h]=e.read(E,h),o===h)break}catch{}}return o?n[o]:n}}return Object.create({set:u,get:a,remove:function(o,s){u(o,"",F({},s,{expires:-1}))},withAttributes:function(o){return w(this.converter,F({},this.attributes,o))},withConverter:function(o){return w(F({},this.converter,o),this.attributes)}},{attributes:{value:Object.freeze(t)},converter:{value:Object.freeze(e)}})}var V=w(Ue,{path:"/"});function b(){return V.get(l.TOKEN)}function L(e){V.set(l.TOKEN,e)}function R(){V.remove(l.TOKEN)}function Me(e,t){var a;const u=(a=t.meta)==null?void 0:a.roles;return u?e.some(o=>u.includes(o)):!0}function N(e,t){const u=[];return e.forEach(a=>{const o={...a};Me(t,o)&&(o.children&&(o.children=N(o.children,t)),u.push(o))}),u}const We=C("permission",()=>{const e=f([]),t=f([]),u=s=>{const n=N([],s);o(n)},a=()=>{o([])},o=s=>{e.value=U.concat(s),t.value=s};return{routes:e,addRoutes:t,setRoutes:u,setAllRoutes:a}}),je=C("tags-view",()=>{const{cacheTagsView:e}=T(),t=f(e?ie():[]),u=f(e?le():[]);return A(()=>{ce(t.value),de(u.value)}),{visitedViews:t,cachedViews:u,addVisitedView:r=>{const i=t.value.findIndex(p=>p.path===r.path);i!==-1?t.value[i].fullPath!==r.fullPath&&(t.value[i]={...r}):t.value.push({...r})},addCachedView:r=>{var i;typeof r.name=="string"&&(u.value.includes(r.name)||(i=r.meta)!=null&&i.keepAlive&&u.value.push(r.name))},delVisitedView:r=>{const i=t.value.findIndex(p=>p.path===r.path);i!==-1&&t.value.splice(i,1)},delCachedView:r=>{if(typeof r.name!="string")return;const i=u.value.indexOf(r.name);i!==-1&&u.value.splice(i,1)},delOthersVisitedViews:r=>{t.value=t.value.filter(i=>{var p;return((p=i.meta)==null?void 0:p.affix)||i.path===r.path})},delOthersCachedViews:r=>{if(typeof r.name!="string")return;const i=u.value.indexOf(r.name);i!==-1?u.value=u.value.slice(i,i+1):u.value=[]},delAllVisitedViews:()=>{t.value=t.value.filter(r=>{var i;return(i=r.meta)==null?void 0:i.affix})},delAllCachedViews:()=>{u.value=[]}}}),He=C("user",()=>{const e=f(b()||""),t=f([]),u=f(""),a=je(),o=T(),s=async r=>{L(r),e.value=r},n=async()=>{t.value=S.defaultRoles},c=async r=>{const i=`token-${r}`;e.value=i,L(i),location.reload()},d=()=>{R(),e.value="",t.value=[],$e(),h()},E=()=>{R(),e.value="",t.value=[]},h=()=>{o.cacheTagsView||(a.delAllVisitedViews(),a.delAllCachedViews())};return{token:e,roles:t,username:u,setToken:s,getInfo:n,changeRoles:c,logout:d,resetToken:E}}),D=()=>m(()=>import("./index-BEkT5X1i.js"),__vite__mapDeps([0,1,2,3,4,5,6,7])),Ge=[{path:"/",component:D,children:[{path:":path(.*)",component:()=>m(()=>import("./index-CCCZ515V.js"),__vite__mapDeps([8,1,6,2,9]))}]},{path:"/redirect",meta:{hidden:!0},children:[{path:":path(.*)",component:()=>m(()=>import("./403-fdJwuGFz.js"),__vite__mapDeps([10,11,6,2,1,12,5]))}]},{path:"/403",component:()=>m(()=>import("./403-fdJwuGFz.js"),__vite__mapDeps([10,11,6,2,1,12,5])),meta:{hidden:!0}},{path:"/404",component:()=>m(()=>import("./404-ClsLxIh2.js"),__vite__mapDeps([13,11,6,2,1,12,5])),meta:{hidden:!0},alias:"/:pathMatch(.*)*"},{path:"/login",component:()=>m(()=>import("./index-BEdhi7jC.js"),__vite__mapDeps([14,3,2,1,4,5,15,6,16])),meta:{hidden:!0}}],U=[{path:"/",component:D,children:[{path:"Home",component:()=>m(()=>import("./index-CCCZ515V.js"),__vite__mapDeps([8,1,6,2,9])),name:"Dashboard",meta:{title:"首页",svgIcon:"dashboard",affix:!0}}]},{path:"/user",component:D,name:"Demo",redirect:"/",meta:{title:"用户管理",elIcon:"DataBoard"},children:[{path:"list",name:"list",meta:{title:"用户列表",icon:"dashboard",roles:["admin","editor"]},component:()=>m(()=>import("./403-fdJwuGFz.js"),__vite__mapDeps([10,11,6,2,1,12,5]))},{path:"error",name:"error",meta:{title:"999",icon:"dashboard",roles:["admin","editor"]},component:()=>m(()=>import("./404-ClsLxIh2.js"),__vite__mapDeps([13,11,6,2,1,12,5]))}]},{path:"/file",component:D,name:"File",redirect:"/file",meta:{title:"文件管理",elIcon:"DataBoard"},children:[{path:"upload",name:"upload",meta:{title:"文件上传"},component:()=>m(()=>import("./upload-ByxSx_7t.js"),__vite__mapDeps([17,15,2,1,18]))},{path:"view",name:"view",meta:{title:"文件查询"},component:()=>m(()=>import("./upload-ByxSx_7t.js"),__vite__mapDeps([17,15,2,1,18]))}]}],v=X({history:S.history,routes:[...Ge,...U]});function $e(){try{v.getRoutes().forEach(e=>{var a;const{name:t,meta:u}=e;t&&((a=u.roles)!=null&&a.length)&&v.hasRoute(t)&&v.removeRoute(t)})}catch{location.reload()}}v.beforeEach(async(e,t)=>{const u=He(),a=We();if(!b())return Ne(e)?!0:"/login";if(e.path==="/login")return"/";if(u.roles.length!==0)return!0;try{await u.getInfo();const o=u.roles;return S.dynamic?a.setRoutes(o):a.setAllRoutes(),a.addRoutes.forEach(s=>v.addRoute(s)),{...e,replace:!0}}catch(o){return u.resetToken(),oe.error(o.message||"路由守卫发生错误"),"/login"}});typeof window.global>"u"&&(window.global=window);const y=Z(Ae);Le(y);const Ye=ee();y.use(Ye).use(v);v.isReady().then(()=>{y.mount("#app")});export{je as a,We as b,He as c,Ce as d,b as e,Qe as g,Ke as r,Xe as s,T as u};
