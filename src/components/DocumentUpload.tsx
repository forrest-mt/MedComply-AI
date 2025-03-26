
import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { DocumentType, MedicalDocument } from '@/lib/types';
import { useDocuments } from '@/context/DocumentContext';
import { FileUp } from 'lucide-react';
import { toast } from 'sonner';
import { generateDocumentId } from '@/lib/documentTemplates';

const DocumentUpload = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [type, setType] = useState<DocumentType>(DocumentType.Custom);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { documents, setCurrentDocument } = useDocuments();

  const handleUpload = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!fileInputRef.current?.files?.length) {
      toast.error('Please select a file to upload');
      return;
    }
    
    const file = fileInputRef.current.files[0];
    setIsUploading(true);
    
    try {
      const content = await readFileContent(file);
      
      const newDocument: MedicalDocument = {
        id: generateDocumentId(),
        title: title || file.name,
        content,
        createdAt: new Date(),
        updatedAt: new Date(),
        type,
        version: '1.0',
        wordCount: content.split(/\s+/).length
      };
      
      // Add to documents context
      const updatedDocs = [...documents, newDocument];
      localStorage.setItem("medidoc-documents", JSON.stringify(updatedDocs));
      
      // Set as current document
      setCurrentDocument(newDocument);
      
      setIsOpen(false);
      toast.success(`Document "${newDocument.title}" uploaded successfully`);
    } catch (error) {
      console.error('Error uploading document:', error);
      toast.error('Failed to upload document');
    } finally {
      setIsUploading(false);
    }
  };

  const readFileContent = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (event) => {
        if (event.target?.result) {
          resolve(event.target.result as string);
        } else {
          reject(new Error('Failed to read file content'));
        }
      };
      
      reader.onerror = () => {
        reject(new Error('Error reading file'));
      };
      
      reader.readAsText(file);
    });
  };

  return (
    <>
      <Button 
        variant="outline" 
        size="sm" 
        className="gap-1"
        onClick={() => setIsOpen(true)}
      >
        <FileUp className="h-4 w-4" />
        <span>Upload</span>
      </Button>
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Upload Document</DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleUpload} className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="file">Select Document</Label>
              <Input 
                id="file" 
                type="file" 
                ref={fileInputRef}
                accept=".txt,.md,.json,.xml,.html"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="title">Document Title</Label>
              <Input 
                id="title" 
                placeholder="Enter document title" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="type">Document Type</Label>
              <Select value={type} onValueChange={(value) => setType(value as DocumentType)}>
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select document type" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(DocumentType).map((docType) => (
                    <SelectItem key={docType} value={docType}>{docType}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isUploading || !fileInputRef.current?.files?.length}
              >
                {isUploading ? 'Uploading...' : 'Upload'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DocumentUpload;
