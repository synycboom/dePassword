import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import CardActionArea from "@mui/material/CardActionArea";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { useWeb3React } from "@web3-react/core";
import cryptojs from "crypto-js";
import FileDetailDrawer from "./FileDetailDrawer";
import { FileUploadData } from "../types";
import { decryptMessage } from "../helpers";
import { downloadFile } from "../helpers/api";

type FileCardProps = {
  data: FileUploadData;
  onSaved: () => void;
};

const FileCard = ({ data, onSaved }: FileCardProps) => {
  const [detailOpen, setDetailOpen] = useState(false);
  const [fileBase64, setFileBase64] = useState("");
  const { account } = useWeb3React();
  const { name } = data;

  const saved = () => {
    setDetailOpen(false);
    onSaved();
  };

  const decryptFile = async (file: Blob, key: string): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onerror = function (err) {
        console.error(err);
        reject(err);
      };
      reader.onload = async function (event) {
        try {
          const bytes = cryptojs.AES.decrypt(
            (event?.target?.result as string) || "",
            key
          );
          const base64 = bytes.toString(cryptojs.enc.Utf8);
          const decryptedContent = atob(base64);

          resolve(new Blob([decryptedContent]));
        } catch (err) {
          reject(err);
        }
      };
      reader.readAsBinaryString(file);
    });
  };

  const onOpen = async () => {
    const { encryptedKey, swarmReference } = data;
    const key = await decryptMessage(encryptedKey, account!);
    const encryptedBlob = await downloadFile(swarmReference);
    const decryptedBlob = await decryptFile(encryptedBlob, key);

    setFileBase64(btoa(await decryptedBlob.text()));
    setDetailOpen(true);
  };

  return (
    <Card sx={{ width: 250, background: "#f1f1f199" }}>
      <FileDetailDrawer
        data={{
          ...data,
          fileBase64,
        }}
        open={detailOpen}
        setOpen={setDetailOpen}
        onSaved={saved}
      />
      <CardActionArea onClick={onOpen}>
        <CardContent>
          <Box
            py={4}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <LockOpenIcon sx={{ fontSize: 64 }} />
            <Typography fontWeight="bold" noWrap>
              Click to open
            </Typography>
          </Box>
          <Divider />
          <Typography fontWeight="" noWrap pt={2}>
            {name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default FileCard;
