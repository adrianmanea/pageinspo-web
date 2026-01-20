"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface FlowControlsProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrev: () => void;
}

export function FlowControls({
  currentStep,
  totalSteps,
  onNext,
  onPrev,
}: FlowControlsProps) {
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-white/90 border border-gray-200 p-2 rounded-full shadow-lg">
      <button
        onClick={onPrev}
        disabled={currentStep === 0}
        className="p-2 hover:bg-gray-100 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <span className="text-sm font-medium px-2">
        Step {currentStep + 1} of {totalSteps}
      </span>

      <button
        onClick={onNext}
        disabled={currentStep === totalSteps - 1}
        className="p-2 hover:bg-gray-100 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}
