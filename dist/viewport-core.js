// 视口计算独立于画布，缩放时保留指针下的图纸位置。
export function boundedPan(offset,viewport,grid,margin=64){const limit=Math.max(0,(viewport+grid)/2-margin);return Math.max(-limit,Math.min(limit,offset))}
export function zoomAbout(state,value,anchor,viewport){const zoom=Math.max(1,Math.min(16,value)),ratio=zoom/state.zoom;return {zoom,panX:(state.panX-anchor.x+viewport.width/2)*ratio+anchor.x-viewport.width/2,panY:(state.panY-anchor.y+viewport.height/2)*ratio+anchor.y-viewport.height/2}}
