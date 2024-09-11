/// <reference types="vitest" />
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true, // 글로벌 환경에서 테스트를 실행
    environment: "jsdom", // 브라우저 환경에서 테스트 실행 (node 환경의 경우 'node' 사용)
    coverage: {
      reporter: ["text", "json", "html"], // 커버리지 리포트 형식 설정
    },
  },
});
