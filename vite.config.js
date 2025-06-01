import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  root: '.',        // プロジェクトルート
  base: './',       // 相対パスで参照できるように
});
