"use client";

import { Button } from "@/once-ui/components";

interface DownloadCVButtonProps {
  size?: "s" | "m" | "l";
  variant?: "primary" | "secondary" | "tertiary";
  label?: string;
}

const CV_PATH = "/Stephen Lawrence David - CV.pdf";
const CV_FILENAME = "Stephen Lawrence David - CV.pdf";

export function DownloadCVButton({
  size = "s",
  variant = "primary",
  label = "Download CV",
}: Readonly<DownloadCVButtonProps>) {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = CV_PATH;
    link.download = CV_FILENAME;
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <Button
      onClick={handleDownload}
      prefixIcon="document"
      label={label}
      size={size}
      variant={variant}
      data-border="rounded"
    />
  );
}
