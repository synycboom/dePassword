import LanguageIcon from "@mui/icons-material/Language";

const WEBSITE_LIST = ["facebook", "netflix", "google"];

const WebsiteLogo = ({ website }: { website: string }) => {
  const image = (() => {
    for (const index in WEBSITE_LIST) {
      if (website.includes(WEBSITE_LIST[index])) {
        return `/images/${WEBSITE_LIST[index]}.png`;
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
