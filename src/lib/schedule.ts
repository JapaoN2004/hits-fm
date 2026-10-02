import { programById, schedule } from "@/data/schedule";
import type { ScheduleSlot, Weekday } from "@/data/types";
import { site } from "./site";

function toMinutes(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

// Dia da semana e minuto do dia no fuso de Palmas.
export function palmasNow(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: site.timeZone,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return {
    day: days.indexOf(get("weekday")) as Weekday,
    minutes: Number(get("hour")) * 60 + Number(get("minute")),
  };
}

export function slotsForDay(day: Weekday) {
  return schedule
    .filter((s) => s.day === day)
    .sort((a, b) => toMinutes(a.start) - toMinutes(b.start));
}

export function isLive(slot: ScheduleSlot, now = palmasNow()) {
  return (
    slot.day === now.day &&
    toMinutes(slot.start) <= now.minutes &&
    now.minutes < toMinutes(slot.end)
  );
}

// Programa no ar agora e o próximo do mesmo dia (sem programa = programação musical).
export function onAirNow(now = palmasNow()) {
  const today = slotsForDay(now.day);
  const current = today.find((s) => isLive(s, now));
  const next = today.find((s) => toMinutes(s.start) > now.minutes);
  return {
    current: current && { slot: current, program: programById(current.programId) },
    next: next && { slot: next, program: programById(next.programId) },
  };
}

export function formatHour(hhmm: string) {
  return hhmm === "24:00" ? "00h" : hhmm.replace(":00", "h").replace(":", "h");
}
