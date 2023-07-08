import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import moment from 'moment'; 
import { CalendarRange } from '../../utils';


@Component({
    selector: 'app-date-range-picker-wrapper',
    templateUrl: './date-range-picker-wrapper.component.html',
    styleUrls: ['../date-time-range-picker.component.scss'],
})
export class DateRangePickerWrapperComponent implements OnInit, OnChanges {
    @Input() dateValue: number;
    @Input() format: string = 'DD/MM/YYYY';
    // @Input() format: string = CustomDateDefination.DEFAULT_DATE_FORMAT_STRING;
    @Input() selectCalendarRange: boolean = false;

    @Output() valueChange = new EventEmitter<number | string | CalendarRange>();


    viewDatePicker: boolean = false;
    placeholder: any;
    selectedCalendarRange: CalendarRange;

    @ViewChild('datePickerInput') datePickerInput: ElementRef;


    constructor(private renderer: Renderer2) {
        this.renderer.listen('window', 'click', (e: Event) => {
            if (this.datePickerInput && e.target !== this.datePickerInput.nativeElement) {
                if (this.selectCalendarRange) {
                    this.setPlaceholder(this.selectedCalendarRange);
                    this.valueChange.emit(this.selectedCalendarRange);
                }
                this.viewDatePicker = false;
            }
        });
    }

    ngOnInit(): void {
        this.setPlaceholder(this.dateValue);
    }

    ngOnChanges(): void {
        this.setPlaceholder(this.dateValue);
    }

    public setPlaceholder(value: any) {
        if (this.selectCalendarRange) {
            value = value as CalendarRange;
            if(value){
                this.placeholder = moment(value.startDay.date).format("DD/MM/YYYY") + "-" + moment(value.endDay.date).format("DD/MM/YYYY")
            }else{
                this.placeholder = "DD/MM/YYYY - DD/MM/YYYY"
            }
        } else {
            this.placeholder = value ? moment(value).format(this.format) : null;
        }
    }

    public onDropdownBtnClick() {
        this.showDatePicker();
    }

    public showDatePicker() {
        this.viewDatePicker = true;
    }


    public onValueChange(value: any) {
        this.setPlaceholder(value);
        if (!this.selectCalendarRange) {
            this.valueChange.emit(value);
            this.viewDatePicker = false;
        }else{
            this.selectedCalendarRange = value;
        }
    }
}
