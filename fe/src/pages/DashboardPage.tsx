import { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import WebsiteCard from "../components/WebsiteCard";
import Button from "@mui/material/Button";
import WebsiteDetailDrawer from "../components/WebsiteDetailDrawer";
import Layout from "../components/Layout";

const DashboardPageStyle = styled(Box)`
  display: flex;

  .logo {
    width: 30px;
    height: 30px;
    margin-right: 16px;
    margin-left: 10px;
  }
`;

export default function DashboardPage() {
  const [detailOpen, setDetailOpen] = useState(false);

  return (
    <DashboardPageStyle>
      <Layout>
        <WebsiteDetailDrawer open={detailOpen} setOpen={setDetailOpen} />
        <Button
          variant="contained"
          sx={{ ml: 1, mb: 1 }}
          onClick={() => setDetailOpen(true)}
        >
          <AddIcon sx={{ mr: 0.5 }} /> Add Website
        </Button>
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          {[1, 2, 3, 4, 5, 6].map((index) => (
            <Box margin={1} key={index}>
              <WebsiteCard
                data={{
                  id: "1",
                  image:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/2021_Facebook_icon.svg/1280px-2021_Facebook_icon.svg.png",
                  name: "Facebook" + index,
                  username: "manotien@gmail.com" + index,
                  website: "www.facebook.com" + index,
                  password: "testtest" + index,
                }}
              />
            </Box>
          ))}
        </Box>
      </Layout>
    </DashboardPageStyle>
  );
}
