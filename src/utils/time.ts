export type TimeLeft = { hours: number; minutes: number; seconds: number; totalMs: number };


export function addMinutes(date: Date, minutes: number): Date {
return new Date(date.getTime() + minutes * 60_000);
}


export function diff(now: Date, end: Date): TimeLeft {
const totalMs = Math.max(0, end.getTime() - now.getTime());
const hours = Math.floor(totalMs / 3_600_000);
const minutes = Math.floor((totalMs % 3_600_000) / 60_000);
const seconds = Math.floor((totalMs % 60_000) / 1_000);
return { hours, minutes, seconds, totalMs };
}


export function formatHMS(t: TimeLeft): string {
const pad = (n: number) => String(n).padStart(2, "0");
return `${pad(t.hours)}:${pad(t.minutes)}:${pad(t.seconds)}`;
}


export function formatClock(date: Date): string {
return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}