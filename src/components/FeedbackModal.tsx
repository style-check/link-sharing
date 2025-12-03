import React, { useState, useEffect } from "react";

type FeedbackType = "happy" | "neutral" | "sad" | null;

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (feedback: { type: FeedbackType; text: string }) => void;
  initialFeedback?: { type: FeedbackType; text: string };
};

const FeedbackModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onSubmit,
  initialFeedback,
}) => {
  const [selectedFeedback, setSelectedFeedback] = useState<FeedbackType>(
    initialFeedback?.type || null
  );
  const [feedbackText, setFeedbackText] = useState(
    initialFeedback?.text || ""
  );

  // Sync state when modal opens with initial feedback
  useEffect(() => {
    if (isOpen) {
      setSelectedFeedback(initialFeedback?.type || null);
      setFeedbackText(initialFeedback?.text || "");
    }
  }, [isOpen, initialFeedback]);

  const handleSubmit = () => {
    if (selectedFeedback) {
      onSubmit({
        type: selectedFeedback,
        text: feedbackText.trim(),
      });
      // Reset form
      setSelectedFeedback(null);
      setFeedbackText("");
      onClose();
    }
  };

  // Handle keyboard events (Escape to close)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={handleBackdropClick}
      style={{ 
        backdropFilter: 'blur(4px)',
        backgroundColor: 'rgba(0, 0, 0, 0.15)'
      }}
    >
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-md p-4 sm:p-6 relative animate-slide-up max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Header */}
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          Share Your Feedback
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          How was your experience with us?
        </p>

        {/* Emoji Selection */}
        <div className="mb-6">
          <p className="text-sm font-medium text-gray-700 mb-3">
            Select your rating:
          </p>
          <div className="flex justify-center gap-6">
            {/* Happy */}
            <button
              onClick={() => setSelectedFeedback("happy")}
              className={`flex flex-col items-center p-3 rounded-lg transition-all transform hover:scale-110 ${
                selectedFeedback === "happy"
                  ? "bg-green-50 border-2 border-green-500"
                  : "bg-gray-50 border-2 border-transparent hover:bg-gray-100"
              }`}
            >
              <span className="text-4xl mb-1">😊</span>
              <span className="text-xs text-gray-600">Happy</span>
            </button>

            {/* Neutral */}
            <button
              onClick={() => setSelectedFeedback("neutral")}
              className={`flex flex-col items-center p-3 rounded-lg transition-all transform hover:scale-110 ${
                selectedFeedback === "neutral"
                  ? "bg-yellow-50 border-2 border-yellow-500"
                  : "bg-gray-50 border-2 border-transparent hover:bg-gray-100"
              }`}
            >
              <span className="text-4xl mb-1">😐</span>
              <span className="text-xs text-gray-600">Neutral</span>
            </button>

            {/* Sad */}
            <button
              onClick={() => setSelectedFeedback("sad")}
              className={`flex flex-col items-center p-3 rounded-lg transition-all transform hover:scale-110 ${
                selectedFeedback === "sad"
                  ? "bg-red-50 border-2 border-red-500"
                  : "bg-gray-50 border-2 border-transparent hover:bg-gray-100"
              }`}
            >
              <span className="text-4xl mb-1">😞</span>
              <span className="text-xs text-gray-600">Sad</span>
            </button>
          </div>
        </div>

        {/* Feedback Text Input */}
        <div className="mb-6">
          <label
            htmlFor="feedback-text"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Additional Comments (Optional)
          </label>
          <textarea
            id="feedback-text"
            value={feedbackText}
            onChange={(e) => {
              const value = e.target.value;
              if (value.length <= 500) {
                setFeedbackText(value);
              }
            }}
            placeholder="Tell us more about your experience..."
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none text-sm"
          />
          <p className="text-xs text-gray-500 mt-1">
            {feedbackText.length}/500 characters
          </p>
        </div>

        {/* Submit Button */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!selectedFeedback}
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedFeedback
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Submit Feedback
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;

