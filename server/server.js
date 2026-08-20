const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

const ROOT = path.join(__dirname, '..');
const DATA = path.join(__dirname, 'data');
const PORT = Number(process.env.PORT || 3000);
const MIME = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.jpg':'image/jpeg','.jpeg':'image/jpeg','.png':'image/png','.webp':'image/webp','.svg':'image/svg+xml'};

function read(name){ return JSON.parse(fs.readFileSync(path.join(DATA, name), 'utf8')); }
function write(name, value){ fs.writeFileSync(path.join(DATA, name), JSON.stringify(value, null, 2)); }
function send(res, status, body, type='application/json; charset=utf-8'){ res.writeHead(status, {'Content-Type':type, 'Access-Control-Allow-Origin':'*'}); res.end(type.startsWith('application/json') ? JSON.stringify(body) : body); }
function body(req){ return new Promise((resolve,reject)=>{let raw=''; req.on('data',c=>raw+=c); req.on('end',()=>{try{resolve(raw?JSON.parse(raw):{});}catch(e){reject(e);}});}); }
function safePath(urlPath){ const clean = decodeURIComponent(urlPath.split('?')[0]); const target = path.normalize(path.join(ROOT, clean === '/' ? 'index.html' : clean.replace(/^[/\\]+/,''))); return target.startsWith(ROOT) ? target : null; }

function bootstrap(){ return {deals:read('deals.json'), giftCards:read('gift-cards.json'), categories:read('categories.json'), brands:read('brands.json'), localBusinesses:read('businesses.json')}; }

const server = http.createServer(async (req,res)=>{
  try {
    const u = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    if(req.method === 'OPTIONS'){ res.writeHead(204, {'Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'GET,POST,PUT,DELETE,OPTIONS','Access-Control-Allow-Headers':'Content-Type'}); return res.end(); }
    if(u.pathname === '/api/health') return send(res,200,{ok:true,service:'OmniHubb API',time:new Date().toISOString()});
    if(u.pathname === '/api/bootstrap' && req.method === 'GET') return send(res,200,bootstrap());
    if(u.pathname === '/api/deals' && req.method === 'GET') return send(res,200,read('deals.json'));
    if(u.pathname === '/api/gift-cards' && req.method === 'GET') return send(res,200,read('gift-cards.json'));
    if(u.pathname === '/api/businesses' && req.method === 'GET') return send(res,200,read('businesses.json'));
    if(u.pathname === '/api/admin/stats' && req.method === 'GET') {
      const deals=read('deals.json'), gifts=read('gift-cards.json'), businesses=read('businesses.json');
      return send(res,200,{deals:deals.length,giftCards:gifts.length,businesses:businesses.length,orders:0,users:0,campaigns:0});
    }
    if(u.pathname === '/api/admin/deals' && req.method === 'POST') {
      const item=await body(req); const list=read('deals.json');
      if(!item.id || !item.name || item.price == null) return send(res,400,{error:'id, name and price are required'});
      if(list.some(x=>x.id===item.id)) return send(res,409,{error:'A deal with this id already exists'});
      list.push(item); write('deals.json',list); return send(res,201,item);
    }
    if(u.pathname.startsWith('/api/admin/deals/') && ['PUT','DELETE'].includes(req.method)) {
      const id=u.pathname.split('/').pop(); let list=read('deals.json'); const index=list.findIndex(x=>x.id===id);
      if(index<0) return send(res,404,{error:'Deal not found'});
      if(req.method==='DELETE'){ const removed=list.splice(index,1)[0]; write('deals.json',list); return send(res,200,removed); }
      const item=await body(req); list[index]={...list[index],...item,id}; write('deals.json',list); return send(res,200,list[index]);
    }

    if(req.method !== 'GET') return send(res,405,{error:'Method not allowed'});
    const file=safePath(u.pathname);
    if(!file) return send(res,403,{error:'Forbidden'});
    fs.stat(file,(err,st)=>{
      if(err || !st.isFile()) return send(res,404,{error:'Not found'});
      const ext=path.extname(file).toLowerCase(); res.writeHead(200,{'Content-Type':MIME[ext]||'application/octet-stream'}); fs.createReadStream(file).pipe(res);
    });
  } catch(e){ console.error(e); send(res,500,{error:'Server error'}); }
});

server.listen(PORT,()=>console.log(`OmniHubb is running at http://localhost:${PORT}`));
