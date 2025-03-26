
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const EditorSkeleton: React.FC = () => {
  return (
    <div className="h-full flex flex-col">
      <div className="px-6 py-4 border-b border-editor-border">
        <Skeleton className="h-7 w-64 mb-2" />
        <Skeleton className="h-4 w-32" />
      </div>
      <div className="flex-1 p-6 space-y-6">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-10 w-full mt-8" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </div>
  );
};

export default EditorSkeleton;
