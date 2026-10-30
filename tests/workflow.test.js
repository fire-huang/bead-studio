import {test} from 'node:test';
import assert from 'node:assert/strict';
import {paletteIndices,regionUsage,validRows} from '../dist/workflow-core.js';
import {quantize} from '../dist/convert-core.js';
const palette=[{id:'D01',hex:'#ffffff'},{id:'D03',hex:'#ff0000'},{id:'D15',hex:'#000000'}];
test('限定色号支持中文逗号、大小写和去重，未知色号阻止转换',()=>{assert.deepEqual(paletteIndices('d15，D03 d15',palette),[2,1]);assert.deepEqual(paletteIndices('',palette),[0,1,2]);assert.throws(()=>paletteIndices('D99',palette));assert.throws(()=>paletteIndices(',',palette))});
test('限定转换的局部索引正确映射回原色卡，透明格保持为空',()=>{const indices=paletteIndices('D15,D03',palette);const cells=quantize({pixels:new Uint8ClampedArray([255,0,0,255,0,0,0,255,0,0,0,0]),w:3,h:1,palette:indices.map(i=>palette[i]),limit:64});assert.deepEqual(cells.map(v=>v<0?-1:indices[v]),[1,2,-1])});
test('分区材料量只统计本区，边缘分区与空格正确',()=>{const cells=[0,1,-1,2,1,2];assert.deepEqual(regionUsage(cells,palette,3,1,0,2,2).map(p=>[p.id,p.count]),[['D03',2],['D15',1]])});
test('恢复跟拼进度过滤越界、重复和非法行号，兼容旧作品',()=>{assert.deepEqual(validRows([0,2,2,-1,3,'1',null],3),[0,2]);assert.deepEqual(validRows(undefined,48),[])});
