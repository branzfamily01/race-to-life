const CAR_BASE='https://raw.githubusercontent.com/branzfamily01/race-to-study/main/assets/cars/';
const CARS=[
{id:1,name:'マクラーレン P1',asset:CAR_BASE+'mclaren-p1.svg',accent:'#ff7a1a',accent2:'#ffc878'},
{id:2,name:'マクラーレン スピードテール',asset:CAR_BASE+'mclaren-speedtail.svg',accent:'#b9d6f9',accent2:'#fff'},
{id:3,name:'ブガッティ ボリード',asset:CAR_BASE+'bugatti-bolide.webp',accent:'#1593ff',accent2:'#77e8ff'},
{id:4,name:'ラ フェラーリ',asset:CAR_BASE+'laferrari.webp',accent:'#ff2e2e',accent2:'#ff806a'},
{id:5,name:'ケーニグセグ アゲーラR',asset:CAR_BASE+'koenigsegg-agera-r.webp',accent:'#ff9d33',accent2:'#ffdc88'},
{id:6,name:'ケーニグセグ レゲーラ',asset:CAR_BASE+'koenigsegg-regera.webp',accent:'#96bfff',accent2:'#eaf4ff'},
{id:7,name:'パガーニ ウアイラ ロードスター',asset:CAR_BASE+'pagani-huayra-roadster.webp',accent:'#267bd7',accent2:'#91c8ff'},
{id:8,name:'日産 GT-R',asset:CAR_BASE+'nissan-gtr.webp',accent:'#d3d8df',accent2:'#fff'},
{id:9,name:'ホンダ NSX-R',asset:CAR_BASE+'honda-nsx-r.webp',accent:'#f5f7fa',accent2:'#fff'},
{id:10,name:'ホンダ NSX',asset:CAR_BASE+'honda-nsx.webp',accent:'#ff6b26',accent2:'#ffb275'},
{id:11,name:'ホンダ NSX タイプS',asset:CAR_BASE+'honda-nsx-type-s.webp',accent:'#ff3541',accent2:'#ffa8ad'}
];
const SOUND_COLLECTION=[
{id:'v6',name:'V6 SPORT',icon:'🔷',need:0,desc:'軽快で扱いやすいスポーツサウンド',base:78,wave:'triangle',harm:1.5},
{id:'v8',name:'V8 MUSCLE',icon:'🔥',need:150,desc:'低く太いドロドロ系',base:58,wave:'sawtooth',harm:1.46},
{id:'flat6',name:'FLAT-6',icon:'🧊',need:300,desc:'乾いた水平対向6気筒風',base:90,wave:'triangle',harm:1.9},
{id:'turbo',name:'TURBO',icon:'💨',need:500,desc:'吸気とブローオフが主役',base:74,wave:'square',harm:1.65},
{id:'supercharger',name:'SUPERCHARGER',icon:'⚙️',need:750,desc:'機械式過給器のうなり',base:68,wave:'sawtooth',harm:2.0},
{id:'rotary',name:'ROTARY',icon:'🔺',need:1000,desc:'高回転ロータリー風',base:104,wave:'sawtooth',harm:2.25},
{id:'v10',name:'V10 RACE',icon:'🏁',need:1350,desc:'鋭く高いレーシングサウンド',base:98,wave:'sawtooth',harm:1.84},
{id:'v12',name:'V12',icon:'👑',need:1750,desc:'滑らかな超高回転',base:112,wave:'triangle',harm:2.18},
{id:'f1',name:'F1 HIGH REV',icon:'🏎️',need:2200,desc:'甲高い高回転レーサー',base:145,wave:'sawtooth',harm:2.4},
{id:'antilag',name:'RALLY ANTI-LAG',icon:'💥',need:2700,desc:'加速後にパンパン鳴るラリー風',base:82,wave:'square',harm:1.7},
{id:'ev',name:'EV MOTOR',icon:'⚡',need:3300,desc:'未来的なモーター加速音',base:175,wave:'sine',harm:2.15},
{id:'hyperev',name:'HYPER EV',icon:'🌌',need:4000,desc:'SF的な超高速モーター音',base:220,wave:'sine',harm:2.75}
];
const PARTS=['エンジン','タイヤ(F)','タイヤ(R)','ウイング','ボディ','塗装 赤','塗装 青','塗装 金','ヘッドライト','ホイール A','ホイール B','エアロ','マフラー','インタークーラー','ブレーキ','サスペンション','シート','ステアリング','ECU','ニトロ'].map((name,i)=>({id:i+1,name,cost:300,icon:['⚙️','🛞','🛞','✈️','🏎️','🔴','🔵','🟡','💡','⭕','🔘','💨','🔥','❄️','🛑','🔩','💺','🎯','💻','⚡'][i]}));
const STUDY_TIMES=[5,10,15,20,25,30,45,60];
const CLEAN_TIMES=[3,5,7,10];
const BREAK_TIMES=[3,5,10,15];
const STORAGE='raceToLife_v1';

