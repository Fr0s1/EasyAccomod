import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ReportService {

    reportUrl = 'http://localhost:8080/api/report'

    constructor(private http: HttpClient) { }

    getAllReport(queryString: string) {
        return this.http.get(this.reportUrl + queryString)
    }

    deleteReport(reportID: number) {
        return this.http.delete(this.reportUrl + `/${reportID}`)
    }
}