import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import moment from 'moment'; 


@Component({
    selector: 'app-time-picker-wrapper',
    templateUrl: './time-picker-wrapper.component.html',
    styleUrls: ['../date-time-range-picker.component.scss']
})
export class TimePickerWrapperComponent implements OnInit, OnChanges {
    @Input() timeValue: string;
    @Input() format: string = 'DD/MM/YYYY';
    // @Input() format: string = CustomDateDefination.DEFAULT_TIME_FORMAT_STRING;

    @Output() valueChange = new EventEmitter<string>();

    timeValueInDefaultFormat: string;
    placeholder: any;
    viewTimePicker: boolean = false;
    constructor() { }

    ngOnInit(): void {
        this.init();
    }

    ngOnChanges(): void {

        this.init();
    }

    showTimePicker() {
        this.viewTimePicker = true;
    }

    private init() {
        if (this.timeValue) {
            this.timeValueInDefaultFormat = moment(this.timeValue, this.format).format('DD/MM/YYYY');
            this.placeholder = this.timeValue;
        } else {
            this.placeholder = this.format;
        }
    }

    onValueChange(value: string) {
        const formattedValue = moment(value, CustomDateDefination.DEFAULT_TIME_FORMAT_STRING).format(this.format);
        this.valueChange.emit(formattedValue);
        this.viewTimePicker = false;
    }
}
