const hexes=['#fff8e5','#f4d788','#e9ac45','#e27643','#bf5141','#f0c4b2','#d98d8c','#b85d77','#8e4668','#d6b5c8','#a992bd','#6c608b','#d7dfaa','#a3b574','#6d8b50','#3e6146','#244b3b','#b5d4ce','#7ba9a6','#447c83','#345865','#a6c4db','#6e97c0','#3e658e','#dfd9cc','#b5ac99','#8f7c64','#665244','#454538','#263c35','#ffffff','#222b2b'];
// 保留旧版32色的顺序及色号，扩展覆盖色相、明度和中性色。
const seen=new Set(hexes);
for(const r of [0,51,102,153,204,255])for(const g of [0,51,102,153,204,255])for(const b of [0,51,102,153,204,255]){const hex='#'+[r,g,b].map(v=>v.toString(16).padStart(2,'0')).join('');if(!seen.has(hex)){seen.add(hex);hexes.push(hex)}}
for(let v=17;hexes.length<256;v+=17){const hex='#'+v.toString(16).padStart(2,'0').repeat(3);if(!seen.has(hex)){seen.add(hex);hexes.push(hex)}}
export const demoPalette=hexes.map((hex,i)=>({id:'D'+String(i+1).padStart(2,'0'),hex}));
export function isLegacyDemo(p){return p.length===32&&p.every((c,i)=>c.id===demoPalette[i].id&&c.hex.toLowerCase()===demoPalette[i].hex)}
