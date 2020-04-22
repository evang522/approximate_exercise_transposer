import {Locale} from "../Types/Locale";
import {observable} from "mobx";

class LocaleRecord {
    @observable
    private locale: Locale = 'de';

    public setLocale(locale: Locale): void {
        this.locale = locale;
    }

    public getLocale(): Locale
    {
        return this.locale;
    }
}


export default new LocaleRecord();
