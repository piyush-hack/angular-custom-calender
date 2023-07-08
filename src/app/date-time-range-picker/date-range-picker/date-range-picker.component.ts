import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { CalendarDay, CalendarRange, DateUtils } from '../../utils';

export enum Months {
    JANUARY = 'January',
    FEBRIARY = 'February',
    MARCH = 'March',
    APRIL = 'April',
    MAY = 'May',
    JUNE = 'June',
    JULY = 'July',
    AUGUST = 'August',
    SEPTEMBER = 'September',
    OCTOBER = 'October',
    NOVEMBER = 'November',
    DECEMBER = 'December',
}
@Component({
    selector: 'app-date-range-picker',
    templateUrl: './date-range-picker.component.html',
    styleUrls: ['../date-time-range-picker.component.scss'],
})
export class DateRangePickerComponent implements OnInit, OnChanges {
    @Input() dateValue: number;
    // @Input() format: string = CustomDateDefination.DEFAULT_DATE_FORMAT_STRING;
    @Input() format: string = "DD/MM/YYYY";
    @Input() selectCalendarRange: boolean = false;

    selectedDay: CalendarDay;
    selectedCalenderRange: CalendarRange;

    @Output() valueChange = new EventEmitter<number | string | CalendarRange>();

    public calendar: CalendarDay[] = [];
    public monthNames = [
        Months.JANUARY,
        Months.FEBRIARY,
        Months.MARCH,
        Months.APRIL,
        Months.MAY,
        Months.JUNE,
        Months.JULY,
        Months.AUGUST,
        Months.SEPTEMBER,
        Months.OCTOBER,
        Months.NOVEMBER,
        Months.DECEMBER,
    ];
    public displayMonth: string;
    monthIndex: number = 0;

    selectedYear: number = new Date().getFullYear();
    accordianYear: number;
    totalDisplayedYears = [];
    viewDatePicker: boolean = false;
    viewMonthPicker: boolean = false;

    @ViewChild('datePickerInput') datePickerInput: ElementRef;
    @ViewChild('monthPickerInput') monthPickerInput: ElementRef;

    constructor(private elementRef: ElementRef) { }

    ngOnInit(): void {
        this.initializeDateRangePicker();
    }

    ngOnChanges(): void {

    }

    public onMonthPickerScroll() {
        const monthPicker = this.elementRef.nativeElement.querySelector('#month-picker');

        const monthPickerStart = this.elementRef.nativeElement.querySelector('#month-picker-start');
        const monthPickerEnd = this.elementRef.nativeElement.querySelector('#month-picker-end');

        const monthPickerStartTop = monthPickerStart.offsetTop;
        const monthPickerTop = monthPicker.scrollTop;

        if (monthPickerStartTop + 50 >= monthPickerTop) {
            this.addMonthsAtTop();
        } else {
            const monthPickerEndBottom = monthPickerEnd.offsetTop + monthPickerEnd.offsetHeight;
            const monthPickerBottom = monthPicker.offsetTop + monthPicker.offsetHeight;
            const monthPickerBottomScroll = monthPicker.scrollTop + monthPicker.offsetHeight;

            if (monthPickerEndBottom >= monthPickerBottom && monthPickerEndBottom - 50 <= monthPickerBottomScroll) {
                this.addMonthsAtBottom();
            }
        }
    }

    private addMonthsAtTop() {
        if (this.totalDisplayedYears && this.totalDisplayedYears.length > 0) {
            let newTotalDisplayedYears = this.totalDisplayedYears;
            for (let i = 0; i < 10; i++) {
                let firstDisplayedyear = newTotalDisplayedYears[0] - 1;
                newTotalDisplayedYears.unshift(firstDisplayedyear);
            }

            this.totalDisplayedYears = newTotalDisplayedYears;
        }
    }

    private addMonthsAtBottom() {
        if (this.totalDisplayedYears?.length > 0) {
            for (let i = 0; i < 10; i++) {
                let lastDisplayedYear =
                    this.totalDisplayedYears[this.totalDisplayedYears.length - 1] + 1;
                this.totalDisplayedYears.push(lastDisplayedYear);
            }
        }
    }


    private initializeDateRangePicker() {

        this.monthIndex = new Date().getMonth();
        if (this.selectCalendarRange) {
            this.intializeRangePicker();
        } else {
            this.intializeDatePicker();
        }
        this.intializeMonthPicker();
        this.generateCalendarDays(this.monthIndex);
        this.showDatePicker(100);
    }

    private intializeRangePicker() {
        this.selectedCalenderRange = new CalendarRange(null, null);

    }

    private intializeDatePicker() {
        const initialDate = new Date(DateUtils.getInputTagFormatDate(this.dateValue));
        this.selectedYear = initialDate.getFullYear();
        this.selectedDay = new CalendarDay(initialDate, true);
        this.monthIndex = initialDate.getMonth();
    }

    private intializeMonthPicker() {
        this.totalDisplayedYears = [];

        //intializing first 10 years
        for (let i = 0; i < 10; i++) {
            this.totalDisplayedYears.push(this.selectedYear + i - 5);
        }
    }



