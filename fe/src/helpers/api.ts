import axios from "axios";
import setting from "../setting";

export const uploadFileToSwarm = async (encryptedFile: string) => {
  const url = `${setting.API_URL}/files/upload`;
  const result = await axios.post(url, { encryptedFile });
  return result;
};
