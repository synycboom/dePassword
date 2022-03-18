import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import CardActionArea from "@mui/material/CardActionArea";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import FileDetailDrawer from "./FileDetailDrawer";

type FileCardProps = {
  data: {
    id: number;
    name: string;
    file: string;
  };
};

const FileCard = ({ data }: FileCardProps) => {
  const [detailOpen, setDetailOpen] = useState(false);
  const { id, name, file } = data;

  return (
    <Card sx={{ width: 250, background: "#f1f1f199" }}>
      <FileDetailDrawer data={data} open={detailOpen} setOpen={setDetailOpen} />
      <CardActionArea onClick={() => setDetailOpen(true)}>
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
