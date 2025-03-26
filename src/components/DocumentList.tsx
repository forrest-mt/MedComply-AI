import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { useDocuments } from "@/context/DocumentContext";
import { MedicalDocument, DocumentType } from "@/lib/types";
import { FileText, Trash2, MoreVertical, Upload, File } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import DocumentUpload from "./DocumentUpload";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import SourceDocumentUpload from "./SourceDocumentUpload";

const DocumentList = () => {
  const { documents, currentDocument, setCurrentDocument, deleteDocument } = useDocuments();
  const [documentToDelete, setDocumentToDelete] = useState<string | null>(null);

  // Sample source documents for the demo
  const sourceDocuments = [
    {
      id: "src-1",
      title: "ISO 13485:2016",
      type: "Standard",
      description: "Medical devices — Quality management systems"
    },
    {
      id: "src-2",
      title: "FDA 21 CFR Part 820",
      type: "Regulation",
      description: "Quality System Regulation"
    },
    {
      id: "src-3",
      title: "MEDDEV 2.7/1 Rev.4",
      type: "Guidance",
      description: "Clinical Evaluation Guidelines"
    },
    {
      id: "src-4",
      title: "ISO 14971:2019",
      type: "Standard",
      description: "Medical devices — Risk management"
    }
  ];

  return (
    <div className="h-full flex flex-col">
      <Tabs defaultValue="documents" className="h-full flex flex-col">
        <div className="px-4 pt-4">
          <TabsList className="w-full">
            <TabsTrigger value="documents" className="flex-1">Documents</TabsTrigger>
            <TabsTrigger value="sources" className="flex-1">Sources</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="documents" className="flex-1 overflow-y-auto p-0">
          <div className="p-2">
            <div className="mb-4 px-2 flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold tracking-tight mb-1">Documents</h2>
                <p className="text-xs text-muted-foreground">Medical device compliance documentation</p>
              </div>
              <DocumentUpload />
            </div>
            
            <Separator className="my-4" />
            
            <div className="space-y-1">
              {documents.map((doc) => (
                <DocumentItem 
                  key={doc.id}
                  document={doc}
                  isActive={currentDocument?.id === doc.id}
                  onSelect={() => setCurrentDocument(doc)}
                  onDelete={() => setDocumentToDelete(doc.id)}
                />
              ))}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="sources" className="flex-1 overflow-y-auto p-0">
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-lg font-semibold tracking-tight mb-1">Source Documents</h2>
                <p className="text-xs text-muted-foreground">Reference materials and standards</p>
              </div>
              <SourceDocumentUpload />
            </div>
            
            <Separator className="my-4" />
            
            <div className="space-y-2">
              {sourceDocuments.map((doc) => (
                <div 
                  key={doc.id}
                  className="p-3 border rounded-md hover:bg-muted/50 cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    <File className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium text-sm">{doc.title}</div>
                      <div className="text-xs text-muted-foreground">{doc.type}</div>
                      <div className="text-xs mt-1">{doc.description}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      <DeleteDocumentDialog
        isOpen={documentToDelete !== null}
        onClose={() => setDocumentToDelete(null)}
        onConfirm={() => {
          if (documentToDelete) {
            deleteDocument(documentToDelete);
            setDocumentToDelete(null);
          }
        }}
      />
    </div>
  );
};

interface DocumentItemProps {
  document: MedicalDocument;
  isActive: boolean;
  onSelect: () => void;
  onDelete: () => void;
}

const DocumentItem = ({ document, isActive, onSelect, onDelete }: DocumentItemProps) => {
  return (
    <div 
      className={`flex items-center justify-between px-2 py-1.5 rounded-md cursor-pointer group transition-colors ${
        isActive ? "bg-accent text-accent-foreground" : "hover:bg-muted"
      }`}
      onClick={onSelect}
    >
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <FileText className="h-4 w-4 shrink-0" />
        <div className="truncate">
          <div className="text-sm font-medium truncate">{document.title}</div>
          <div className="text-xs text-muted-foreground truncate">
            Updated {new Date(document.updatedAt).toLocaleDateString()}
          </div>
        </div>
      </div>
      
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost" 
            size="icon"
            className="h-8 w-8 opacity-0 group-hover:opacity-100"
            onClick={(e) => e.stopPropagation()}
          >
            <MoreVertical className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-40 p-1" align="end">
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-full justify-start text-destructive hover:text-destructive gap-2"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  );
};

interface DeleteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteDocumentDialog = ({ isOpen, onClose, onConfirm }: DeleteDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Document</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this document? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button variant="destructive" onClick={onConfirm}>Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentList;
