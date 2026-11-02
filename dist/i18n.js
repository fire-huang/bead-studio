import {dictionary} from './i18n-dictionary.js';
const storageKey='bead-studio-language';
let language='zh-CN';
try{if(localStorage.getItem(storageKey)==='en')language='en'}catch{}
export function t(text){
  if(language!=='en'||typeof text!=='string')return text;
  const source=text.trim();
  let translated=dictionary[source];
  if(!translated){
    const match=source.match(/^([＋+✿↗↓✎⌫▧◉✥⌨⌖✦\s]*)(.*?)([↗↘\s]*)$/);
    if(match&&dictionary[match[2]])translated=match[1]+dictionary[match[2]]+match[3];
  }
  if(!translated){
    translated=source
      .replace(/^当前色卡 (\d+) 色。颜色越多，层次越丰富，配料也更复杂。$/, 'Palette: $1 colors. More colors add detail and require more materials.')
      .replace(/^当前色卡 (\d+) 色。$/, 'Palette: $1 colors.')
      .replace(/^第 (\d+) 行 · 拖动平移，轻点定位$/, 'Row $1 · Drag to pan, tap to locate')
      .replace(/^第 (\d+) 行 · 第 (\d+) 列 · (.*)$/, (_,row,col,color)=>`Row ${row} · Column ${col} · ${color==='空格'?'Empty':color}`)
      .replace(/^把 (.+)（(\d+) 颗）替换成 (.+)，用色数将减少一种。请先确认颜色差异。$/, 'Replace $1 ($2 beads) with $3 to use one fewer color. Check the color difference first.')
      .replace(/^已完成 ([\d,]+)\/([\d,]+) 行 · ([\d,]+)\/([\d,]+) 颗 · (\d+)%$/, 'Completed $1/$2 rows · $3/$4 beads · $5%')
      .replace(/^预计 (.+) 格 · (.+) cm · 最多 ([\d,]+) 颗（去背景后会减少）$/, 'Estimated $1 cells · $2 cm · Up to $3 beads (fewer after removing background)')
      .replace(/^(\d+) 色$/, '$1 colors').replace(/^(.*\d) 颗$/, '$1 beads')
      .replace(/^(\S+) · ([\d,]+) 颗( · 少量用色)?$/, (_,id,n,small)=>`${id} · ${n} beads${small?' · Small quantity':''}`)
      .replace(/^(.*)（([A-Z0-9+\-[\]])）$/,(_,label,key)=>`${dictionary[label]||label} (${key})`);
  }
  return text.slice(0,text.indexOf(source))+translated+text.slice(text.indexOf(source)+source.length);
}
const originals=new WeakMap();
const attributes=['aria-label','title','alt','placeholder'];
const observer=new MutationObserver(()=>refresh());
function translateValue(node,key,read,write){
  const current=read();if(!current)return;
  let record=originals.get(node);if(!record){record={};originals.set(node,record)}
  if(!record[key]||current!==record[key].rendered)record[key]={source:current,rendered:current};
  const value=t(record[key].source);if(value!==current)write(value);record[key].rendered=value;
}
function refresh(){
 observer.disconnect();
 document.documentElement.lang=language;
 const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,{acceptNode:n=>n.parentElement?.closest('script,style,textarea,code,kbd,#libraryList strong,[data-no-translate]')?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT});
 while(walker.nextNode()){const n=walker.currentNode;translateValue(n,'text',()=>n.nodeValue,v=>n.nodeValue=v)}
 document.querySelectorAll('[aria-label],[title],[alt],[placeholder]').forEach(el=>{for(const attr of attributes)if(el.hasAttribute(attr))translateValue(el,attr,()=>el.getAttribute(attr),v=>el.setAttribute(attr,v))});
 translateValue(document.querySelector('title'),'text',()=>document.title,v=>document.title=v);
 document.querySelectorAll('.language-switch').forEach(el=>el.value=language);
 observer.observe(document.body,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:attributes});
}
export function setLanguage(value){language=value==='en'?'en':'zh-CN';try{localStorage.setItem(storageKey,language)}catch{}refresh();document.dispatchEvent(new CustomEvent('languagechange',{detail:language}))}
document.querySelectorAll('.language-switch').forEach(el=>el.addEventListener('change',()=>setLanguage(el.value)));
window.addEventListener('storage',e=>{if(e.key===storageKey)setLanguage(e.newValue)});
refresh();
