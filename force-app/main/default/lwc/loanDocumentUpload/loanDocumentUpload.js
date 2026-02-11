/**
 * File Name    : loanDocumentUpload.js
 * Component    : loanDocumentUpload
 * Purpose      :
 *   Handles document upload logic for Opportunity loan processing.
 *   Maintains a checklist of required documents and controls upload/view behavior.
 *
 * Used In      :
 *   Opportunity Lightning Record Page (Documents Tab)
 *
 * Description :
 *   - Defines required document types
 *   - Handles per-document upload using lightning-file-upload
 *   - Generates view URLs for uploaded Salesforce Files
 *   - Prepares the component for future validation/API integrations
 *
 * Author       : Ankit Wagh
 */

import { LightningElement, api, track } from 'lwc';
import { updateRecord } from 'lightning/uiRecordApi';
import OPPORTUNITY_ID from '@salesforce/schema/Opportunity.Id';
import LOAN_STAGE from '@salesforce/schema/Opportunity.Loan_Process_Stage__c';

export default class LoanDocumentUpload extends LightningElement {
    @api recordId; // Opportunity Id
    @track isSubmitted = false;

    @track documents = [
        { key: 'AADHAAR', label: 'Aadhaar Card', fileUrl: null, required: true },
        { key: 'PAN', label: 'PAN Card', fileUrl: null, required: true },
        { key: 'RC', label: 'Vehicle RC', fileUrl: null, required: false },
        { key: 'OTHER', label: 'Other Supporting Document', fileUrl: null, required: false }
    ];

    get acceptedFormats() {
        return ['.pdf', '.png', '.jpg', '.jpeg'];
    }

    handleUploadFinished(event) {
        const uploadedFile = event.detail.files[0];
        const docType = event.target.dataset.doctype;

        const fileUrl = `/lightning/r/ContentDocument/${uploadedFile.documentId}/view`;

        this.documents = this.documents.map(doc => {
            if (doc.key === docType) {
                return { ...doc, fileUrl: fileUrl };
            }
            return doc;
        });
    }

    get canSubmitDocuments() {
    return this.documents
        .filter(doc => doc.required)
        .every(doc => doc.fileUrl);
    }

    get isSubmitDisabled() {
    return !this.canSubmitDocuments || this.isSubmitted;
}

handleSubmitDocuments() {
    const fields = {};
    fields[OPPORTUNITY_ID.fieldApiName] = this.recordId;
    fields[LOAN_STAGE.fieldApiName] = 'Customer Assessment';

    const recordInput = { fields };

    updateRecord(recordInput)
        .then(() => {
            this.isSubmitted = true;
        })
        .catch(error => {
            console.error('Error updating loan stage', error);
        });
}
}