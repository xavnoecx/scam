import { MessageEvent } from "ws";

export interface IMessage {
  name: string;
  callback: (message: MessageEvent) => void;
}
