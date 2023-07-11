import { Pipe, PipeTransform } from "@angular/core";
import { CalendarDay, CalendarRange } from "src/app/utils";

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