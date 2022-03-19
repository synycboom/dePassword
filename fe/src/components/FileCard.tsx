import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import CardActionArea from "@mui/material/CardActionArea";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { useWeb3React } from "@web3-react/core";
import cryptojs from 'crypto-js';
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
  const [downloadUrl, setDownloadUrl] = useState("");
  const { account } = useWeb3React();
  const { fileName, fileType } = data;

  const saved = () => {
    setDetailOpen(false);
    onSaved();
  };

  const decryptFile = async (
    file: Blob,
    key: string,
  ): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onerror = function () {
        console.log("can't read the file");
        reject();
      };
      reader.onload = async function (event) {
        try {
          const bytes = cryptojs.AES.decrypt((event?.target?.result as string) || "", key);
          const decryptedContent = bytes.toString(CryptoJS.enc.Utf8);

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
    console.log(data);
    const key = await decryptMessage(encryptedKey, account!);
    const encryptedBlob = await downloadFile(swarmReference);
    const decryptedBlob = await decryptFile(encryptedBlob, key);
    const downloadUrl = window.URL.createObjectURL(decryptedBlob);

    console.log(downloadUrl);
    setDownloadUrl(downloadUrl);
    setDetailOpen(true);
  };

  return (
    <Card sx={{ width: 250, background: "#f1f1f199" }}>
      <FileDetailDrawer
        data={{
          ...data,
          downloadUrl,
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
            {fileName}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default FileCard;
