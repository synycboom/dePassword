import { useEffect, useState } from "react";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import OutlinedInput from "@mui/material/OutlinedInput";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import { ActualFileObject } from "filepond";
import { FileUploadData } from "../types";
import { getPublicKey, encryptMessage, decryptMessage } from "../helpers";
import CircularProgress from "@mui/material/CircularProgress";

import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { useWeb3React } from "@web3-react/core";
import { addFile } from "../contract";

registerPlugin(FilePondPluginImagePreview);

const ContainerStyle = styled(Box)`
  width: 500px;

  .filepond--credits {
    display: none;
  }

  .preview-image {
    width: 100%;
  }
`;

type FileDetailDrawerProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  data?: FileUploadData;
  onSaved: () => void;
};

const FileDetailDrawer = ({
  open,
  setOpen,
  data,
  onSaved,
}: FileDetailDrawerProps) => {
  const [name, setName] = useState("");
  const [file, setFile] = useState<ActualFileObject | null>(null);
  const [fileBase64, setFileBase64] = useState("");
  const { account } = useWeb3React();
  const [loading, setLoading] = useState(false);

  const clear = () => {
    setName("");
    setFile(null);
    setFileBase64("");
  };

  useEffect(() => {
    if (!(open && data)) {
      clear();
    }
  }, [open, data]);

  const onFileChange = async (files: any) => {
    const file = files[0].file;
    setFile(file);
    const base64 = await convertFileToBase64(file);
    setFileBase64(base64);
  };

  const convertFileToBase64 = async (
    file: ActualFileObject
  ): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsBinaryString(file);

      reader.onload = function (event) {
        const base64 = btoa((event?.target?.result as string) || "");
        resolve(base64);
      };
      reader.onerror = function () {
        console.log("can't read the file");
        reject();
      };
    });
  };

  const onSave = async () => {
    if (!file || !fileBase64 || !name) return;

    const publicKey = await getPublicKey(account!);
    const encryptedFile = encryptMessage(publicKey, fileBase64);

    setLoading(true);
    const fileData = {
      name,
      fileName: file.name,
      fileType: file.type,
      swarmReference: encryptedFile,
    };
    try {
      await addFile(fileData);
    } catch (e) {
      console.log(e);
      setLoading(false);
      return;
    }
    setLoading(false);
    onSaved();
  };

  const canSave = !!name && !!fileBase64;
  const isImage = true;

  return (
    <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
      <ContainerStyle>
        {loading && (
          <Box
            sx={{
              position: "absolute",
              height: "100%",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backdropFilter: "blur(2px)",
              zIndex: 1,
              flexDirection: "column",
            }}
          >
            <CircularProgress size={80} />
            <Typography variant="h6" pt={2}>
              Pending transaction ...
            </Typography>
          </Box>
        )}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            p: 3,
          }}
        >
          <Typography fontWeight="bold" variant="h5" noWrap>
            {data?.name || "Add File"}
          </Typography>
        </Box>
        <Divider />
        <Box p={4} pb={1}>
          <Grid container spacing={3} alignItems="center">
            {data ? (
              <Grid item xs={12} p={2}>
                {isImage ? (
                  <img
                    className="preview-image"
                    src={`data:${data.fileType};base64, ${data.fileBase64}`}
                    alt="file"
                  />
                ) : (
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <AttachFileIcon sx={{ fontSize: 104 }} />
                  </Box>
                )}
              </Grid>
            ) : (
              <>
                <Grid item xs={2}>
                  <Typography textAlign="right" fontWeight="bold">
                    Name
                  </Typography>
                </Grid>
                <Grid item xs={9}>
                  <OutlinedInput
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    // onChange={(e) => setName(e.target.value)}
                    size="small"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ cursor: "pointer" }}>
                    <FilePond
                      files={file ? [file] : []}
                      onupdatefiles={onFileChange}
                      allowMultiple={false}
                      maxFiles={1}
                      name="file"
                      labelIdle="Drag & Drop your files"
                    />
                  </Box>
                </Grid>
              </>
            )}
          </Grid>
        </Box>
        <Box px={4}>
          <Grid container spacing={2}>
            {data ? (
              <Grid item xs={4}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={onSave}
                >
                  Download
                </Button>
              </Grid>
            ) : (
              <Grid item xs={3}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={!canSave}
                  onClick={onSave}
                >
                  Save
                </Button>
              </Grid>
            )}
            <Grid item xs={3}>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
            </Grid>
            <Grid
              item
              xs={3}
              sx={{ marginLeft: "auto" }}
              display={data ? "block" : "none"}
            >
              <Button variant="contained" color="error" fullWidth>
                Delete
              </Button>
            </Grid>
          </Grid>
        </Box>
      </ContainerStyle>
    </Drawer>
  );
};

export default FileDetailDrawer;
