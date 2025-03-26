
import React from "react";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

export interface SuggestionAction {
  type: "addition" | "deletion";
  content: string;
  originalContent?: string;
}

interface EditSuggestionProps {
  suggestion: SuggestionAction;
  onAccept: () => void;
  onReject: () => void;
  className?: string;
}

const EditSuggestion = ({ 
  suggestion, 
  onAccept, 
  onReject, 
  className 
}: EditSuggestionProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleAccept = () => {
    onAccept();
    setIsOpen(false);
  };

  const handleReject = () => {
    onReject();
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <span 
          className={cn(
            "cursor-pointer rounded px-0.5 -mx-0.5 relative",
            suggestion.type === "addition" 
              ? "bg-[#F2FCE2] text-[#16A34A] font-medium border-b border-dashed border-[#16A34A]/50" 
              : "text-[#ea384c] line-through",
            className
          )}
        >
          {suggestion.content}
        </span>
      </PopoverTrigger>
      <PopoverContent 
        align="start" 
        className="w-fit p-0 border border-gray-200 shadow-md rounded-md overflow-hidden"
      >
        <div className="flex flex-col">
          {/* Header section */}
          <div className="flex items-center justify-between p-3 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 font-semibold">
                AI
              </div>
              <div>
                <div className="font-semibold">Suggestion</div>
                <div className="text-xs text-gray-500">AI-powered edit suggestion</div>
              </div>
            </div>
          </div>
          
          {/* Suggestion content section */}
          <div className="p-4 bg-white">
            <div className="text-sm font-medium mb-2">
              {suggestion.type === "addition" ? "Add text" : "Remove text"}
            </div>
            <div className="bg-gray-50 p-3 rounded text-sm mb-3">
              {suggestion.type === "addition" ? (
                <>
                  {suggestion.originalContent && (
                    <span className="text-gray-700">
                      {suggestion.originalContent}{" "}
                    </span>
                  )}
                  <span className="bg-[#F2FCE2] text-[#16A34A] px-0.5 py-0.5">
                    {suggestion.content}
                  </span>
                </>
              ) : (
                <span className="text-[#ea384c] line-through">
                  {suggestion.content}
                </span>
              )}
            </div>
          </div>
          
          {/* Action buttons */}
          <div className="flex border-t border-gray-100">
            <Button
              variant="ghost"
              size="sm"
              className="h-10 flex-1 rounded-none text-gray-500 hover:bg-gray-50"
              onClick={handleReject}
            >
              <X className="h-4 w-4 mr-1" />
              Reject
            </Button>
            <div className="w-px bg-gray-100"></div>
            <Button
              variant="ghost"
              size="sm"
              className="h-10 flex-1 rounded-none text-primary hover:bg-gray-50"
              onClick={handleAccept}
            >
              <Check className="h-4 w-4 mr-1" />
              Accept
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default EditSuggestion;