    private generateCalendarDays(monthIndex: number = null): void {

        this.accordianYear = this.selectedYear;
        this.calendar = [];

        let date: Date = new Date();
        let showCalenderFromMonth = monthIndex;
        date.setDate(1);
        date.setMonth(showCalenderFromMonth);
        date.setFullYear(this.selectedYear);
        this.displayMonth = this.monthNames[date.getMonth()];

        let startingDateOfCalendar = this.getStartDateForCalendar(date);
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

    private getStartDateForCalendar(selectedDate: Date) {

        let lastDayOfPreviousMonth = new Date(selectedDate.setDate(0));
        let startingDateOfCalendar: Date = lastDayOfPreviousMonth;

        if (startingDateOfCalendar.getDay() != 1) {
            do {
                startingDateOfCalendar = new Date(
                    startingDateOfCalendar.setDate(startingDateOfCalendar.getDate() - 1)
                );
            } while (startingDateOfCalendar.getDay() != 1);
        }

        return startingDateOfCalendar;
    }


    public showDatePicker(time: number = 0) {
        this.viewDatePicker = true;
        setTimeout(() => {
            this.elementRef.nativeElement.querySelector('#date-range-picker').scrollBy({
                top: 400,
                left: 0,
                behavior: "smooth"
            });

            setTimeout(() => { this.viewMonthPicker = false }, 350);
        }, time);
    }

    public showMonthPicker() {
        this.viewMonthPicker = true;
        setTimeout(() => {
            this.elementRef.nativeElement.querySelector('#date-range-picker').scrollBy({
                top: -400,
                left: 0,
                behavior: "smooth"
            })
            setTimeout(() => { this.viewDatePicker = false }, 350);
        }, 0);
    }

    public increaseMonth() {
        this.monthIndex++;
        this.onMonthIndexChange();
        this.generateCalendarDays(this.monthIndex);
    }

    public decreaseMonth() {
        this.monthIndex--;
        this.onMonthIndexChange();
        this.generateCalendarDays(this.monthIndex);
    }

    private onMonthIndexChange() {
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
        this.onValueChange();
    }

    public selectDay(selectedDay: CalendarDay) {
        if (this.selectCalendarRange) {
            this.selectRangeValue(selectedDay);
        } else {
            this.selectDateValue(selectedDay);
        }
    }

    private selectRangeValue(selectedDay: CalendarDay) {
        this.selectedDay = null;
        this.setCalendarRange(selectedDay);
        this.onValueChange();
    }

    private selectDateValue(selectedDay: CalendarDay) {
        this.selectedCalenderRange = null;
        this.selectedDay = selectedDay;
        this.onValueChange()
    }

    private onValueChange() {
        if (this.selectCalendarRange) {
            this.onRangeChange();
        } else {
            this.onDateChange();
        }
    }

    private onRangeChange() {
        if (this.selectCalendarRange) {
            this.valueChange.emit(this.selectedCalenderRange);
        }
    }

    private onDateChange() {
        let returnDate = this.selectedDay ? this.selectedDay.date.getTime() : null;
        this.valueChange.emit(returnDate);
    }


    public setCalendarRange(selectedDay: CalendarDay) {

        //if no range selected
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

        const isStartDate = this.selectedCalenderRange.startDay.date.setHours(0, 0, 0, 0) ===
            selectedDay.date.setHours(0, 0, 0, 0);
        const isEndDate = this.selectedCalenderRange.endDay.date.setHours(0, 0, 0, 0) ===
            selectedDay.date.setHours(0, 0, 0, 0);

        return this.rangeAlreadyExists() && !isStartDate && !isEndDate;
    }


    // when new date is selected remove previous selected logic
    private removeNearestSelectedRangeEnds(selectedDay: CalendarDay) {
        const rangeStartDay = this.selectedCalenderRange.startDay.date;
        const rangeEndDay = this.selectedCalenderRange.endDay.date;
        const currentSelectedDay = selectedDay.date;


        const fromStartDay = currentSelectedDay.getTime() - rangeStartDay.getTime();
        const fromEndDay = currentSelectedDay.getTime() - rangeEndDay.getTime();


        let daysFromStartDay = fromStartDay / (1000 * 60 * 60 * 24);
        let daysFromEndDay = fromEndDay / (1000 * 60 * 60 * 24);


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

        const isSelectedRangeStartDay = this.rangeStartDayExists() &&
            (this.selectedCalenderRange.startDay.date.setHours(0, 0, 0, 0) === selectedDay.date.setHours(0, 0, 0, 0));
        return isSelectedRangeStartDay;
    }

    private rangeStartDayExists() {
        return this.selectedCalenderRange &&
            this.selectedCalenderRange.startDay &&
            this.selectedCalenderRange.startDay.date
    }

    private isSelectedRangeEndDay(selectedDay: CalendarDay) {
        const isSelectedRangeEndDay = this.rangeEndDayExists() && this.selectedCalenderRange?.endDay?.date?.setHours(0, 0, 0, 0) ===
            selectedDay.date.setHours(0, 0, 0, 0)
        return isSelectedRangeEndDay;
    }

    private rangeEndDayExists() {
        return this.selectedCalenderRange &&
            this.selectedCalenderRange.endDay &&
            this.selectedCalenderRange.endDay.date;
    }

    public setSelectedYearMonth(monthIndex: number, year: number) {
        this.monthIndex = monthIndex;
        this.selectedYear = year;
        this.generateCalendarDays(this.monthIndex);
        this.showDatePicker();
    }
}
