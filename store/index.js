export const state = () => ({
    layout: 'flippedLayout',
    darkTheme: true,
});

export const getters = {}

export const actions = {};

export const mutations = {
    toggleTheme(state) {
        state.darkTheme = state.darkTheme == true ? false : true;
    },
    flipLayout(state, currentLayout) {
        state.layout = currentLayout == "default" ? "rightNavDrawer" : "default";
    },
};