const http=require('node:http');
const fs=require('node:fs');
const path=require('node:path');
const crypto=require('node:crypto');
const ROOT=__dirname;
function loadDotEnv(){const f=path.join(ROOT,'.env');if(!fs.existsSync(f))return;for(const line of fs.readFileSync(f,'utf8').split(/\r?\n/)){const m=line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$/);if(m)process.env[m[1]]=m[2].replace(/^['"]|['"]$/g,'')}}loadDotEnv();
const PORT=Number(process.env.PORT||3000), ADMIN_PASSWORD=process.env.ADMIN_PASSWORD||'Change-This-Strong-Password';
const DATA_FILE=path.join(ROOT,'portfolio-data.json');const MAX_BODY=20*1024*1024;
const cmsDefaults=JSON.parse(fs.readFileSync(path.join(ROOT,'cms-map.json'),'utf8'));
const defaultData={
 firstName:'Abdalrahman',lastName:'Osman',role:'Logistics Manager',company:'GlowGate Cosmetics',start:'Jun 2026 – Present',
 leadEn:'Hospitality & Tourism Specialist<br>Operations • Customer Experience • Technology',leadAr:'متخصص في الضيافة والسياحة<br>العمليات • تجربة العملاء • التكنولوجيا',
 bioEn:'A Hospitality Management graduate with hands-on experience across hospitality and customer service, currently working as a Logistics Manager at GlowGate Cosmetics. I combine people skills, organization and a practical mindset to create smoother experiences and better workflows.',
 bioAr:'خريج إدارة ضيافة بخبرة عملية في الضيافة وخدمة العملاء، وأعمل حاليًا في GlowGate Cosmetics. أجمع بين مهارات التعامل مع الناس والتنظيم والعقلية العملية لصناعة تجارب أفضل وسير عمل أكثر كفاءة.',
 aboutTitleEn:'People-first. Organized. Curious.',aboutTitleAr:'شغوف بالناس. منظم. دائم التعلم.',
 aboutEn:'My background is rooted in hospitality: hotel and restaurant operations, guest relations, food & beverage and customer service. I also enjoy technology and building practical digital workflows that solve real problems.',
 aboutAr:'خلفيتي الأساسية في مجال الضيافة: عمليات الفنادق والمطاعم، علاقات النزلاء، الأغذية والمشروبات وخدمة العملاء. كما أهتم بالتكنولوجيا وبناء حلول رقمية عملية للمشكلات الحقيقية.',
 currentIntroEn:'Managing day-to-day logistics coordination and keeping the order-to-delivery workflow organized, accurate and on track.',currentIntroAr:'إدارة التنسيق اليومي للوجستيات والحفاظ على سير العمل من الطلب حتى التسليم بشكل منظم ودقيق.',
 email:'abdalrahmanosman0@gmail.com',phone:'+201101019467',linkedin:'https://www.linkedin.com/',accent:'#f3b75b',
 project1Title:'Logistics Smart Tool',project1Desc:'A smart workflow concept for organizing orders, recognizing addresses, classifying governorates and preparing shipments.',
 project2Title:'Discord Game Bot',project2Desc:'A monitoring and notification project concept using Node.js, Discord APIs and webhooks.',
 project3Title:'Nanna Reply App',project3Desc:'Android auto-reply app concept for WhatsApp and WhatsApp Business with a custom interface.',
 profileImage:'',cvData:'',seoTitle:'Abdalrahman Osman — Digital Portfolio',seoDescription:'Personal portfolio of Abdalrahman Osman — Logistics Manager at GlowGate Cosmetics, Hospitality & Tourism Specialist.',
 experienceData:[
  {id:'glowgate',company:'GlowGate Cosmetics',role:'Logistics Manager',date:'Jun 2026 – Present',current:true,desc:'Managing and coordinating day-to-day logistics operations across order preparation, shipment coordination, address validation, inventory flow, documentation and delivery follow-up.',items:['Coordinate order processing, preparation and shipment handover.','Organize shipping reports and maintain accurate order data.','Review customer addresses and identify the correct governorate / delivery area.','Coordinate with shipping partners and follow up on delivery status.','Track delayed, returned and undelivered shipments and support resolution.','Coordinate with warehouse, operations, customer service and purchasing teams.','Monitor inventory movement and support stock organization.','Prepare and maintain logistics spreadsheets, reports and operational records.','Verify phone numbers, shipment information and order details before dispatch.','Improve workflows, reduce manual errors and keep daily operations organized.']},
  {id:'kfc',company:'KFC, Faysal',role:'Crew Member',date:'Jan 2022 – May 2023',current:false,desc:'',items:['Prepared dishes according to specific recipes.','Measured ingredients accurately to support food quality.','Applied frying, grilling and steaming techniques.']},
  {id:'cuba',company:'Cuba Cabana, Maadi',role:'Crew Member',date:'Mar 2021 – Dec 2022',current:false,desc:'',items:['Welcomed guests, took orders and answered inquiries.','Recommended food and beverages based on customer needs.','Handled complaints and coordinated order delivery.']}
 ],
 serviceData:[
  {id:'logistics',title:'Logistics Management',desc:'Order flow, shipment coordination, delivery follow-up and daily logistics control.',icon:'◈'},
  {id:'operations',title:'Operations & Organization',desc:'Reports, accurate records, inventory movement and smoother workflows between teams.',icon:'✦'},
  {id:'customer',title:'Customer Experience',desc:'Hospitality-driven communication, problem solving and attention to service details.',icon:'◎'}
 ],
 skillData:[
  {id:'customer-service',name:'Customer Service',level:95},{id:'hospitality',name:'Hospitality Ops',level:90},{id:'cooking',name:'Cooking & Kitchen',level:88},{id:'communication',name:'Communication',level:90},{id:'office',name:'Microsoft Office',level:80},{id:'inventory',name:'Inventory & POS',level:82}
 ],
 educationData:[
  {id:'bachelor',title:'Bachelor’s Degree in Hospitality Management',meta:'Higher Institute for Specific Studies — Giza • May 2024',desc:'Hotel and restaurant management, customer service, hospitality operations, food & beverage management, kitchen operations and guest relations.'},
  {id:'tourism-school',title:'Tourism Secondary School Certificate',meta:'Orman Secondary Tourism School — Zahraa El Maadi',desc:'Specialized study in tourism and hospitality with fundamental industry skills.'}
 ],
 certificationData:[{id:'fidelio',name:'Fidelio'},{id:'opera',name:'Opera'},{id:'italian-kitchen',name:'Italian Kitchen'}],
 cms:cmsDefaults,
 projectData:{
  logistics:{title:'Logistics Smart Tool',desc:'A practical logistics workflow concept inspired by real order and shipping operations.',items:['Order organization and preparation','Address validation and governorate classification','Shipping reports and delivery follow-up','Workflow automation and error reduction'],tags:['Excel','Automation','AI']},
  discord:{title:'Discord Game Bot',desc:'A monitoring and notification project concept for game-server activity.',items:['Server status monitoring','Discord notifications','Webhook-based updates','Node.js project structure'],tags:['Node.js','Discord','Webhooks']},
  nanna:{title:'Nanna Reply App',desc:'An Android auto-reply concept designed for WhatsApp and WhatsApp Business.',items:['Automatic reply workflow','WhatsApp and WhatsApp Business support concept','Custom interface and settings','Focus on preventing repeated replies'],tags:['Android','WhatsApp','Automation']}
 },
 settings:{nav:{homeEn:'Home',homeAr:'الرئيسية',aboutEn:'About',aboutAr:'عني',careerEn:'Career',careerAr:'المسار',experienceEn:'Experience',experienceAr:'الخبرة',skillsEn:'Skills',skillsAr:'المهارات',workflowEn:'Workflow',workflowAr:'العمليات',servicesEn:'Services',servicesAr:'مجالاتي',projectsEn:'Projects',projectsAr:'المشاريع',contactEn:'Contact',contactAr:'تواصل'},theme:{accent:'#f3b75b'},links:{email:'abdalrahmanosman0@gmail.com',phone:'+201101019467',linkedin:'https://www.linkedin.com/'}}
};
function clone(x){return JSON.parse(JSON.stringify(x));}
function readData(){try{if(!fs.existsSync(DATA_FILE))return clone(defaultData);const p=JSON.parse(fs.readFileSync(DATA_FILE,'utf8'));return {...clone(defaultData),...(p&&typeof p==='object'?p:{})}}catch(e){console.error('Read data:',e.message);return clone(defaultData)}}
function writeData(d){const tmp=DATA_FILE+'.tmp';fs.writeFileSync(tmp,JSON.stringify(d,null,2),'utf8');fs.renameSync(tmp,DATA_FILE);return d}
if(!fs.existsSync(DATA_FILE))writeData(defaultData);
function send(res,code,body,type='application/json; charset=utf-8'){res.writeHead(code,{'Content-Type':type,'Cache-Control':'no-store'});res.end(type.startsWith('application/json')?JSON.stringify(body):body)}
function parseJson(req){return new Promise((resolve,reject)=>{let n=0,c=[];req.on('data',x=>{n+=x.length;if(n>MAX_BODY){reject(Object.assign(new Error('Request too large'),{status:413}));req.destroy();return}c.push(x)});req.on('end',()=>{try{resolve(JSON.parse(Buffer.concat(c).toString('utf8')||'{}'))}catch(e){reject(Object.assign(new Error('Invalid JSON'),{status:400}))}});req.on('error',reject)})}
function token(req){const h=req.headers.authorization||'';return h.startsWith('Bearer ')?h.slice(7):''}
const AUTH_SECRET=crypto.createHash('sha256').update(`AO_PORTFOLIO_AUTH|${ADMIN_PASSWORD}|v32`).digest('hex');
function makeToken(){const exp=Date.now()+12*60*60*1000;const payload=Buffer.from(JSON.stringify({exp}),'utf8').toString('base64url');const sig=crypto.createHmac('sha256',AUTH_SECRET).update(payload).digest('base64url');return payload+'.'+sig}
function authed(req){const t=token(req);if(!t)return false;const parts=t.split('.');if(parts.length!==2)return false;try{const payload=JSON.parse(Buffer.from(parts[0],'base64url').toString('utf8'));if(!payload.exp||Number(payload.exp)<Date.now())return false;const expected=crypto.createHmac('sha256',AUTH_SECRET).update(parts[0]).digest('base64url');return crypto.timingSafeEqual(Buffer.from(parts[1]),Buffer.from(expected))}catch(e){return false}}
function safePath(u){let p=decodeURIComponent(u.split('?')[0]);if(p==='/admin'||p==='/admin/')p='/admin.html';if(!p||p==='/')p='/index.html';const t=path.normalize(path.join(ROOT,p));if(t!==ROOT&&!t.startsWith(ROOT+path.sep))return null;return t}
const mime={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'application/javascript; charset=utf-8','.jpg':'image/jpeg','.jpeg':'image/jpeg','.png':'image/png','.svg':'image/svg+xml','.pdf':'application/pdf','.json':'application/json; charset=utf-8','.ico':'image/x-icon'};
function serve(req,res){const f=safePath(req.url);if(!f)return send(res,403,{error:'Forbidden'});fs.stat(f,(e,s)=>{if(e||!s.isFile())return send(res,404,{error:'Not found'});res.writeHead(200,{'Content-Type':mime[path.extname(f).toLowerCase()]||'application/octet-stream','Cache-Control':'no-cache'});fs.createReadStream(f).pipe(res)})}
const allowed=['firstName','lastName','role','company','start','leadEn','leadAr','bioEn','bioAr','aboutTitleEn','aboutTitleAr','aboutEn','aboutAr','currentIntroEn','currentIntroAr','email','phone','linkedin','accent','project1Title','project1Desc','project2Title','project2Desc','project3Title','project3Desc','profileImage','cvData','seoTitle','seoDescription','cms','projectData','experienceData','serviceData','skillData','educationData','certificationData','settings'];
const server=http.createServer(async(req,res)=>{try{const u=new URL(req.url,`http://${req.headers.host||'localhost'}`);
 if(req.method==='GET'&&u.pathname==='/api/health')return send(res,200,{ok:true,storage:'json',cmsFields:Object.keys(cmsDefaults).length});
 if(req.method==='GET'&&u.pathname==='/api/content')return send(res,200,readData());
 if(req.method==='GET'&&u.pathname==='/api/session'){return send(res,200,{ok:true,localNoAuth:true});}
 if(req.method==='POST'&&u.pathname==='/api/login'){return send(res,200,{token:'local-no-auth'})}
 if(req.method==='PUT'&&u.pathname==='/api/content'){const inc=await parseJson(req),cur=readData(),next=clone(cur);for(const k of allowed){if(inc[k]===undefined)continue;if(['cms','projectData','experienceData','serviceData','skillData','educationData','certificationData','settings'].includes(k)){if(inc[k]&&typeof inc[k]==='object')next[k]=inc[k];continue}if(typeof inc[k]==='string'){if(inc[k].trim()!==''||['profileImage','cvData'].includes(k))next[k]=inc[k]}}
 if(next.profileImage&&!/^data:image\/(jpeg|jpg|png|webp);base64,[A-Za-z0-9+/=]+$/.test(next.profileImage))next.profileImage=cur.profileImage;
 if(next.cvData&&!/^data:application\/pdf;base64,[A-Za-z0-9+/=]+$/.test(next.cvData))next.cvData=cur.cvData;
 if(next.accent&&!/^#[0-9a-fA-F]{6}$/.test(next.accent))next.accent=cur.accent;
 return send(res,200,writeData(next));}
 if(req.method==='POST'&&u.pathname==='/api/reset'){return send(res,200,writeData(clone(defaultData)))}
 if(req.method==='POST'&&u.pathname==='/api/logout'){return send(res,200,{ok:true})}
 return serve(req,res);
}catch(e){console.error(e);return send(res,e.status||500,{error:e.message||'Server error'})}});
server.listen(PORT,()=>console.log(`AO Portfolio running at http://localhost:${PORT}`));
