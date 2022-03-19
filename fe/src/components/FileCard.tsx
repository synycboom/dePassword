import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import CardActionArea from "@mui/material/CardActionArea";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { useWeb3React } from "@web3-react/core";
import FileDetailDrawer from "./FileDetailDrawer";
import { FileUploadData } from "../types";
import { decryptMessage } from "../helpers";

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

  const onOpen = async () => {
    const encryptedFile = data.swarmReference;
    const decrypedFile = await decryptMessage(encryptedFile, account!);
    setFileBase64(decrypedFile);
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
