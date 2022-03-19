import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import WebsiteCard from "../components/WebsiteCard";
import Button from "@mui/material/Button";
import WebsiteDetailDrawer from "../components/WebsiteDetailDrawer";
import Layout from "../components/Layout";
import { getListCredentials } from "../contract";
import { WebsiteData } from "../types";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

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
  const [alert, setAlert] = useState(false);
  const [list, setList] = useState([]);

  useEffect(() => {
    getWebsiteList();
  }, []);

  const getWebsiteList = async () => {
    const websiteList = await getListCredentials();
    setList(websiteList);
  };

  const onSaved = () => {
    setDetailOpen(false);
    setAlert(true);
    getWebsiteList();
  };

  return (
    <DashboardPageStyle>
      <Layout>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={alert}
          onClose={() => setAlert(false)}
          autoHideDuration={3000}
        >
          <Alert severity="success">Updated success!</Alert>
        </Snackbar>

        <WebsiteDetailDrawer
          open={detailOpen}
          setOpen={setDetailOpen}
          onSaved={onSaved}
        />
        <Button
          variant="contained"
          sx={{ ml: 1, mb: 1 }}
          onClick={() => setDetailOpen(true)}
        >
          <AddIcon sx={{ mr: 0.5 }} /> Add Website
        </Button>
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          {list.map((data: WebsiteData, index) => (
            <Box margin={1} key={index}>
              <WebsiteCard
                data={{
                  ...data,
                  index,
                }}
                onSaved={onSaved}
              />
            </Box>
          ))}
        </Box>
      </Layout>
    </DashboardPageStyle>
  );
}
