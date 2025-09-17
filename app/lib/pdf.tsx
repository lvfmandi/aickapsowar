import { cn } from "~/lib/utils";

export default function PdfViewer({ pdfUrl }: { pdfUrl: string | null }) {
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
    </div>
  );
}
