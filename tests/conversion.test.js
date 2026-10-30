import {test} from 'node:test';
import assert from 'node:assert/strict';
import {dimensions,quantize} from '../dist/convert-core.js';
const palette=[{hex:'#ffffff'},{hex:'#222222'},{hex:'#888888'},{hex:'#ff0000'}];
test('完整保留模式的长图比例与256格边界',()=>{assert.deepEqual(dimensions(256,100,400,false),{w:64,h:256});assert.deepEqual(dimensions(160,400,200,false),{w:160,h:80});assert.deepEqual(dimensions(256,400,200,true),{w:256,h:256})});
test('少量深色轮廓不被相近灰色挤出两色色卡',()=>{let pixels=new Uint8ClampedArray(400);for(let i=0;i<100;i++)pixels.set(i===99?[34,34,34,255]:i<60?[255,255,255,255]:[238,238,238,255],i*4);let cells=quantize({pixels,w:10,h:10,palette,limit:2,detail:false});assert.equal(cells[99],1);assert.equal(new Set(cells).size,2)});
test('透明和纯白背景过滤；空图不产生无效色号',()=>{assert.deepEqual(quantize({pixels:new Uint8ClampedArray([255,255,255,255,0,0,0,0]),w:2,h:1,palette,limit:2,removeBg:true}),[-1,-1])});
test('256×256高精度输出完整，色数受限',()=>{const pixels=new Uint8ClampedArray(256*256*4);for(let i=0;i<256*256;i++)pixels.set([i%256,Math.floor(i/256),100,255],i*4);const a=quantize({pixels,w:256,h:256,palette,limit:3,detail:true});assert.equal(a.length,65536);assert.ok(a.every(v=>v>=0&&v<palette.length));assert.ok(new Set(a).size<=3)});
