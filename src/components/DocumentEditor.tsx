
import { useState, useEffect, useRef } from "react";
import { useDocuments } from "@/context/DocumentContext";
import { MedicalDocument } from "@/lib/types";
import { toast } from "sonner";
import TextFormatToolbar from "./TextFormatToolbar";
import { debounce, processMarkdown } from "@/utils/editorUtils";
import EditorHeader from "./EditorHeader";
import EditorSkeleton from "./EditorSkeleton";

const DocumentEditor = () => {
  const { currentDocument, updateDocument, isLoading } = useDocuments();
  const [content, setContent] = useState(currentDocument?.content || "");
  const [isSaving, setIsSaving] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);

  // Update editor content when currentDocument changes
  useEffect(() => {
    if (currentDocument) {
      setContent(currentDocument.content);
    }
  }, [currentDocument]);

  // Save changes to the document
  const saveChanges = (newContent: string) => {
    if (!currentDocument) return;
    
    setIsSaving(true);
    
    const updatedDoc: MedicalDocument = {
      ...currentDocument,
      content: newContent,
    };
    
    updateDocument(updatedDoc);
    
    // Show saving indicator briefly
    setTimeout(() => {
      setIsSaving(false);
    }, 600);
  };

  // Debounced save function
  const debouncedSave = useRef(
    debounce((content: string) => {
      saveChanges(content);
    }, 1000)
  ).current;

  // Handle content changes
  const handleContentChange = (e: React.FormEvent<HTMLDivElement>) => {
    const newContent = e.currentTarget.innerHTML;
    debouncedSave(newContent);
  };

  // Apply formatting
  const applyFormat = (format: string) => {
    if (!editorRef.current) return;
    
    document.execCommand('styleWithCSS', false, 'true');
    
    switch (format) {
      case 'bold':
        document.execCommand('bold', false);
        break;
      case 'italic':
        document.execCommand('italic', false);
        break;
      case 'underline':
        document.execCommand('underline', false);
        break;
      case 'h1':
        document.execCommand('formatBlock', false, '<h1>');
        break;
      case 'h2':
        document.execCommand('formatBlock', false, '<h2>');
        break;
      case 'h3':
        document.execCommand('formatBlock', false, '<h3>');
        break;
      case 'bullet':
        document.execCommand('insertUnorderedList', false);
        break;
      case 'numbered':
        document.execCommand('insertOrderedList', false);
        break;
      default:
        break;
    }
    
    editorRef.current.focus();
  };

  // Initialize editor with formatted content
  useEffect(() => {
    if (editorRef.current && currentDocument) {
      // Apply initial formatting
      const formattedContent = processMarkdown(currentDocument.content);
      editorRef.current.innerHTML = formattedContent;
    }
  }, [currentDocument, editorRef.current]);

  if (isLoading) {
    return <EditorSkeleton />;
  }

  if (!currentDocument) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center">
        <h2 className="text-2xl font-semibold mb-2">No Document Selected</h2>
        <p className="text-muted-foreground mb-4">
          Select a document from the sidebar or create a new one to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="relative h-full flex flex-col">
      {/* Editor header */}
      <EditorHeader 
        document={currentDocument} 
        isSaving={isSaving} 
      />

      {/* Formatting toolbar without suggestion options */}
      <div className="px-6 pt-4">
        <TextFormatToolbar 
          onFormatClick={applyFormat}
        />
      </div>

      {/* Editor content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div 
          ref={editorRef}
          className="document-editor focus:outline-none" 
          contentEditable={true}
          suppressContentEditableWarning={true}
          onInput={handleContentChange}
          spellCheck={true}
        />
      </div>
    </div>
  );
};

export default DocumentEditor;
