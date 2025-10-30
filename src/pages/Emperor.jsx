import React from 'react'
import { useParams, Link } from 'react-router-dom'
import emperors from '../data/emperors.json'

export default function Emperor(){
  const { id } = useParams()
  const e = emperors.find(x=> x.id === id)
  if(!e) return (
    <div className="container"><p>未找到此皇帝。<Link to="/">返回首页</Link></p></div>
  )

  return (
    <div className="container">
      <header>
        <h1>{e.name} {e.temple_name ? `（${e.temple_name}）` : ''}</h1>
        <p>{e.dynasty} · {e.birth_date || '—'} — {e.death_date || '—'} · 死亡年龄：{e.death_age}</p>
      </header>

      <section>
        <h2>成就（按年龄）</h2>
        <ul>
          {e.achievements.map((a, idx)=> (
            <li key={idx}><strong>{a.age} 岁：</strong>{a.event}</li>
          ))}
        </ul>

        <h3>简介</h3>
        <p>{e.summary}</p>

        <h3>来源</h3>
        <ul>
          {e.sources.map((s, i)=> (
            <li key={i}>{s.title}{s.url ? ` — ${s.url}` : ''}</li>
          ))}
        </ul>

        <p><Link to="/">« 返回</Link></p>
      </section>
    </div>
  )
}
