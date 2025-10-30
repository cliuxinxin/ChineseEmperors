const fs = require('fs')
const path = require('path')
const data = require('../src/data/emperors.json')
let ok = true

data.forEach(e=>{
  if(!e.id || !e.name) { console.error('缺少 id 或 name:', e); ok=false }
  if(typeof e.death_age !== 'number') { console.error('death_age 非数值:', e.id); ok=false }
  if(!Array.isArray(e.achievements)) { console.error('achievements 非数组:', e.id); ok=false }
})
if(!ok){
  console.error('数据校验未通过')
  process.exit(1)
}
console.log('数据校验通过')
