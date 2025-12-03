import React, { useState } from "react";
import FeedbackModal from "./FeedbackModal";

type FeedbackType = "happy" | "neutral" | "sad" | null;

type FeedbackData = {
  type: FeedbackType;
  text: string;
};

const FeedbackSection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submittedFeedback, setSubmittedFeedback] =
    useState<FeedbackData | null>(null);

  const handleFeedbackSubmit = (feedback: FeedbackData) => {
    setSubmittedFeedback(feedback);
    // Here you can add API call if needed in the future
    console.log("Feedback submitted:", feedback);
  };

  const getFeedbackColor = (type: FeedbackType) => {
    switch (type) {
      case "happy":
        return "border-green-500 bg-green-50";
      case "neutral":
        return "border-yellow-500 bg-yellow-50";
      case "sad":
        return "border-red-500 bg-red-50";
      default:
        return "border-gray-300 bg-gray-50";
    }
  };

  return (
    <>
      <div
        className={`mt-4 mb-4 p-3 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${
          submittedFeedback
            ? getFeedbackColor(submittedFeedback.type)
            : "border-gray-300 bg-gray-50 hover:bg-gray-100"
        }`}
        onClick={() => setIsModalOpen(true)}
      >
        {submittedFeedback ? (
          <div className="text-center">
            <p className="text-xs sm:text-sm font-semibold text-gray-700 mb-2">
              Feedback submitted
            </p>
            <div className="flex justify-center items-center gap-3 mb-1">
              <span
                className={`text-2xl sm:text-3xl ${
                  submittedFeedback.type === "happy"
                    ? "opacity-100 scale-110"
                    : "opacity-40"
                } transition-all`}
              >
                😊
              </span>
              <span
                className={`text-2xl sm:text-3xl ${
                  submittedFeedback.type === "neutral"
                    ? "opacity-100 scale-110"
                    : "opacity-40"
                } transition-all`}
              >
                😐
              </span>
              <span
                className={`text-2xl sm:text-3xl ${
                  submittedFeedback.type === "sad"
                    ? "opacity-100 scale-110"
                    : "opacity-40"
                } transition-all`}
              >
                😞
              </span>
            </div>
            {submittedFeedback.text && (
              <p className="text-[10px] text-gray-600 mt-1 line-clamp-2">
                {submittedFeedback.text}
              </p>
            )}
            <p className="text-[9px] text-gray-500 mt-1">
              Tap to update feedback
            </p>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-xs sm:text-sm font-semibold text-gray-700 mb-2">
              Share your feedback
            </p>
            <div className="flex justify-center gap-3">
              <span className="text-2xl sm:text-3xl">😊</span>
              <span className="text-2xl sm:text-3xl">😐</span>
              <span className="text-2xl sm:text-3xl">😞</span>
            </div>
            <p className="text-[9px] text-gray-500 mt-1">
              Tap to provide feedback
            </p>
          </div>
        )}
      </div>

      <FeedbackModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleFeedbackSubmit}
        initialFeedback={submittedFeedback || undefined}
      />
    </>
  );
};

export default FeedbackSection;

