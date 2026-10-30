import {test} from 'node:test';
import assert from 'node:assert/strict';
import {boundedPan,zoomAbout} from '../dist/viewport-core.js';
test('放大时保持指针下的图纸位置，连续缩放可还原',()=>{const state={zoom:2,panX:120,panY:-70},anchor={x:150,y:240},viewport={width:800,height:600};const next=zoomAbout(state,4,anchor,viewport);assert.deepEqual(next,{zoom:4,panX:490,panY:-80});assert.deepEqual(zoomAbout(next,2,anchor,viewport),state)});
test('缩放范围受限，边界处不发生额外跳动',()=>{const state={zoom:16,panX:100,panY:20};assert.deepEqual(zoomAbout(state,100,{x:50,y:50},{width:800,height:600}),state)});
test('图纸始终保留可见区域，正常拖动偏移不受影响',()=>{assert.equal(boundedPan(100,800,1600),100);assert.equal(boundedPan(9999,800,1600),1136);assert.equal(boundedPan(-9999,800,1600),-1136);assert.equal(boundedPan(20,0,0),0)});
