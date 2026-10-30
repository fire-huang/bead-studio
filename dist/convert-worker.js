import {quantize} from './convert-core.js';
self.onmessage=e=>{try{self.postMessage({cells:quantize(e.data)})}catch(err){self.postMessage({error:err.message})}};
