/**
 * Algorithms
 * @author cynthiazqy
 */

/**
 * js实现数字千分位格式化 (数组)
 * @param n number
 */
export function thousandFormat1(n: number): string {
	n = Math.floor(n)
	const arr = n.toString().split('').reverse()
	return arr.reduce((prev, val, index) => {
		if (index % 3 === 0) {
			if (prev) {
				return val + ',' + prev
			} else {
				return val
			}
		} else {
			return val + prev
		}
	}, '')
}

/**
 * js实现数字千分位格式化 (字符串分析 - 推荐)
 * @param n number
 */

export function thousandFormat2(n: number): string {
	n = Math.floor(n)
	let res = ''
	const s = n.toString()
	const length = s.length
	for (let i = length - 1; i >= 0; i--) {
		const j = length - i
		if (j % 3 === 0) {
			if (i === 0) {
				res = s[i] + res
			} else {
				res = ',' + s[i] + res
			}
		} else {
			res = s[i] + res
		}
	}
	return res
}

/**
 * @description 切换字母大小写（正则表达式）
 * @param s string
 */
export function switchLetterCase1(s: string): string {
	let res = ''
	const length = s.length
	if (length === 0) return res
	const reg1 = /[a-z]/
	const reg2 = /[A-Z]/
	for (let i = 0; i < length; i++) {
		const c = s[i]
		if (reg1.test(c)) {
			res += c.toUpperCase()
		} else if (reg2.test(c)) {
			res += c.toLowerCase()
		} else {
			res += c
		}
	}
	return res
}

/**
 * @description 切换字母大小写（ASCII编码） ==> 推荐
 * @param s string
 */
export function switchLetterCase2(s: string): string {
	let res = ''
	const length = s.length
	if (length === 0) return res
	for (let i = 0; i < length; i++) {
		const c = s[i]
		const code = c.charCodeAt(0)
		if (code >= 65 && code <= 90) {
			res += c.toLowerCase()
		} else if (code >= 97 && code <= 122) {
			res += c.toUpperCase()
		} else {
			res += c
		}
	}
	return res
}
