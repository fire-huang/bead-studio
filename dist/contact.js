import {t} from './i18n.js';
const dialog=document.createElement('dialog');
dialog.className='contact-dialog';
dialog.setAttribute('aria-labelledby','contactHeading');
dialog.setAttribute('aria-describedby','contactDescription');
dialog.innerHTML=`<button class="contact-close" aria-label="关闭联系窗口" autofocus>×</button>
<div class="contact-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="m4 7 8 6 8-6"/></svg></div>
<p class="contact-kicker">联系豆造</p><h2 id="contactHeading">交流想法，一起把豆造变得更好。</h2>
<p id="contactDescription">产品建议、使用问题或商业授权，欢迎通过邮件联系。</p>
<div class="contact-address"><span>联系邮箱</span><a href="mailto:15675478614@163.com" data-no-translate>15675478614@163.com</a></div>
<div class="contact-actions"><button class="contact-copy">复制邮箱</button><a class="contact-send" href="mailto:15675478614@163.com"><span>发送邮件</span><span aria-hidden="true">↗</span></a></div>
<p class="contact-note" role="status" aria-live="polite">点击将打开你的默认邮件应用。</p>`;
document.body.append(dialog);
let copyReset;
document.querySelectorAll('[data-contact-open]').forEach(trigger=>trigger.addEventListener('click',()=>{
 const menu=document.querySelector('.nav-shell.menu-open #menuToggle');
 if(menu)menu.click();
 dialog.querySelector('.contact-note').textContent='点击将打开你的默认邮件应用。';
 dialog.showModal();
}));
dialog.querySelector('.contact-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{const r=dialog.getBoundingClientRect();if(e.target===dialog&&(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom))dialog.close()});
dialog.querySelector('.contact-copy').addEventListener('click',async e=>{
 const button=e.currentTarget;
 try{await navigator.clipboard.writeText('15675478614@163.com');button.textContent=t('已复制');clearTimeout(copyReset);copyReset=setTimeout(()=>button.textContent=t('复制邮箱'),2000)}
 catch{dialog.querySelector('.contact-note').textContent='复制失败，请手动选择邮箱。'}
});
