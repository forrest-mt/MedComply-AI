
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Upload } from 'lucide-react';
import { toast } from 'sonner';

const SourceDocumentUpload = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  
  const handleUpload = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsUploading(true);
    
    // Simulate upload
    setTimeout(() => {
      setIsUploading(false);
      setIsOpen(false);
      toast.success("Source document uploaded successfully");
    }, 1500);
  };

  return (
    <>
      <Button 
        variant="outline" 
        size="sm" 
        className="gap-1"
        onClick={() => setIsOpen(true)}
      >
        <Upload className="h-4 w-4" />
        <span>Upload</span>
      </Button>
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Upload Source Document</DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleUpload} className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="sourceFile">Select Document</Label>
              <Input 
                id="sourceFile" 
                type="file" 
                accept=".pdf,.docx,.doc,.txt"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="sourceTitle">Document Title</Label>
              <Input 
                id="sourceTitle" 
                placeholder="Enter document title" 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="sourceType">Document Type</Label>
              <Input 
                id="sourceType" 
                placeholder="Standard, Regulation, Guidance, etc." 
              />
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
                disabled={isUploading}
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

export default SourceDocumentUpload;
