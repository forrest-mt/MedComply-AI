
import React from "react";
import { DocumentProvider } from "@/context/DocumentContext";
import Layout from "@/components/Layout";

const Index = () => {
  return (
    <DocumentProvider>
      <Layout>
        <div>
          {/* Main content will be rendered by Layout component */}
        </div>
      </Layout>
    </DocumentProvider>
  );
};

export default Index;
