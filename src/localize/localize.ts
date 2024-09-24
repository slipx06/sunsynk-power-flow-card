import * as da from './languages/da.json';
import * as de from './languages/de.json';
import * as en from './languages/en.json';
import * as es from './languages/es.json';
import * as et from './languages/et.json';
import * as fr from './languages/fr.json';
import * as nl from './languages/nl.json';
import * as ru from './languages/ru.json';
import * as cs from './languages/cs.json';
import * as it from './languages/it.json';
import * as ca from './languages/ca.json';
import * as sk from './languages/sk.json';
import * as pt_br from './languages/pt-br.json';
import * as sv from './languages/sv.json';
import {globalData} from '../helpers/globals';

const languages: any = {
    da: da,
    de: de,
    en: en,
    es: es,
    et: et,
    fr: fr,
    nl: nl,
    ru: ru,
    cs: cs,
    it: it,
    ca: ca,
    sk: sk,
    pt_BR: pt_br,
    sv: sv,
};

export function localize(string: string, search = '', replace = '') {
    const langFromLocalStorage = (localStorage.getItem('selectedLanguage') || 'en')
        .replace(/['"]+/g, '')
        .replace('-', '_');

    const lang = `${globalData.hass?.selectedLanguage || globalData.hass?.locale?.language || globalData.hass?.language || langFromLocalStorage}`;

    let translated: string;

    try {
        translated = string.split('.').reduce((o, i) => o[i], languages[lang]);
    } catch (e) {
        translated = string.split('.').reduce((o, i) => o[i], languages['en']);
    }

    if (translated === undefined) {
        translated = string.split('.').reduce((o, i) => o[i], languages['en']);
    }

    if (search !== '' && replace !== '') {
        translated = translated.replace(search, replace);
    }
    return translated;
}
