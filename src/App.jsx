import React, { useState, useMemo } from 'react'
import emperors from './data/emperors.json'
import { Link, useSearchParams } from 'react-router-dom'

export default function App(){
  const [age, setAge] = useState('')
  const [searchParams, setSearchParams] = useSearchParams()
  const q = searchParams.get('age') || ''

  React.useEffect(()=>{
    if(q) setAge(q)
  }, [q])

  const results = useMemo(()=>{
    const n = parseInt(age,10)
    if(Number.isNaN(n)) return []
    return emperors.filter(e => e.death_age === n)
  }, [age])

  const onSearch = (e)=>{
    e && e.preventDefault()
    setSearchParams(age ? {age} : {})
  }

  return (
    <div className="container">
      <header>
        <h1>Chinese Emperors — Death Age Profiles</h1>
        <p>输入年龄（整数），查看在该年龄去世的皇帝及其成就。</p>
      </header>

      <main>
        <form onSubmit={onSearch} className="search">
          <input type="number" placeholder="输入死亡年龄（例如：51）" value={age} onChange={e=>setAge(e.target.value)} />
          <button type="submit">搜索</button>
        </form>

        <section className="results">
          {results.length === 0 ? (
            <p>未找到对应记录。</p>
          ) : (
            results.map(e=> (
              <article key={e.id} className="card">
                <h2><Link to={`/emperors/${encodeURIComponent(e.id)}`}>{e.name} {e.temple_name ? `（${e.temple_name}）` : ''}</Link></h2>
                <p><strong>朝代：</strong>{e.dynasty} &middot; <strong>死亡年龄：</strong>{e.death_age}</p>
                <p>{e.summary}</p>
                <p><Link to={`/emperors/${encodeURIComponent(e.id)}`}>查看详情 →</Link></p>
              </article>
            ))
          )}
        </section>
      </main>

      <footer>
        <p>数据来自公开史料与维基，欢迎通过 PR 更新数据。仓库：<em>chineseemperors</em></p>
      </footer>
    </div>
  )
}
