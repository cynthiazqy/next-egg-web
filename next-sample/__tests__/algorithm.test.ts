/**
 * @description 数字千分位格式化
 * @author cynthiazqy
 */

import {
	thousandFormat1,
	thousandFormat2,
	switchLetterCase1,
	switchLetterCase2,
} from '@/utils/algorithm'

describe('数字千分位格式化', () => {
	it('正常', () => {
		const n = 1234567890
		const res = thousandFormat2(n)
		expect(res).toBe('1,234,567,890')
	})
	it('小于1000', () => {
		expect(thousandFormat2(0)).toBe('0')
		expect(thousandFormat2(10)).toBe('10')
		expect(thousandFormat2(100)).toBe('100')
	})
})

describe('切换字母大小写', () => {
	it('正常', () => {
		const str = '2000987gh234FII3876tgjLJKI__)(^7jjj'
		const res = switchLetterCase2(str)
		expect(res).toBe('2000987GH234fii3876TGJljki__)(^7JJJ')
	})
	it('空字符串', () => {
		const res = switchLetterCase2('')
		expect(res).toBe('')
	})
	it('非字母', () => {
		const res = switchLetterCase2('100&^脱水')
		expect(res).toBe('100&^脱水')
	})
})
