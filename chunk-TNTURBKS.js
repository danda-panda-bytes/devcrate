import{Ea as g}from"./chunk-JKJ6TUEI.js";import{N as u,U as h,V as d,g as s,l as r,p as o}from"./chunk-QC23KHUZ.js";import{h as a}from"./chunk-OKNOHCUX.js";var l=class extends g{data$=new s([]);count$=new s(0);initialized=!1;loading=new s(!1);itemLoading=new s(!1);get actualDataLength(){return this.data$.value.filter(t=>!!t).length}allowLocalFilter=!1;filter=new s("");filteredData$;constructor(){super(),this.initializeFiltering()}connect(t){return this.filteredData$.pipe(d(this.destroy$))}disconnect(t){this.onDestroy(),this.data$.complete(),this.itemLoading.complete(),this.loading.complete()}initializeFiltering(){let t=this.filter.pipe(u(this.data$),h(()=>r({data:this.data$.value,filterValue:this.filter.value})));this.filteredData$=t.pipe(h(({data:e,filterValue:i})=>!i||!this.allowLocalFilter?r(e):r(e.filter(n=>n&&this.filterPredicate(n,i)))))}initialize(){return a(this,null,function*(){this.initialized=!0;try{this.loading.next(!0),yield this.initializeData()}finally{this.loading.next(!1)}})}reset(){this.data$.next([]),this.count$.next(0)}propToString(t,e){return e==null?"":e.toString()}filterPredicate(t,e){let i=Object.keys(t).reduce((m,c)=>{let D=t[c];return m+this.propToString(c,D)+"\u25EC"},"").toLowerCase(),n=e.trim().toLowerCase();return i.indexOf(n)!=-1}retrieveFinalData(t){return a(this,null,function*(){let e=yield this.retrieveDataItems(t);return yield this.transformDataItems(e)})}initializeData(){return a(this,null,function*(){let t=yield this.retrieveFinalData();return this.data$.next(t.results),this.count$.next(t.count||t.results.length),t})}transformDataItems(t){return a(this,null,function*(){return t})}refresh(){return a(this,null,function*(){this.loading.next(!0);let t=yield this.initializeData();return this.loading.next(!1),t})}},f=class extends l{httpClient;params={};constructor(t){super(),this.httpClient=t}getParams(t){return t}getCount(t){let e=t.headers.get("X-Total-Count");return e==="null"?null:parseInt(e||"0",10)}getResults(t){return t.body}retrieveDataItems(t=null){return a(this,null,function*(){let e=yield o(this.httpClient.get(this.relativePath,{params:this.getParams(t||this.params),observe:"response"}));return{count:this.getCount(e),results:this.getResults(e)}})}},z=1e3,C=25;export{l as a,f as b,z as c,C as d};
//# sourceMappingURL=chunk-TNTURBKS.js.map
