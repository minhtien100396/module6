export interface Notification {
  body?:string;
  title?:string;
}

export interface MessagePayload {
  notification:Notification,
  data?:{[key:string]:string}
}
