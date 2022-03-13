import Drawer from "@mui/material/Drawer";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActionArea from "@mui/material/CardActionArea";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";

type WebsiteCardProps = {
  data: {
    image: string;
    name: string;
    username: string;
  };
};

const WebsiteCard = ({ data }: WebsiteCardProps) => {
  const [detailOpen, setDetailOpen] = useState(false);
  const { image, name, username } = data;

  return (
    <Card sx={{ width: 250, background: "#f1f1f199" }}>
      <Drawer
        anchor="right"
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
      >
        <Box sx={{ width: 500 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              p: 3,
            }}
          >
            <img
              src={image}
              alt={name}
              style={{ height: "100px", marginRight: "40px" }}
            />
            <Typography fontWeight="bold" variant="h5" noWrap>
              {name}
            </Typography>
          </Box>
          <Divider />
          <Box p={4}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Typography>Username</Typography>
              </Grid>
              <Grid item xs={8}>
                123
              </Grid>
              <Grid item xs={4}>
                <Typography>Password</Typography>
              </Grid>
              <Grid item xs={8}>
                123
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Drawer>
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
