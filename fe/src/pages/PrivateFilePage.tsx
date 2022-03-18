import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { useState } from "react";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import Layout from "../components/Layout";
import FileCard from "../components/FileCard";
import FileDetailDrawer from "../components/FileDetailDrawer";

const PrivateFilePageStyle = styled("div")``;

const PrivateFilePage = () => {
  const [detailOpen, setDetailOpen] = useState(false);

  return (
    <PrivateFilePageStyle>
      <FileDetailDrawer open={detailOpen} setOpen={setDetailOpen} />
      <Layout>
        <Button
          variant="contained"
          sx={{ ml: 1, mb: 1 }}
          onClick={() => setDetailOpen(true)}
        >
          <AddIcon sx={{ mr: 0.5 }} /> Add File
        </Button>
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          {[1, 2, 3, 4, 5, 6].map((index) => (
            <Box margin={1}>
              <FileCard
                data={{
                  id: 1,
                  name: "TEST",
                  file: "TEXT",
                }}
              />
            </Box>
          ))}
        </Box>
      </Layout>
    </PrivateFilePageStyle>
  );
};

export default PrivateFilePage;
