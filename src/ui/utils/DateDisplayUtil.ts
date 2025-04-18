export class DateDisplayUtil {

    static DEFAULT_FORMAT_OPTIONS = {
        month: 'short' as 'short',
        day: '2-digit' as '2-digit',
        year: 'numeric' as 'numeric',
        hour: '2-digit' as '2-digit',
        minute: '2-digit' as '2-digit',
        hour12: true
    };

    static DEFAULT_LOCALE = 'en-US';

    static dateTime(date: Date | string | number): string {
        const parsedDate = new Date(date);
        if (isNaN(parsedDate.getTime())) {
            throw new Error("Invalid date input");
        }

        return new Intl.DateTimeFormat(this.DEFAULT_LOCALE, this.DEFAULT_FORMAT_OPTIONS)
            .format(parsedDate)
            .replace(',', '');
    }

    static date(date: Date | string | number): string {
        const parsedDate = new Date(date);
        if (isNaN(parsedDate.getTime())) {
            throw new Error("Invalid date input");
        }

        const options = {
            month: 'short' as 'short',
            day: '2-digit' as '2-digit',
            year: 'numeric' as 'numeric'
        };

        return new Intl.DateTimeFormat(this.DEFAULT_LOCALE, options).format(parsedDate);
    }

}
