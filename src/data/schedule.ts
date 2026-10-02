import type { Program, ScheduleSlot, Weekday } from "./types";

// TODO(cliente): grade atualizada. Esta é a que está no site atual.
export const programs: Program[] = [
  { id: "redacao-1", name: "Direto da Redação – 1ª edição", hostIds: [] },
  { id: "redacao-2", name: "Direto da Redação – 2ª edição", hostIds: [] },
  { id: "go-back", name: "Go Back", hostIds: [] },
  { id: "live-hits", name: "Live Hits", hostIds: [] },
  { id: "via-brasil", name: "Via Brasil", hostIds: [] },
  { id: "night-hits", name: "Night Hits", hostIds: [] },
  { id: "rock-hits", name: "Rock Hits", hostIds: [] },
  { id: "especiais", name: "Especiais da Hits", hostIds: [] },
  { id: "80-por-hora", name: "80 por Hora", hostIds: [] },
];

const weekdays: Weekday[] = [1, 2, 3, 4, 5];

export const schedule: ScheduleSlot[] = [
  ...weekdays.flatMap((day): ScheduleSlot[] => [
    { programId: "redacao-1", day, start: "07:00", end: "08:00" },
    { programId: "go-back", day, start: "08:00", end: "10:00" },
    { programId: "live-hits", day, start: "12:00", end: "13:00" },
    { programId: "via-brasil", day, start: "13:00", end: "14:00" },
    { programId: "redacao-2", day, start: "18:00", end: "19:00" },
    { programId: "night-hits", day, start: "19:00", end: "24:00" },
  ]),
  { programId: "go-back", day: 6, start: "08:00", end: "10:00" },
  { programId: "via-brasil", day: 6, start: "13:00", end: "14:00" },
  { programId: "rock-hits", day: 6, start: "14:00", end: "15:00" },
  { programId: "especiais", day: 6, start: "17:00", end: "18:00" },
  { programId: "night-hits", day: 6, start: "19:00", end: "21:00" },
  { programId: "80-por-hora", day: 6, start: "22:00", end: "24:00" },
  { programId: "via-brasil", day: 0, start: "13:00", end: "14:00" },
  { programId: "especiais", day: 0, start: "17:00", end: "18:00" },
];

export const dayNames = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

export function programById(id: string) {
  return programs.find((p) => p.id === id);
}
