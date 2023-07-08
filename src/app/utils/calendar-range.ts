import { CalendarDay } from "./calendar-day";

  
  export class CalendarRange {
    public startDay: CalendarDay;
    public endDay: CalendarDay;
    public title : string;
    constructor(startDay: CalendarDay, endDay: CalendarDay) {
      this.startDay = startDay;
      this.endDay = endDay;
    }
  }