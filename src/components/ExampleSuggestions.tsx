
import React from "react";
import { toast } from "sonner";
import EditSuggestion, { SuggestionAction } from "./EditSuggestion";

interface ExampleSuggestionsProps {
  suggestions: SuggestionAction[];
  onAcceptSuggestion: (index: number) => void;
  onRejectSuggestion: (index: number) => void;
}

const ExampleSuggestions: React.FC<ExampleSuggestionsProps> = ({ 
  suggestions, 
  onAcceptSuggestion, 
  onRejectSuggestion 
}) => {
  return (
    <div className="p-4 border rounded-md mb-4">
      <h3 className="text-lg font-semibold mb-2">Example Edit Suggestions</h3>
      <p>
        A Design History File (DHF) is a comprehensive record documenting the design history of a 
        medical device. It shows how a device was developed, tested, and validated to meet its intended 
        use and requirements. Beyond regulatory compliance, {" "}
        <EditSuggestion
          suggestion={suggestions[0]} 
          onAccept={() => onAcceptSuggestion(0)}
          onReject={() => onRejectSuggestion(0)}
        />{" "}
        safety and efficacy {" "}
        <EditSuggestion
          suggestion={suggestions[1]} 
          onAccept={() => onAcceptSuggestion(1)}
          onReject={() => onRejectSuggestion(1)}
        />{" "}
        before {" "}
        <EditSuggestion
          suggestion={suggestions[2]} 
          onAccept={() => onAcceptSuggestion(2)}
          onReject={() => onRejectSuggestion(2)}
        />.
      </p>
      <p className="mt-2">
        The DHF concept {" "}
        <EditSuggestion
          suggestion={suggestions[3]} 
          onAccept={() => onAcceptSuggestion(3)}
          onReject={() => onRejectSuggestion(3)}
        />{" "}
        emerged as an approach {" "}
        <EditSuggestion
          suggestion={suggestions[4]} 
          onAccept={() => onAcceptSuggestion(4)}
          onReject={() => onRejectSuggestion(4)}
        />{" "}
        minimize risks {" "}
        <EditSuggestion
          suggestion={suggestions[5]} 
          onAccept={() => onAcceptSuggestion(5)}
          onReject={() => onRejectSuggestion(5)}
        />{" "}
        structuring and documenting the design process.
      </p>
    </div>
  );
};

export default ExampleSuggestions;
