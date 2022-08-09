export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}
export interface DrawerItem {
  name: string;
  icon: string;
  redirectTo: string;
  classes: string;
}
export type Discipline = {
  name: string;
  id: number;
};
export type Record = {
  study_type: string;
  discipline_content_id: number | null;
  personal_notes: string;
  teacher_notes: string;
  completed_lesson: boolean;
  domain_level: number;
  studied_time: string;
  date: string;
  hour: string | undefined;
  cebraspe: boolean;
};
export type CicleItem = {
  study_cicle_id: number;
  discipline_content_id: number | null;
  notes: string;
  difficulty: number;
  total_time: number;
};
