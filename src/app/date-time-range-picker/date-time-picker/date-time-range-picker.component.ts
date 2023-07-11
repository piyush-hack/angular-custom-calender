import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import moment from 'moment';  
import { CalendarRange, DateUtils } from '../../utils';

@Component({
    selector: 'app-date-time-range-picker',
    templateUrl: './date-time-range-picker.component.html',
    styleUrls: ['../date-time-range-picker.component.scss' , './date-time-range-picker.component.scss'],
})
export class DateTimeRangePickerComponent implements OnInit, OnChanges {
    readonly DEFAULT_TIME_FORMAT_STRING =  "HH:mm:ss"
    dateRangePicker: boolean = false;
    @Input() timePicker: boolean = false;
    @Input() dateFormat: string =  "DD/MM/YYYY";
    @Input() timeFormat: string = this.DEFAULT_TIME_FORMAT_STRING;
    @Input() placeholder: string;
    @Input() value: number;
    @Input() selectCalendarRange: boolean = false;

    @Output() dateValueChange = new EventEmitter<number | CalendarRange>();
    @Output() timeValueChange = new EventEmitter<string>();
    @Output() valueChange = new EventEmitter<number>();

    @ViewChild('dateTimePickerInput') dateTimePickerInput: ElementRef;

    dateValue: number;
    timeValue: string;
    viewDateTimePicker = false;
    timePlaceholder: string;
    datePlaceholder: string;
    calenderRangePlaceholder: string;
    valueUpdated: boolean = false;
    selectedCalendarRange: CalendarRange = null;

    constructor(private renderer: Renderer2) {
        this.renderer.listen('window', 'click', (e: Event) => {
            if (this.viewDateTimePicker === true && this.dateTimePickerInput && e.target !== this.dateTimePickerInput.nativeElement) {
                if (this.valueUpdated) {
                    this.emitAllValues();
                }
                this.resetDateTimePicker();
            }
        });
    }


    ngOnInit(): void {
        this.initalize();

    }
    ngOnChanges(changes: SimpleChanges): void {
        console.log(this.value);
        this.initalize();
    }


    private initalize() {
        let date = new Date();
        this.timeValue = DateUtils.getDateTime(DateUtils.getCurrentTimeStamp(), this.DEFAULT_TIME_FORMAT_STRING);
        if (this.value) {
            date = new Date(this.value);
            this.timeValue = DateUtils.getDateTime(this.value, this.DEFAULT_TIME_FORMAT_STRING);
        }
        this.dateValue = date.getTime();
        if (this.value) {
            this.setDatePlaceholder(this.dateValue);
            this.setTimePlaceholder(this.timeValue)
        } else {
            this.setDatePlaceholder();
            this.setTimePlaceholder()
        }
        this.valueUpdated = false;
    }

    public showDateTimePicker() {
        this.viewDateTimePicker = true;
    }

    public resetDateTimePicker() {
        this.valueUpdated = false;
        this.viewDateTimePicker = false;
    }

    public onDateTimePickerBtnClick() {
        if (this.viewDateTimePicker) {
            this.resetDateTimePicker();
        } else {
            this.showDateTimePicker();
        }
    }

    private setTimePlaceholder(timeStr: string = null) {

        if (this.placeholder) {
            this.timePlaceholder = ' ';
        } else if (timeStr) {
            let formattedtimeStr = moment(timeStr, 'HH:mm:ss').format(this.timeFormat);
            this.timePlaceholder = formattedtimeStr;
        } else {
            this.timePlaceholder = null;
        }
    }

    private setDatePlaceholder(value: number = null) {
        if (this.placeholder) {
            this.datePlaceholder = this.placeholder
        } else if (value) {
            this.datePlaceholder = moment(value).format(this.dateFormat);
        } else {
            this.datePlaceholder = null
        }
    }

    private setRangePlaceholder(value: CalendarRange) {
        this.calenderRangePlaceholder = moment(value.startDay.date).format("DD/MM/YYYY") + "-" + moment(value.endDay.date).format("DD/MM/YYYY")
    }

    clearAllCalendar() {
        this.dateValue = null;
        this.timeValue = '';
        this.emitAllValues()
        this.resetDateTimePicker();
    }

    public onDateValueChange(value) {
        if (this.selectCalendarRange) {
            this.selectedCalendarRange = value;
        } else {
            this.dateValue = value;
        }
        this.valueUpdated = true;
    }


    public onTimeValueChange(value: string) {
        this.timeValue = value;
        this.valueUpdated = true;
    }


    public emitAllValues() {

        if (this.selectCalendarRange) {
            this.dateValueChange.emit(this.selectedCalendarRange);
            this.setRangePlaceholder(this.selectedCalendarRange);
        } else {
            let date = new Date(this.dateValue);
            if (this.timeValue) {
                const [hours, minutes, seconds] = this.timeValue.split(":");
                date.setHours(parseInt(hours), parseInt(minutes), parseInt(seconds), 0);
            }
            this.value = date.getTime();
            this.valueChange.emit(this.value);
            this.initalize()
        }
    }

    public saveAllValues() {
        // if (this.valueUpdated) {
            this.emitAllValues();
        // }
        this.resetDateTimePicker();
    }

}
