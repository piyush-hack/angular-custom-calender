import { Meridiem } from "./meridiem-types";

export class CalendarTime {
    public hour: string;
    public minute: string;
    public second: string;
    public meridiem: Meridiem;
  
    constructor(hour: string, minute: string, second: string, meridiem: Meridiem) {
      this.hour = hour;
      this.minute = minute;
      this.second = second
      this.meridiem = meridiem;
    }
  }