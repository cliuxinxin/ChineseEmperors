import { Emperor, EmperorData } from '../types/emperor'

let cachedData: EmperorData | null = null

export async function loadEmperorData(): Promise<EmperorData> {
  if (cachedData) {
    return cachedData
  }

  try {
    // 在 GitHub Pages 上使用相对路径
    const basePath = process.env.NODE_ENV === 'production' ? '/ChineseEmperors' : ''
    const response = await fetch(`${basePath}/data/emperors.json`)
    if (!response.ok) {
      throw new Error(`Failed to load data: ${response.status}`)
    }
    const data = await response.json()
    cachedData = data
    return data
  } catch (error) {
    console.error('Error loading emperor data:', error)
    throw error
  }
}

export function getEmperorById(id: string, data: EmperorData): Emperor | null {
  return data.emperors.find(emperor => emperor.id === id) || null
}

export function getEmperorsByDeathAge(age: number, data: EmperorData): Emperor[] {
  return data.emperors.filter(emperor => emperor.death_age === age)
}

export function getAllDeathAges(data: EmperorData): number[] {
  const ages = data.emperors.map(emperor => emperor.death_age)
  return [...new Set(ages)].sort((a, b) => a - b)
}