import { Component, OnInit } from '@angular/core';
import { WebService } from './web.service';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  inputNumber: any;
  constructor (private webService: WebService) { }
  ngOnInit() {
  }

  batchRequests() {
    const req = [];
    const nums = [1, 2, 'aaa', 4, 5];
    for (const num of nums){
      req.push(this.webService.getData(num, 'getData').catch(res => Observable.throw(res)));
    }
    Observable.forkJoin(req).subscribe(next => console.log(next),
      err => console.log('Dont panic', err),
      () => { console.log('i am complete'); });
  }

  mergeMapRequest() {
    this.webService.getData(this.inputNumber, 'getDoubleData')
      .mergeMap(res => { if (res < 100) {
        return this.webService.getData(res, 'getTripleData');
      } })
        .subscribe( next => console.log(next),
        err => console.log('dont panic'),
        () => console.log('i am complete'));
  }
}
