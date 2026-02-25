/**
 * Utilitário nativo super leve para gerenciamento de cookies.
 */
export const cookies = {
  /**
   * Define um cookie.
   * @param name Nome do cookie
   * @param value Valor do cookie
   * @param days Dias para expirar (opcional)
   */
  set(name: string, value: string, days?: number) {
    let expires = ''
    if (days) {
      const date = new Date()
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
      expires = `; expires=${date.toUTCString()}`
    }
    document.cookie = `${name}=${value || ''}${expires}; path=/; SameSite=Lax`
  },

  /**
   * Obtém o valor de um cookie.
   * @param name Nome do cookie
   * @returns O valor do cookie ou null
   */
  get(name: string): string | null {
    const nameEQ = `${name}=`
    const ca = document.cookie.split(';')
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i]
      if (!c) continue
      while (c.charAt(0) === ' ') c = c.substring(1, c.length)
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
    }
    return null
  },

  /**
   * Remove um cookie.
   * @param name Nome do cookie
   */
  remove(name: string) {
    this.set(name, '', -1)
  }
}
