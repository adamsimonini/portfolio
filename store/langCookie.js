export const state = () => ({
    language: 'en',
});

export const mutations = {
    matchCookie (state) {
        state.langth = getCookie("i18n_redirected");
    }
}