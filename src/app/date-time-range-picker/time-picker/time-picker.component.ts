import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { CalendarRange, CalendarTime, Meridiem } from '../../utils';

import moment from 'moment';

@Component({
    selector: 'app-time-picker',
    templateUrl: './time-picker.component.html',
    styleUrls: ['../date-time-range-picker.component.scss']
})
export class TimePickerComponent implements OnInit, OnChanges {
    @Input() timeValue: string;
    @Input() format: string = 'HH:mm:ss';
    // @Input() format: string = CustomDateDefination.DEFAULT_TIME_FORMAT_STRING;
    @Output() valueChange = new EventEmitter<number | string | CalendarRange>();


    selectedTime: CalendarTime;
    meridiem = Meridiem;
    hourArray: string[] = [];
    minuteArray: string[] = [];
    showSeconds = false;
    showMeridiem = false;
    constructor(private elementRef: ElementRef) { }

    ngOnInit(): void {
        this.initializeTimePicker();
    }

    ngOnChanges(): void {
        this.setTimeValue();
    }


    private initializeTimePicker() {
        this.initializeHourArray();

        this.initializeMinuteArray();

        if (this.formateHasSeconds()) {
            this.showSeconds = true;
        }

        this.setTimeValue();
    }


    private initializeHourArray() {
        if (this.formateHasMeridiem()) {
            for (let i = 1; i <= 12; i++) {
                const hour = i.toString().padStart(2, '0');
                this.hourArray.push(hour);
            }
        } else {
            for (let i = 0; i < 24; i++) {
                const hour = i.toString().padStart(2, '0');

                this.hourArray.push(hour);
            }
        }
    }

    private initializeMinuteArray() {
        for (let i = 0; i < 60; i++) {
            const minute = i.toString().padStart(2, '0');
            this.minuteArray.push(minute);
        }
    }

    private formateHasMeridiem() {
        return this.format.split(" ").includes('a')
    }

    private formateHasSeconds() {
        return this.format && this.format.toLowerCase().includes(':ss')
    }

    private setTimeValue() {
        if (!this.timeValue) {
            const date = new Date();
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');
            const currentTime = `${hours}:${minutes}:00`;
            this.selectedTime = this.getCalenderTime(currentTime);
        } else {
            this.selectedTime = this.getCalenderTime(this.timeValue);
        }

        this.scrollTimeIntoView();
    }

    private scrollTimeIntoView() {
        setTimeout(() => {
    
            const hourDiv = document.getElementById('hour_' + this.selectedTime.hour);
            let topPos = 0;
            if (hourDiv) {
                topPos = hourDiv.offsetTop - 30;
                document.getElementById("hour_row").scrollTop = topPos;
            }

            const minuteDiv = document.getElementById('minute_' + this.selectedTime.minute);
            if (minuteDiv) {
                topPos = minuteDiv.offsetTop - 30;
                document.getElementById("minute_row").scrollTop = topPos;
            }
            const secondDiv = document.getElementById('second_' + this.selectedTime.second);

            if (secondDiv) {
                topPos = secondDiv.offsetTop - 30;
                document.getElementById("second_row").scrollTop = topPos;
            }
        }, 100);

    }

    private getCalenderTime(timeStr: string): CalendarTime {
        let [hoursStr, minutesStr, secondStr] = timeStr.split(':');
        if (!secondStr) {
            secondStr = '00';
        }

        // get time according to 12 or 24 hour format
        const momentObj = moment(timeStr, 'HH:mm:ss');
        const formattedTime = momentObj.format(this.format);
        hoursStr = formattedTime.slice(0, 2);

        let amPm = null;
        if (formattedTime.toUpperCase().includes(Meridiem.AM)) {
            amPm = Meridiem.AM;
            this.showMeridiem = true;
        }

        if (formattedTime.toUpperCase().includes(Meridiem.PM)) {
            amPm = Meridiem.PM;
            this.showMeridiem = true;
        }
        return new CalendarTime(hoursStr, minutesStr, secondStr, amPm);
    }

    private getimeFromCalendarTime(calendarTime: CalendarTime, formatted: boolean = true): string {

        let timeStr = `${calendarTime.hour}:${calendarTime.minute}:${calendarTime.second}`

        if (calendarTime.meridiem) {
            timeStr += " " + calendarTime.meridiem;
            timeStr = moment(timeStr, 'HH:mm:ss a').format('HH:mm:ss');
        }

        if (formatted) {
            timeStr = moment(timeStr, 'HH:mm:ss').format(this.format)
        }
        return timeStr;
    }


    public onValueChange() {
        const timeStr = this.getimeFromCalendarTime(this.selectedTime, false);
        this.valueChange.emit(timeStr);
    }

    public selectHour(hour: string) {
        let hoursStr = this.getValidTimeStr(hour)
        this.selectedTime.hour = hoursStr;
    }
    public selectMinute(minute: string) {
        let minutesStr = this.getValidTimeStr(minute)
        this.selectedTime.minute = minutesStr;
    }
    public selectSecond(second: string) {
        let secondsStr = this.getValidTimeStr(second)
        this.selectedTime.second = secondsStr;
    }

    public selectMeridiem(meridiem: Meridiem) {
        this.selectedTime.meridiem = meridiem;
    }

    private getValidTimeStr(time: string): string {
        return time
    }
}
