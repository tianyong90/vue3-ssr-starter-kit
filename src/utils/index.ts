/**
 * get the first error message from api response
 *
 * @param errors
 */
export function validationError (errors: Record<string, any>): string {
  errors = errors.errors

  const firstError = errors[Object.keys(errors)[0]]

  return firstError[0]
}

/**
 * 判断是否是微信
 * @returns {boolean}
 */
export function isWechat (): boolean {
  const ua = navigator.userAgent.toLowerCase()
  return /micromessenger/.test(ua)
}
