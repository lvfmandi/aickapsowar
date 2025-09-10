import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { cn } from "./utils";
import Icon from "~/components/utils/icons";
import { LoaderImage } from "~/components/loader";

export default function PdfViewer({
  base64Data,
}: {
  base64Data: string | null;
}) {
  const [pdfUrl, setPdfUrl] = useState<string>("");

  useEffect(() => {
    if (!base64Data) return;
    // Convert base64 → Blob
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "application/pdf" });

    // Object URL
    const url = URL.createObjectURL(blob);
    setPdfUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [base64Data]);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "document.pdf";
    link.click();
  };

  const handleOpenInNewTab = () => {
    if (pdfUrl) window.open(pdfUrl, "_blank");
  };

  return (
    <div className="w-full h-[40px] space-y-4 lg:h-[calc(95vh_-_200px)]">
      {/* Desktop: viewer */}
      <div
        className={cn(
          "hidden lg:block lg:h-[90%] bg-border border",
          !pdfUrl ? "animate-pulse" : ""
        )}
      >
        {pdfUrl && (
          <iframe
            src={pdfUrl}
            title="PDF Viewer"
            style={{ width: "100%", height: "100%" }}
          />
        )}
      </div>
      <div className="flex gap-2 items-center">
        {/* Mobile: open in new tab */}
        <Button
          variant={"outline"}
          className="lg:hidden"
          disabled={!Boolean(base64Data)}
          onClick={handleOpenInNewTab}
        >
          {Boolean(base64Data) ? <Icon name="document" /> : <LoaderImage />}
          Open PDF
        </Button>
        {/* Download button (works everywhere) */}
        <Button onClick={handleDownload} disabled={!Boolean(base64Data)}>
          {Boolean(base64Data) ? (
            <Icon name="cloudDownload" />
          ) : (
            <LoaderImage color="#fff" />
          )}
          Download PDF
        </Button>
      </div>
    </div>
  );
}
