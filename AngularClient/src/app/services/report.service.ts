import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Backend } from "../_helpers/backend";

@Injectable({
    providedIn: 'root'
})
export class ReportService {

    reportUrl = `${Backend.url}/report`

    constructor(private http: HttpClient) { }

    getAllReport(queryString: string) {
        return this.http.get(this.reportUrl + queryString)
    }

    deleteReport(reportID: number) {
        return this.http.delete(this.reportUrl + `/${reportID}`)
    }
}