function dayKey(d=new Date()){return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`}
const fresh=()=>({
 points:0,totalPoints:0,streak:0,lastActiveDate:null,selectedCarId:1,selectedSound:'v6',soundVolume:'medium',timerVoice:true,
 unlockedParts:[],raceTickets:0,
 studyTasks:[],nextStudyTaskId:1,
 prepItems:[
  {id:1,name:'宿題',done:false},{id:2,name:'筆箱',done:false},{id:3,name:'水筒',done:false},{id:4,name:'ハンカチ・ティッシュ',done:false}
 ],nextPrepId:5,
 cleanBest:{},cleanHistory:[],daily:{date:dayKey(),study:false,clean:false,prep:false,grand:false},
 parentCode:'1234'
});
let state;try{state={...fresh(),...JSON.parse(localStorage.getItem(STORAGE)||'{}')}}catch{state=fresh()}
if(!state.daily||state.daily.date!==dayKey())state.daily={date:dayKey(),study:false,clean:false,prep:false,grand:false};
if(!Array.isArray(state.studyTasks))state.studyTasks=[];
if(!Array.isArray(state.prepItems))state.prepItems=fresh().prepItems;
let ui={screen:'home',parentUnlocked:false,toast:'',overlay:null,studyTask:null,timerMode:'study',studyMin:20,studyLeft:0,studyRun:false,breakMin:5,breakLeft:0,breakRun:false,cleanMin:5,cleanLeft:0,cleanRun:false,cleanCount:0,prepChallenge:false,prepLeft:300,prepRun:false,raceResult:null};
let studyTimer=null,breakTimer=null,cleanTimer=null,prepTimer=null,returnTimer=null,raceAnim=null,raceAudio=null,audioCtx=null,canCanTimer=null,speechMinute=null;
const carImages=new Map();CARS.forEach(c=>{const im=new Image();im.crossOrigin='anonymous';im.src=c.asset;carImages.set(c.id,im)});
let race=null;

function save(){localStorage.setItem(STORAGE,JSON.stringify(state))}
function car(){return CARS.find(c=>c.id===state.selectedCarId)||CARS[0]}
function snd(){return SOUND_COLLECTION.find(s=>s.id===state.selectedSound)||SOUND_COLLECTION[0]}
function soundUnlocked(s){return state.totalPoints>=s.need}
function vol(){return({off:0,small:.035,medium:.075,large:.13}[state.soundVolume]??.075)}
function esc(x=''){return String(x).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function $(q){return document.querySelector(q)}
function award(points,mode){
 const before=state.totalPoints;
 state.points+=points;state.totalPoints+=points;
 if(mode)state.daily[mode]=true;
 updateStreak();
 const sound=SOUND_COLLECTION.find(s=>before<s.need&&state.totalPoints>=s.need)||null;
 let grand=false;
 if(state.daily.study&&state.daily.clean&&state.daily.prep&&!state.daily.grand){state.daily.grand=true;state.raceTickets+=1;grand=true}
 save();return {sound,grand};
}
function updateStreak(){const today=dayKey();const y=new Date();y.setDate(y.getDate()-1);const yd=dayKey(y);if(state.lastActiveDate===today)return;if(state.lastActiveDate===yd)state.streak+=1;else state.streak=1;state.lastActiveDate=today}
function page(inner){document.documentElement.style.setProperty('--accent',car().accent);document.documentElement.style.setProperty('--accent2',car().accent2);return `<section class="shell">${inner}</section>${ui.overlay?overlay():''}${ui.toast?`<div class="toast">${esc(ui.toast)}</div>`:''}`}
function top(title,eye='RACE TO LIFE'){return `<div class="top"><div><div class="eye">${eye}</div><h1>${title}</h1></div><div class="score"><b>${state.points}</b><span>pt</span><small>🔥 ${state.streak}日</small></div></div>`}
function back(to='home'){return `<button class="back" data-go="${to}">← 戻る</button>`}
function carImg(id=state.selectedCarId,cls='car'){const c=CARS.find(x=>x.id===id)||CARS[0];return `<img class="${cls}" src="${c.asset}" alt="${esc(c.name)}">`}
function modeCard(icon,title,desc,screen,done){return `<button class="mode card ${done?'done':''}" data-go="${screen}"><span class="modeIcon">${icon}</span><span><b>${title}</b><small>${desc}</small></span>${done?'<em>✓ DONE</em>':'<em>GO →</em>'}</button>`}
