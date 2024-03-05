import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import vi from './lang/vi';
import en from './lang/en';

i18n.use(initReactI18next).init({
	lng: 'vi',
	debug: true,
	resources: {
		vi: { translation: vi },
		en: { translation: en },
	},
});

export default i18n;
