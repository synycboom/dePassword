import { useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import copy from "clipboard-copy";

const CopyToClipboard = ({ children }: any) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const onCopy = (content: any) => {
    copy(content);
    setShowTooltip(true);
  };

  return (
    <Tooltip
      open={showTooltip}
      title="Copied to clipboard!"
      leaveDelay={1500}
      onClose={() => setShowTooltip(false)}
    >
      {children({ copy: onCopy })}
    </Tooltip>
  );
};

export default CopyToClipboard;
