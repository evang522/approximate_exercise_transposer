import en from './en.json';
import de from './de.json';
import {Locale} from "../../Domain/Types/Locale";
import LocaleRecord from "../../Domain/Preference/LocaleRecord";

export default class Translator {
    public static translate(messageId: string, locale: Locale = LocaleRecord.getLocale()): string {
        if (locale === 'en') {
            return (en as {[key: string] : string})[messageId]  || messageId;
        }

        return (de as {[key: string] : string})[messageId] as string || messageId;
    }
}
