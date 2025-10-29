export interface Achievement {
  age: number;
  event: string;
}

export interface Source {
  title: string;
  url: string | null;
}

export interface Emperor {
  id: string;
  name: string;
  temple_name: string;
  dynasty: string;
  birth_date: string;
  death_date: string;
  death_age: number;
  achievements: Achievement[];
  summary: string;
  sources: Source[];
}

export interface EmperorData {
  emperors: Emperor[];
}