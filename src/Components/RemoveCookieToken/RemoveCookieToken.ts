export const removeAccessTokenCookie = () => {
    document.cookie = 'accessCookieToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
};
