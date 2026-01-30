# Vehicle Loan Application System  
## Technical Design Document (TDD)

**Version:** 1.0  
**Status:** Ready for Development  
**Prepared By:** Ankit Uttam Wagh  

---

Vehicle Loan System – Technical Design Document (TDD)
1. Document Overview
1.1 Purpose
This Technical Design Document (TDD) translates the approved Functional Specification Document (FSD) into a detailed technical blueprint for implementing the Vehicle Loan System on Salesforce.
1.2 Audience
•	Salesforce Developers
•	Salesforce Admins
•	Technical Architects
•	QA / Test Engineers
1.3 Design Principles
•	Declarative-first approach
•	Scalable & maintainable architecture
•	Secure-by-design
•	Clear separation of concerns
________________________________________
2. Salesforce Org & Environment Design
2.1 Org Type
•	Trailhead Playground (Developer Edition)
2.2 Environment Strategy
•	Single-org development
•	Versioning via Change Sets (future-ready for CI/CD)
2.3 Governor Limit Considerations
•	Bulk-safe automation
•	Minimize synchronous Apex
•	Prefer Flow over Apex where possible
________________________________________
3. Object Model – Technical Design
3.1 Standard Objects
Lead
Purpose: Pre-qualification & onboarding
Field API Name	Type	Notes
Aadhaar_Verified__c	Checkbox	Stores verification status only
PAN_Verified__c	Checkbox	Compliance safe
Risk_Category__c	Picklist	Low / Medium / High
RM_Approval_Status__c	Picklist	Pending / Approved / Rejected
________________________________________
Account
•	Represents verified customer
•	One Account → Many Loan Applications
________________________________________
Opportunity
Purpose: Intent to lend
Field API Name	Type	Notes
Loan_Type__c	Picklist	Vehicle Loan
Loan_Stage__c	Picklist	Aligned with Loan lifecycle
________________________________________
3.2 Custom Object
Loan_Application__c
Purpose: Core loan lifecycle management
Field API Name	Type	Notes
Loan_Status__c	Picklist	New, Under_Review, Approved, Disbursed, Rejected
Requested_Amount__c	Currency	Input by RM
Approved_Amount__c	Currency	Derived value
Risk_Category__c	Picklist	Copied from Lead
CERSAI_Status__c	Picklist	Pending, Clear, Blocked
Tenure__c	Number	Months
Interest_Rate__c	Percent	Configurable
EMI_Amount__c	Currency	Calculated
Disbursement_Date__c	Date	Final milestone
Relationships:
•	Lookup → Account
•	Lookup → Opportunity
________________________________________
4. Automation Architecture
4.1 Flow Design
Record-Triggered Flow: Lead
•	Trigger: After Update
•	Condition: RM_Approval_Status__c = Approved
•	Action: Enable Lead Conversion
________________________________________
Record-Triggered Flow: Loan_Application__c
Flow 1: Loan Calculation
•	Trigger: Before Save
•	Conditions:
o	Requested_Amount__c changed
o	Risk_Category__c populated
•	Logic:
o	Risk-based approval percentage
o	EMI calculation formula
Flow 2: Status Control
•	Prevent Disbursement if:
o	CERSAI_Status__c = Blocked
o	EMI_Amount__c is null
________________________________________
4.2 Approval Processes
RM Approval (Lead)
•	Entry Criteria: Risk_Category__c ≠ null
•	Approver: Reporting Manager
Branch Manager Approval (Loan Application)
•	Entry Criteria:
o	Risk_Category__c = Medium or High
o	Approved_Amount__c > Threshold
•	Approver: Branch Manager Role
________________________________________
5. Apex Design (Future Phase)
5.1 Apex Usage Policy
Apex will be introduced only when:
•	Complex calculations exceed Flow limits
•	External integrations are required
5.2 Planned Apex Components
Component	Purpose
CreditCheckService.cls	Mock PAN & CIBIL logic
EMIService.cls	Advanced EMI calculation
LoanTriggerHandler.cls	Centralized trigger logic
________________________________________
6. Security Design
6.1 Access Control Strategy
•	Minimal Profiles
•	Permission Sets for role-based access
Permission Set	Access
Loan_Agent_PS	Lead & Loan CRUD
Branch_Manager_PS	Loan Approvals
Admin_PS	Full Access
________________________________________
6.2 Record-Level Security
•	OWD:
o	Lead: Private
o	Loan Application: Private
•	Role Hierarchy enabled
________________________________________
7. Validation Rules (Technical)
Object	Rule
Loan Application	Approved_Amount__c ≤ Requested_Amount__c
Loan Application	EMI mandatory before Disbursement
Lead	RM Approval required before Conversion
________________________________________
8. Error Handling & Logging
•	User-friendly Flow fault messages
•	Debug logs enabled for Apex
•	No sensitive data in logs
________________________________________
9. Reports & Dashboards (Technical Mapping)
Report	Source Object
Loans by Status	Loan_Application__c
Risk Distribution	Loan_Application__c
Approval TAT	Lead & Loan
________________________________________
10. Deployment Strategy
•	Manual Change Sets (Playground)
•	Naming conventions enforced
•	Pre-deployment checklist
________________________________________
11. Testing Strategy
11.1 Declarative Testing
•	Flow debug & test runs
11.2 Apex Testing (Future)
•	90%+ coverage
•	Test Data Factory pattern
________________________________________
12. Assumptions & Constraints
•	Single org implementation
•	Mock integrations
•	No Experience Cloud
________________________________________
13. Technical Risks & Mitigation
Risk	Mitigation
Governor limit breach	Bulk-safe Flows & Apex
Approval delays	Role-based routing
Data inconsistency	Validations & controlled status transitions
________________________________________
14. Build Readiness Status
Status: Ready for Development
________________________________________
Document Version: 1.0
Approval: Technical Architect

