import { Emperor } from '../types/emperor';

export function filterEmperorsByAge(emperors: Emperor[], age: number): Emperor[] {
  return emperors.filter(emperor => emperor.death_age === age);
}

export function getEmperorById(emperors: Emperor[], id: string): Emperor | undefined {
  return emperors.find(emperor => emperor.id === id);
}

export function sortEmperorsByDynasty(emperors: Emperor[]): Record<string, Emperor[]> {
  const grouped: Record<string, Emperor[]> = {};

  emperors.forEach(emperor => {
    if (!grouped[emperor.dynasty]) {
      grouped[emperor.dynasty] = [];
    }
    grouped[emperor.dynasty].push(emperor);
  });

  return grouped;
}