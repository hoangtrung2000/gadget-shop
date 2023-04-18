import crypto from "crypto";
const cryptoHash = (data) => {
  const hash = crypto.createHash("sha256").update(data).digest("hex");
  return hash;
};
export default cryptoHash;
