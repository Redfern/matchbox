"use strict";function ready(fn){"loading"!=document.readyState?fn():document.addEventListener("DOMContentLoaded",fn)}!function(window,factory){"function"==typeof define&&define.amd?define([],factory(window)):"object"==typeof exports?module.exports=factory(window):window.Matchbox=factory(window)}(window,function(window){function extend(options){for(var default_keys=Object.keys(defaults),i=0;i<default_keys.length;i++){var key=default_keys[i];options.hasOwnProperty(key)||(options[key]=defaults[key])}return options}function arrayFromList(list){return Array.prototype.slice.call(list)}function throttle(callback){var wait=!1;return function(){wait||(callback.call(),wait=!0,setTimeout(function(){wait=!1},66))}}function addInitClass(instance){document.documentElement.classList.add(instance.settings.initClass)}function removeInitClass(instance){document.documentElement.classList.remove(instance.settings.initClass)}function getBoxes(instance){var parent=document.querySelector(instance.settings.parentSelector);return arrayFromList(parent.querySelectorAll(instance.settings.childSelector))}function resetBoxHeights(instance){var boxes=getBoxes(instance);boxes.forEach(function(item){item.style.height=""})}function getNextItems(items,number){return items.slice(0,number)}function getRestOfItems(items,number){return items.length<=number?items:items.slice(-1*(items.length-number))}function getTallestHeight(items){var tallestHeight=0;return items.forEach(function(item){item.style.height="",item.offsetHeight>tallestHeight&&(tallestHeight=item.offsetHeight)}),tallestHeight}function setSameHeight(items,height){isNaN(height)||(height+="px"),items.forEach(function(item){item.style.height=height})}function matchItems(items,number){if(0!==items.length){var nextItems,restOfItems,tallestHeight;nextItems=getNextItems(items,number),items.length>number&&(restOfItems=getRestOfItems(items,number)),tallestHeight=getTallestHeight(nextItems),setSameHeight(nextItems,tallestHeight),"undefined"!=typeof restOfItems&&restOfItems.length&&matchItems(restOfItems,number)}}function runMatchItems(instance){var boxes=getBoxes(instance);matchItems(boxes,instance.settings.groupsOf)}function Matchbox(options){var opts=options||{};this.settings=extend(opts)}var defaults={initClass:"js-matchbox-initialized",parentSelector:".js-box",childSelector:".js-match",groupsOf:2};return Matchbox.prototype={destroy:function(){function onResize(){throttle(runMatchItems(_this))}var _this=this;resetBoxHeights(this),removeInitClass(this),window.removeEventListener("resize",onResize)},init:function(){function onResize(){throttle(runMatchItems(_this))}var _this=this;this.destroy(),addInitClass(this),runMatchItems(this),window.addEventListener("resize",onResize)},groupsOf:function(number){var _this=this;isNaN(number)||(this.settings.groupsOf=number,runMatchItems(_this))}},Matchbox}),function(global,factory){"function"==typeof define&&define.amd?define(factory):"object"==typeof module&&module.exports?module.exports=factory():global.EvEmitter=factory()}("undefined"!=typeof window?window:this,function(){function EvEmitter(){}var proto=EvEmitter.prototype;return proto.on=function(eventName,listener){if(eventName&&listener){var events=this._events=this._events||{},listeners=events[eventName]=events[eventName]||[];return-1==listeners.indexOf(listener)&&listeners.push(listener),this}},proto.once=function(eventName,listener){if(eventName&&listener){this.on(eventName,listener);var onceEvents=this._onceEvents=this._onceEvents||{},onceListeners=onceEvents[eventName]=onceEvents[eventName]||{};return onceListeners[listener]=!0,this}},proto.off=function(eventName,listener){var listeners=this._events&&this._events[eventName];if(listeners&&listeners.length){var index=listeners.indexOf(listener);return-1!=index&&listeners.splice(index,1),this}},proto.emitEvent=function(eventName,args){var listeners=this._events&&this._events[eventName];if(listeners&&listeners.length){var i=0,listener=listeners[i];args=args||[];for(var onceListeners=this._onceEvents&&this._onceEvents[eventName];listener;){var isOnce=onceListeners&&onceListeners[listener];isOnce&&(this.off(eventName,listener),delete onceListeners[listener]),listener.apply(this,args),i+=isOnce?0:1,listener=listeners[i]}return this}},EvEmitter}),function(window,factory){"function"==typeof define&&define.amd?define(["ev-emitter/ev-emitter"],function(EvEmitter){return factory(window,EvEmitter)}):"object"==typeof module&&module.exports?module.exports=factory(window,require("ev-emitter")):window.imagesLoaded=factory(window,window.EvEmitter)}(window,function(window,EvEmitter){function extend(a,b){for(var prop in b)a[prop]=b[prop];return a}function makeArray(obj){var ary=[];if(Array.isArray(obj))ary=obj;else if("number"==typeof obj.length)for(var i=0;i<obj.length;i++)ary.push(obj[i]);else ary.push(obj);return ary}function ImagesLoaded(elem,options,onAlways){return this instanceof ImagesLoaded?("string"==typeof elem&&(elem=document.querySelectorAll(elem)),this.elements=makeArray(elem),this.options=extend({},this.options),"function"==typeof options?onAlways=options:extend(this.options,options),onAlways&&this.on("always",onAlways),this.getImages(),$&&(this.jqDeferred=new $.Deferred),void setTimeout(function(){this.check()}.bind(this))):new ImagesLoaded(elem,options,onAlways)}function LoadingImage(img){this.img=img}function Background(url,element){this.url=url,this.element=element,this.img=new Image}var $=window.jQuery,console=window.console;ImagesLoaded.prototype=Object.create(EvEmitter.prototype),ImagesLoaded.prototype.options={},ImagesLoaded.prototype.getImages=function(){this.images=[],this.elements.forEach(this.addElementImages,this)},ImagesLoaded.prototype.addElementImages=function(elem){"IMG"==elem.nodeName&&this.addImage(elem),this.options.background===!0&&this.addElementBackgroundImages(elem);var nodeType=elem.nodeType;if(nodeType&&elementNodeTypes[nodeType]){for(var childImgs=elem.querySelectorAll("img"),i=0;i<childImgs.length;i++){var img=childImgs[i];this.addImage(img)}if("string"==typeof this.options.background){var children=elem.querySelectorAll(this.options.background);for(i=0;i<children.length;i++){var child=children[i];this.addElementBackgroundImages(child)}}}};var elementNodeTypes={1:!0,9:!0,11:!0};return ImagesLoaded.prototype.addElementBackgroundImages=function(elem){var style=getComputedStyle(elem);if(style)for(var reURL=/url\((['"])?(.*?)\1\)/gi,matches=reURL.exec(style.backgroundImage);null!==matches;){var url=matches&&matches[2];url&&this.addBackground(url,elem),matches=reURL.exec(style.backgroundImage)}},ImagesLoaded.prototype.addImage=function(img){var loadingImage=new LoadingImage(img);this.images.push(loadingImage)},ImagesLoaded.prototype.addBackground=function(url,elem){var background=new Background(url,elem);this.images.push(background)},ImagesLoaded.prototype.check=function(){function onProgress(image,elem,message){setTimeout(function(){_this.progress(image,elem,message)})}var _this=this;return this.progressedCount=0,this.hasAnyBroken=!1,this.images.length?void this.images.forEach(function(loadingImage){loadingImage.once("progress",onProgress),loadingImage.check()}):void this.complete()},ImagesLoaded.prototype.progress=function(image,elem,message){this.progressedCount++,this.hasAnyBroken=this.hasAnyBroken||!image.isLoaded,this.emitEvent("progress",[this,image,elem]),this.jqDeferred&&this.jqDeferred.notify&&this.jqDeferred.notify(this,image),this.progressedCount==this.images.length&&this.complete(),this.options.debug&&console&&console.log("progress: "+message,image,elem)},ImagesLoaded.prototype.complete=function(){var eventName=this.hasAnyBroken?"fail":"done";if(this.isComplete=!0,this.emitEvent(eventName,[this]),this.emitEvent("always",[this]),this.jqDeferred){var jqMethod=this.hasAnyBroken?"reject":"resolve";this.jqDeferred[jqMethod](this)}},LoadingImage.prototype=Object.create(EvEmitter.prototype),LoadingImage.prototype.check=function(){var isComplete=this.getIsImageComplete();return isComplete?void this.confirm(0!==this.img.naturalWidth,"naturalWidth"):(this.proxyImage=new Image,this.proxyImage.addEventListener("load",this),this.proxyImage.addEventListener("error",this),this.img.addEventListener("load",this),this.img.addEventListener("error",this),void(this.proxyImage.src=this.img.src))},LoadingImage.prototype.getIsImageComplete=function(){return this.img.complete&&void 0!==this.img.naturalWidth},LoadingImage.prototype.confirm=function(isLoaded,message){this.isLoaded=isLoaded,this.emitEvent("progress",[this,this.img,message])},LoadingImage.prototype.handleEvent=function(event){var method="on"+event.type;this[method]&&this[method](event)},LoadingImage.prototype.onload=function(){this.confirm(!0,"onload"),this.unbindEvents()},LoadingImage.prototype.onerror=function(){this.confirm(!1,"onerror"),this.unbindEvents()},LoadingImage.prototype.unbindEvents=function(){this.proxyImage.removeEventListener("load",this),this.proxyImage.removeEventListener("error",this),this.img.removeEventListener("load",this),this.img.removeEventListener("error",this)},Background.prototype=Object.create(LoadingImage.prototype),Background.prototype.check=function(){this.img.addEventListener("load",this),this.img.addEventListener("error",this),this.img.src=this.url;var isComplete=this.getIsImageComplete();isComplete&&(this.confirm(0!==this.img.naturalWidth,"naturalWidth"),this.unbindEvents())},Background.prototype.unbindEvents=function(){this.img.removeEventListener("load",this),this.img.removeEventListener("error",this)},Background.prototype.confirm=function(isLoaded,message){this.isLoaded=isLoaded,this.emitEvent("progress",[this,this.element,message])},ImagesLoaded.makeJQueryPlugin=function(jQuery){jQuery=jQuery||window.jQuery,jQuery&&($=jQuery,$.fn.imagesLoaded=function(options,callback){var instance=new ImagesLoaded(this,options,callback);return instance.jqDeferred.promise($(this))})},ImagesLoaded.makeJQueryPlugin(),ImagesLoaded});var GSK={init:function(){console.log("Grunt Starter Kit initialized")}};!function(){function firstExampleToggle(){function toggleCallback(){isMatched=!isMatched,isMatched?firstExample.init():firstExample.destroy()}var toggle=document.querySelector(".js-first-example-toggle");toggle.addEventListener("click",toggleCallback,!1)}var firstExample=new Matchbox({initClass:"js-first-example-initialized",parentSelector:".js-first-example-box",groupsOf:3}),isMatched=!1;GSK.first_example={init:function(){firstExampleToggle()}}}(),function(){function secondExampleToggle(){function toggleCallback(){isMatched=!isMatched,isMatched?secondExample.init():secondExample.destroy()}var toggle=document.querySelector(".js-second-example-toggle");toggle.addEventListener("click",toggleCallback,!1)}var secondExample=new Matchbox({initClass:"js-second-example-initialized",parentSelector:".js-second-example-box",groupsOf:3}),isMatched=!1;GSK.second_example={init:function(){secondExampleToggle()}}}(),function(){function responsiveGroupsOf(){var ww=window.innerWidth;thirdExample.groupsOf(ww>=1350?5:ww>=1025?4:ww>=600?3:2)}var thirdExample=new Matchbox({initClass:"js-third-example-initialized",parentSelector:".js-third-example-box"});GSK.third_example={init:function(){var box=document.querySelector(".js-third-example-box");imagesLoaded(box,function(){thirdExample.init(),responsiveGroupsOf()}),window.addEventListener("resize",responsiveGroupsOf,!1)}}}(),ready(function(){GSK.init(),GSK.first_example.init(),GSK.second_example.init(),GSK.third_example.init()});