"use client";

import { Button, IconButton } from "@/once-ui/components";
import { identity } from "@/app/resources";

interface DownloadCVButtonProps {
  size?: "s" | "m" | "l";
  variant?: "primary" | "secondary" | "tertiary";
  label?: string;
}

export function DownloadCVButton({
  size = "s",
  variant = "primary",
  label = "Download CV",
}: DownloadCVButtonProps) {
  const handlePrint = () => {
    const previousTitle = document.title;
    document.title = `CV - ${identity.name}`;
    const restore = () => {
      document.title = previousTitle;
      window.removeEventListener("afterprint", restore);
    };
    window.addEventListener("afterprint", restore);
    window.print();
  };

  return (
    <>
      <Button
        className="s-flex-hide"
        onClick={handlePrint}
        prefixIcon="document"
        label={label}
        size={size}
        variant={variant}
        data-border="rounded"
      />
      <IconButton
        className="s-flex-show"
        onClick={handlePrint}
        icon="document"
        size="l"
        variant={variant}
        tooltip={label}
      />
    </>
  );
}
