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
  selectQ: Question = {
    id: 0,
    q: '',
    a1: '',
    a2: '',
    a3: '',
    a4: '',
    a5: '',
    as: '',
  };

  constructor(
    private myDataService: MyDataService,
    private clipboardService: ClipboardService
  ) {}

  ngOnInit(): void {
    this.myDataService.getJsonData().subscribe((data: Question[]) => {
      this.jsonData = data;
      this.myDataService.getJsonData2().subscribe((data: Question[]) => {
        this.jsonData = this.jsonData.concat(data);
        const shuffledQuestions = this.shuffleArray(this.jsonData.slice());
        this.jsonData = shuffledQuestions.slice(0, 100);
        let idx = this.getRandomArbitrary(0, this.jsonData.length - 1);
        this.selectQ = this.jsonData[idx];
        if (this.selectQ) {
          this.id = this.selectQ.id;
          this.question = this.selectQ.q;
          this.res = this.selectQ.as;
          this.aw1 = this.selectQ.a1;
          this.aw1c = this.res.includes(this.selectQ.a1[0]);
          this.aw2 = this.selectQ.a2;
          this.aw2c = this.res.includes(this.selectQ.a2[0]);
          this.aw3 = this.selectQ.a3;
          this.aw3c = this.res.includes(this.selectQ.a3[0]);
          this.aw4 = this.selectQ.a4;
          this.aw4c = this.res.includes(this.selectQ.a4[0]);
          this.aw5 = this.selectQ.a5;
          this.aw5c = this.res.includes(this.selectQ.a5[0]);
          this.jsonData.splice(idx, 1);
          this.numLeft = this.jsonData.length;
        }
      });
    });
  }

  handleClick(num: number): void {
    if (num == 1) {
      this.jsonData[this.jsonData.length] = this.selectQ;
    }
    if (this.show) {
      this.show = false;
      let idx = this.getRandomArbitrary(0, this.jsonData.length - 1);
      this.selectQ = this.jsonData[idx];
      if (this.selectQ) {
        this.id = this.selectQ.id;
        this.question = this.selectQ.q;
        this.res = this.selectQ.as;
        this.aw1 = this.selectQ.a1;
        this.aw1c = this.res.includes(this.selectQ.a1[0]);
        this.aw2 = this.selectQ.a2;
        this.aw2c = this.res.includes(this.selectQ.a2[0]);
        this.aw3 = this.selectQ.a3;
        this.aw3c = this.res.includes(this.selectQ.a3[0]);
        this.aw4 = this.selectQ.a4;
        this.aw4c = this.res.includes(this.selectQ.a4[0]);
        this.aw5 = this.selectQ.a5;
        this.aw5c = this.res.includes(this.selectQ.a5[0]);
        this.jsonData.splice(idx, 1);
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

  shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}
