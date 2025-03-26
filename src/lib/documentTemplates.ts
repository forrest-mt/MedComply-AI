import { MedicalDocument, DocumentTemplate, DocumentType } from "./types";

export const documentTemplates: DocumentTemplate[] = [
  {
    id: "quality-manual-template",
    title: "Quality Manual Template",
    type: DocumentType.QualityManual,
    description: "Standard template for a medical device Quality Management System (QMS) manual.",
    content: `# Quality Manual

ID: QA-TCD-\${id}-Quality Manual

## 1. Purpose

The Quality Manual describes the Quality Management System (QMS), its documented procedures or reference to them, and a description of the interaction between the processes of the QMS. The quality manual is used to communicate the company's quality policy and objectives to the organization and to provide an overview of the quality management system.

## 2. Scope

The QMS described in this Quality Manual applies to all products of the manufacturer and applies a risk based approach to the control of the appropriate processes needed for the quality management system.

## 3. Applicable Standards

The following standards are considered applicable to the QMS:

* ISO 13485:2016 Medical devices - Quality management systems - Requirements for regulatory purposes
* ISO 14971:2019 Medical devices - Application of risk management to medical devices
* IEC 62366-1:2015 Medical devices - Part 1: Application of usability engineering to medical devices
* IEC 62304:2006 Medical device software - Software life cycle processes
* 21 CFR 820 - QMSR

## 4. QMS Exclusions

The following sections of ISO 13485:2016 will be excluded due to the product characteristics:

* 6.4.2 Contamination control
* 7.5.2 Cleanliness of product
* 7.5.5 Particular requirements for sterile medical devices
* 7.5.7 Particular requirements for validation of processes for sterilization and sterile barrier systems
* 7.5.9.2 Particular requirements for implantable medical devices
* 7.5.11 Preservation of product

## 5. Company

Manufacturer

## 6. Quality Policy and Objectives

[Insert quality policy and objectives here]
`,
  },
  {
    id: "risk-analysis-template",
    title: "Risk Analysis Template",
    type: DocumentType.RiskAnalysis,
    description: "Template for conducting risk analysis according to ISO 14971.",
    content: `# Risk Analysis Report

ID: RA-\${id}-Risk Analysis

## 1. Introduction

This document outlines the risk analysis conducted for [PRODUCT NAME] according to ISO 14971:2019 - Medical devices - Application of risk management to medical devices.

## 2. Scope

This risk analysis applies to the [PRODUCT NAME] and all of its components, including hardware, software, and user interface elements.

## 3. Risk Management Team

[List risk management team members, roles, and responsibilities]

## 4. Risk Assessment Methodology

### 4.1 Severity Levels

| Level | Description | Example |
|-------|-------------|---------|
| 1 | Negligible | Temporary discomfort |
| 2 | Minor | Temporary injury or impairment |
| 3 | Serious | Permanent impairment or life-threatening injury |
| 4 | Catastrophic | Death |

### 4.2 Probability Levels

| Level | Description | Probability |
|-------|-------------|------------|
| 1 | Remote | < 0.1% |
| 2 | Unlikely | 0.1% - 1% |
| 3 | Occasional | 1% - 10% |
| 4 | Likely | > 10% |

### 4.3 Risk Index

Risk Index = Severity × Probability

### 4.4 Risk Acceptability

| Risk Index | Acceptability | Action |
|------------|---------------|--------|
| 1-4 | Acceptable | No further action required |
| 5-8 | ALARP | Reduce risk as far as reasonably practicable |
| 9-16 | Unacceptable | Risk must be reduced |

## 5. Hazard Identification

[List identified hazards, potential harm, and initial risk assessment]

## 6. Risk Control Measures

[List risk control measures for each identified hazard]

## 7. Residual Risk Assessment

[List residual risks after implementation of control measures]

## 8. Overall Residual Risk Assessment

[Provide justification for overall residual risk acceptability]

## 9. Post-Production Information

[Describe procedures for collecting and reviewing information in the production and post-production phases]

## 10. Conclusion

[Summarize findings and confirm compliance with acceptance criteria]

## 11. Approval

[Signatures of risk management team and approval authority]
`,
  },
  {
    id: "design-control-template",
    title: "Design Control Document",
    type: DocumentType.DesignControl,
    description: "Template for a design control document following FDA and ISO requirements.",
    content: `# Design Control Document

ID: DC-\${id}-Design Control

## 1. Design Planning

### 1.1 Design and Development Planning

[Describe the design and development planning process]

### 1.2 Design and Development Responsibilities

[List responsibilities and authorities for design and development]

### 1.3 Design and Development Interfaces

[Describe interfaces between different groups involved in the design process]

## 2. Design Inputs

### 2.1 Functional Requirements

[List functional requirements]

### 2.2 Performance Requirements

[List performance requirements]

### 2.3 Safety Requirements

[List safety requirements]

### 2.4 Regulatory Requirements

[List applicable regulatory requirements]

### 2.5 Input Risk Analysis

[Summarize risk analysis results related to design inputs]

## 3. Design Outputs

### 3.1 Design Specifications

[List design specifications]

### 3.2 Technical Documentation

[List technical documentation]

### 3.3 Manufacturing Documentation

[List manufacturing documentation]

### 3.4 Reference to Test Methods

[Reference test methods used to verify design outputs]

## 4. Design Verification

### 4.1 Verification Planning

[Describe verification planning]

### 4.2 Verification Methods

[Describe verification methods]

### 4.3 Verification Results

[Summarize verification results]

### 4.4 Verification Analysis

[Provide analysis of verification results]

## 5. Design Validation

### 5.1 Validation Planning

[Describe validation planning]

### 5.2 Validation Methods

[Describe validation methods]

### 5.3 Validation Results

[Summarize validation results]

### 5.4 Validation Analysis

[Provide analysis of validation results]

## 6. Design Transfer

### 6.1 Transfer Planning

[Describe transfer planning]

### 6.2 Transfer Activities

[Describe transfer activities]

### 6.3 Transfer Verification

[Describe transfer verification]

## 7. Design Changes

### 7.1 Change Control Process

[Describe change control process]

### 7.2 Change Documentation

[Describe change documentation requirements]

### 7.3 Change Verification and Validation

[Describe requirements for verification and validation of changes]

## 8. Design History File

### 8.1 Contents

[List contents of design history file]

### 8.2 Maintenance

[Describe maintenance procedures for design history file]

## 9. Approval

[Signatures of design team and approval authority]
`,
  },
  {
    id: "design-history-file-template",
    title: "Design History File",
    type: DocumentType.DesignControl,
    description: "Template for a Design History File (DHF) to document the design and development process.",
    content: `# Design History File (DHF)

ID: DHF-\${id}

## 1. Introduction

This Design History File (DHF) documents all aspects of the design and development process for [PRODUCT NAME]. It serves as the central repository for all design-related information, including design inputs, outputs, reviews, verification, validation, and transfer activities.

## 2. Design Planning

### 2.1 Project Overview

[Provide a brief description of the medical device, its intended use, and clinical context]

### 2.2 Design and Development Plan

[Reference to the design and development plan document]

### 2.3 Team Organization

[List key team members, roles, and responsibilities]

### 2.4 Design Review Schedule

[Outline planned design reviews and milestones]

## 3. Design Input

### 3.1 User Needs

[Document identified user needs]

### 3.2 Intended Use

[Specify the intended use, indications, and user population]

### 3.3 Design Input Requirements

[List all design input requirements]

### 3.4 Regulatory Requirements

[List applicable regulatory requirements]

### 3.5 Standards Compliance

[List applicable standards the device must comply with]

## 4. Design Process

### 4.1 Design Concepts

[Document initial design concepts and selection rationale]

### 4.2 Design Reviews

[List and summarize all design reviews]

### 4.3 Risk Management

[Reference to risk management file]

### 4.4 Human Factors/Usability Engineering

[Reference to human factors engineering file]

## 5. Design Output

### 5.1 Product Specifications

[Document final product specifications]

### 5.2 Materials Specifications

[List material specifications]

### 5.3 Software Documentation

[Reference to software documentation]

### 5.4 Drawings and Schematics

[Reference to drawings and schematics]

### 5.5 Manufacturing Specifications

[Document manufacturing specifications]

## 6. Design Verification

### 6.1 Verification Plan

[Reference to verification plan]

### 6.2 Test Methods

[Document test methods]

### 6.3 Verification Results

[Summarize verification results]

### 6.4 Design Verification Report

[Reference to design verification report]

## 7. Design Validation

### 7.1 Validation Plan

[Reference to validation plan]

### 7.2 Clinical Evaluation

[Reference to clinical evaluation report]

### 7.3 Validation Results

[Summarize validation results]

### 7.4 Design Validation Report

[Reference to design validation report]

## 8. Design Transfer

### 8.1 Manufacturing Transfer Plan

[Document manufacturing transfer plan]

### 8.2 Production Specifications

[List production specifications]

### 8.3 Process Validation

[Reference to process validation reports]

## 9. Design Changes

### 9.1 Change Control Process

[Describe the change control process]

### 9.2 Design Change History

[Maintain a history of design changes]

## 10. Design History File Index

[Provide an index of all documents included in the DHF]

## 11. Approval

[Signatures of design team and approval authority]
`,
  }
];

export function generateDocumentId(): string {
  return Math.random().toString(36).substring(2, 11);
}

export function createNewDocument(template: DocumentTemplate): MedicalDocument {
  const id = generateDocumentId();
  const content = template.content.replace(/\$\{id\}/g, id);
  
  return {
    id,
    title: template.title,
    content,
    createdAt: new Date(),
    updatedAt: new Date(),
    type: template.type,
    version: "1.0",
    wordCount: content.split(/\s+/).length
  };
}
