import ru from "./ru"
import { Locale } from "./base"

const locales: { [name: string]: Locale } = {
    ru: ru,
}

export {
    locales,
    Locale,
}