import PdfViewer from "~/lib/pdf";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";

import {
  Drawer,
  DrawerTitle,
  DrawerFooter,
  DrawerHeader,
  DrawerContent,
  DrawerTrigger,
  DrawerDescription,
} from "~/components/ui/drawer";
import Icon from "~/components/utils/icons";
import { Button } from "~/components/ui/button";
import { LoaderImage } from "~/components/utils/loader";

export const PdfDrawer = ({
  open,
  title,
  base64,
  description,
  documentTitle,
  handleOnClose,
  handlePrintDoc,
}: {
  title: string;
  open?: boolean;
  description: string;
  base64: string | null;
  documentTitle: string;
  handleOnClose?: () => any;
  handlePrintDoc: () => any;
}) => {
  const [pdfUrl, setPdfUrl] = useState<string>("");

  useEffect(() => {
    if (!base64) return;
    // Convert base64 → Blob
    const byteCharacters = atob(base64);
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
  }, [base64]);

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
    <Drawer open={open} direction="bottom" onClose={handleOnClose}>
      <DrawerTrigger asChild>
        <Button variant="outline" onClick={handlePrintDoc}>
          <Icon name="print" />
          {title}
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-fit lg:h-screen max-h-[80vh]">
        <div className="container mx-auto w-full">
          <DrawerHeader className="!text-left">
            <DrawerTitle>{documentTitle}</DrawerTitle>
            <DrawerDescription>{description}</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <PdfViewer pdfUrl={pdfUrl} />
          </div>
          <DrawerFooter>
            <div className="flex gap-2 items-center">
              {/* Mobile: open in new tab */}
              <Button
                variant={"outline"}
                className="lg:hidden"
                disabled={!Boolean(base64)}
                onClick={handleOpenInNewTab}
              >
                {Boolean(base64) ? <Icon name="document" /> : <LoaderImage />}
                Open PDF
              </Button>
              {/* Download button (works everywhere) */}
              <Button onClick={handleDownload} disabled={!Boolean(base64)}>
                {Boolean(base64) ? (
                  <Icon name="cloudDownload" />
                ) : (
                  <LoaderImage color="#fff" />
                )}
                Download PDF
              </Button>
            </div>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
