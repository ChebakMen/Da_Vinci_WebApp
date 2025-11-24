import { Action } from "./HistoryAction";

export interface IUser{
  id:string;
  email: string;
  fio: string;
  phone: string;
  history: Action[];
  roll: string;
  workAddress?: string,
  height?: string,
  weight?: string,
}