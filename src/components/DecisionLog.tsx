
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Calendar, FileText, Plus } from "lucide-react";
import { DocumentDecision } from "@/lib/types";
import { useDocuments } from "@/context/DocumentContext";
import { toast } from "sonner";

type DecisionCategory = "Design" | "Regulatory" | "Clinical" | "QMS" | "Technical" | "Other";

const DecisionLog = () => {
  const { currentDocument } = useDocuments();
  const [decisions, setDecisions] = useState<DocumentDecision[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<DecisionCategory>("Design");
  
  const addDecision = () => {
    if (!currentDocument) {
      toast.error("No document selected");
      return;
    }
    
    if (!title.trim() || !description.trim()) {
      toast.error("Please fill all fields");
      return;
    }
    
    const newDecision: DocumentDecision = {
      id: Math.random().toString(36).substring(2, 11),
      documentId: currentDocument.id,
      title,
      description,
      createdAt: new Date(),
      category
    };
    
    setDecisions([...decisions, newDecision]);
    setIsDialogOpen(false);
    resetForm();
    toast.success("Decision added successfully");
  };
  
  const resetForm = () => {
    setTitle("");
    setDescription("");
    setCategory("Design");
  };
  
  // Filter decisions for the current document
  const documentDecisions = currentDocument 
    ? decisions.filter(d => d.documentId === currentDocument.id)
    : [];
  
  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Decision Log</h2>
          <p className="text-sm text-muted-foreground">
            Record important decisions about your document
          </p>
        </div>
        <Button 
          onClick={() => setIsDialogOpen(true)} 
          size="sm" 
          className="gap-1"
          disabled={!currentDocument}
        >
          <Plus size={16} />
          <span>Add Decision</span>
        </Button>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        {!currentDocument ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-4">
            <FileText className="h-12 w-12 text-muted-foreground mb-2 opacity-50" />
            <h3 className="text-lg font-medium mb-1">No Document Selected</h3>
            <p className="text-sm text-muted-foreground">
              Select a document to view or add decisions.
            </p>
          </div>
        ) : documentDecisions.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-4">
            <FileText className="h-12 w-12 text-muted-foreground mb-2 opacity-50" />
            <h3 className="text-lg font-medium mb-1">No Decisions Yet</h3>
            <p className="text-sm text-muted-foreground">
              Click "Add Decision" to record important decisions.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {documentDecisions.map((decision) => (
              <DecisionCard key={decision.id} decision={decision} />
            ))}
          </div>
        )}
      </ScrollArea>
      
      <AddDecisionDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        category={category}
        setCategory={setCategory}
        onAdd={addDecision}
      />
    </div>
  );
};

interface DecisionCardProps {
  decision: DocumentDecision;
}

const DecisionCard = ({ decision }: DecisionCardProps) => {
  return (
    <div className="border rounded-lg p-4 shadow-sm">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-medium text-base">{decision.title}</h3>
          <div className="flex items-center text-sm text-muted-foreground gap-2 mt-1">
            <span className="bg-muted px-2 py-0.5 rounded-full text-xs">
              {decision.category}
            </span>
            <span className="flex items-center gap-1">
              <Calendar size={14} />
              {new Date(decision.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-primary text-xs">
            {decision.title.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </div>
      <Separator className="my-2" />
      <p className="text-sm">{decision.description}</p>
    </div>
  );
};

interface AddDecisionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  setTitle: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  category: DecisionCategory;
  setCategory: (value: DecisionCategory) => void;
  onAdd: () => void;
}

const AddDecisionDialog = ({
  isOpen,
  onClose,
  title,
  setTitle,
  description,
  setDescription,
  category,
  setCategory,
  onAdd
}: AddDecisionDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Decision</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 pt-2">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              Decision Title
            </label>
            <Input
              id="title"
              placeholder="Enter decision title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="category" className="text-sm font-medium">
              Category
            </label>
            <Select
              value={category}
              onValueChange={(value) => setCategory(value as DecisionCategory)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Design">Design</SelectItem>
                <SelectItem value="Regulatory">Regulatory</SelectItem>
                <SelectItem value="Clinical">Clinical</SelectItem>
                <SelectItem value="QMS">QMS</SelectItem>
                <SelectItem value="Technical">Technical</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Description
            </label>
            <Textarea
              id="description"
              placeholder="Describe the decision and its rationale"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onAdd}>
            Add Decision
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DecisionLog;
