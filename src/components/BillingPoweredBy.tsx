import React from "react";

const BillingPoweredBy: React.FC = () => {
  return (
    <div className="bg-gray-100 py-3 px-4 rounded-lg my-4 text-center">
      <p className="text-[10px] sm:text-xs text-gray-600 mb-2">
        Digital billing powered by
      </p>
      <div className="flex items-center justify-center gap-2">
        <img
          src="/logo.png"
          alt="StyleCheck Logo"
          className="h-6 w-auto"
          onError={(e) => {
            // Hide image if it fails to load
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
        <span className="text-sm sm:text-base font-semibold text-gray-900">
          StyleCheck
        </span>
      </div>
    </div>
  );
};

export default BillingPoweredBy;

