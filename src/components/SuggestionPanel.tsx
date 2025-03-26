
import React, { useState } from "react";
import { toast } from "sonner";
import EditSuggestion from "./EditSuggestion";
import { EXAMPLE_SUGGESTIONS } from "./SuggestionData";
import { SuggestionAction } from "./EditSuggestion";

const SuggestionPanel = () => {
  const [suggestions, setSuggestions] = useState<SuggestionAction[]>(EXAMPLE_SUGGESTIONS);

  // Handle accepting a suggestion
  const handleAcceptSuggestion = (index: number) => {
    const suggestion = suggestions[index];
    
    // In a real implementation, this would update the document content
    // by applying the suggested change
    
    // Remove the suggestion from the list
    const newSuggestions = [...suggestions];
    newSuggestions.splice(index, 1);
    setSuggestions(newSuggestions);
    
    toast.success(`Suggestion accepted: ${suggestion.type === "addition" ? "Text added" : "Text removed"}`);
  };

  // Handle rejecting a suggestion
  const handleRejectSuggestion = (index: number) => {
    // Remove the suggestion from the list
    const newSuggestions = [...suggestions];
    newSuggestions.splice(index, 1);
    setSuggestions(newSuggestions);
    
    toast.info("Suggestion rejected");
  };

  return (
    <div className="h-full flex flex-col p-4 overflow-y-auto">
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Edit Suggestions</h2>
        <p className="text-sm text-muted-foreground">
          AI-powered suggested edits for your document
        </p>
      </div>

      {suggestions.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-center">
          <p className="text-muted-foreground">No active suggestions</p>
        </div>
      ) : (
        <div className="space-y-4">
          {suggestions.map((suggestion, index) => (
            <div key={index} className="border rounded-md p-4 bg-card">
              <div className="mb-2">
                <span className="px-2 py-1 text-xs rounded-full font-medium bg-primary/10 text-primary">
                  {suggestion.type === "addition" ? "Addition" : "Deletion"}
                </span>
              </div>
              <div className="mb-4">
                <EditSuggestion
                  suggestion={suggestion}
                  onAccept={() => handleAcceptSuggestion(index)}
                  onReject={() => handleRejectSuggestion(index)}
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => handleRejectSuggestion(index)}
                  className="text-sm px-3 py-1 rounded-md text-muted-foreground hover:bg-muted"
                >
                  Reject
                </button>
                <button
                  onClick={() => handleAcceptSuggestion(index)}
                  className="text-sm px-3 py-1 rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Accept
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SuggestionPanel;
