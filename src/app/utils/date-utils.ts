import moment from 'moment-timezone';
export class DateUtils {

    static readonly INPUT_TAG_DATE_FORMAT = 'YYYY-MM-DD';
    static readonly DEFAULT_DATE_TIME_FORMAT = 'HH:mm:ss';
    static readonly TIMEZONE = 'Asia/Calcutta';
    constructor() {
        moment.updateLocale('en', {
            weekdays: [
                'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
            ],
            months: [
                'January', 'February', 'March', 'April', 'May', 'June', 'July',
                'August', 'September', 'October', 'November', 'December'
            ]
        });
    }

    static getMonthName(monthIndex: number) {
        return moment.localeData().months()[monthIndex - 1];
    }

    static getDayName(dayIndex: number) {
        return moment.localeData().weekdays()[dayIndex];
    }

    static getCurrentDateInGivenFormat(format: string): string {
        return moment().tz(DateUtils.TIMEZONE).format(format);
    }

    static getCurrentTimeInGivenFormat(format: string): string {
        return moment().tz(DateUtils.TIMEZONE).format(format);
    }

    static getDateInGivenFormat(date: number, format: string): string {
        return moment(date).tz(DateUtils.TIMEZONE).format(format);
    }

    static getTimeInGivenFormat(time: string, format: string): string {
        return moment(time, 'HH:mm').tz(DateUtils.TIMEZONE).format(format);
    }

    static getCurrentTimeStamp(): number {
        return moment().tz(DateUtils.TIMEZONE).valueOf();
    }

    static getDateTime(timestamp: number, format: string): string {
        return timestamp ?
            moment(timestamp).tz(DateUtils.TIMEZONE).format(format) : undefined;
    }

    static getDateTimeWithTimezone(timestamp: number, format: string, timezone: string = DateUtils.TIMEZONE): string {
        return timestamp ?
            moment(timestamp).tz(timezone).format(format) : undefined;
    }


    static getInputTagFormatDate(timestamp: number) {
        return timestamp ?
            moment(timestamp).tz(DateUtils.TIMEZONE).format(DateUtils.INPUT_TAG_DATE_FORMAT) :
            moment().tz(DateUtils.TIMEZONE).format(DateUtils.INPUT_TAG_DATE_FORMAT);
    }

    static getGenericTimeStamp(timeAndDatevalue: string | number): number {
        return timeAndDatevalue ? (moment(timeAndDatevalue).tz(DateUtils.TIMEZONE).valueOf()) : undefined;
    }

    static getTimeStamp(timeAndDatevalue: string | number, format: string): number {
        return timeAndDatevalue ? (moment(timeAndDatevalue, format).tz(DateUtils.TIMEZONE).valueOf()) : undefined;
    }

    static getStartingDayTimeStamp(): number {
        return moment().tz(DateUtils.TIMEZONE).startOf('day').valueOf();
    }

    static getEndingDayTimeStamp(): number {
        return moment().tz(DateUtils.TIMEZONE).endOf('day').valueOf();
    }

    static getTomorrowStartingDayTimeStamp(): number {
        const tomorrowDate = moment().add(1, 'day').date();
        return moment().tz(DateUtils.TIMEZONE).date(tomorrowDate).startOf('day').valueOf();
    }

    static getTomorrowEndingDayTimeStamp(): number {
        const tomorrowDate = moment().tz(DateUtils.TIMEZONE).add(1, 'day').date();
        return moment().tz(DateUtils.TIMEZONE).date(tomorrowDate).endOf('day').valueOf();
    }

    static getYesterDayStartingTimeStamp(): number {
        const yestredayDate = moment().tz(DateUtils.TIMEZONE).subtract(1, 'day').date();
        return moment().tz(DateUtils.TIMEZONE).date(yestredayDate).startOf('day').valueOf();
    }

    static getYesterDayEndingTimeStamp(): number {
        const yestredayDate = moment().tz(DateUtils.TIMEZONE).subtract(1, 'day').date();
        return moment().tz(DateUtils.TIMEZONE).date(yestredayDate).endOf('day').valueOf();
    }

