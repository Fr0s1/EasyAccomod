import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../../services/report.service'

@Component({
  selector: 'app-verify-report',
  templateUrl: './verify-report.component.html',
  styleUrls: ['./verify-report.component.css']
})
export class VerifyReportComponent implements OnInit {

  constructor(private reportService: ReportService) { }

  reportsList
  selectedReports = []

  ngOnInit(): void {
    this.fetchAllReport()
  }

  fetchAllReport() {
    this.reportService.getAllReport('').subscribe(data => {
      this.reportsList = data
    })
  }

  deleteReport() {
    this.selectedReports.forEach(report => this.reportService.deleteReport(report.reportID).subscribe(data => console.log(data)))
  }

  addReport(event) {
    let reportID = parseInt(event.target.parentElement.nextSibling.innerHTML);

    if (event.target.checked) {
      if (!this.selectedReports.includes(reportID)) {
        this.selectedReports.push(this.reportsList.find(report => report.reportID == reportID))
      }
    } else {
      this.selectedReports = this.selectedReports.filter(report => report.reportID != reportID)
    }
  }

  addAllReports(event) {
    let reportList = document.querySelectorAll('td input')

    if (!event.target.checked) {
      for (let i = 0; i < reportList.length; i++) {
        let currentReport = (<HTMLInputElement>reportList[i])

        currentReport.checked = false;
      }

      this.selectedReports = []
    } else {
      for (let i = 0; i < reportList.length; i++) {
        let currentReport = (<HTMLInputElement>reportList[i])

        currentReport.checked = true;
      }

      this.selectedReports = this.reportsList
    }
  }
}
