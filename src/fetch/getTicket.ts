import fetch from "node-fetch";

export const getTicket = async (ticket: string) => {
  const response = await fetch(
    "https://discord.com/api/v9/users/@me/remote-auth/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:102.0) Gecko/20100101 Firefox/102.0",
      },
      body: JSON.stringify({
        ticket,
      }),
    }
  );

  return response.json();
};

export const getTicketWithCaptcha = async (
  ticket: string,
  captcha_key: string,
  captcha_rqtoken: string
) => {
  const response = await fetch(
    "https://discord.com/api/v9/users/@me/remote-auth/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:102.0) Gecko/20100101 Firefox/102.0",
      },
      body: JSON.stringify({
        ticket,
        captcha_key,
        captcha_rqtoken,
      }),
    }
  );

  return response.json();
};
