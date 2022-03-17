import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActionArea from "@mui/material/CardActionArea";
import Typography from "@mui/material/Typography";
import WebsiteDetailDrawer from "./WebsiteDetailDrawer";

type WebsiteCardProps = {
  data: {
    id: string;
    image: string;
    name: string;
    username: string;
    website: string;
    password: string;
  };
};

const WebsiteCard = ({ data }: WebsiteCardProps) => {
  const [detailOpen, setDetailOpen] = useState(false);
  const { image, name, username } = data;

  return (
    <Card sx={{ width: 250, background: "#f1f1f199" }}>
      <WebsiteDetailDrawer
        data={data}
        open={detailOpen}
        setOpen={setDetailOpen}
      />
      <CardActionArea onClick={() => setDetailOpen(true)}>
        <CardContent>
          <CardMedia
            sx={{ objectFit: "contain", mb: 2 }}
            component="img"
            height="100"
            image={image}
            alt={name}
          />
          <Typography fontWeight="bold" noWrap>
            {name}
          </Typography>
          <Typography noWrap>{username}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default WebsiteCard;