    static getDateStartingTimeStamp(timestamp: number): number {
        return moment(timestamp).tz(DateUtils.TIMEZONE).startOf('day').valueOf();
    }

    static getDateEndingTimeStamp(timestamp: number): number {
        return moment(timestamp).tz(DateUtils.TIMEZONE).endOf('day').valueOf();
    }

    static getWeekStartTimeStamp(): number {
        return (moment().tz(DateUtils.TIMEZONE).startOf('week').valueOf());
    }
    static getWeekEndTimeStamp(): number {
        return (moment().tz(DateUtils.TIMEZONE).endOf('week').valueOf());
    }

    static getMonthStartTimeStamp(): number {
        return (moment().tz(DateUtils.TIMEZONE).startOf('month').valueOf());
    }
    static getMonthEndTimeStamp(): number {
        return (moment().tz(DateUtils.TIMEZONE).endOf('month').valueOf());
    }

    static getYearStartTimeStamp(): number {
        return (moment().tz(DateUtils.TIMEZONE).startOf('year').valueOf());
    }
    static getYearEndTimeStamp(): number {
        return (moment().tz(DateUtils.TIMEZONE).endOf('year').valueOf());
    }

    // Last Value TimeFunction

    static getSpecificStartDayTimeStamp(day: number): number {
        return this.getStartingDayTimeStamp() + day * 24 * 3600 * 1000;
    }

    static getSpecificLastStartDayTimeStamp(day: number): number {
        return this.getStartingDayTimeStamp() - day * 24 * 3600 * 1000;
    }

    static getSpecificLastEndDayTimeStamp(day: number) {
        return this.getEndingDayTimeStamp() - day * 24 * 3600 * 1000;
    }

    static getSpecificLastWeekStartTimeStamp(weekNumber: number): number {
        return moment().tz(DateUtils.TIMEZONE).subtract(weekNumber, 'week').startOf('week').valueOf();
    }

    static getPreviousWeekEndTimeStamp(): number {
        return moment().tz(DateUtils.TIMEZONE).subtract(1, 'week').endOf('week').valueOf();
    }

    static getSpecificLastMonthStartTimeStamp(monthNumber: number): number {
        return moment().tz(DateUtils.TIMEZONE).subtract(monthNumber, 'month').startOf('month').valueOf();
    }

    static getSpecificMonthStartTimeStamp(dayTimestamp: number): number {
        return moment(dayTimestamp).tz(DateUtils.TIMEZONE).startOf('month').valueOf();
    }

    static getSpecificYearStartTimeStamp(dayTimestamp: number): number {
        return moment(dayTimestamp).tz(DateUtils.TIMEZONE).startOf('year').valueOf();
    }

    static getPreviousMonthEndTimeStamp(): number {
        return moment().tz(DateUtils.TIMEZONE).subtract(1, 'month').endOf('month').valueOf();
    }

    static getPreviousMonthStartTimeStamp(): number {
        return moment().tz(DateUtils.TIMEZONE).subtract(1, 'month').startOf('month').valueOf();
    }

    static getSpecificLastYearStartTimeStamp(yearNumber: number): number {
        return moment().tz(DateUtils.TIMEZONE).subtract(yearNumber, 'year').startOf('year').valueOf();
    }

    static getPreviousYearEndTimeStamp(): number {
        return moment().tz(DateUtils.TIMEZONE).subtract(1, 'year').endOf('year').valueOf();
    }

    // Next-Value function


    static getSpecificEndDayTimeStamp(day: number): number {
        return this.getEndingDayTimeStamp() + day * 24 * 3600 * 1000;
    }

    static getSpecificNextWeekEndTimeStamp(weekNumber: number): number {
        return moment().tz(DateUtils.TIMEZONE).add(weekNumber, 'week').endOf('week').valueOf();
    }

    static getNextWeekStartTimeStamp(): number {
        return moment().tz(DateUtils.TIMEZONE).add(1, 'week').startOf('week').valueOf();
    }

    static getSpecificNextMonthEndTimeStamp(monthNumber: number): number {
        return moment().tz(DateUtils.TIMEZONE).add(monthNumber, 'month').endOf('month').valueOf();
    }

