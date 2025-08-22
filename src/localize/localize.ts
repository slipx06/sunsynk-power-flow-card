import * as ca from './languages/ca.json';
import * as cn from './languages/cn.json';
import * as cs from './languages/cs.json';
import * as da from './languages/da.json';
import * as de from './languages/de.json';
import * as en from './languages/en.json';
import * as es from './languages/es.json';
import * as et from './languages/et.json';
import * as fr from './languages/fr.json';
import * as it from './languages/it.json';
import * as nl from './languages/nl.json';
import * as pl from './languages/pl.json';
import * as pt_br from './languages/pt-br.json';
import * as ru from './languages/ru.json';
import * as sk from './languages/sk.json';
import * as sl from './languages/sl.json';
import * as sv from './languages/sv.json';
import * as uk from './languages/uk.json';
import { globalData } from '../helpers/globals';

const languages: any = {
	ca: ca,
	'zh-Hans': cn, // Simplified Chinese
	cs: cs,
	da: da,
	de: de,
	en: en,
	es: es,
	et: et,
	fr: fr,
	it: it,
	nl: nl,
	pl: pl,
	pt_BR: pt_br,
	ru: ru,
	sk: sk,
	sl: sl,
	sv: sv,
	uk: uk,
};

// Lightweight memoization for i18n lookups
// - Caches base translations by key (without search/replace) per language
// - Invalidates when the active language changes
// - Keeps a modest cap to avoid unbounded growth
let __i18nMemoLang = '';
const __i18nMemo = new Map<string, string>();
const __I18N_MEMO_LIMIT = 500;

function __getActiveLang(): string {
	const langFromLocalStorage = (
		localStorage.getItem('selectedLanguage') || 'en'
	)
		.replace(/['"]+/g, '')
		.replace('-', '_');

	// Preserve original resolution order
	return `${
		(globalData as any).hass?.selectedLanguage ||
		(globalData as any).hass?.locale?.language ||
		(globalData as any).hass?.language ||
		langFromLocalStorage
	}`;
}

function __memoGet(lang: string, key: string): string | undefined {
	if (lang !== __i18nMemoLang) {
		__i18nMemo.clear();
		__i18nMemoLang = lang;
	}
	return __i18nMemo.get(`${lang}|${key}`);
}

function __memoSet(lang: string, key: string, value: string): void {
	if (lang !== __i18nMemoLang) {
		__i18nMemo.clear();
		__i18nMemoLang = lang;
	}
	if (__i18nMemo.size >= __I18N_MEMO_LIMIT) {
		// naive LRU-ish: delete first inserted entry
		const firstKey = __i18nMemo.keys().next().value;
		if (firstKey !== undefined) {
			__i18nMemo.delete(firstKey);
		}
	}
	__i18nMemo.set(`${lang}|${key}`, value);
}

export function localize(string: string, search = '', replace = '') {
	const lang = __getActiveLang();

	// Cache base translation by lang and key (without replacement)
	let base = __memoGet(lang, string);
	if (base === undefined) {
		try {
			base = string
				.split('.')
				.reduce((o: any, i: string) => o[i], languages[lang]);
		} catch (e) {
			base = string
				.split('.')
				.reduce((o: any, i: string) => o[i], languages['en']);
		}

		if (base === undefined) {
			base = string
				.split('.')
				.reduce((o: any, i: string) => o[i], languages['en']);
		}

		// Only memoize successful string results
		if (typeof base === 'string') {
			__memoSet(lang, string, base);
		}
	}

	let translated = base as string;
	if (typeof translated !== 'string') {
		translated = String(translated);
	}

	if (search !== '' && replace !== '') {
		translated = translated.replace(search, replace);
	}
	return translated;
}
