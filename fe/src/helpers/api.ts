import axios from 'axios';
import setting from '../setting';

export const uploadFile = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('encryptedFile', file);

  const { data: { reference }} = await axios.post(`${setting.SERVER_URL}/v1/files/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

  return reference;
}

export const downloadFile = async (reference: string): Promise<Blob> => {
  const res = await axios.get(`${setting.SWARM_GATEWAY}/bzz/${reference}`);

  return new Blob([res.data]);
}
