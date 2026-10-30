import {test} from 'node:test';
import assert from 'node:assert/strict';
import {demoPalette,isLegacyDemo} from '../dist/palette.js';
import {quantize} from '../dist/convert-core.js';
test('256色唯一且兼容旧版色号索引',()=>{assert.equal(demoPalette.length,256);assert.equal(new Set(demoPalette.map(p=>p.hex)).size,256);assert.equal(new Set(demoPalette.map(p=>p.id)).size,256);assert.ok(isLegacyDemo(demoPalette.slice(0,32)));assert.equal(demoPalette[0].hex,'#fff8e5');assert.equal(demoPalette[31].hex,'#222b2b')});
test('多色色卡真正生成超过32色，并遵守64/128/256上限',()=>{const pixels=new Uint8ClampedArray(256*4);demoPalette.forEach((p,i)=>pixels.set([...p.hex.slice(1).match(/../g).map(v=>parseInt(v,16)),255],i*4));for(const limit of [64,128,256]){const cells=quantize({pixels,w:256,h:1,palette:demoPalette,limit});assert.equal(new Set(cells).size,limit)} });
