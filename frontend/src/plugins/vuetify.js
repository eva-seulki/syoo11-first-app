// src/plugins/vuetify.js
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import { aliases, mdi } from 'vuetify/iconsets/mdi';

const vuetify = createVuetify({
    theme: {
      defaultTheme: 'light', // 기본 테마 설정
    },
  });
  
export default vuetify;