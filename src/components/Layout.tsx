
import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import Header from "./Header";
import DocumentList from "./DocumentList";
import DocumentEditor from "./DocumentEditor";
import AIChatTabs from "./AIChatTabs";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { cn } from "@/lib/utils";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const isMobile = useIsMobile();
  const [isNavOpen, setIsNavOpen] = useState(!isMobile);
  
  // Handle responsive navigation
  useEffect(() => {
    setIsNavOpen(!isMobile);
  }, [isMobile]);
  
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />
      
      <div className="flex-1 pt-16 flex overflow-hidden">
        {/* Navigation sidebar */}
        <div 
          className={cn(
            "absolute inset-y-0 left-0 z-20 w-64 bg-background border-r border-editor-border transform transition-transform duration-300 ease-in-out pt-16",
            isNavOpen ? "translate-x-0" : "-translate-x-full",
            "md:relative md:translate-x-0"
          )}
        >
          <DocumentList />
        </div>
        
        {/* Main content area with resizable panels */}
        <div className="flex-1 overflow-hidden">
          <ResizablePanelGroup direction="horizontal" className="h-full">
            <ResizablePanel defaultSize={60} minSize={40} className="h-full">
              <DocumentEditor />
            </ResizablePanel>
            
            <ResizableHandle withHandle className="bg-editor-border" />
            
            <ResizablePanel defaultSize={40} minSize={30} className="h-full">
              <AIChatTabs />
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>
      
      {/* Backdrop for mobile navigation */}
      {isNavOpen && isMobile && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-10 md:hidden"
          onClick={() => setIsNavOpen(false)}
        />
      )}
    </div>
  );
};

export default Layout;
