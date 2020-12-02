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
  seletedReports = []

  ngOnInit(): void {
    this.fetchAllReport()
  }

  fetchAllReport() {
    this.reportService.getAllReport('').subscribe(data => {
      this.reportsList = data
      console.log(this.reportsList)
    })
  }

  deleteReport() {

  }

  updateReport() {

  }

  addReport(event) {
    let reportID = parseInt(event.target.parentElement.nextSibling.innerHTML);

    if (event.target.checked) {
      if (!this.seletedReports.includes(reportID)) {
        this.seletedReports.push(reportID)
      }
    } else {
      this.seletedReports = this.seletedReports.filter(value => value != reportID)
    }

    console.log(this.seletedReports)
  }
  addAllReports(event) {
    let reportList = document.querySelectorAll('td input')
    this.seletedReports = []

    if (!event.target.checked) {
      for (let i = 0; i < reportList.length; i++) {
        let currentReport = (<HTMLInputElement>reportList[i])

        currentReport.checked = false;
      }
    } else {
      for (let i = 0; i < reportList.length; i++) {
        let currentReport = (<HTMLInputElement>reportList[i])

        currentReport.checked = true;
        this.seletedReports.push(this.reportsList[i].reportID)
      }
    }

    console.log(this.seletedReports);
  }
}
