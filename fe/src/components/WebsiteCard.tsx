import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import CardActionArea from "@mui/material/CardActionArea";
import Typography from "@mui/material/Typography";
import WebsiteDetailDrawer from "./WebsiteDetailDrawer";
import { WebsiteData } from "../types";
import WebsiteLogo from "../components/WebsiteLogo";

type WebsiteCardProps = {
  data: WebsiteData;
  onSaved: () => void;
  index?: number;
};

const WebsiteCard = ({ data, onSaved }: WebsiteCardProps) => {
  const [detailOpen, setDetailOpen] = useState(false);
  const { name, maskedUsername } = data;

  const saved = () => {
    setDetailOpen(false);
    onSaved();
  };

  return (
    <Card sx={{ width: 250, background: "#f1f1f199" }}>
      <WebsiteDetailDrawer
        data={data}
        open={detailOpen}
        setOpen={setDetailOpen}
        onSaved={saved}
      />
      <CardActionArea onClick={() => setDetailOpen(true)}>
        <CardContent>
          <Box
            sx={{
              height: "100px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <WebsiteLogo website={data.website} />
          </Box>
          <Typography fontWeight="bold" noWrap>
            {name}
          </Typography>
          <Typography noWrap>{maskedUsername}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default WebsiteCard;
