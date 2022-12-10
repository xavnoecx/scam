export interface IConfig {
  token: string;
  clientId: string;
  log: {
    guildId: string;
    channelId: string;
  };
  capmonster: {
    key: string;
  };
}
