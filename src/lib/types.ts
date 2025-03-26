export interface MedicalDocument {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  type: DocumentType;
  version: string;
  wordCount: number;
}

export enum DocumentType {
  QualityManual = "Quality Manual",
  RiskAnalysis = "Risk Analysis",
  DesignControl = "Design Control",
  SoftwareValidation = "Software Validation",
  UserManual = "User Manual",
  TechnicalFile = "Technical File",
  ClinicalEvaluation = "Clinical Evaluation",
  Custom = "Custom Document"
}

export interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

export interface AIPrompt {
  id: string;
  title: string;
  prompt: string;
  category: string;
}

export interface DocumentTemplate {
  id: string;
  title: string;
  type: DocumentType;
  description: string;
  content: string;
}

export interface DocumentDecision {
  id: string;
  documentId: string;
  title: string;
  description: string;
  createdAt: Date;
  category: "Design" | "Regulatory" | "Clinical" | "QMS" | "Technical" | "Other";
}

export interface AIEditResponse {
  type: 'chat' | 'edit';
  message: string;
  editContent?: {
    content: string;
    changes: string[];
  };
}

export interface AIEditRequest {
  documentContent: string;
  userRequest: string;
  documentType?: DocumentType;
}
