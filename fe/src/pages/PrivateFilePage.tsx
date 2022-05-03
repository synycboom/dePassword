import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import ConstructionIcon from "@mui/icons-material/Construction";
import Layout from "../components/Layout";
import FileCard from "../components/FileCard";
import FileDetailDrawer from "../components/FileDetailDrawer";
import { getListFiles } from "../contract";
import { FileUpload } from "../types";

const PrivateFilePageStyle = styled("div")`
  .maintenance {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 500px;
  }
`;

const PrivateFilePage = () => {
  const [detailOpen, setDetailOpen] = useState(false);
  const [alert, setAlert] = useState(false);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    getFileList();
  }, []);

  const getFileList = async () => {
    const fileList = await getListFiles();
    setFiles(fileList);
  };

  const onSaved = () => {
    setDetailOpen(false);
    setAlert(true);
    getFileList();
  };

  const isMaintenance = true;

  return (
    <PrivateFilePageStyle>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={alert}
        onClose={() => setAlert(false)}
        autoHideDuration={3000}
      >
        <Alert severity="success">Updated success!</Alert>
      </Snackbar>

      <FileDetailDrawer open={detailOpen} setOpen={setDetailOpen} onSaved={onSaved} />
      <Layout>
        {isMaintenance ? (
          <div className="maintenance">
            <Typography variant="h4">Under maintenance</Typography>
            <ConstructionIcon style={{ fontSize: 48, marginTop: 16 }} />
          </div>
        ) : (
          <>
            <Button variant="contained" sx={{ ml: 1, mb: 1 }} onClick={() => setDetailOpen(true)}>
              <AddIcon sx={{ mr: 0.5 }} /> Add File
            </Button>
            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
              {files.map((file: FileUpload, index) => (
                <Box margin={1} key={index}>
                  <FileCard
                    onSaved={onSaved}
                    data={{
                      ...file,
                      index,
                    }}
                  />
                </Box>
              ))}
            </Box>
          </>
        )}
      </Layout>
    </PrivateFilePageStyle>
  );
};

export default PrivateFilePage;
