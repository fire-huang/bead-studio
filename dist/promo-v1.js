(()=>{
  const video=document.getElementById('promoVideo');
  const play=document.getElementById('promoPlay');
  const label=document.getElementById('promoPlayLabel');
  const status=document.getElementById('promoStatus');
  if(!video||!play||!status)return;
  play.hidden=false;
  play.addEventListener('click',async()=>{
    status.textContent='正在加载短片…';
    play.disabled=true;
    try{await video.play();play.hidden=true;video.focus()}
    catch{status.textContent='暂时无法播放，请点击播放器重试，或稍后刷新页面。';play.hidden=false}
    finally{play.disabled=false}
  });
  video.addEventListener('playing',()=>{play.hidden=true;status.textContent='正在播放 · 可调节音量或全屏观看'});
  video.addEventListener('pause',()=>{if(!video.ended)status.textContent='已暂停 · 点击播放器继续观看'});
  video.addEventListener('ended',()=>{play.hidden=false;label.innerHTML='再看一次 <small>00:30 · 含音乐</small>';play.setAttribute('aria-label','重新播放豆造30秒产品短片（含音乐）');status.textContent='看完了？进入工作台，试试自己的图片。'});
  video.addEventListener('error',()=>{play.hidden=true;status.textContent='视频暂时无法加载，请稍后刷新重试。'});
  // Leaving the page should not leave music playing in the background.
  document.addEventListener('visibilitychange',()=>{if(document.hidden&&!video.paused)video.pause()});
})();
