import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended, // (Lưu ý: Thường chỗ này cần dấu ... nếu tseslint là mảng, mình thêm vào cho chắc)
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },

    rules: {
      // Chuyển lỗi dùng 'any' từ Đỏ (error) sang Vàng (warn)
      '@typescript-eslint/no-explicit-any': 'warn',

      // Chuyển lỗi khai báo biến mà không dùng sang Vàng
      '@typescript-eslint/no-unused-vars': 'warn',

      // Rule mặc định của Vite React (giữ lại để không bị mất)
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },

  },
])