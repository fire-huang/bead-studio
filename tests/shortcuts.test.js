import {test} from 'node:test';
import assert from 'node:assert/strict';
import {shortcutAction} from '../dist/shortcuts-core.js';
const event=(key,more={})=>({key,...more});
test('工具、模式和移动快捷键映射正确',()=>{assert.equal(shortcutAction(event('B'),{mode:'2d'}),'tool:paint');assert.equal(shortcutAction(event('3'),{}),'follow');assert.equal(shortcutAction(event('ArrowRight'),{mode:'follow'}),'pan:right');assert.equal(shortcutAction(event('ArrowRight'),{mode:'3d'}),null);assert.equal(shortcutAction(event(' '),{mode:'2d'}),'holdPan')});
test('输入、弹窗、中文输入法和Alt组合不触发',()=>{for(const context of [{editable:true},{dialog:true}])assert.equal(shortcutAction(event('b'),context),null);assert.equal(shortcutAction(event('e',{isComposing:true}),{}),null);assert.equal(shortcutAction(event('h',{altKey:true}),{}),null)});
test('照图行操作与按钮原生键盘操作不冲突',()=>{assert.equal(shortcutAction(event('Enter'),{mode:'follow'}),'completeRow');assert.equal(shortcutAction(event('Enter'),{mode:'follow',button:true}),null);assert.equal(shortcutAction(event(' '),{mode:'2d',button:true}),null);assert.equal(shortcutAction(event(']'),{mode:'2d'}),null)});
test('支持Mac和Windows保存撤销，保留浏览器其他组合键',()=>{assert.equal(shortcutAction(event('s',{metaKey:true}),{}),'save');assert.equal(shortcutAction(event('z',{ctrlKey:true,shiftKey:true}),{}),'redo');assert.equal(shortcutAction(event('z',{metaKey:true}),{}),'undo');assert.equal(shortcutAction(event('b',{ctrlKey:true}),{}),null)});
