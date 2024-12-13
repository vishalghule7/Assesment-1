const Captcha = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
  let capchta = "";
  for (let i = 0; i < 6; i++) {
    const randomIdx = Math.floor(Math.random() * characters.length);
    capchta = capchta + characters[randomIdx];
  }
  return capchta;
};

export default Captcha;
