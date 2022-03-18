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
                  website: "www.facebook.com" + index,
                  maskedUsername: "ma******om",
                  encryptedUsername:
                    "0x7b2276657273696f6e223a227832353531392d7873616c736132302d706f6c7931333035222c226e6f6e6365223a2258773133326831677a6d53776837727959634d5371636c68664d785464483342222c22657068656d5075626c69634b6579223a224a6a6e472b68734761627a4433515a4850464d745161347538754a69554656676e55546c5958782b7352343d222c2263697068657274657874223a22434c3378397a576163496e434264536f7565324d6379766d573535543357587773694e4f436e627339534f53594c453d227d",
                  encryptedPassword:
                    "0x7b2276657273696f6e223a227832353531392d7873616c736132302d706f6c7931333035222c226e6f6e6365223a2268324d2f7869515458666f2b63724942494b673572704d536d583054614d4539222c22657068656d5075626c69634b6579223a224c4a5671496942666358313165455753437352383153622f5a3659595476797465566f37492b446a5567773d222c2263697068657274657874223a22355a68614a326e43466636536d436f4f74534a38704950506766414a3049777248513d3d227d",
                }}
              />
            </Box>
          ))}
        </Box>
      </Layout>
    </DashboardPageStyle>
  );
}
