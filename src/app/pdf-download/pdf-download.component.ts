import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-pdf-download',
  templateUrl: './pdf-download.component.html',
  styleUrls: ['./pdf-download.component.css']
})
export class PdfDownloadComponent {
  
  @ViewChild('pdfViewer', { static: true }) pdfViewer!: ElementRef;
  pdfSrc: string | ArrayBuffer | Uint8Array | null = null;
  selectedFile: File | null = null;
  pdfId: number | null = null;

  constructor(private http: HttpClient) { }

  downloadPdf(): void {
    const pdfId = 1; // Provide the ID of the PDF document to download
    const url = `http://localhost:8081/user/download/pdf/${pdfId}`;
    this.downloadFile(url, `document_${pdfId}.pdf`);
  }

  viewPdf(): void {
    const pdfId = 1; // Provide the ID of the PDF document to view
    const url = `http://localhost:8081/user/download/pdf/${pdfId}`;
    this.retrievePdf(url); // Call retrievePdf to view the PDF
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  uploadPdf(): void {
    if (!this.selectedFile) return;

    const formData = new FormData();
    formData.append('pdfFile', this.selectedFile);

    this.http.post<any>('http://localhost:8081/user/add', formData).subscribe(
      (response) => {
        console.log('PDF uploaded successfully:', response);
        window.alert("PDF uploaded successfully");
      },
      (error) => {
        console.error('Error uploading PDF:', error);
      }
    );
  }

  private downloadFile(url: string, filename: string): void {
    this.http.get(url, { responseType: 'blob' }).subscribe(
      (data: Blob) => {
        const blob = new Blob([data], { type: 'application/pdf' });
        const blobUrl = window.URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.href = blobUrl;
        anchor.download = filename;
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
        window.URL.revokeObjectURL(blobUrl);
      },
      error => {
        console.error('Error downloading PDF:', error);
      }
    );
  }

  private retrievePdf(url: string): void {
    this.http.get(url, { responseType: 'blob' }).subscribe(
      (data: Blob) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const pdfData = reader.result as ArrayBuffer;
          const blob = new Blob([pdfData], { type: 'application/pdf' });
          const blobUrl = window.URL.createObjectURL(blob);
          
          // Open the PDF document in a new window/tab
          window.open(blobUrl, '_blank');
        };
        reader.readAsArrayBuffer(data);
      },
      error => {
        console.error('Error viewing PDF:', error);
      }
    );
  }
}
