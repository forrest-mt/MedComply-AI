
import React, { useState } from "react";
import { Save, History, ClipboardList } from "lucide-react";
import { cn } from "@/lib/utils";
import { MedicalDocument } from "@/lib/types";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";
import DecisionLog from "./DecisionLog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface EditorHeaderProps {
  document: MedicalDocument;
  isSaving: boolean;
}

interface Version {
  version: string;
  date: Date;
  changes: string;
}

// Sample version history data
const SAMPLE_VERSIONS: Version[] = [
  {
    version: "1.3",
    date: new Date(2023, 10, 15),
    changes: "Updated compliance section"
  },
  {
    version: "1.2",
    date: new Date(2023, 9, 28),
    changes: "Added risk analysis data"
  },
  {
    version: "1.1",
    date: new Date(2023, 8, 10),
    changes: "Initial review completed"
  },
  {
    version: "1.0",
    date: new Date(2023, 7, 22),
    changes: "Document created"
  }
];

const EditorHeader: React.FC<EditorHeaderProps> = ({ 
  document, 
  isSaving 
}) => {
  const [versions] = useState<Version[]>(SAMPLE_VERSIONS);
  const [isDecisionLogOpen, setIsDecisionLogOpen] = useState(false);

  const handleVersionSelect = (version: Version) => {
    toast.info(`Version ${version.version} loaded`);
  };

  return (
    <div className="flex items-center justify-between px-6 py-4 border-b border-editor-border bg-editor-panel">
      <div>
        <h2 className="text-xl font-semibold">{document.title}</h2>
        <p className="text-sm text-muted-foreground">
          {document.type} • 
          <Popover>
            <PopoverTrigger asChild>
              <button className="px-1 text-primary hover:underline focus:outline-none">
                Version {document.version}
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="start">
              <div className="p-3 border-b">
                <h3 className="font-medium">Version History</h3>
                <p className="text-xs text-muted-foreground">View and restore previous versions</p>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {versions.map((version) => (
                  <button
                    key={version.version}
                    className="w-full px-3 py-2 text-left hover:bg-muted flex items-start justify-between gap-2 text-sm border-b last:border-0"
                    onClick={() => handleVersionSelect(version)}
                  >
                    <div className="flex items-center gap-2">
                      <History className="h-4 w-4 text-muted-foreground shrink-0" />
                      <div>
                        <div>Version {version.version}</div>
                        <div className="text-xs text-muted-foreground">{version.changes}</div>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {version.date.toLocaleDateString()}
                    </div>
                  </button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
          <span className="mx-1">•</span>
          <button 
            onClick={() => setIsDecisionLogOpen(true)}
            className="text-primary hover:underline focus:outline-none inline-flex items-center"
          >
            <ClipboardList className="h-3.5 w-3.5 mr-1" />
            Decision Log
          </button>
        </p>
      </div>
      
      <div className="text-sm text-muted-foreground">
        {isSaving ? (
          <span className="flex items-center gap-1">
            <Save className="h-3.5 w-3.5 animate-pulse" />
            Saving...
          </span>
        ) : (
          <span>Last saved {new Date(document.updatedAt).toLocaleTimeString()}</span>
        )}
      </div>

      {/* Decision Log Dialog */}
      <Dialog open={isDecisionLogOpen} onOpenChange={setIsDecisionLogOpen}>
        <DialogContent className="max-w-3xl h-[80vh]">
          <DialogHeader>
            <DialogTitle>Decision Log</DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-hidden">
            <DecisionLog />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditorHeader;
