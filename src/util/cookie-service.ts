class CookieService {
    static ACCESS_TOKEN_KEY = 'accessToken';
    static REFRESH_TOKEN_KEY = 'refreshToken';
    static REFRESH_EXPIRES_DAYS = 7;
    static ACCESS_EXPIRES_DAYS = 2 / (24 * 60);

    /**
     * Sets a cookie with a given name, value, and expiration (in days)
     */
    static setCookie(name: string, value: string, days: number): void {
        const expires = new Date(Date.now() + days * 864e5).toUTCString();
        document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; Secure; SameSite=Strict`;
    }

    /**
     * Retrieves the cookie value for the given name
     */
    static getCookie(name: string): string | null {
        const match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
        return match ? decodeURIComponent(match[1]) : null;
    }

    /**
     * Deletes a cookie by setting its expiration in the past.
     */
    static deleteCookie(name: string): void {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`;
    }
}

export default CookieService;
