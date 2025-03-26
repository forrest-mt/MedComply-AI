
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useDocuments } from "@/context/DocumentContext";
import { documentTemplates } from "@/lib/documentTemplates";
import { Plus, FileText, Menu, X } from "lucide-react";
import DocumentUpload from "./DocumentUpload";

interface HeaderProps {
  isNavOpen: boolean;
  setIsNavOpen: (open: boolean) => void;
}

const Header = ({ isNavOpen, setIsNavOpen }: HeaderProps) => {
  const { currentDocument } = useDocuments();
  const [isNewDocPopoverOpen, setIsNewDocPopoverOpen] = useState(false);

  return (
    <header className="h-16 border-b border-editor-border bg-editor-panel fixed top-0 left-0 right-0 z-10 flex items-center justify-between px-4 transition-all duration-300 ease-in-out">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsNavOpen(!isNavOpen)}
          className="md:hidden"
          aria-label={isNavOpen ? "Close navigation" : "Open navigation"}
        >
          {isNavOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
        
        <div className="flex flex-col">
          <h1 className="text-lg font-semibold tracking-tight">MediDoc Genie</h1>
          <p className="text-xs text-muted-foreground">Medical Device Compliance Documentation</p>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <div className="hidden md:flex">
          {currentDocument && (
            <div className="text-sm text-muted-foreground mr-4">
              {currentDocument.title} | Version {currentDocument.version} | {currentDocument.wordCount} words
            </div>
          )}
        </div>
        
        <DocumentUpload />
        
        <Popover 
          open={isNewDocPopoverOpen} 
          onOpenChange={setIsNewDocPopoverOpen}
        >
          <PopoverTrigger asChild>
            <Button size="sm" className="gap-1">
              <Plus className="h-4 w-4" />
              <span>New Document</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-72 p-2" align="end">
            <NewDocumentMenu onSelect={() => setIsNewDocPopoverOpen(false)} />
          </PopoverContent>
        </Popover>
      </div>
    </header>
  );
};

const NewDocumentMenu = ({ onSelect }: { onSelect: () => void }) => {
  const { createDocument } = useDocuments();

  const handleSelectTemplate = (templateId: string) => {
    createDocument(templateId);
    onSelect();
  };

  return (
    <div className="space-y-1">
      <h3 className="text-sm font-medium mb-2 px-2">Select Template</h3>
      {documentTemplates.map((template) => (
        <Button
          key={template.id}
          variant="ghost"
          className="w-full justify-start gap-2 h-9"
          onClick={() => handleSelectTemplate(template.id)}
        >
          <FileText className="h-4 w-4" />
          <div className="flex flex-col items-start">
            <span className="text-sm">{template.title}</span>
            <span className="text-xs text-muted-foreground">{template.type}</span>
          </div>
        </Button>
      ))}
    </div>
  );
};

export default Header;
