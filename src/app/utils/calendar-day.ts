export class CalendarDay {
    public date: Date;
    public selectedMonthDate: boolean; 
    public isToday: boolean;
  
    public getDateString() {
      return this.date.toISOString().split('T')[0];
    }
  
    constructor(d: Date, selectedMonthDate: boolean ) {
      this.date = d;
      this.selectedMonthDate = selectedMonthDate || false;
      this.isToday = d.setHours(0, 0, 0, 0) == new Date().setHours(0, 0, 0, 0);
    }
  }