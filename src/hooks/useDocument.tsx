
import { useState, useCallback } from "react";
import { MedicalDocument, DocumentType } from "@/lib/types";
import { toast } from "sonner";

export const useDocument = (initialDocument?: MedicalDocument) => {
  const [document, setDocument] = useState<MedicalDocument | undefined>(initialDocument);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const updateContent = useCallback((newContent: string) => {
    if (!document) return;

    try {
      const updatedDoc = {
        ...document,
        content: newContent,
        updatedAt: new Date(),
        wordCount: newContent.split(/\s+/).length,
      };
      
      setDocument(updatedDoc);
      return updatedDoc;
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Failed to update document");
      setError(error);
      toast.error("Failed to update document content");
      return undefined;
    }
  }, [document]);

  const updateTitle = useCallback((newTitle: string) => {
    if (!document) return;

    try {
      const updatedDoc = {
        ...document,
        title: newTitle,
        updatedAt: new Date(),
      };
      
      setDocument(updatedDoc);
      return updatedDoc;
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Failed to update document title");
      setError(error);
      toast.error("Failed to update document title");
      return undefined;
    }
  }, [document]);

  const updateType = useCallback((newType: DocumentType) => {
    if (!document) return;

    try {
      const updatedDoc = {
        ...document,
        type: newType,
        updatedAt: new Date(),
      };
      
      setDocument(updatedDoc);
      return updatedDoc;
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Failed to update document type");
      setError(error);
      toast.error("Failed to update document type");
      return undefined;
    }
  }, [document]);

  return {
    document,
    setDocument,
    updateContent,
    updateTitle,
    updateType,
    isLoading,
    error,
  };
};
