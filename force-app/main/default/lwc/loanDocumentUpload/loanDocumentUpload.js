import { LightningElement, api, track } from 'lwc';

export default class LoanDocumentUpload extends LightningElement {
    @api recordId; // Opportunity Id

    @track uploadedFiles = [];

    get acceptedFormats() {
        return ['.pdf', '.png', '.jpg', '.jpeg'];
    }

    handleUploadFinished(event) {
        const uploaded = event.detail.files;

        uploaded.forEach(file => {
            this.uploadedFiles.push({
                name: file.name,
                documentId: file.documentId
            });
        });
    }
}