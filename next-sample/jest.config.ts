import type { Config } from 'jest'

const customJestConfig: Config = {
	preset: 'ts-jest', // 使用 ts-jest 预设
	// testEnvironment: 'jsdom', // 设置测试环境为 jsdom (有问题 不支持)
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/$1', // 映射 @/ 到 / （与 tsconfig.json 中的 paths @/* 对应）
		'\\.(css|scss)$': 'identity-obj-proxy', // 处理 css 模块
	},
	// setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], // 设置测试环境后运行的文件 (有问题 不支持)
	testPathIgnorePatterns: ['/node_modules/', '<rootDir>/.next'], // 忽略不需要测试的路径
}

export default customJestConfig