    static getNextMonthStartTimeStamp(): number {
        return moment().tz(DateUtils.TIMEZONE).add(1, 'month').startOf('month').valueOf();
    }


    static getSpecificNextYearEndTimeStamp(yearNumber: number): number {
        return moment().tz(DateUtils.TIMEZONE).add(yearNumber, 'year').endOf('year').valueOf();
    }

    static getNextYearStartTimeStamp(): number {
        return moment().tz(DateUtils.TIMEZONE).add(1, 'year').startOf('year').valueOf();
    }

    static getNextMinsTimeStamp(minutes: number): number {
        return DateUtils.getCurrentTimeStamp() + minutes * 60 * 1000;
    }

    static getDateStartAndEndTimeStamp(date: string) {
        return {
            from: moment(date, 'DD/MM/YYYY').tz(DateUtils.TIMEZONE).startOf('date').valueOf(),
            to: moment(date, 'DD/MM/YYYY').tz(DateUtils.TIMEZONE).endOf('date').valueOf()
        };
    }

    static getWeekStartAndEndTimeStamp(weekno: string, year: string) {
        /*
        * enter the argument in week/year formt
        */
        const weekYear = `${weekno}/${year}`;
        return {
            from: moment(weekYear, 'ww/YYYY').tz(DateUtils.TIMEZONE).startOf('week').valueOf(),
            to: moment(weekYear, 'ww/YYYY').tz(DateUtils.TIMEZONE).endOf('week').valueOf()
        };
    }

    static getMonthStartAndEndTimeStamp(month: string, year: string) {
        /*
         * enter the argument in month/year formt
         */
        const monthYear = `${month}/${year}`;
        return {
            from: moment(monthYear, 'MM/YYYY').tz(DateUtils.TIMEZONE).startOf('month').valueOf(),
            to: moment(monthYear, 'MM/YYYY').tz(DateUtils.TIMEZONE).endOf('month').valueOf()
        };
    }

    static getYearStartAndEndTimeStamp(year: string) {
        /*
         * enter the argument in month/year formt
         */
        return {
            from: moment(year, 'YYYY').tz(DateUtils.TIMEZONE).startOf('year').valueOf(),
            to: moment(year, 'YYYY').tz(DateUtils.TIMEZONE).endOf('year').valueOf()
        };
    }

    static getDaysInMonth(timestamp: number) {
        /**
         * Get Total Days in Month from any timestamp lying in the range of that month timestamp;
         */
        return moment(timestamp).tz(DateUtils.TIMEZONE).daysInMonth();
    }

    static getYear(timestamp: number = moment().valueOf(), timezone: string = DateUtils.TIMEZONE) {
        return moment(timestamp).tz(timezone).format('YYYY');
    }

    static getDate(timestamp: number = moment().valueOf(), timezone: string = DateUtils.TIMEZONE) {
        return moment(timestamp).tz(timezone).format('DD');
    }

    static getMonth(timestamp: number = moment().valueOf(), timezone: string = DateUtils.TIMEZONE) {
        return moment(timestamp).tz(timezone).format('MM');
    }

    static getHour(timestamp: number = moment().valueOf(), timezone: string = DateUtils.TIMEZONE) {
        return moment(timestamp).tz(timezone).format('HH');
    }

    static getWeek(timestamp: number = moment().valueOf()) {
        return moment(timestamp).tz(DateUtils.TIMEZONE).format('ww');
    }

    static getTimestampFromWeekDayName(dayName: string) {
        return moment(dayName, 'ddd').tz(DateUtils.TIMEZONE).valueOf();
    }

    static getEndDayTimestampFromWeekDayName(dayName: string) {
        return moment(dayName, 'ddd').tz(DateUtils.TIMEZONE).endOf('day').valueOf();
    }

    static getMonthFromMonthName(monthName: string) {
        return { month: moment(monthName, 'MMM').tz(DateUtils.TIMEZONE).get('month'), year: moment(monthName, 'MMM').get('year') };
    }

