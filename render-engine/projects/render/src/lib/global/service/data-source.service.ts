import { Injectable } from '@angular/core';
import { RestApiService } from '../api/neuxAPI/rest-api.service';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataSourceService {

  constructor(
    private apiService: RestApiService
  ) { }

  getData(type: string, id: string): Observable<any> {
    const r: any[] = [];

    for (let i = 0, l = 10; i < l; ++i) {
      const seq = i + 1;
      r.push({
        id: `d${seq}`,
        title: `公告事項(${seq})`,
        content: `測試公告事項內文${seq}`,
        date: '2020-06-01',
      });
    }

    return of(r);

  }

}
