// Style
import type { ThemeDefinition } from 'vuetify';
import 'vuetify/styles' 
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import { fa } from 'vuetify/iconsets/fa'
import { mdi } from 'vuetify/iconsets/mdi'
import "@mdi/font/css/materialdesignicons.css";

const customTheme: ThemeDefinition = {
    dark: false,
    colors: {
      background: '#FFFFFF',
      surface: '#FFFFFF',
      primary: '#6200EE',
      'primary-darken-1': '#3700B3',
      secondary: '#03DAC6',
      'secondary-darken-1': '#018786',
      error: '#B00020',
      info: '#2196F3',
      success: '#4CAF50',
      warning: '#FB8C00',
      'theme': '#50a490',
      'text-emphasis': '#535353',
      'bg-whitey': '#fffbfe'
    }
  }

const vuetifyThemesAndComponents = createVuetify({
    components,
    directives,
    theme: {
        defaultTheme: 'customTheme',
        themes: {
          customTheme,
        }
    },
    icons: {
      defaultSet: 'mdi',
      sets: {
        fa,
        mdi,
      },
    },
});
export default vuetifyThemesAndComponents;