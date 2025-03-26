import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { GeminiService } from "@/lib/gemini-service";
import { Message, AIEditResponse } from "@/lib/types";
import { SendHorizontal, Bot, Pencil, Check, X } from "lucide-react";
import { useDocuments } from "@/context/DocumentContext";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const geminiService = new GeminiService();

const PREDEFINED_PROMPTS = [
  {
    id: "format-document",
    title: "Format Document",
    text: "Format this document to comply with ISO 13485:2016 standards",
    category: "formatting"
  },
  {
    id: "expand-section",
    title: "Expand Section",
    text: "Expand this section with more detailed content based on regulatory requirements",
    category: "content"
  },
  {
    id: "risk-assessment",
    title: "Risk Assessment",
    text: "Analyze this section and suggest risk assessment improvements based on ISO 14971",
    category: "analysis"
  },
  {
    id: "check-compliance",
    title: "Check Compliance",
    text: "Review this document for compliance with FDA and EU MDR requirements",
    category: "review"
  },
  {
    id: "generate-sop",
    title: "Generate SOP",
    text: "Create a standard operating procedure based on this section",
    category: "generation"
  },
  {
    id: "edit-document",
    title: "Edit Document",
    text: "Edit my document to add a section about risk management",
    category: "edit"
  }
];

const AIChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-message",
      content: "Hi, I'm your medical device documentation assistant. I can help you create, edit, and improve your compliance documents. What would you like to help with today?",
      role: "assistant",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [editSuggestion, setEditSuggestion] = useState<AIEditResponse | null>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { currentDocument, updateDocument } = useDocuments();

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    
    try {
      if (currentDocument) {
        const response = await geminiService.generateEditResponse({
          documentContent: currentDocument.content,
          userRequest: input,
          documentType: currentDocument.type
        });

        // Always show the AI's message about the changes
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: response.type === 'edit' 
            ? `I've analyzed your request and prepared some changes to the document. ${response.message}`
            : response.message,
          role: "assistant",
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, aiMessage]);

        // If it's an edit response, show the edit dialog
        if (response.type === 'edit' && response.editContent) {
          setEditSuggestion(response);
          setShowEditDialog(true);
        }
      } else {
        // If no document is open, just use regular chat
        const response = await geminiService.generateContent(input);
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: response,
          role: "assistant",
          timestamp: new Date()
        };
        setMessages(prev => [...prev, aiMessage]);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to get AI response");
    } finally {
      setIsLoading(false);
    }
  };

  const handleApplyEdit = () => {
    if (!currentDocument || !editSuggestion?.editContent) return;
    
    updateDocument({
      ...currentDocument,
      content: editSuggestion.editContent.content
    });
    
    toast.success("Document updated successfully");
    setShowEditDialog(false);
    setEditSuggestion(null);
  };

  const handleRejectEdit = () => {
    setShowEditDialog(false);
    setEditSuggestion(null);
    toast("Edit suggestion dismissed");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleEditDocument = () => {
    if (!currentDocument) {
      toast.error("No document selected to edit");
      return;
    }
    
    setInput(input => input + " (Please edit the document with this suggestion)");
  };

  const handlePromptClick = (promptText: string) => {
    setInput(promptText);
  };

  return (
    <div className="h-full flex flex-col bg-aiChat-background">
      <div className="px-4 py-2.5 border-b border-editor-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" />
          <h2 className="font-medium">AI Assistant</h2>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4 mb-4">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          {isLoading && <LoadingIndicator />}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-editor-border">
        <div className="flex gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="min-h-[44px] max-h-[200px] resize-none"
            rows={1}
          />
          <Button
            className="shrink-0"
            size="icon"
            onClick={handleSendMessage}
            disabled={isLoading || !input.trim()}
          >
            <SendHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <AlertDialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <AlertDialogContent className="max-w-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Review Document Changes</AlertDialogTitle>
            <AlertDialogDescription>
              The AI suggests the following changes to your document:
            </AlertDialogDescription>
          </AlertDialogHeader>
          
          <div className="my-4 space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium">Changes to be made:</h4>
              <ul className="list-disc pl-4 space-y-1">
                {editSuggestion?.editContent?.changes.map((change, index) => (
                  <li key={index} className="text-sm text-muted-foreground">
                    {change}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">Preview:</h4>
              <ScrollArea className="h-[200px] w-full rounded-md border p-4">
                <pre className="text-sm whitespace-pre-wrap">
                  {editSuggestion?.editContent?.content}
                </pre>
              </ScrollArea>
            </div>
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleRejectEdit}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleApplyEdit}>
              Apply Changes
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

interface ChatMessageProps {
  message: Message;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  const isUser = message.role === "user";
  
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div 
        className={cn(
          "rounded-lg py-2 px-3 max-w-[85%]",
          isUser 
            ? "bg-primary text-primary-foreground" 
            : "bg-white border border-editor-border"
        )}
      >
        <div className="whitespace-pre-wrap text-sm">{message.content}</div>
        <div className={cn(
          "text-xs mt-1", 
          isUser ? "text-primary-foreground/70" : "text-muted-foreground"
        )}>
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
};

const LoadingIndicator = () => {
  return (
    <div className="flex justify-start">
      <div className="bg-white rounded-lg py-2 px-3 border border-editor-border">
        <div className="flex space-x-1.5 items-center">
          <div className="h-2 w-2 rounded-full bg-primary opacity-90 animate-pulse" style={{ animationDelay: '0ms' }}></div>
          <div className="h-2 w-2 rounded-full bg-primary opacity-90 animate-pulse" style={{ animationDelay: '300ms' }}></div>
          <div className="h-2 w-2 rounded-full bg-primary opacity-90 animate-pulse" style={{ animationDelay: '600ms' }}></div>
        </div>
      </div>
    </div>
  );
};

interface PromptCategoryProps {
  title: string;
  icon: React.ReactNode;
  prompts: typeof PREDEFINED_PROMPTS;
  onPromptClick: (promptText: string) => void;
}

const PromptCategory = ({ title, icon, prompts, onPromptClick }: PromptCategoryProps) => {
  return (
    <div>
      <div className="flex items-center gap-1.5 mb-2">
        {icon}
        <h3 className="text-sm font-medium">{title}</h3>
      </div>
      <div className="space-y-2">
        {prompts.map((prompt) => (
          <Button
            key={prompt.id}
            variant="outline"
            className="w-full justify-start text-sm h-auto py-2 px-3 font-normal"
            onClick={() => onPromptClick(prompt.text)}
          >
            {prompt.title}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default AIChat;
