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
  numLeft: number = 0;

  constructor(
    private myDataService: MyDataService,
    private clipboardService: ClipboardService
  ) {}

  ngOnInit(): void {
    this.myDataService.getJsonData().subscribe((data: Question[]) => {
      this.jsonData = data;
      let num = this.getRandomArbitrary(1, this.jsonData.length);
      let selectQ = this.jsonData[num];
      if (selectQ) {
        this.id = selectQ.id;
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
        this.jsonData.splice(this.id - 1, 1);
        this.numLeft = this.jsonData.length;
      }
    });
  }

  handleClick(): void {
    if (this.show) {
      this.show = false;
      let num = this.getRandomArbitrary(1, this.jsonData.length);
      let selectQ = this.jsonData[num];
      if (selectQ) {
        this.id = selectQ.id;
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
        this.jsonData.splice(this.id - 2, 1);
        this.numLeft = this.jsonData.length;
      }
    } else {
      this.show = true;
    }
  }

  getRandomArbitrary(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  copyToClipboard() {
    this.clipboardService.copyFromContent(this.question);
  }

  copyToASClipboard(num: number) {
    switch (num) {
      case 1:
        this.clipboardService.copyFromContent(this.aw1.slice(2));
        break;
      case 2:
        this.clipboardService.copyFromContent(this.aw2.slice(2));
        break;
      case 3:
        this.clipboardService.copyFromContent(this.aw3.slice(2));
        break;
      case 4:
        this.clipboardService.copyFromContent(this.aw4.slice(2));
        break;
      case 5:
        this.clipboardService.copyFromContent(this.aw5.slice(2));
        break;
      default:
    }
  }
}
