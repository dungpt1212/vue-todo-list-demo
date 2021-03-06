import Vue from 'vue';
import VueI18n from 'vue-i18n';
import vuetifyEnLocales from 'vuetify/es5/locale/en';
import vuetifyZhHansLocales from 'vuetify/es5/locale/zh-Hans';
import vuetifyZhHantLocales from 'vuetify/es5/locale/zh-Hant';

Vue.use(VueI18n);

const vuetifyI18n = {
  en: vuetifyEnLocales,
  'zh-Hans': vuetifyZhHansLocales,
  'zh-Hant': vuetifyZhHantLocales,
};

function loadLocaleMessages() {
  const locales = require.context(
    './locales',
    true,
    /[A-Za-z0-9-_,\s]+\.json$/i,
  );
  const messages = {};
  locales.keys().forEach((key) => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i);
    if (matched && matched.length > 1) {
      const locale = matched[1];
      messages[locale] = {
        ...locales(key),
        ...vuetifyI18n[locale],
      };
    }
  });
  return messages;
}

export default new VueI18n({
  locale: process.env.VUE_APP_I18N_LOCALE || 'en',
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
  messages: loadLocaleMessages(),
});
