import{b as Mt,c as kt,e as Tt}from"./chunk-2A4BLQGD.js";import{a as At}from"./chunk-TNTURBKS.js";import{d as Je,e as et,g as tt,i as it,k as ut,l as gt,m as ft}from"./chunk-CN2HMJJO.js";import{a as Dt}from"./chunk-FFTGTAAJ.js";import{A as Xe,C as Ue,G as Ze,Ga as Ot,H as nt,I as ue,Ia as It,J as at,K as ot,O as rt,R as lt,S as st,T as dt,U as ct,V as pt,W as ge,Z as ht,da as mt,ia as _t,la as yt,ma as ee,na as vt,pa as Ct,r as he,ra as fe,sa as _e,ta as ye,ua as wt,x as Ye,y as me}from"./chunk-JKJ6TUEI.js";import{A as te,B as bt,C as ie,D as xt,E as St,k as J,m as qe,n as Ke,p as je,x as ve,y as Ce}from"./chunk-FMHBEDGH.js";import{$ as G,A as ae,Ab as c,Ba as Ae,Ca as b,Da as N,Dc as Qe,G as Oe,Hb as Y,Hc as S,I as Ie,Ib as h,Ic as pe,Jb as A,Kb as E,Mb as Fe,Nb as f,Pb as Le,Qb as Ne,Rb as p,Sb as m,T as oe,Tb as B,U as re,Ub as Ve,V as y,Vb as ze,Wb as x,Xb as P,_b as w,ac as s,ba as Q,bc as Be,cc as le,db as Ee,ea as l,eb as d,ec as X,f as L,fc as U,g as $,gc as M,hc as k,ib as V,ic as T,kc as He,lb as z,lc as H,ma as Me,mc as R,na as v,nc as se,oa as C,ob as O,p as Se,pa as ke,pb as Pe,q as ne,qc as de,sc as Z,tb as K,tc as ce,ua as Te,ub as j,v as De,vb as I,vc as $e,wc as We,xc as u,ya as q,yc as g,z as W,zb as Re,zc as Ge}from"./chunk-QC23KHUZ.js";import{h as D}from"./chunk-OKNOHCUX.js";var jt=["trigger"],Yt=["panel"],Xt=[[["mat-select-trigger"]],"*"],Ut=["mat-select-trigger","*"];function Zt(n,o){if(n&1&&(p(0,"span",4),R(1),m()),n&2){let e=s();d(),se(e.placeholder)}}function Jt(n,o){n&1&&le(0)}function ei(n,o){if(n&1&&(p(0,"span",11),R(1),m()),n&2){let e=s(2);d(),se(e.triggerValue)}}function ti(n,o){if(n&1&&(p(0,"span",5),c(1,Jt,1,0)(2,ei,2,1,"span",11),m()),n&2){let e=s();d(),f(e.customTrigger?1:2)}}function ii(n,o){if(n&1){let e=P();p(0,"div",12,1),w("@transformPanel.done",function(i){v(e);let a=s();return C(a._panelDoneAnimatingStream.next(i.toState))})("keydown",function(i){v(e);let a=s();return C(a._handleKeydown(i))}),le(2,1),m()}if(n&2){let e=s();Fe("mat-mdc-select-panel mdc-menu-surface mdc-menu-surface--open ",e._getPanelTheme(),""),h("ngClass",e.panelClass)("@transformPanel","showing"),Y("id",e.id+"-panel")("aria-multiselectable",e.multiple)("aria-label",e.ariaLabel||null)("aria-labelledby",e._getPanelAriaLabelledby())}}var ni={transformPanelWrap:ve("transformPanelWrap",[ie("* => void",St("@transformPanel",[xt()],{optional:!0}))]),transformPanel:ve("transformPanel",[bt("void",te({opacity:0,transform:"scale(1, 0.8)"})),ie("void => showing",Ce("120ms cubic-bezier(0, 0, 0.2, 1)",te({opacity:1,transform:"scale(1, 1)"}))),ie("* => void",Ce("100ms linear",te({opacity:0})))])};var Lt=new Q("mat-select-scroll-strategy",{providedIn:"root",factory:()=>{let n=l(fe);return()=>n.scrollStrategies.reposition()}});function ai(n){return()=>n.scrollStrategies.reposition()}var oi=new Q("MAT_SELECT_CONFIG"),ri={provide:Lt,deps:[fe],useFactory:ai},Nt=new Q("MatSelectTrigger"),we=class{source;value;constructor(o,e){this.source=o,this.value=e}},nn=(()=>{class n{_viewportRuler=l(yt);_changeDetectorRef=l(Qe);_elementRef=l(N);_dir=l(nt,{optional:!0});_idGenerator=l(Ze);_parentFormField=l(kt,{optional:!0});ngControl=l(et,{self:!0,optional:!0});_liveAnnouncer=l(Ue);_defaultOptions=l(oi,{optional:!0});_initialized=new L;options;optionGroups;customTrigger;_positions=[{originX:"start",originY:"bottom",overlayX:"start",overlayY:"top"},{originX:"end",originY:"bottom",overlayX:"end",overlayY:"top"},{originX:"start",originY:"top",overlayX:"start",overlayY:"bottom",panelClass:"mat-mdc-select-panel-above"},{originX:"end",originY:"top",overlayX:"end",overlayY:"bottom",panelClass:"mat-mdc-select-panel-above"}];_scrollOptionIntoView(e){let t=this.options.toArray()[e];if(t){let i=this.panel.nativeElement,a=ct(e,this.options,this.optionGroups),r=t._getHostElement();e===0&&a===1?i.scrollTop=0:i.scrollTop=pt(r.offsetTop,r.offsetHeight,i.scrollTop,i.offsetHeight)}}_positioningSettled(){this._scrollOptionIntoView(this._keyManager.activeItemIndex||0)}_getChangeEvent(e){return new we(this,e)}_scrollStrategyFactory=l(Lt);_panelOpen=!1;_compareWith=(e,t)=>e===t;_uid=this._idGenerator.getId("mat-select-");_triggerAriaLabelledBy=null;_previousControl;_destroy=new L;_errorStateTracker;stateChanges=new L;disableAutomaticLabeling=!0;userAriaDescribedBy;_selectionModel;_keyManager;_preferredOverlayOrigin;_overlayWidth;_onChange=()=>{};_onTouched=()=>{};_valueId=this._idGenerator.getId("mat-select-value-");_panelDoneAnimatingStream=new L;_scrollStrategy;_overlayPanelClass=this._defaultOptions?.overlayPanelClass||"";get focused(){return this._focused||this._panelOpen}_focused=!1;controlType="mat-select";trigger;panel;_overlayDir;panelClass;disabled=!1;disableRipple=!1;tabIndex=0;get hideSingleSelectionIndicator(){return this._hideSingleSelectionIndicator}set hideSingleSelectionIndicator(e){this._hideSingleSelectionIndicator=e,this._syncParentProperties()}_hideSingleSelectionIndicator=this._defaultOptions?.hideSingleSelectionIndicator??!1;get placeholder(){return this._placeholder}set placeholder(e){this._placeholder=e,this.stateChanges.next()}_placeholder;get required(){return this._required??this.ngControl?.control?.hasValidator(Je.required)??!1}set required(e){this._required=e,this.stateChanges.next()}_required;get multiple(){return this._multiple}set multiple(e){this._selectionModel,this._multiple=e}_multiple=!1;disableOptionCentering=this._defaultOptions?.disableOptionCentering??!1;get compareWith(){return this._compareWith}set compareWith(e){this._compareWith=e,this._selectionModel&&this._initializeSelection()}get value(){return this._value}set value(e){this._assignValue(e)&&this._onChange(e)}_value;ariaLabel="";ariaLabelledby;get errorStateMatcher(){return this._errorStateTracker.matcher}set errorStateMatcher(e){this._errorStateTracker.matcher=e}typeaheadDebounceInterval;sortComparator;get id(){return this._id}set id(e){this._id=e||this._uid,this.stateChanges.next()}_id;get errorState(){return this._errorStateTracker.errorState}set errorState(e){this._errorStateTracker.errorState=e}panelWidth=this._defaultOptions&&typeof this._defaultOptions.panelWidth<"u"?this._defaultOptions.panelWidth:"auto";canSelectNullableOptions=this._defaultOptions?.canSelectNullableOptions??!1;optionSelectionChanges=De(()=>{let e=this.options;return e?e.changes.pipe(oe(e),re(()=>W(...e.map(t=>t.onSelectionChange)))):this._initialized.pipe(re(()=>this.optionSelectionChanges))});openedChange=new q;_openedStream=this.openedChange.pipe(ae(e=>e),ne(()=>{}));_closedStream=this.openedChange.pipe(ae(e=>!e),ne(()=>{}));selectionChange=new q;valueChange=new q;constructor(){let e=l(ot),t=l(tt,{optional:!0}),i=l(it,{optional:!0}),a=l(new Te("tabindex"),{optional:!0});this.ngControl&&(this.ngControl.valueAccessor=this),this._defaultOptions?.typeaheadDebounceInterval!=null&&(this.typeaheadDebounceInterval=this._defaultOptions.typeaheadDebounceInterval),this._errorStateTracker=new at(e,this.ngControl,i,t,this.stateChanges),this._scrollStrategy=this._scrollStrategyFactory(),this.tabIndex=a==null?0:parseInt(a)||0,this.id=this.id}ngOnInit(){this._selectionModel=new mt(this.multiple),this.stateChanges.next(),this._panelDoneAnimatingStream.pipe(Ie(),y(this._destroy)).subscribe(()=>this._panelDoneAnimating(this.panelOpen)),this._viewportRuler.change().pipe(y(this._destroy)).subscribe(()=>{this.panelOpen&&(this._overlayWidth=this._getOverlayWidth(this._preferredOverlayOrigin),this._changeDetectorRef.detectChanges())})}ngAfterContentInit(){this._initialized.next(),this._initialized.complete(),this._initKeyManager(),this._selectionModel.changed.pipe(y(this._destroy)).subscribe(e=>{e.added.forEach(t=>t.select()),e.removed.forEach(t=>t.deselect())}),this.options.changes.pipe(oe(null),y(this._destroy)).subscribe(()=>{this._resetOptions(),this._initializeSelection()})}ngDoCheck(){let e=this._getTriggerAriaLabelledby(),t=this.ngControl;if(e!==this._triggerAriaLabelledBy){let i=this._elementRef.nativeElement;this._triggerAriaLabelledBy=e,e?i.setAttribute("aria-labelledby",e):i.removeAttribute("aria-labelledby")}t&&(this._previousControl!==t.control&&(this._previousControl!==void 0&&t.disabled!==null&&t.disabled!==this.disabled&&(this.disabled=t.disabled),this._previousControl=t.control),this.updateErrorState())}ngOnChanges(e){(e.disabled||e.userAriaDescribedBy)&&this.stateChanges.next(),e.typeaheadDebounceInterval&&this._keyManager&&this._keyManager.withTypeAhead(this.typeaheadDebounceInterval)}ngOnDestroy(){this._keyManager?.destroy(),this._destroy.next(),this._destroy.complete(),this.stateChanges.complete(),this._clearFromModal()}toggle(){this.panelOpen?this.close():this.open()}open(){this._canOpen()&&(this._parentFormField&&(this._preferredOverlayOrigin=this._parentFormField.getConnectedOverlayOrigin()),this._overlayWidth=this._getOverlayWidth(this._preferredOverlayOrigin),this._applyModalPanelOwnership(),this._panelOpen=!0,this._keyManager.withHorizontalOrientation(null),this._highlightCorrectOption(),this._changeDetectorRef.markForCheck(),this.stateChanges.next())}_trackedModal=null;_applyModalPanelOwnership(){let e=this._elementRef.nativeElement.closest('body > .cdk-overlay-container [aria-modal="true"]');if(!e)return;let t=`${this.id}-panel`;this._trackedModal&&me(this._trackedModal,"aria-owns",t),Ye(e,"aria-owns",t),this._trackedModal=e}_clearFromModal(){if(!this._trackedModal)return;let e=`${this.id}-panel`;me(this._trackedModal,"aria-owns",e),this._trackedModal=null}close(){this._panelOpen&&(this._panelOpen=!1,this._keyManager.withHorizontalOrientation(this._isRtl()?"rtl":"ltr"),this._changeDetectorRef.markForCheck(),this._onTouched(),this.stateChanges.next())}writeValue(e){this._assignValue(e)}registerOnChange(e){this._onChange=e}registerOnTouched(e){this._onTouched=e}setDisabledState(e){this.disabled=e,this._changeDetectorRef.markForCheck(),this.stateChanges.next()}get panelOpen(){return this._panelOpen}get selected(){return this.multiple?this._selectionModel?.selected||[]:this._selectionModel?.selected[0]}get triggerValue(){if(this.empty)return"";if(this._multiple){let e=this._selectionModel.selected.map(t=>t.viewValue);return this._isRtl()&&e.reverse(),e.join(", ")}return this._selectionModel.selected[0].viewValue}updateErrorState(){this._errorStateTracker.updateErrorState()}_isRtl(){return this._dir?this._dir.value==="rtl":!1}_handleKeydown(e){this.disabled||(this.panelOpen?this._handleOpenKeydown(e):this._handleClosedKeydown(e))}_handleClosedKeydown(e){let t=e.keyCode,i=t===40||t===38||t===37||t===39,a=t===13||t===32,r=this._keyManager;if(!r.isTyping()&&a&&!he(e)||(this.multiple||e.altKey)&&i)e.preventDefault(),this.open();else if(!this.multiple){let F=this.selected;r.onKeydown(e);let _=this.selected;_&&F!==_&&this._liveAnnouncer.announce(_.viewValue,1e4)}}_handleOpenKeydown(e){let t=this._keyManager,i=e.keyCode,a=i===40||i===38,r=t.isTyping();if(a&&e.altKey)e.preventDefault(),this.close();else if(!r&&(i===13||i===32)&&t.activeItem&&!he(e))e.preventDefault(),t.activeItem._selectViaInteraction();else if(!r&&this._multiple&&i===65&&e.ctrlKey){e.preventDefault();let F=this.options.some(_=>!_.disabled&&!_.selected);this.options.forEach(_=>{_.disabled||(F?_.select():_.deselect())})}else{let F=t.activeItemIndex;t.onKeydown(e),this._multiple&&a&&e.shiftKey&&t.activeItem&&t.activeItemIndex!==F&&t.activeItem._selectViaInteraction()}}_onFocus(){this.disabled||(this._focused=!0,this.stateChanges.next())}_onBlur(){this._focused=!1,this._keyManager?.cancelTypeahead(),!this.disabled&&!this.panelOpen&&(this._onTouched(),this._changeDetectorRef.markForCheck(),this.stateChanges.next())}_onAttached(){this._overlayDir.positionChange.pipe(Oe(1)).subscribe(()=>{this._changeDetectorRef.detectChanges(),this._positioningSettled()})}_getPanelTheme(){return this._parentFormField?`mat-${this._parentFormField.color}`:""}get empty(){return!this._selectionModel||this._selectionModel.isEmpty()}_initializeSelection(){Promise.resolve().then(()=>{this.ngControl&&(this._value=this.ngControl.value),this._setSelectionByValue(this._value),this.stateChanges.next()})}_setSelectionByValue(e){if(this.options.forEach(t=>t.setInactiveStyles()),this._selectionModel.clear(),this.multiple&&e)Array.isArray(e),e.forEach(t=>this._selectOptionByValue(t)),this._sortValues();else{let t=this._selectOptionByValue(e);t?this._keyManager.updateActiveItem(t):this.panelOpen||this._keyManager.updateActiveItem(-1)}this._changeDetectorRef.markForCheck()}_selectOptionByValue(e){let t=this.options.find(i=>{if(this._selectionModel.isSelected(i))return!1;try{return(i.value!=null||this.canSelectNullableOptions)&&this._compareWith(i.value,e)}catch{return!1}});return t&&this._selectionModel.select(t),t}_assignValue(e){return e!==this._value||this._multiple&&Array.isArray(e)?(this.options&&this._setSelectionByValue(e),this._value=e,!0):!1}_skipPredicate=e=>this.panelOpen?!1:e.disabled;_getOverlayWidth(e){return this.panelWidth==="auto"?(e instanceof _e?e.elementRef:e||this._elementRef).nativeElement.getBoundingClientRect().width:this.panelWidth===null?"":this.panelWidth}_syncParentProperties(){if(this.options)for(let e of this.options)e._changeDetectorRef.markForCheck()}_initKeyManager(){this._keyManager=new Xe(this.options).withTypeAhead(this.typeaheadDebounceInterval).withVerticalOrientation().withHorizontalOrientation(this._isRtl()?"rtl":"ltr").withHomeAndEnd().withPageUpDown().withAllowedModifierKeys(["shiftKey"]).skipPredicate(this._skipPredicate),this._keyManager.tabOut.subscribe(()=>{this.panelOpen&&(!this.multiple&&this._keyManager.activeItem&&this._keyManager.activeItem._selectViaInteraction(),this.focus(),this.close())}),this._keyManager.change.subscribe(()=>{this._panelOpen&&this.panel?this._scrollOptionIntoView(this._keyManager.activeItemIndex||0):!this._panelOpen&&!this.multiple&&this._keyManager.activeItem&&this._keyManager.activeItem._selectViaInteraction()})}_resetOptions(){let e=W(this.options.changes,this._destroy);this.optionSelectionChanges.pipe(y(e)).subscribe(t=>{this._onSelect(t.source,t.isUserInput),t.isUserInput&&!this.multiple&&this._panelOpen&&(this.close(),this.focus())}),W(...this.options.map(t=>t._stateChanges)).pipe(y(e)).subscribe(()=>{this._changeDetectorRef.detectChanges(),this.stateChanges.next()})}_onSelect(e,t){let i=this._selectionModel.isSelected(e);!this.canSelectNullableOptions&&e.value==null&&!this._multiple?(e.deselect(),this._selectionModel.clear(),this.value!=null&&this._propagateChanges(e.value)):(i!==e.selected&&(e.selected?this._selectionModel.select(e):this._selectionModel.deselect(e)),t&&this._keyManager.setActiveItem(e),this.multiple&&(this._sortValues(),t&&this.focus())),i!==this._selectionModel.isSelected(e)&&this._propagateChanges(),this.stateChanges.next()}_sortValues(){if(this.multiple){let e=this.options.toArray();this._selectionModel.sort((t,i)=>this.sortComparator?this.sortComparator(t,i,e):e.indexOf(t)-e.indexOf(i)),this.stateChanges.next()}}_propagateChanges(e){let t;this.multiple?t=this.selected.map(i=>i.value):t=this.selected?this.selected.value:e,this._value=t,this.valueChange.emit(t),this._onChange(t),this.selectionChange.emit(this._getChangeEvent(t)),this._changeDetectorRef.markForCheck()}_highlightCorrectOption(){if(this._keyManager)if(this.empty){let e=-1;for(let t=0;t<this.options.length;t++)if(!this.options.get(t).disabled){e=t;break}this._keyManager.setActiveItem(e)}else this._keyManager.setActiveItem(this._selectionModel.selected[0])}_canOpen(){return!this._panelOpen&&!this.disabled&&this.options?.length>0}focus(e){this._elementRef.nativeElement.focus(e)}_getPanelAriaLabelledby(){if(this.ariaLabel)return null;let e=this._parentFormField?.getLabelId()||null,t=e?e+" ":"";return this.ariaLabelledby?t+this.ariaLabelledby:e}_getAriaActiveDescendant(){return this.panelOpen&&this._keyManager&&this._keyManager.activeItem?this._keyManager.activeItem.id:null}_getTriggerAriaLabelledby(){if(this.ariaLabel)return null;let e=this._parentFormField?.getLabelId(),t=(e?e+" ":"")+this._valueId;return this.ariaLabelledby&&(t+=" "+this.ariaLabelledby),t}_panelDoneAnimating(e){this.openedChange.emit(e)}setDescribedByIds(e){e.length?this._elementRef.nativeElement.setAttribute("aria-describedby",e.join(" ")):this._elementRef.nativeElement.removeAttribute("aria-describedby")}onContainerClick(){this.focus(),this.open()}get shouldLabelFloat(){return this.panelOpen||!this.empty||this.focused&&!!this.placeholder}static \u0275fac=function(t){return new(t||n)};static \u0275cmp=K({type:n,selectors:[["mat-select"]],contentQueries:function(t,i,a){if(t&1&&(X(a,Nt,5),X(a,dt,5),X(a,st,5)),t&2){let r;M(r=k())&&(i.customTrigger=r.first),M(r=k())&&(i.options=r),M(r=k())&&(i.optionGroups=r)}},viewQuery:function(t,i){if(t&1&&(U(jt,5),U(Yt,5),U(ye,5)),t&2){let a;M(a=k())&&(i.trigger=a.first),M(a=k())&&(i.panel=a.first),M(a=k())&&(i._overlayDir=a.first)}},hostAttrs:["role","combobox","aria-haspopup","listbox",1,"mat-mdc-select"],hostVars:19,hostBindings:function(t,i){t&1&&w("keydown",function(r){return i._handleKeydown(r)})("focus",function(){return i._onFocus()})("blur",function(){return i._onBlur()}),t&2&&(Y("id",i.id)("tabindex",i.disabled?-1:i.tabIndex)("aria-controls",i.panelOpen?i.id+"-panel":null)("aria-expanded",i.panelOpen)("aria-label",i.ariaLabel||null)("aria-required",i.required.toString())("aria-disabled",i.disabled.toString())("aria-invalid",i.errorState)("aria-activedescendant",i._getAriaActiveDescendant()),E("mat-mdc-select-disabled",i.disabled)("mat-mdc-select-invalid",i.errorState)("mat-mdc-select-required",i.required)("mat-mdc-select-empty",i.empty)("mat-mdc-select-multiple",i.multiple))},inputs:{userAriaDescribedBy:[0,"aria-describedby","userAriaDescribedBy"],panelClass:"panelClass",disabled:[2,"disabled","disabled",S],disableRipple:[2,"disableRipple","disableRipple",S],tabIndex:[2,"tabIndex","tabIndex",e=>e==null?0:pe(e)],hideSingleSelectionIndicator:[2,"hideSingleSelectionIndicator","hideSingleSelectionIndicator",S],placeholder:"placeholder",required:[2,"required","required",S],multiple:[2,"multiple","multiple",S],disableOptionCentering:[2,"disableOptionCentering","disableOptionCentering",S],compareWith:"compareWith",value:"value",ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],errorStateMatcher:"errorStateMatcher",typeaheadDebounceInterval:[2,"typeaheadDebounceInterval","typeaheadDebounceInterval",pe],sortComparator:"sortComparator",id:"id",panelWidth:"panelWidth",canSelectNullableOptions:[2,"canSelectNullableOptions","canSelectNullableOptions",S]},outputs:{openedChange:"openedChange",_openedStream:"opened",_closedStream:"closed",selectionChange:"selectionChange",valueChange:"valueChange"},exportAs:["matSelect"],features:[de([{provide:Mt,useExisting:n},{provide:lt,useExisting:n}]),Re,Me],ngContentSelectors:Ut,decls:11,vars:8,consts:[["fallbackOverlayOrigin","cdkOverlayOrigin","trigger",""],["panel",""],["cdk-overlay-origin","",1,"mat-mdc-select-trigger",3,"click"],[1,"mat-mdc-select-value"],[1,"mat-mdc-select-placeholder","mat-mdc-select-min-line"],[1,"mat-mdc-select-value-text"],[1,"mat-mdc-select-arrow-wrapper"],[1,"mat-mdc-select-arrow"],["viewBox","0 0 24 24","width","24px","height","24px","focusable","false","aria-hidden","true"],["d","M7 10l5 5 5-5z"],["cdk-connected-overlay","","cdkConnectedOverlayLockPosition","","cdkConnectedOverlayHasBackdrop","","cdkConnectedOverlayBackdropClass","cdk-overlay-transparent-backdrop",3,"backdropClick","attach","detach","cdkConnectedOverlayPanelClass","cdkConnectedOverlayScrollStrategy","cdkConnectedOverlayOrigin","cdkConnectedOverlayOpen","cdkConnectedOverlayPositions","cdkConnectedOverlayWidth"],[1,"mat-mdc-select-min-line"],["role","listbox","tabindex","-1",3,"keydown","ngClass"]],template:function(t,i){if(t&1){let a=P();Be(Xt),p(0,"div",2,0),w("click",function(){return v(a),C(i.open())}),p(3,"div",3),c(4,Zt,2,1,"span",4)(5,ti,3,1,"span",5),m(),p(6,"div",6)(7,"div",7),ke(),p(8,"svg",8),B(9,"path",9),m()()()(),c(10,ii,3,9,"ng-template",10),w("backdropClick",function(){return v(a),C(i.close())})("attach",function(){return v(a),C(i._onAttached())})("detach",function(){return v(a),C(i.close())})}if(t&2){let a=H(1);d(3),Y("id",i._valueId),d(),f(i.empty?4:5),d(6),h("cdkConnectedOverlayPanelClass",i._overlayPanelClass)("cdkConnectedOverlayScrollStrategy",i._scrollStrategy)("cdkConnectedOverlayOrigin",i._preferredOverlayOrigin||a)("cdkConnectedOverlayOpen",i.panelOpen)("cdkConnectedOverlayPositions",i._positions)("cdkConnectedOverlayWidth",i._overlayWidth)}},dependencies:[_e,ye,J],styles:['.mat-mdc-select{display:inline-block;width:100%;outline:none;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;color:var(--mat-select-enabled-trigger-text-color, var(--mat-sys-on-surface));font-family:var(--mat-select-trigger-text-font, var(--mat-sys-body-large-font));line-height:var(--mat-select-trigger-text-line-height, var(--mat-sys-body-large-line-height));font-size:var(--mat-select-trigger-text-size, var(--mat-sys-body-large-size));font-weight:var(--mat-select-trigger-text-weight, var(--mat-sys-body-large-weight));letter-spacing:var(--mat-select-trigger-text-tracking, var(--mat-sys-body-large-tracking))}div.mat-mdc-select-panel{box-shadow:var(--mat-select-container-elevation-shadow, 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12))}.mat-mdc-select-disabled{color:var(--mat-select-disabled-trigger-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent))}.mat-mdc-select-disabled .mat-mdc-select-placeholder{color:var(--mat-select-disabled-trigger-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent))}.mat-mdc-select-trigger{display:inline-flex;align-items:center;cursor:pointer;position:relative;box-sizing:border-box;width:100%}.mat-mdc-select-disabled .mat-mdc-select-trigger{-webkit-user-select:none;user-select:none;cursor:default}.mat-mdc-select-value{width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.mat-mdc-select-value-text{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.mat-mdc-select-arrow-wrapper{height:24px;flex-shrink:0;display:inline-flex;align-items:center}.mat-form-field-appearance-fill .mdc-text-field--no-label .mat-mdc-select-arrow-wrapper{transform:none}.mat-mdc-form-field .mat-mdc-select.mat-mdc-select-invalid .mat-mdc-select-arrow,.mat-form-field-invalid:not(.mat-form-field-disabled) .mat-mdc-form-field-infix::after{color:var(--mat-select-invalid-arrow-color, var(--mat-sys-error))}.mat-mdc-select-arrow{width:10px;height:5px;position:relative;color:var(--mat-select-enabled-arrow-color, var(--mat-sys-on-surface-variant))}.mat-mdc-form-field.mat-focused .mat-mdc-select-arrow{color:var(--mat-select-focused-arrow-color, var(--mat-sys-primary))}.mat-mdc-form-field .mat-mdc-select.mat-mdc-select-disabled .mat-mdc-select-arrow{color:var(--mat-select-disabled-arrow-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent))}.mat-mdc-select-arrow svg{fill:currentColor;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%)}@media(forced-colors: active){.mat-mdc-select-arrow svg{fill:CanvasText}.mat-mdc-select-disabled .mat-mdc-select-arrow svg{fill:GrayText}}div.mat-mdc-select-panel{width:100%;max-height:275px;outline:0;overflow:auto;padding:8px 0;border-radius:4px;box-sizing:border-box;position:static;background-color:var(--mat-select-panel-background-color, var(--mat-sys-surface-container))}@media(forced-colors: active){div.mat-mdc-select-panel{outline:solid 1px}}.cdk-overlay-pane:not(.mat-mdc-select-panel-above) div.mat-mdc-select-panel{border-top-left-radius:0;border-top-right-radius:0;transform-origin:top center}.mat-mdc-select-panel-above div.mat-mdc-select-panel{border-bottom-left-radius:0;border-bottom-right-radius:0;transform-origin:bottom center}div.mat-mdc-select-panel .mat-mdc-option{--mdc-list-list-item-container-color: var(--mat-select-panel-background-color)}.mat-mdc-select-placeholder{transition:color 400ms 133.3333333333ms cubic-bezier(0.25, 0.8, 0.25, 1);color:var(--mat-select-placeholder-text-color, var(--mat-sys-on-surface-variant))}.mat-form-field-no-animations .mat-mdc-select-placeholder,._mat-animation-noopable .mat-mdc-select-placeholder{transition:none}.mat-form-field-hide-placeholder .mat-mdc-select-placeholder{color:rgba(0,0,0,0);-webkit-text-fill-color:rgba(0,0,0,0);transition:none;display:block}.mat-mdc-form-field-type-mat-select:not(.mat-form-field-disabled) .mat-mdc-text-field-wrapper{cursor:pointer}.mat-mdc-form-field-type-mat-select.mat-form-field-appearance-fill .mat-mdc-floating-label{max-width:calc(100% - 18px)}.mat-mdc-form-field-type-mat-select.mat-form-field-appearance-fill .mdc-floating-label--float-above{max-width:calc(100%/0.75 - 24px)}.mat-mdc-form-field-type-mat-select.mat-form-field-appearance-outline .mdc-notched-outline__notch{max-width:calc(100% - 60px)}.mat-mdc-form-field-type-mat-select.mat-form-field-appearance-outline .mdc-text-field--label-floating .mdc-notched-outline__notch{max-width:calc(100% - 24px)}.mat-mdc-select-min-line:empty::before{content:" ";white-space:pre;width:1px;display:inline-block;visibility:hidden}.mat-form-field-appearance-fill .mat-mdc-select-arrow-wrapper{transform:var(--mat-select-arrow-transform, translateY(-8px))}'],encapsulation:2,data:{animation:[ni.transformPanel]},changeDetection:0})}return n})(),an=(()=>{class n{static \u0275fac=function(t){return new(t||n)};static \u0275dir=I({type:n,selectors:[["mat-select-trigger"]],features:[de([{provide:Nt,useExisting:n}])]})}return n})(),on=(()=>{class n{static \u0275fac=function(t){return new(t||n)};static \u0275mod=j({type:n});static \u0275inj=G({providers:[ri],imports:[wt,ge,ue,Ct,Tt,ge,ue]})}return n})();var li=["matNavList"];function si(n,o){return this.dataSource().trackItems(o)}var di=(n,o,e,t,i)=>({$implicit:n,opened:o,filteredCount:e,currentCount:t,totalCount:i}),xe=n=>({opened:n}),ci=(n,o,e,t,i,a)=>({$implicit:n,filteredCount:o,currentCount:e,totalCount:t,opened:i,index:a}),Wt=(n,o)=>({$implicit:n,index:o});function pi(n,o){n&1&&x(0)}function hi(n,o){n&1&&B(0,"mat-progress-bar",7)}function mi(n,o){n&1&&x(0)}function ui(n,o){if(n&1&&c(0,mi,1,0,"ng-container",4),n&2){let e,t=s(3);h("ngTemplateOutlet",(e=t.dropdownLoading())==null?null:e.templateRef)("ngTemplateOutletContext",Z(2,xe,t.opened()))}}function gi(n,o){n&1&&R(0," Loading... ")}function fi(n,o){if(n&1&&c(0,ui,1,4,"ng-container")(1,gi,1,0),n&2){let e=s(2);f(e.dropdownLoading()?0:1)}}function _i(n,o){n&1&&x(0)}function yi(n,o){if(n&1&&(c(0,_i,1,0,"ng-container",4),u(1,"async"),u(2,"filledCount"),u(3,"async")),n&2){let e,t=s(2),i=t.$implicit,a=t.index,r=s();h("ngTemplateOutlet",(e=r.dropdownOption())==null?null:e.templateRef)("ngTemplateOutletContext",We(8,ci,i,g(2,4,g(1,2,r.dataSource().filteredData$)),r.dataSource().actualDataLength,g(3,6,r.dataSource().count$),r.opened(),a))}}function vi(n,o){if(n&1&&c(0,yi,4,15,"ng-container"),n&2){let e=s(2);f(e.dropdownOption()?0:-1)}}function Ci(n,o){if(n&1){let e=P();p(0,"mat-list-item",11),u(1,"async"),w("click",function(){let i=v(e).$implicit,a=s();return C(a.onPaneItemClicked(i))}),c(2,fi,2,1),u(3,"async"),c(4,vi,1,1),m()}if(n&2){let e,t=o.$implicit,i=o.index,a=s();A("height",(((e=a.dropdownOption())==null?null:e.height())||((e=a.dataSource())==null?null:e.rowHeight)||((e=a.dropdownHeader())==null?null:e.height())||48)+"px"),h("ngClass",a.dataSource().ngClassDropdownItem(g(1,5,a.dataSource().selectedItem),t,i))("activated",a.dataSource().selectedItem.value&&t&&a.dataSource().isActiveItem(a.dataSource().selectedItem.value,t)),d(2),f(!t||g(3,7,a.dataSource().loading)?2:4)}}function wi(n,o){n&1&&x(0)}function bi(n,o){if(n&1&&(p(0,"mat-list-item",14),c(1,wi,1,0,"ng-container",4),m()),n&2){let e,t,i=s(2);A("height",(((e=i.dropdownOption())==null?null:e.height())||((e=i.dropdownHeader())==null?null:e.height())||((e=i.dataSource())==null?null:e.rowHeight)||48)+"px"),h("disabled",!0),d(),h("ngTemplateOutlet",(t=i.noItems())==null?null:t.templateRef)("ngTemplateOutletContext",Z(5,xe,i.opened()))}}function xi(n,o){n&1&&x(0)}function Si(n,o){if(n&1&&(Ve(0),c(1,xi,1,0,"ng-container",4),ze()),n&2){let e=o.$implicit,t=o.index;s(2);let i=H(17);d(),h("ngTemplateOutlet",i)("ngTemplateOutletContext",ce(2,Wt,e,t))}}function Di(n,o){if(n&1&&(p(0,"cdk-virtual-scroll-viewport",10),c(1,bi,2,7,"mat-list-item",12)(2,Si,2,5,"ng-container",13),m()),n&2){let e=s();h("itemSize",e.dataSource().rowHeight)("minBufferPx",e.dataSource().rowHeight*5)("maxBufferPx",e.dataSource().rowHeight*10),d(),f(!e.dataSource().loading.value&&e.dataSource().actualDataLength==0?1:-1),d(),h("cdkVirtualForOf",e.dataSource())}}function Oi(n,o){n&1&&x(0)}function Ii(n,o){if(n&1&&(p(0,"mat-list-item",16),c(1,Oi,1,0,"ng-container",4),m()),n&2){let e,t,i=s(2);A("height",(((e=i.dropdownOption())==null?null:e.height())||((e=i.dropdownHeader())==null?null:e.height())||((e=i.dataSource())==null?null:e.rowHeight)||48)+"px"),h("disabled",!0),d(),h("ngTemplateOutlet",(t=i.noItems())==null?null:t.templateRef)("ngTemplateOutletContext",Z(5,xe,i.opened()))}}function Mi(n,o){n&1&&x(0)}function ki(n,o){if(n&1&&c(0,Mi,1,0,"ng-container",4),n&2){let e=o.$implicit,t=o.$index;s(2);let i=H(17);h("ngTemplateOutlet",i)("ngTemplateOutletContext",ce(2,Wt,e,t))}}function Ti(n,o){if(n&1&&(c(0,Ii,2,7,"mat-list-item",15),Le(1,ki,1,5,"ng-container",null,si,!0),u(3,"async")),n&2){let e=s();f(!e.dataSource().loading.value&&e.dataSource().actualDataLength==0?0:-1),d(),Ne(g(3,1,e.dataSource().filteredData$))}}var Vt=(()=>{class n{templateRef=l(V);ViewContainerRef=l(z);height=b(null,{alias:"ngxDcDropdownHeaderHeight"});static \u0275fac=function(t){return new(t||n)};static \u0275dir=I({type:n,selectors:[["","ngxDcDropdownHeader",""]],inputs:{height:[1,"ngxDcDropdownHeaderHeight","height"]}})}return n})(),zt=(()=>{class n{templateRef=l(V);ViewContainerRef=l(z);height=b(null,{alias:"ngxDcDropdownItemHeight"});static \u0275fac=function(t){return new(t||n)};static \u0275dir=I({type:n,selectors:[["","ngxDcDropdownItem",""]],inputs:{height:[1,"ngxDcDropdownItemHeight","height"]}})}return n})(),Bt=(()=>{class n{templateRef=l(V);ViewContainerRef=l(z);static \u0275fac=function(t){return new(t||n)};static \u0275dir=I({type:n,selectors:[["","ngxDcDropdownNoItems",""]]})}return n})(),Ht=(()=>{class n{templateRef=l(V);ViewContainerRef=l(z);static \u0275fac=function(t){return new(t||n)};static \u0275dir=I({type:n,selectors:[["","ngxDcDropdownLoading",""]]})}return n})(),Ai=(()=>{class n{modalService=l(Ot);dataSource=b.required();opened=Pe(!1);useGlobalLoader=b(!1);appearance=b("rounded-fill");roundedEdgeSize=b("4px");focusedItemChange=Ae();useInfiniteScrolling=b(!1);get showInfiniteScrollingClass(){return this.useInfiniteScrolling()}onClick(e){this.opened()&&(e.target.closest(".dc-dropdown")||this.opened.set(!1))}get baseAppearanceName(){return this.appearance().replace("rounded-","")}get backgroundColor(){return{none:"",fill:"var(--mat-sys-surface-container-low)",outline:"transparent"}[this.baseAppearanceName]||""}get borderColor(){return{none:"",fill:"",outline:"1px solid var(--mat-sys-on-surface)"}[this.baseAppearanceName]||""}get roundedEdges(){return{"rounded-outline":this.roundedEdgeSize(),"rounded-fill":this.roundedEdgeSize()}[this.appearance()]||""}destroy$=new $(!1);dropdownHeader=O(Vt);dropdownOption=O(zt);dropdownLoading=O(Ht);noItems=O(Bt);scrollViewport=O(ee);matNavListElement=O("matNavList",{read:N});get disabled(){return this.dataSource().actualDataLength===0}ngOnDestroy(){this.destroy$.next(!0),this.destroy$.complete()}resetItemSelected(){this.dataSource().selectedItem.next(null),this.dataSource().retrievedItem.next(null)}ngOnInit(){this.useGlobalLoader()&&(this.dataSource().loading.pipe(y(this.destroy$)).subscribe(e=>{this.modalService.showGlobalLoadingBar?.next(e)}),this.dataSource().itemLoading.pipe(y(this.destroy$)).subscribe(e=>{this.modalService.showGlobalLoadingBar?.next(e)}))}scrollToTop(){return D(this,null,function*(){yield new Promise(e=>setTimeout(()=>{if(this.useInfiniteScrolling()){let t=this.scrollViewport();t&&t.scrollToIndex(0,"instant")}else{let t=this.matNavListElement();t?.nativeElement&&t.nativeElement.scrollToIndex(0,"instant")}e()},0))})}reset(){this.resetItemSelected(),this.dataSource().reset()}open(){this.opened.set(!0)}close(){this.opened.set(!1)}onPaneItemClicked(e){return D(this,null,function*(){return yield this.dataSource().onPaneItemClicked(e),this.opened.set(!1),this.dataSource().retrievedItem.value})}focus=focus;onDropdownClick(){this.opened.set(!this.opened())}static \u0275fac=function(t){return new(t||n)};static \u0275cmp=K({type:n,selectors:[["ngx-dc-dropdown"]],contentQueries:function(t,i,a){t&1&&(T(a,i.dropdownHeader,Vt,5),T(a,i.dropdownOption,zt,5),T(a,i.dropdownLoading,Ht,5),T(a,i.noItems,Bt,5),T(a,i.scrollViewport,ee,5),T(a,i.matNavListElement,li,5,N)),t&2&&He(6)},hostVars:8,hostBindings:function(t,i){t&1&&w("click",function(r){return i.onClick(r)},!1,Ee),t&2&&(A("background-color",i.backgroundColor)("border-color",i.borderColor)("border-radius",i.roundedEdges),E("infinite-scrolling",i.showInfiniteScrollingClass))},inputs:{dataSource:[1,"dataSource"],opened:[1,"opened"],useGlobalLoader:[1,"useGlobalLoader"],appearance:[1,"appearance"],roundedEdgeSize:[1,"roundedEdgeSize"],useInfiniteScrolling:[1,"useInfiniteScrolling"]},outputs:{opened:"openedChange",focusedItemChange:"focusedItemChange"},decls:20,vars:31,consts:[["matNavList",""],["perItem",""],["matRipple","","data-testid","ngx-dc-dropdown",1,"dc-dropdown","mat-elevation-z2",3,"click","ngClass"],["mat-subheader","",1,"dc-dropdown-header"],[4,"ngTemplateOutlet","ngTemplateOutletContext"],[1,"fill"],[1,"dropdown-arrow"],["mode","indeterminate"],[1,"dc-dropdown-items-container"],[1,"dc-dropdown-items","mat-elevation-z2"],[1,"mat-elevation-z2",3,"itemSize","minBufferPx","maxBufferPx"],["data-testid","ngx-dc-dropdown-item",1,"dc-dropdown-item",3,"click","ngClass","activated"],["data-testid","ngx-dc-dropdown-no-item",1,"dc-dropdown-item",3,"disabled","height"],[4,"cdkVirtualFor","cdkVirtualForOf"],["data-testid","ngx-dc-dropdown-no-item",1,"dc-dropdown-item",3,"disabled"],["data-testid","ngx-dc-dropdown-item",1,"dc-dropdown-item",3,"disabled","height"],["data-testid","ngx-dc-dropdown-item",1,"dc-dropdown-item",3,"disabled"]],template:function(t,i){if(t&1){let a=P();p(0,"div",2),u(1,"async"),w("click",function(){return v(a),C(i.onDropdownClick())}),p(2,"div",3),c(3,pi,1,0,"ng-container",4),u(4,"async"),u(5,"async"),u(6,"filledCount"),u(7,"async"),B(8,"span",5),p(9,"mat-icon",6),R(10,"expand_more"),m()(),c(11,hi,1,0,"mat-progress-bar",7),u(12,"async"),m(),p(13,"div",8)(14,"mat-nav-list",9,0),c(16,Ci,5,9,"ng-template",null,1,Ge)(18,Di,3,5,"cdk-virtual-scroll-viewport",10)(19,Ti,4,3),m()()}if(t&2){let a,r;E("opened",i.opened())("disabled",i.disabled),h("ngClass",i.dataSource().ngClassTriggerItem(g(1,13,i.dataSource().selectedItem))),d(2),A("height","calc("+(((a=i.dropdownHeader())==null?null:a.height())||i.dataSource().rowHeight||48)+"px - 1.5rem)"),d(),h("ngTemplateOutlet",(r=i.dropdownHeader())==null?null:r.templateRef)("ngTemplateOutletContext",$e(25,di,g(4,15,i.dataSource().selectedItem),i.opened(),g(6,19,g(5,17,i.dataSource().filteredData$)),i.dataSource().actualDataLength,g(7,21,i.dataSource().count$))),d(8),f(g(12,23,i.dataSource().loading)?11:-1),d(2),E("opened",i.opened()),d(5),f(i.useInfiniteScrolling()?18:19)}},dependencies:[qe,Ke,ht,ut,gt,ft,Dt,J,It,_t,vt,ee,rt],styles:[`ngx-dc-dropdown{--ngx-dc-dropdown-disabled-text-color: rgba(154, 154, 154, .5);--ngx-dc-dropdown-scrollbar-color: darkgray transparent;--ngx-dc-dropdown-scrollbar-width: thin;--ngx-dc-dropdown-scrollbar-gutter: auto;--ngx-dc-dropdown-header-bg-color: var(--mat-sys-inverse-on-surface);display:flex;flex-direction:column;margin-bottom:16px}ngx-dc-dropdown,ngx-dc-dropdown *{scrollbar-color:var(--ngx-dc-dropdown-scrollbar-color);scrollbar-width:var(--ngx-dc-dropdown-scrollbar-width);scrollbar-gutter:var(--ngx-dc-dropdown-scrollbar-gutter)}ngx-dc-dropdown .dc-dropdown{background-color:var(--ngx-dc-dropdown-header-bg-color)}ngx-dc-dropdown .dc-dropdown-item{--mat-list-active-indicator-shape: 0}ngx-dc-dropdown.infinite-scrolling .dc-dropdown-items{padding:0;position:unset}ngx-dc-dropdown.infinite-scrolling cdk-virtual-scroll-viewport{position:absolute;background-color:var(--ngx-dc-dropdown-header-bg-color);z-index:1;top:-4px;overflow:auto;width:100%;transition:height .35s;padding:0;height:0}ngx-dc-dropdown.infinite-scrolling .opened cdk-virtual-scroll-viewport{transition:height .35s;height:340px}ngx-dc-dropdown:not(.infinite-scrolling) .dc-dropdown-items{transition:max-height .35s,height .35s,padding .35s;padding:0;height:0;max-height:0}ngx-dc-dropdown:not(.infinite-scrolling) .opened .dc-dropdown-items{transition:max-height .35s,height .35s,padding .35s;max-height:340px;height:auto}ngx-dc-dropdown .dc-dropdown-items{position:absolute;z-index:1;top:-4px;overflow:auto;width:100%;background-color:var(--ngx-dc-dropdown-header-bg-color);border-radius:0 0 4px 4px}ngx-dc-dropdown .opened .dc-dropdown-items{overflow:auto}ngx-dc-dropdown .opened .dropdown-arrow{transform:rotate(180deg)!important}ngx-dc-dropdown .dc-dropdown>mat-progress-bar{position:relative}ngx-dc-dropdown .dc-dropdown{margin-bottom:8px}ngx-dc-dropdown .dc-dropdown:hover{filter:brightness(.98)}ngx-dc-dropdown .dc-dropdown [mat-raised-button]{z-index:5}ngx-dc-dropdown .dc-dropdown.disabled{color:var(--ngx-dc-dropdown-disabled-text-color)}ngx-dc-dropdown .dc-content-pane{flex:1}ngx-dc-dropdown .dc-dropdown-header{display:flex;align-content:center;cursor:pointer}ngx-dc-dropdown .dropdown-arrow{height:100%;align-content:center;transition:transform .3s;transform:rotate(0)}ngx-dc-dropdown .dc-dropdown-items-container{position:relative;top:-3px}
`],encapsulation:2})}return n})();var be=class extends At{rowHeight=null;retrievedItem=new $(null);selectedItem=new $(null);isItemDisabled(o){return!1}retrieveItem(o){return D(this,null,function*(){return o})}onPaneItemClicked(o,e=!1){return D(this,null,function*(){if(this.isItemDisabled(o)||!e&&this.selectedItem.value&&o&&this.isActiveItem(this.selectedItem.value,o))return null;this.selectedItem.next(o),this.itemLoading.next(!0);let t=yield this.retrieveItem(o);return this.retrievedItem.next(t),this.itemLoading.next(!1),t})}refreshRetrievedItem(){return D(this,null,function*(){return this.selectedItem.value?this.onPaneItemClicked(this.selectedItem.value,!0):null})}ngClassTriggerItem(o){return{}}ngClassDropdownItem(o,e,t){return{}}},$t=class extends be{httpClient;params={};constructor(o){super(),this.httpClient=o}getParams(o){return o}getCount(o){let e=o.headers.get("X-Total-Count");return e==="null"?null:parseInt(e||"0",10)}getResults(o){return o.body}retrieveDataItems(o=null){return D(this,null,function*(){let e=yield Se(this.httpClient.get(this.relativePath,{params:this.getParams(o||this.params),observe:"response"}));return{count:this.getCount(e),results:this.getResults(e)}})}};var kn=(()=>{class n{static \u0275fac=function(t){return new(t||n)};static \u0275mod=j({type:n});static \u0275inj=G({imports:[je,Ai]})}return n})();export{nn as a,an as b,on as c,Vt as d,zt as e,Bt as f,Ht as g,Ai as h,$t as i,kn as j};
//# sourceMappingURL=chunk-2TX7HSHL.js.map
