import { ja, enUS } from 'date-fns/locale';
import { parseISO, format } from "date-fns";
export const parse = (utc: string) => parseISO(utc);
export const fmt = (date: Date, fmt: string) => format(date, fmt, { locale: ja });
export const fmtEn = (date: Date, fmt: string) => format(date, fmt, { locale: enUS });
export const fmtDate = (date: string) => format(parse(date), "MMMM dd, yyyy", { locale: enUS });
export const fmtDateJa = (date: string) => fmt(parse(date), "yyyy年MM月dd日")
export const fmtTime = (date: string) => fmt(parse(date), " HH:mm")
// export const fmtDay = (date: string) => fmt(parse(date), "eee")
export const fmtDay = (date: string) => format(parse(date), "eee", { locale: enUS });
