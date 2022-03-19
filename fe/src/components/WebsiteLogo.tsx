import LanguageIcon from "@mui/icons-material/Language";
import facebookImg from "../images/facebook.png";
import netflixImg from "../images/netflix.png";
import googleImg from "../images/google.png";

const WEBSITE_LIST = ["facebook", "netflix", "google"];

const WebsiteLogo = ({ website }: { website: string }) => {
  const image = (() => {
    for (const index in WEBSITE_LIST) {
      const key = WEBSITE_LIST[index];
      if (website.includes(key)) {
        if (key === "facebook") {
          return facebookImg;
        }
        if (key === "netflix") {
          return netflixImg;
        }
        if (key === "google") {
          return googleImg;
        }
      }
    }
    return null;
  })();

  return image ? (
    <img src={image} alt={website} style={{ maxHeight: 150, maxWidth: 150 }} />
  ) : (
    <LanguageIcon sx={{ fontSize: 75 }} />
  );
};

export default WebsiteLogo;
