import { Component } from '@angular/core';
import { MyDataService } from './read';
import { Question } from './Question';
import { ClipboardService } from 'ngx-clipboard';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  jsonData: Question[] = [];
  id: number = 0;
  question: string = '';
  aw1: string = '';
  aw1c: boolean = false;
  aw2: string = '';
  aw2c: boolean = false;
  aw3: string = '';
  aw3c: boolean = false;
  aw4: string = '';
  aw4c: boolean = false;
  aw5: string = '';
  aw5c: boolean = false;
  res: string = '';
  show: boolean = false;

  constructor(
    private myDataService: MyDataService,
    private clipboardService: ClipboardService
  ) {}

  ngOnInit(): void {
    this.myDataService.getJsonData().subscribe((data: Question[]) => {
      this.jsonData = data;
      this.id = this.getRandomArbitrary(1, this.jsonData.length);

      let selectQ = this.jsonData.find((q) => {
        return q.id === this.id;
      });
      if (selectQ) {
        this.question = selectQ.q;
        this.res = selectQ.as;
        this.aw1 = selectQ.a1;
        this.aw1c = this.res.includes(selectQ.a1[0]);
        this.aw2 = selectQ.a2;
        this.aw2c = this.res.includes(selectQ.a2[0]);
        this.aw3 = selectQ.a3;
        this.aw3c = this.res.includes(selectQ.a3[0]);
        this.aw4 = selectQ.a4;
        this.aw4c = this.res.includes(selectQ.a4[0]);
        this.aw5 = selectQ.a5;
        this.aw5c = this.res.includes(selectQ.a5[0]);
      }
    });
  }

  handleClick(): void {
    if (this.show) {
      this.show = false;
      this.id = this.getRandomArbitrary(1, this.jsonData.length);

      let selectQ = this.jsonData.find((q) => {
        return q.id === this.id;
      });
      if (selectQ) {
        this.question = selectQ.q;
        this.res = selectQ.as;
        this.aw1 = selectQ.a1;
        this.aw1c = this.res.includes(selectQ.a1[0]);
        this.aw2 = selectQ.a2;
        this.aw2c = this.res.includes(selectQ.a2[0]);
        this.aw3 = selectQ.a3;
        this.aw3c = this.res.includes(selectQ.a3[0]);
        this.aw4 = selectQ.a4;
        this.aw4c = this.res.includes(selectQ.a4[0]);
        this.aw5 = selectQ.a5;
        this.aw5c = this.res.includes(selectQ.a5[0]);
      }
    } else {
      this.show = true;
    }
  }

  getRandomArbitrary(min: number, max: number) {
    max = 300;
    return Math.floor(Math.random() * (max - min) + min);
  }

  copyToClipboard() {
    this.clipboardService.copyFromContent(this.question);
  }
}
