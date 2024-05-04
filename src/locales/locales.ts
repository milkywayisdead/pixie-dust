import ru from "./ru"
import en from './en'
import { Locale } from "./base"

const locales: { [name: string]: Locale } = {
    ru: ru,
    en: en,
}

export {
    locales,
    Locale,
}