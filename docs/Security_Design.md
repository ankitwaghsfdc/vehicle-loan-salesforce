# Vehicle Loan Application System  
## Security Design Document

---

## 1. Purpose

This document describes the security architecture of the Vehicle Loan Application System built on Salesforce.  
The design focuses on scalability, least-privilege access, and alignment with Salesforce modern best practices.

---

## 2. Design Principles

- Minimal use of Profiles
- Access controlled via Permission Sets
- Data visibility controlled via Role Hierarchy
- No legacy Approval Processes
- Governance enforced using Flows and Validation Rules
- Single source of truth for loan data

---

## 3. Role Hierarchy

The following role hierarchy is implemented to control record visibility:

CEO  
└── Regional Head  
&nbsp;&nbsp;&nbsp;&nbsp;└── Branch Manager  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── Relationship Manager (RM)

### Purpose of Roles
- Roles control **who can see whose records**
- Senior roles can view records owned by subordinates
- Roles do NOT grant permissions to edit records

---

## 4. Permission Set Strategy

Profiles are kept minimal.  
All functional access is granted using Permission Sets.

### 4.1 Relationship Manager (RM)

**Permission Set:** `PS_Relationship_Manager`

Access:
- Lead: Create, Read, Edit
- Opportunity: Create, Read, Edit
- Loan_Application__c: Create, Read, Edit

Restrictions:
- Cannot approve or reject loans
- Cannot modify compliance or disbursement fields

---

### 4.2 Branch Manager

**Permission Set:** `PS_Branch_Manager`

Access:
- Lead: Read
- Opportunity: Read
- Loan_Application__c: Read, Edit

Special Permissions:
- Can update Loan_Status__c
- Can approve or reject loan applications
- Can modify approved amount and interest rate

---

### 4.3 Regional Head

**Permission Set:** `PS_Regional_Head`

Access:
- Read-only access to Leads, Opportunities, and Loan Applications
- Access to reports and dashboards

Purpose:
- Oversight and performance monitoring

---

### 4.4 CEO

**Permission Set:** `PS_CEO`

Access:
- Read-only access to all objects
- View dashboards and executive reports

Purpose:
- Strategic visibility without operational involvement

---

## 5. Lead Governance (RM Decision)

### Control Mechanism
- RM_Approval_Status__c field on Lead
- Record-Triggered Flow reacts to status changes
- Validation Rule prevents conversion unless approved

### Rule
Only Leads with RM_Approval_Status__c = Approved can be converted.

---

## 6. Loan Governance (Post-Conversion)

### Control Mechanisms
- Loan_Status__c lifecycle field
- Record-Triggered Flows for:
  - Risk-based calculations
  - EMI calculation
  - Compliance enforcement (CERSAI)

### Branch Manager Control
- Only users with Branch Manager permission set can move loans to Approved or Rejected.

---

## 7. Data Visibility Model

- Organization-Wide Defaults (OWD):
  - Lead: Private
  - Opportunity: Private
  - Loan_Application__c: Private

- Role Hierarchy allows upward visibility
- No public read/write sharing rules used

---

## 8. Audit & Compliance

- Field History Tracking enabled on:
  - Loan_Status__c
  - Approved_Amount__c
  - CERSAI_Status__c

- All critical transitions are system-controlled via Flows

---

## 9. Environment Constraints

Due to limited licenses in the development org:
- Single user used to simulate roles
- Permission Sets assigned/unassigned for testing
- Design fully supports multi-user production deployment

---

## 10. Summary

The security model is designed to be:
- Scalable
- Auditable
- Role-aware
- Aligned with Salesforce’s Flow-first strategy

This approach avoids legacy approval mechanisms and profile sprawl while maintaining strong governance.
