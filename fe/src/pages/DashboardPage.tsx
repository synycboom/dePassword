import { useState } from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AddIcon from "@mui/icons-material/Add";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AppsIcon from "@mui/icons-material/Apps";
import ConnectButton from "../components/ConnectButton";
import WebsiteCard from "../components/WebsiteCard";
import { Button } from "@mui/material";
import WebsiteDetailDrawer from "../components/WebsiteDetailDrawer";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(8)})`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)})`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  height: "61px",

  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  boxShadow: "0 4px 3px -2px rgb(0 0 0 / 20%)",
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  boxShadow: "0 4px 3px -2px rgb(0 0 0 / 20%)",
  marginLeft: theme.spacing(8),
  width: `calc(100% - ${theme.spacing(8)})`,
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

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
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [detailOpen, setDetailOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <DashboardPageStyle>
      <AppBar position="fixed" open={open} color="transparent">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={open ? handleDrawerClose : handleDrawerOpen}
            edge="start"
            sx={{ marginRight: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <ConnectButton />
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <img src="/images/password-64px.png" alt="logo" className="logo" />
          <Typography variant="h5" noWrap component="div">
            <span style={{ color: "red" }}>De</span>Password
          </Typography>
        </DrawerHeader>
        <List>
          {["Website"].map((text, index) => (
            <ListItemButton
              key={text}
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <AppsIcon />
              </ListItemIcon>
              <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, pt: 10 }}>
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
            <Box margin={1}>
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
      </Box>
    </DashboardPageStyle>
  );
}
