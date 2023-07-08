import {
  Component,
  ElementRef,
  OnInit,
} from '@angular/core';

interface String {
  padStart(targetLength: number, padString: string): string;
}


@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private elementRef: ElementRef) {}
  currentDateValue : number = 1688803163000;
  updateDateTimeValue(value : number){
    console.log(value)
    this.currentDateValue = value;
  }
  ngOnInit(): void {
    String.prototype.padStart = function (targetLength: number, padString: string): string {
      const str = String(this);
      if (str.length >= targetLength) {
        return str;
      }
    
      const padding = padString.repeat(Math.ceil((targetLength - str.length) / padString.length));
      return padding.slice(0, targetLength - str.length) + str;
    };
  }
}
