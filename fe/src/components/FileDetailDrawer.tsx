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
import { ActualFileObject, FilePondFile } from "filepond";

import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

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
  data?: {
    id: number;
    file: string;
    name: string;
  };
};

const INITIAL_VALUES = {
  name: "",
  file: [] as FilePondFile[],
};

const FileDetailDrawer = ({ open, setOpen, data }: FileDetailDrawerProps) => {
  const [values, setValues] = useState(INITIAL_VALUES);
  const [base64, setBase64] = useState("");

  const clear = () => {
    setValues(INITIAL_VALUES);
  };

  useEffect(() => {
    if (open && data) {
      const { name, file } = data;
      setValues({
        name,
        file: [],
      });
    } else {
      clear();
    }
  }, [open, data]);

  const onChange = (value: string, field: string) => {
    setValues({
      ...values,
      [field]: value,
    });
  };

  const setFile = (file: any) => {
    onChange(file, "file");
  };

  const convertFileToBase64 = async (
    file: ActualFileObject
  ): Promise<string> => {
    return new Promise((resolve, reject) => {
      console.log(file);
      const reader = new FileReader();
      reader.readAsBinaryString(file);

      reader.onload = function (event) {
        // Convert file to Base64 string
        // btoa is built int javascript function for base64 encoding
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
    const fileBase64 = await convertFileToBase64(values.file[0].file);
    console.log(fileBase64);
    setBase64(fileBase64);
  };

  const canSave = !!values.name && !!values.file.length;
  const isImage = true;

  return (
    <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
      <ContainerStyle>
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
            {!data ? (
              <Grid item xs={12} p={2}>
                {isImage ? (
                  <img
                    className="preview-image"
                    src={
                      "https://freepikpsd.com/file/2019/11/transparent-png-example-Images.png"
                    }
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
                <Grid item xs={3}>
                  <Typography textAlign="right" fontWeight="bold">
                    Name
                  </Typography>
                </Grid>
                <Grid item xs={9}>
                  <OutlinedInput
                    value={values.name}
                    onChange={(e) => onChange(e.target.value, "name")}
                    size="small"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ cursor: "pointer" }}>
                    <FilePond
                      files={values.file as any}
                      onupdatefiles={setFile}
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
        <img src={`data:image/jpeg;base64,${base64}`} /> dsadadsa
        <Box px={4}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              {data ? (
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={onSave}
                >
                  Download
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={!canSave}
                  onClick={onSave}
                >
                  Save
                </Button>
              )}
            </Grid>
            <Grid item xs={3}>
              <Button
                variant="outlined"
                fullWidth
                // onClick={() => setOpen(false)}
                onClick={() =>
                  (window.location.href =
                    "data:application/octet-stream;base64," + base64)
                }
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
