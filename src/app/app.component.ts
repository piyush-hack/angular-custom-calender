import {
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  Pipe,
  PipeTransform,
} from '@angular/core';

export class CalendarDay {
  public date: Date;
  public title: string;
  public selectedMonthDate: boolean;
  public isToday: boolean;

  public getDateString() {
    return this.date.toISOString().split('T')[0];
  }

  constructor(d: Date, selectedMonthDate: boolean) {
    this.date = d;
    this.selectedMonthDate = selectedMonthDate || false;
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

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  @Input() selectCalenderRange: boolean = false;

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
  selectedDay: CalendarDay;
  selectedYear: number = new Date().getFullYear();
  selectedCalenderRange: CalendarRange;

  constructor(private cd: ChangeDetectorRef) {}
  ngOnInit(): void {
    if (!this.selectedCalenderRange) {
      this.selectedCalenderRange = new CalendarRange(null, null);
    }

    this.generateCalendarDays();
  }

  private generateCalendarDays(monthIndex: number = null): void {
    // we reset our calendar
    this.calendar = [];

    // we set the date
    let day: Date = new Date();
    let showCalenderFromMonth = this.getStartMonthForCalender(monthIndex);
    day.setMonth(showCalenderFromMonth);
    day.setFullYear(this.selectedYear);
    console.log(this.selectedYear);
    // set the dispaly month for UI
    this.displayMonth = this.monthNames[day.getMonth()];

    let startingDateOfCalendar = this.getStartDateForCalendar(day);

    let dateToAdd = startingDateOfCalendar;

    for (var i = 0; i < 42; i++) {
      let selectedMonthDate = true;
      if (dateToAdd.getMonth() !== showCalenderFromMonth) {
        selectedMonthDate = false;
      }
      this.calendar.push(
        new CalendarDay(new Date(dateToAdd), selectedMonthDate)
      );
      dateToAdd = new Date(dateToAdd.setDate(dateToAdd.getDate() + 1));
    }
  }

  private getStartMonthForCalender(monthIndex: number = null) {
    const userSelectedDay =
      this.selectedDay && this.selectedDay.date.getMonth();
    const userSelectedRange = this.selectCalenderRange
      ? this.selectedCalenderRange &&
        this.selectedCalenderRange.startDay &&
        this.selectedCalenderRange.startDay.date.getMonth()
      : null;
      this.monthIndex = monthIndex ??
      userSelectedDay ??
      userSelectedRange ??
      new Date().getMonth()
    return this.monthIndex;
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
    this.onMonthIndexIncDec();
    this.generateCalendarDays(this.monthIndex);
  }

  public decreaseMonth() {
    this.monthIndex--;
    this.onMonthIndexIncDec();
    this.generateCalendarDays(this.monthIndex);
  }

  private onMonthIndexIncDec() {
    if (this.monthIndex > 11) {
      this.monthIndex = 0;
      this.selectedYear++;
    }

    if (this.monthIndex < 0) {
      this.monthIndex = 11;
      this.selectedYear--;
    }
  }

  public setCurrentMonth() {
    this.monthIndex = new Date().getMonth();
    this.selectedYear = new Date().getFullYear(); 
    this.generateCalendarDays(this.monthIndex);
  }

  public clearCalendar() {
    this.selectedDay = null;
    this.selectedCalenderRange = null;
  }

  public selectDate(selectedDay: CalendarDay) {
    console.log(selectedDay , selectedDay.date.getMonth())
    if (!selectedDay.selectedMonthDate) {
      this.monthIndex = selectedDay.date.getMonth();
      this.selectedYear = selectedDay.date.getFullYear();
      this.generateCalendarDays(this.monthIndex);
    }
 
    if (this.selectCalenderRange) {
      this.selectedDay = null;
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

    if (this.rangeAlreadyExists() && this.notSelectedRangeEnds(selectedDay)) {
      this.removeNearestSelectedRangeEnds(selectedDay);
    }

    if (
      !this.selectedCalenderRange.startDay &&
      !this.isSelectedRangeEndDay(selectedDay)
    ) {
      this.selectedCalenderRange.startDay = selectedDay;
      return;
    }

    if (this.isSelectedRangeStartDay(selectedDay)) {
      this.selectedCalenderRange.startDay = null;
      if (this.selectedCalenderRange.endDay) {
        this.selectedCalenderRange.startDay = this.selectedCalenderRange.endDay;
        this.selectedCalenderRange.endDay = null;
      }
      return;
    }

    if (
      !this.selectedCalenderRange.endDay &&
      this.isBeforeSelectedRangeStartDay(selectedDay)
    ) {
      this.selectedCalenderRange.endDay = this.selectedCalenderRange.startDay;
      this.selectedCalenderRange.startDay = selectedDay;
      return;
    }

    if (!this.selectedCalenderRange.endDay) {
      this.selectedCalenderRange.endDay = selectedDay;
      return;
    }

    if (this.isSelectedRangeEndDay(selectedDay)) {
      this.selectedCalenderRange.endDay = null;
      return;
    }
  }

  private rangeAlreadyExists() {
    return (
      this.selectedCalenderRange.startDay && this.selectedCalenderRange.endDay
    );
  }
  private notSelectedRangeEnds(selectedDay: CalendarDay) {
    return (
      this.rangeAlreadyExists() &&
      this.selectedCalenderRange.startDay.date.setHours(0, 0, 0, 0) !==
        selectedDay.date.setHours(0, 0, 0, 0) &&
      this.selectedCalenderRange.endDay.date.setHours(0, 0, 0, 0) !==
        selectedDay.date.setHours(0, 0, 0, 0)
    );
  }

  private removeNearestSelectedRangeEnds(selectedDay: CalendarDay) {
    const rangeStartDay = this.selectedCalenderRange.startDay.date;
    const rangeEndDay = this.selectedCalenderRange.endDay.date;
    const currentSelectedDay = selectedDay.date;

    // Calculate differences in milliseconds
    const fromStartDay = currentSelectedDay.getTime() - rangeStartDay.getTime();
    const fromEndDay = currentSelectedDay.getTime() - rangeEndDay.getTime();

    // Convert differences to days
    let daysFromStartDay = fromStartDay / (1000 * 60 * 60 * 24);
    let daysFromEndDay = fromEndDay / (1000 * 60 * 60 * 24);

    // Compare differences
    if (daysFromStartDay > 0 && daysFromEndDay < 0) {
      this.selectedCalenderRange.endDay = null;
    } else {
      daysFromStartDay = Math.abs(daysFromStartDay);
      daysFromEndDay = Math.abs(daysFromEndDay);
      if (daysFromStartDay < daysFromEndDay) {
        this.selectedCalenderRange.startDay = null;
      } else {
        this.selectedCalenderRange.endDay = null;
      }
    }
  }

  private isBeforeSelectedRangeStartDay(selectedDay: CalendarDay) {
    return (
      this.selectedCalenderRange.startDay.date.setHours(0, 0, 0, 0) >
      selectedDay.date.setHours(0, 0, 0, 0)
    );
  }

  private isSelectedRangeStartDay(selectedDay: CalendarDay) {
    return (
      this.selectedCalenderRange?.startDay?.date?.setHours(0, 0, 0, 0) ===
      selectedDay.date.setHours(0, 0, 0, 0)
    );
  }

  private isSelectedRangeEndDay(selectedDay: CalendarDay) {
    return (
      this.selectedCalenderRange?.endDay?.date?.setHours(0, 0, 0, 0) ===
      selectedDay.date.setHours(0, 0, 0, 0)
    );
  }

  private compareDates(d: Date, e: Date) {
    d.setHours(0, 0, 0, 0) < e.setHours(0, 0, 0, 0);
  }

  public setSelectedMonth(monthIndex: number) {
    this.monthIndex = monthIndex;
    this.generateCalendarDays(this.monthIndex);
  }
}
