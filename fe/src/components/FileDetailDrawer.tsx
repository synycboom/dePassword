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
import { getPublicKey, encryptMessage, generateKey } from "../helpers";
import CircularProgress from "@mui/material/CircularProgress";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
import cryptojs from 'crypto-js';

import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { useWeb3React } from "@web3-react/core";
import { addFile, deleteFile } from "../contract";
import { uploadFile } from '../helpers/api';

registerPlugin(FilePondPluginImagePreview, FilePondPluginFileValidateSize);

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
  const { account } = useWeb3React();
  const [loading, setLoading] = useState(false);
  const [encrypting, setEncrypting] = useState(false);

  const clear = () => {
    setName("");
    setFile(null);
  };

  useEffect(() => {
    if (!(open && data)) {
      clear();
    }
  }, [open, data]);

  const onFileChange = async (files: any) => {
    if (!files.length) {
      setFile(null);

      return;
    }

    const file = files[0].file;
    setFile(file);
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

  const encryptFile = async (
    file: ActualFileObject,
    key: string,
  ): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onerror = function () {
        console.log("can't read the file");
        reject();
      };
      reader.onload = async function (event) {
        try {
          const base64 = btoa((event?.target?.result as string) || "");
          const encryptedContent = cryptojs.AES.encrypt(base64, key).toString();

          resolve(new Blob([encryptedContent]));
        } catch (err) {
          reject(err);
        }
      };
      reader.readAsBinaryString(file);
    });
  };

  const onSave = async () => {
    if (!file || !name) return;

    let reference = '';
    let encryptedKey = '';
    try {
      setEncrypting(true);
      const publicKey = await getPublicKey(account!);
      const key = generateKey();
      const blob = await encryptFile(file, key);
      const encryptedFile = new File([blob], file.name ,{ type: file.type, lastModified: file.lastModified});
      encryptedKey = encryptMessage(publicKey, key);
      reference = await uploadFile(encryptedFile);
    } finally {
      setEncrypting(false);
    }

    try {
      setLoading(true);
      const fileData = {
        name,
        encryptedKey,
        fileName: file.name,
        fileType: file.type,
        swarmReference: reference,
      };
      await addFile(fileData);
    } catch (e) {
      console.error(e);
      setLoading(false);
      return;
    }
    setLoading(false);
    onSaved();
  };

  const onDelete = async () => {
    if (data) {
      setLoading(true);
      await deleteFile(data.index);
      setLoading(false);
      onSaved();
    }
  };

  const canSave = !!name && !!file;

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

        {encrypting && (
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
              Encrypting and uploading a file ...
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
                {data.fileType.includes("image") ? (
                  <img
                    className="preview-image"
                    src={data.downloadUrl}
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
                      maxFileSize="10MB"
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
                <a
                  download={data.fileName}
                  style={{ textDecoration: "unset" }}
                  href={data.downloadUrl}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={onSave}
                  >
                    Download
                  </Button>
                </a>
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
              <Button
                variant="contained"
                color="error"
                fullWidth
                onClick={onDelete}
              >
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
