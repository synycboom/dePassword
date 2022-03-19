import { bufferToHex, hashPersonalMessage } from "ethereumjs-util";
import { encrypt } from "@metamask/eth-sig-util";

export const formatAddress = (address: string, showLength: number): string => {
  const length = address.length;
  return `${address.substring(0, showLength)}...${address.substring(
    length - showLength,
    length
  )}`;
};

export const encryptMessage = (publicKey: string, data: any) => {
  return bufferToHex(
    Buffer.from(
      JSON.stringify(
        encrypt({
          publicKey,
          data,
          version: "x25519-xsalsa20-poly1305",
        })
      ),
      "utf8"
    )
  );
};

export const decryptMessage = (
  encryptedMessage: string,
  account: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    window.ethereum!.request!({
      method: "eth_decrypt",
      params: [encryptedMessage, account],
    })
      .then((decryptedMessage: any) => resolve(decryptedMessage))
      .catch((error) => reject);
  });
};

export const getPublicKey = (account: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    window.ethereum!.request!({
      method: "eth_getEncryptionPublicKey",
      params: [account],
    })
      .then((result: any) => {
        resolve(result);
      })
      .catch((error) => {
        if (error.code === 4001) {
          // EIP-1193 userRejectedRequest error
          console.log("We can't encrypt anything without the key.");
        } else {
          console.error(error);
        }
        reject();
      });
  });
};

export const signMessage = async (account: string, message: string) => {
  const messageHash = hashPersonalMessage(Buffer.from(message));
  return window.ethereum!.request!({
    method: "personal_sign",
    params: [messageHash, account],
  });
};

export const maskedText = (text: string, showCount: number) => {
  const head = text.slice(0, showCount);
  const tail = text.slice(-showCount);
  return `${head}${"*".repeat(text.length - showCount * 2)}${tail}`;
};
