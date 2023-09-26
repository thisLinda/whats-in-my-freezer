import { useState } from "react";

export default function CustomMessage({ type, content }) {
  const [visible, setVisible] = useState(true);

  const handleClose = () => {
    setVisible(false);
  };

  const shouldShowCloseButton = type === "success" || type === "error";

  return visible ? (
    <div className={`custom-message custom-message-${type}`}>
      <span>{content}</span>
      {shouldShowCloseButton && <button onClick={handleClose}>Close</button>}
    </div>
  ) : null;
}
