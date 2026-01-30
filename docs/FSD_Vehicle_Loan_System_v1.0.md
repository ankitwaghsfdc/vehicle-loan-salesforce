# Vehicle Loan Application System  
## Functional Specification Document (FSD)

**Version:** 1.0  
**Status:** Approved for Build  
**Prepared By:** Ankit Uttam Wagh  

---


Vehicle Loan System – Functional Specification Document (FSD)
1. Document Overview
1.1 Purpose
This document defines the functional requirements for building a Vehicle Loan Management System on Salesforce. It serves as a bridge between business requirements and technical implementation.
1.2 Audience
•	Salesforce Admins
•	Salesforce Developers
•	Architects
•	QA / Testers
•	Business Stakeholders
1.3 In Scope
•	Lead onboarding & verification
•	Loan processing lifecycle
•	Approvals & validations
•	EMI generation & disbursement tracking
1.4 Out of Scope
•	Actual banking transactions
•	Real Aadhaar / PAN integrations (mock only)
•	Customer portal (Experience Cloud)
________________________________________
2. Business Objective
The objective of the Vehicle Loan System is to:
•	Digitize end-to-end loan processing
•	Reduce manual intervention
•	Enforce approval hierarchy
•	Track loan lifecycle from onboarding to disbursement
•	Enable future scalability (EMIs, repayments, re-loans)
________________________________________
3. User Roles
Role	Description
Loan Agent (RM)	Handles onboarding, verification, document upload
Branch Manager	Approves high-value / risky loans
System Admin	Manages configuration & security
________________________________________
4. End-to-End Business Flow
1.	Lead creation (Initial onboarding)
2.	Aadhaar verification
3.	PAN check & risk classification
4.	RM approval
5.	Lead conversion
6.	Loan Application creation
7.	Document upload
8.	CERSAI check
9.	Loan amount calculation
10.	Branch Manager approval
11.	EMI generation
12.	Loan disbursement
________________________________________
5. Object Model
5.1 Standard Objects
Lead
Used for initial onboarding and pre-qualification.
Key Fields:
•	Aadhaar_Verified__c (Checkbox)
•	PAN_Verified__c (Checkbox)
•	Risk_Category__c (Picklist: Low, Medium, High)
•	RM_Approval_Status__c (Picklist: Pending, Approved, Rejected)
________________________________________
Account & Contact
Created post Lead conversion. Represents verified customer.
________________________________________
Opportunity
Represents intent to lend.
Key Fields:
•	Loan_Type__c (Vehicle Loan)
•	Opportunity_Stage aligned with Loan lifecycle
________________________________________
5.2 Custom Object
Loan_Application__c
Primary object managing loan lifecycle.
Key Fields:
•	Loan_Status__c (New, Under Review, Approved, Disbursed, Rejected)
•	Requested_Amount__c (Currency)
•	Approved_Amount__c (Currency)
•	Risk_Category__c (Picklist)
•	CERSAI_Status__c (Pending, Clear, Blocked)
•	Tenure__c (Number – Months)
•	Interest_Rate__c (Percent)
•	EMI_Amount__c (Currency)
Relationships:
•	Lookup → Account
•	Lookup → Opportunity
________________________________________
6. Functional Requirements
6.1 Lead Management
•	System shall allow creation of Leads with minimal data
•	Aadhaar & PAN verification status shall be stored as flags
•	Risk category shall be auto-assigned (future automation)
________________________________________
6.2 Lead Approval
•	RM approval required before Lead conversion
•	Only Approved Leads can be converted
________________________________________
6.3 Loan Application Processing
•	Loan Application record shall be created post conversion
•	Each Account can have multiple Loan Applications
•	Documents shall be uploaded using Salesforce Files
________________________________________
6.4 CERSAI Verification
•	CERSAI check status shall be captured
•	Loan cannot move forward if status is Blocked
________________________________________
6.5 Loan Calculation
•	Approved amount depends on Risk Category
•	EMI calculated using tenure & interest rate
________________________________________
6.6 Approvals
RM Approval
•	Triggered at Lead stage
Branch Manager Approval
•	Triggered on Loan Application
•	Mandatory for Medium & High risk loans
________________________________________
6.7 Disbursement
•	Loan status updated to Disbursed
•	Disbursement date recorded
________________________________________
7. Security Model
7.1 Object Access
Role	Lead	Opportunity	Loan Application
Loan Agent	Create/Edit	Create/Edit	Create/Edit
Branch Manager	Read	Read	Approve
Admin	Full	Full	Full
________________________________________
8. Validation Rules (High Level)
•	Loan Amount must be > 0
•	Approved Amount ≤ Requested Amount
•	EMI fields required before Disbursement
________________________________________
9. Reports & Dashboards (Future)
•	Loans by Status
•	Risk Category distribution
•	Approval TAT
•	Disbursement summary
________________________________________
10. Assumptions & Constraints
•	Trailhead Playground used
•	Mock integrations only
•	Manual EMI logic initially
________________________________________
11. Success Criteria
•	End-to-end flow achievable without data inconsistency
•	Clear separation of responsibilities
•	System scalable for future enhancements
________________________________________
12. Future Enhancements
•	EMI repayment tracking
•	Customer portal
•	Real credit bureau integration
•	Automation-heavy loan processing
________________________________________
Document Status: Approved for Build
-----------------------------------------------------------------------------------------