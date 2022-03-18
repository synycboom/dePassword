import { useEffect, useState } from "react";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import EnhancedEncryptionIcon from "@mui/icons-material/EnhancedEncryption";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CopyToClipboard from "./CopyToClipbaord";
import { Button } from "@mui/material";
import { useWeb3React } from "@web3-react/core";
import {
  getPublicKey,
  encryptMessage,
  decryptMessage,
  maskedText,
} from "../helpers";
import { WebsiteData } from "../types";

type WebsiteDetailDrawerProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  data?: WebsiteData;
};

const INITIAL_VALUES = {
  name: "",
  website: "",
  username: "",
  password: "",
};

const WebsiteDetailDrawer = ({
  open,
  setOpen,
  data,
}: WebsiteDetailDrawerProps) => {
  const [values, setValues] = useState(INITIAL_VALUES);
  const [showUsername, setShowUsername] = useState(!data);
  const [showPassword, setShowPassword] = useState(!data);
  const { account } = useWeb3React();

  const clear = () => {
    setValues(INITIAL_VALUES);
    setShowUsername(!data);
    setShowPassword(!data);
  };

  useEffect(() => {
    if (open && data) {
      const { name, website } = data;
      setValues({
        name,
        website,
        username: "",
        password: "",
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

  const showField = async (
    field: "name" | "website" | "username" | "password"
  ) => {
    if (field === "username") {
      const decrypedMessage = await decryptMessage(
        data?.encryptedUsername!,
        account!
      );
      setValues({
        ...values,
        [field]: decrypedMessage,
      });
      setShowUsername(true);
    }
    if (field === "password") {
      const decrypedMessage = await decryptMessage(
        data?.encryptedPassword!,
        account!
      );
      setValues({
        ...values,
        [field]: decrypedMessage,
      });
      setShowPassword(true);
    }
  };

  const onSave = async () => {
    const publicKey = await getPublicKey(account!);
    const encryptedUsername = encryptMessage(publicKey, values.username);
    const encryptedPassword = encryptMessage(publicKey, values.password);
    const maskedUsername = maskedText(values.username, 2);
    console.log({ encryptedUsername });
    console.log({ encryptedPassword });
    console.log({ maskedUsername });
  };

  const canSave =
    !!values.name && !!values.website && !!values.username && !!values.password;

  return (
    <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
      <Box sx={{ width: 500 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            p: 3,
          }}
        >
          <Box sx={{ mr: 3, ml: 2 }}>
            {data ? (
              <img
                src={data.image}
                alt={data.name}
                style={{ height: "100px" }}
              />
            ) : (
              <EnhancedEncryptionIcon sx={{ fontSize: "100px" }} />
            )}
          </Box>
          <Typography fontWeight="bold" variant="h5" noWrap>
            {data?.name || "Add Website"}
          </Typography>
        </Box>
        <Divider />
        <Box p={4}>
          <Grid container spacing={3} alignItems="center">
            <FormTextField
              label="Name"
              value={values.name}
              field="name"
              onChange={onChange}
            />
            <FormTextField
              label="Website"
              value={values.website}
              field="website"
              openLinked={!!values.website}
              onChange={onChange}
            />
            <FormTextField
              label="Username"
              value={showUsername ? values.username : data?.maskedUsername}
              field="username"
              copyable={!!values.username}
              onChange={onChange}
              onClick={() => showField("username")}
              show={showUsername}
            />
            <FormTextField
              label="Password"
              value={values.password}
              field="password"
              type="password"
              copyable={!!values.password}
              onChange={onChange}
              onClick={() => showField("password")}
              show={showPassword}
            />
          </Grid>
        </Box>
        <Box px={4}>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={onSave}
                disabled={!canSave}
              >
                Save
              </Button>
            </Grid>
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
      </Box>
    </Drawer>
  );
};

export default WebsiteDetailDrawer;

const FormTextField = ({
  label,
  field,
  value,
  onChange,
  type,
  copyable,
  openLinked,
  onClick,
  show = true,
}: any) => {
  const [showPassword, setShowPassword] = useState(true);

  return (
    <>
      <Grid item xs={3}>
        <Typography textAlign="right" fontWeight="bold">
          {label}
        </Typography>
      </Grid>
      <Grid item xs={9}>
        {type === "password" ? (
          <OutlinedInput
            type={showPassword ? "text" : "password"}
            onChange={(e) => onChange(e.target.value, field)}
            value={show ? value : "********"}
            fullWidth
            size="small"
            onClick={!show ? onClick : null}
            disabled={!show}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  onMouseDown={(event: React.MouseEvent<HTMLButtonElement>) => {
                    event.preventDefault();
                  }}
                  disabled={!show}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
                {copyable && (
                  <CopyToClipboard>
                    {({ copy }: any) => (
                      <IconButton
                        sx={{ ml: 1.5 }}
                        edge="end"
                        onClick={() => copy(value)}
                        disabled={!show}
                      >
                        <ContentCopyIcon />
                      </IconButton>
                    )}
                  </CopyToClipboard>
                )}
              </InputAdornment>
            }
          />
        ) : (
          <OutlinedInput
            value={value}
            onChange={(e) => onChange(e.target.value, field)}
            size="small"
            onClick={!show ? onClick : null}
            fullWidth
            disabled={!show}
            endAdornment={
              <InputAdornment position="end">
                {copyable && (
                  <CopyToClipboard>
                    {({ copy }: any) => (
                      <IconButton
                        sx={{ ml: 1.5 }}
                        disabled={!show}
                        edge="end"
                        onClick={() => copy(value)}
                      >
                        <ContentCopyIcon />
                      </IconButton>
                    )}
                  </CopyToClipboard>
                )}
                {openLinked && (
                  <IconButton
                    sx={{ ml: 1.5 }}
                    edge="end"
                    onClick={() => window.open(value, "_blank")}
                  >
                    <OpenInNewIcon />
                  </IconButton>
                )}
              </InputAdornment>
            }
          />
        )}
      </Grid>
    </>
  );
};
