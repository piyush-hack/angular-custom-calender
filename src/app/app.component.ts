import {
  ChangeDetectorRef,
  Component,
  OnInit,
  Pipe,
  PipeTransform,
} from '@angular/core';

export class CalendarDay {
  public date: Date;
  public title: string;
  public isPastDate: boolean;
  public isToday: boolean;

  public getDateString() {
    return this.date.toISOString().split('T')[0];
  }

  constructor(d: Date) {
    this.date = d;
    this.isPastDate = d.setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0);
    this.isToday = d.setHours(0, 0, 0, 0) == new Date().setHours(0, 0, 0, 0);
  }
}

export class CalendarRange {
  public startDay: CalendarDay;
  public endDay: CalendarDay;

  constructor(startDay: CalendarDay, endDay: CalendarDay) {
    this.startDay = startDay;
    this.endDay = endDay;
  }
}

@Pipe({
  name: 'chunk',
})
export class ChunkPipe implements PipeTransform {
  transform(calendarDaysArray: any, chunkSize: number): any {
    let calendarDays = [];
    let weekDays = [];

    calendarDaysArray.map((day, index) => {
      weekDays.push(day);
      if (++index % chunkSize === 0) {
        calendarDays.push(weekDays);
        weekDays = [];
      }
    });
    return calendarDays;
  }
}

@Pipe({
  name: 'inCalenderRange',
  pure: false,
})
export class InCalenderRangePipe implements PipeTransform {
  transform(c: CalendarDay, selectedCalenderRange: CalendarRange): any {
    let x =
      c?.date?.setHours(0, 0, 0, 0) >=
        selectedCalenderRange?.startDay?.date?.setHours(0, 0, 0, 0) &&
      c?.date?.setHours(0, 0, 0, 0) <=
        selectedCalenderRange?.endDay?.date?.setHours(0, 0, 0, 0);
    return x;
  }
}

// return (
//   this.selectCalenderRange &&
//   c.date.setHours(0, 0, 0, 0) >=
//     this.selectedCalenderRange.startDay.date.setHours(0, 0, 0, 0) &&
//   c.date.setHours(0, 0, 0, 0) <=
//     this.selectedCalenderRange.endDay.date.setHours(0, 0, 0, 0)
// );

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public calendar: CalendarDay[] = [];
  public monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  public displayMonth: string;
  private monthIndex: number = 0;
  selectedDay: any;
  selectedYear: number = new Date().getFullYear();
  selectCalenderRange: boolean = false;
  selectedCalenderRange: CalendarRange;

  constructor(private cd: ChangeDetectorRef) {}
  ngOnInit(): void {
    this.generateCalendarDays(this.monthIndex);
    if (!this.selectedCalenderRange) {
      this.selectedCalenderRange = new CalendarRange(null, null);
    }
  }

  private generateCalendarDays(monthIndex: number): void {
    // we reset our calendar
    this.calendar = [];

    // we set the date
    let day: Date = new Date();
    day.setMonth(new Date().getMonth() + monthIndex);
    day.setFullYear(this.selectedYear);

    // set the dispaly month for UI
    this.displayMonth = this.monthNames[day.getMonth()];

    let startingDateOfCalendar = this.getStartDateForCalendar(day);

    let dateToAdd = startingDateOfCalendar;

    for (var i = 0; i < 42; i++) {
      this.calendar.push(new CalendarDay(new Date(dateToAdd)));
      dateToAdd = new Date(dateToAdd.setDate(dateToAdd.getDate() + 1));
    }
  }

  private getStartDateForCalendar(selectedDate: Date) {
    // for the day we selected let's get the previous month last day
    let lastDayOfPreviousMonth = new Date(selectedDate.setDate(0));

    // start by setting the starting date of the calendar same as the last day of previous month
    let startingDateOfCalendar: Date = lastDayOfPreviousMonth;

    // but since we actually want to find the last Monday of previous month
    // we will start going back in days intil we encounter our last Monday of previous month
    if (startingDateOfCalendar.getDay() != 1) {
      do {
        startingDateOfCalendar = new Date(
          startingDateOfCalendar.setDate(startingDateOfCalendar.getDate() - 1)
        );
      } while (startingDateOfCalendar.getDay() != 1);
    }

    return startingDateOfCalendar;
  }

  public increaseMonth() {
    this.monthIndex++;
    this.generateCalendarDays(this.monthIndex);
  }

  public decreaseMonth() {
    this.monthIndex--;
    this.generateCalendarDays(this.monthIndex);
  }

  public setCurrentMonth() {
    this.monthIndex = 0;
    this.generateCalendarDays(this.monthIndex);
  }

  public getSelectedDate(selectedDay: CalendarDay) {
    if (this.selectCalenderRange) {
      this.setCalendarRange(selectedDay);
    } else {
      this.selectedCalenderRange = null;
      this.selectedDay = selectedDay;
    }
  }

  public setCalendarRange(selectedDay: CalendarDay) {
    if (!this.selectedCalenderRange) {
      this.selectedCalenderRange = new CalendarRange(null, null);
    }

    if (!this.selectedCalenderRange.startDay) {
      this.selectedCalenderRange.startDay = selectedDay;
      return;
    }

    if (
      this.selectedCalenderRange.startDay.date.setHours(0, 0, 0, 0) ===
      selectedDay.date.setHours(0, 0, 0, 0)
    ) {
      this.selectedCalenderRange.startDay = null;

      return;
    }

    if (
      this.selectedCalenderRange.startDay.date.setHours(0, 0, 0, 0) >
      selectedDay.date.setHours(0, 0, 0, 0)
    ) {
      this.selectedCalenderRange.endDay = this.selectedCalenderRange.startDay;
      this.selectedCalenderRange.startDay = selectedDay;
      return;
    }

    if (!this.selectedCalenderRange.endDay) {
      this.selectedCalenderRange.endDay = selectedDay;
      return;
    }

    if (
      this.selectedCalenderRange.endDay.date.setHours(0, 0, 0, 0) ===
      selectedDay.date.setHours(0, 0, 0, 0)
    ) {
      this.selectedCalenderRange.endDay = null;
      return;
    }
  }

  private compareDates(d: Date, e: Date) {
    d.setHours(0, 0, 0, 0) < e.setHours(0, 0, 0, 0);
  }

  public setSelectedMonth(monthIndex: number) {
    this.monthIndex = monthIndex;
    this.generateCalendarDays(this.monthIndex);
  }
}