    static getHourStartingTimestamp(hourValue: number, timestamp: number = DateUtils.getCurrentTimeStamp()) {
        return moment(timestamp).tz(DateUtils.TIMEZONE).hour(hourValue).startOf('hour').valueOf();
    }

    static getHourEndingTimestamp(hourValue: number, timestamp: number = DateUtils.getCurrentTimeStamp()) {
        return moment(timestamp).tz(DateUtils.TIMEZONE).hour(hourValue).endOf('hour').valueOf();
    }
    static getDayOfWeek(timezone: string): number {
        return moment().tz(timezone).day();
    }

    static getTimeOfDay(timezone: string): { hour: number, minutes: number } {
        return { hour: moment().tz(timezone).hour(), minutes: moment().tz(timezone).minute() };
    }

    static getMonthTimestampFromToday(month: number) {
        const monthDate = moment().tz(DateUtils.TIMEZONE).add(month, 'M').format('DD-MM-YYYY')
        return DateUtils.getTimeStamp(monthDate, 'DD-MM-YYYY');
    }

    static addMonthInParticularDate(startDate: string, month: number) {
        const monthDate = moment(startDate, 'DD-MM-YYYY').tz(DateUtils.TIMEZONE).add(month, 'M').format('DD-MM-YYYY')
        return DateUtils.getTimeStamp(monthDate, 'DD-MM-YYYY');
    }

    static addMonthInParticularTimestamp(timestamp: number, month: number) {
        return moment(timestamp).tz(DateUtils.TIMEZONE).add(month, 'M').valueOf();
    }

    static addMinutesInParticularTimestamp(timestamp: number, minute: number) {
        return moment(timestamp).tz(DateUtils.TIMEZONE).add(minute, 'minutes').valueOf();
    }

    static addHoursInParticularTimestamp(timestamp: number, hour: number) {
        return moment(timestamp).tz(DateUtils.TIMEZONE).add(hour, 'hours').valueOf();
    }
    static addDaysInParticularTimestamp(timestamp: number, day: number) {
        return moment(timestamp).tz(DateUtils.TIMEZONE).add(day, 'days').valueOf();
    }

    static getTimetampInSeconds(timestamp: number): number {
        // tslint:disable-next-line: radix
        return parseInt(`${Math.ceil(timestamp / 1000)}`);
    }

    static getAllTimezones() {
        return moment.tz.names();
    }

    static convertVersionNumberToISTstring(timestamp: number): string {
        return moment(timestamp).tz(DateUtils.TIMEZONE).format('DD MMM');
    }

    static getTimeInSeconds(time: string): number {
        return moment(time, 'HH:mm:ss').diff(moment().startOf('day'), 'seconds');
    }

    static getDatesOfParticularWeek(timestamp: number, timezone: string = DateUtils.TIMEZONE): string[] {
        let datesOfWeek = [];
        let date = moment(timestamp).tz(timezone);
        for (let i = 0; i < 7; i++) {
            datesOfWeek.push(date.clone().startOf('week').add(i, 'days').format('DD/MM/YYYY'));
        }
        return datesOfWeek;
    }

    static getDatesOfParticularMonth(timestamp: number, timezone: string = DateUtils.TIMEZONE): string[] {
        let datesOfMonth = [];
        let date = moment(timestamp).tz(timezone);
        let daysInMonth = date.daysInMonth();
        for (let i = 1; i <= daysInMonth; i++) {
            datesOfMonth.push(moment({ year: date.year(), month: date.month(), day: i }).format('DD/MM/YYYY'));
        }
        return datesOfMonth;
    }

    static getDayNameOfWeek(day: string, timestamp: number, timezone: string = DateUtils.TIMEZONE) {
        let date = moment(timestamp).tz(timezone).startOf('week');
        date.date(parseInt(day));
        return date.format('dddd');
    }

    static getMinutesFromTimeString(timeString: string, format: string): number {
        const timeObj = moment(timeString, format)
        return timeObj.minutes();
    }

    static getHoursFromTimeString(timeString: string, format: string): number {
        const timeObj = moment(timeString, format)
        return timeObj.hours();
    }
}
