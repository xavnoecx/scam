export interface IEvent {
  name: string;
  callback: (...args: any[]) => void;
}
