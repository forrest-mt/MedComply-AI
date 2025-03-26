
import React, { createContext, useContext, useState, useEffect } from "react";
import { MedicalDocument, DocumentType } from "@/lib/types";
import { documentTemplates, createNewDocument } from "@/lib/documentTemplates";
import { toast } from "sonner";

interface DocumentContextType {
  documents: MedicalDocument[];
  setDocuments: React.Dispatch<React.SetStateAction<MedicalDocument[]>>;
  currentDocument: MedicalDocument | null;
  setCurrentDocument: (document: MedicalDocument | null) => void;
  createDocument: (templateId: string) => void;
  updateDocument: (document: MedicalDocument) => void;
  deleteDocument: (id: string) => void;
  isLoading: boolean;
}

const DocumentContext = createContext<DocumentContextType | undefined>(undefined);

export const DocumentProvider = ({ children }: { children: React.ReactNode }) => {
  const [documents, setDocuments] = useState<MedicalDocument[]>([]);
  const [currentDocument, setCurrentDocument] = useState<MedicalDocument | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load documents from localStorage on initial load
  useEffect(() => {
    const loadDocuments = () => {
      try {
        const savedDocuments = localStorage.getItem("medidoc-documents");
        if (savedDocuments) {
          const parsedDocs = JSON.parse(savedDocuments);
          
          // Convert string dates back to Date objects
          const formattedDocs = parsedDocs.map((doc: any) => ({
            ...doc,
            createdAt: new Date(doc.createdAt),
            updatedAt: new Date(doc.updatedAt)
          }));
          
          setDocuments(formattedDocs);
          
          // Set the first document as current if available
          if (formattedDocs.length > 0 && !currentDocument) {
            setCurrentDocument(formattedDocs[0]);
          }
        } else if (documentTemplates.length > 0) {
          // Create a default document from the first template if no documents exist
          const newDoc = createNewDocument(documentTemplates[0]);
          setDocuments([newDoc]);
          setCurrentDocument(newDoc);
          saveDocumentsToStorage([newDoc]);
        }
      } catch (error) {
        console.error("Error loading documents:", error);
        toast.error("Failed to load documents");
      } finally {
        setIsLoading(false);
      }
    };

    loadDocuments();
  }, []);

  // Save documents to localStorage whenever they change
  const saveDocumentsToStorage = (docs: MedicalDocument[]) => {
    try {
      localStorage.setItem("medidoc-documents", JSON.stringify(docs));
    } catch (error) {
      console.error("Error saving documents:", error);
      toast.error("Failed to save documents");
    }
  };

  const createDocument = (templateId: string) => {
    try {
      const template = documentTemplates.find(t => t.id === templateId);
      
      if (!template) {
        throw new Error("Template not found");
      }
      
      const newDoc = createNewDocument(template);
      const updatedDocs = [...documents, newDoc];
      
      setDocuments(updatedDocs);
      setCurrentDocument(newDoc);
      saveDocumentsToStorage(updatedDocs);
      
      toast.success("Document created successfully");
    } catch (error) {
      console.error("Error creating document:", error);
      toast.error("Failed to create document");
    }
  };

  const updateDocument = (document: MedicalDocument) => {
    try {
      const updatedDoc = {
        ...document,
        updatedAt: new Date(),
        wordCount: document.content.split(/\s+/).length
      };
      
      const updatedDocs = documents.map(doc => 
        doc.id === document.id ? updatedDoc : doc
      );
      
      setDocuments(updatedDocs);
      setCurrentDocument(updatedDoc);
      saveDocumentsToStorage(updatedDocs);
    } catch (error) {
      console.error("Error updating document:", error);
      toast.error("Failed to update document");
    }
  };

  const deleteDocument = (id: string) => {
    try {
      const updatedDocs = documents.filter(doc => doc.id !== id);
      
      setDocuments(updatedDocs);
      
      // If the current document is deleted, set the first available document as current
      if (currentDocument && currentDocument.id === id) {
        setCurrentDocument(updatedDocs.length > 0 ? updatedDocs[0] : null);
      }
      
      saveDocumentsToStorage(updatedDocs);
      toast.success("Document deleted successfully");
    } catch (error) {
      console.error("Error deleting document:", error);
      toast.error("Failed to delete document");
    }
  };

  return (
    <DocumentContext.Provider
      value={{
        documents,
        setDocuments,
        currentDocument,
        setCurrentDocument,
        createDocument,
        updateDocument,
        deleteDocument,
        isLoading
      }}
    >
      {children}
    </DocumentContext.Provider>
  );
};

export const useDocuments = () => {
  const context = useContext(DocumentContext);
  if (!context) {
    throw new Error("useDocuments must be used within a DocumentProvider");
  }
  return context;
};
