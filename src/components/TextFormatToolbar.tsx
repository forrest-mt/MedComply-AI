
import React from "react";
import { 
  Bold, 
  Italic, 
  Underline, 
  Heading1, 
  Heading2, 
  Heading3, 
  List, 
  ListOrdered,
  Plus,
  Minus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface ToolbarButton {
  label: string;
  value: string;
  icon: string;
  className?: string;
}

interface TextFormatToolbarProps {
  onFormatClick: (format: string) => void;
  additionalButtons?: ToolbarButton[];
}

const TextFormatToolbar = ({ onFormatClick, additionalButtons = [] }: TextFormatToolbarProps) => {
  // Map of icon component names to actual components
  const iconComponents = {
    Bold,
    Italic,
    Underline,
    Heading1,
    Heading2,
    Heading3,
    List,
    ListOrdered,
    Plus,
    Minus
  };
  
  // Default formatting buttons
  const buttons: ToolbarButton[] = [
    { label: "Bold", value: "bold", icon: "Bold" },
    { label: "Italic", value: "italic", icon: "Italic" },
    { label: "Underline", value: "underline", icon: "Underline" },
    { label: "Heading 1", value: "h1", icon: "Heading1" },
    { label: "Heading 2", value: "h2", icon: "Heading2" },
    { label: "Heading 3", value: "h3", icon: "Heading3" },
    { label: "Bullet List", value: "bullet", icon: "List" },
    { label: "Numbered List", value: "numbered", icon: "ListOrdered" }
  ];
  
  // Combine default and additional buttons
  const allButtons = [...buttons, ...additionalButtons];
  
  return (
    <div className="flex items-center flex-wrap gap-1 rounded-lg border p-1 bg-background">
      {allButtons.map((button, index) => {
        // Get the icon component based on the icon name
        const IconComponent = iconComponents[button.icon as keyof typeof iconComponents];
        
        return (
          <React.Fragment key={button.value}>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className={cn("h-8 px-2 text-muted-foreground", button.className)}
              onClick={() => onFormatClick(button.value)}
              title={button.label}
            >
              {IconComponent && <IconComponent className="h-4 w-4" />}
            </Button>
            
            {/* Add separators between groups */}
            {(index === 2 || index === 5 || index === 7 || index === buttons.length - 1 && additionalButtons.length > 0) && (
              <Separator orientation="vertical" className="h-8" />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default TextFormatToolbar;
