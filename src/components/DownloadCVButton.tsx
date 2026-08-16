"use client";

import { Button } from "@/components/ui/Button";

interface DownloadCVButtonProps {
  size?: "s" | "m" | "l";
  variant?: "primary" | "secondary" | "ghost";
  label?: string;
}

const CV_PATH = "/Stephen Lawrence David - CV.pdf";
const CV_FILENAME = "Stephen Lawrence David - CV.pdf";

const DocIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z" />
    <path d="M14 3v5h5" />
    <path d="M12 12v5M9.5 14.5 12 17l2.5-2.5" />
  </svg>
);

export function DownloadCVButton({
  size = "m",
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
    <Button onClick={handleDownload} size={size} variant={variant} iconLeft={<DocIcon />}>
      {label}
    </Button>
  );
}
