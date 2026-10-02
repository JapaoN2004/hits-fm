// Mesmo formato que as tabelas do Supabase terão na fase 4.

export type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6; // 0 = domingo

export type Program = {
  id: string;
  name: string;
  description?: string;
  hostIds: string[];
};

export type ScheduleSlot = {
  programId: string;
  day: Weekday;
  start: string; // "HH:MM", horário de Palmas
  end: string; // "HH:MM"; "24:00" para meia-noite
};

export type Host = {
  id: string;
  slug: string;
  name: string;
  bio: string;
  photo?: string;
};

export type NewsPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string; // ISO
  cover?: string;
  content: string[]; // parágrafos (o HTML sanitizado do banco entra na fase 4)
};

export type Promotion = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  howTo: string[];
  rules: string[];
  endsAt: string; // ISO
};
