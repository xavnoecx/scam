import { config } from "../config";

export class EmbedColours {
  public static readonly colours = {
    fail: 0xff2222,
    yellow: 0xffd500,
    custom: parseInt(config.colour, 16),
  };
}
