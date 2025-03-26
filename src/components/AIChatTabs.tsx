
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import AIChat from "./AIChat";
import SuggestionPanel from "./SuggestionPanel";
import { MessageCircle, Sparkles } from "lucide-react";

const AIChatTabs = () => {
  return (
    <Tabs defaultValue="chat" className="h-full flex flex-col">
      <div className="px-4 pt-4">
        <TabsList className="w-full">
          <TabsTrigger value="chat" className="flex-1 flex items-center gap-1">
            <MessageCircle className="h-4 w-4" />
            <span>AI Chat</span>
          </TabsTrigger>
          <TabsTrigger value="suggestions" className="flex-1 flex items-center gap-1">
            <Sparkles className="h-4 w-4" />
            <span>Suggestions</span>
          </TabsTrigger>
        </TabsList>
      </div>
      
      <TabsContent value="chat" className="flex-1 overflow-hidden mt-0 p-0">
        <AIChat />
      </TabsContent>
      
      <TabsContent value="suggestions" className="flex-1 overflow-hidden mt-0 p-0">
        <SuggestionPanel />
      </TabsContent>
    </Tabs>
  );
};

export default AIChatTabs;
