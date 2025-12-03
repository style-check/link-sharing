import React from "react";

type Props = {
  onDownload?: () => void;
  companyName?: string;
  maxWidth?: string; // To match the bill width
};

const DownloadBillButton: React.FC<Props> = ({
  onDownload,
  companyName = "Company Name",
  maxWidth = "350px",
}) => {
  const handleDownload = () => {
    if (onDownload) {
      onDownload();
    } else {
      // Default behavior: print the page
      window.print();
    }
  };

  return (
    <div
      className="fixed bottom-0 left-1/2 -translate-x-1/2 z-50 bg-white border-t border-gray-200 shadow-lg p-3 sm:p-4 no-print"
      style={{ width: maxWidth, maxWidth: "100%" }}
    >
      <div className="flex items-center justify-between gap-3 w-full">
        <div className="flex items-center gap-2">
          <span className="text-xs sm:text-sm font-medium text-gray-700 lowercase">
            {companyName.toLowerCase()}
          </span>
        </div>
        <button
          onClick={handleDownload}
          className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors text-xs sm:text-sm uppercase tracking-wide shadow-md"
        >
          Download Bill
        </button>
      </div>
    </div>
  );
};

export default DownloadBillButton;
