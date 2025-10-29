import { useState } from 'react'

interface ShareButtonProps {
  url: string
  title: string
}

function ShareButton({ url, title }: ShareButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    // Try to use the Web Share API first
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          url: url,
        })
        return
      } catch (err) {
        console.log('Web Share API failed, falling back to clipboard')
      }
    }

    // Fallback to clipboard
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy to clipboard:', err)
      alert('复制链接失败，请手动复制')
    }
  }

  return (
    <button onClick={handleShare} className="btn" style={{ marginLeft: '10px' }}>
      {copied ? '链接已复制！' : '分享页面'}
    </button>
  )
}

export default ShareButton