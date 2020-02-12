export const state = () => ({
    layout: 'default',
    darkTheme: true,
    fontSize: '22px',
    selectedConf: 0,
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
    changeFontSize(state, newSize) {
        state.fontSize = newSize;
    },
    updateConferenceSelection(state, confereceNumber) {
        state.selectedConf = confereceNumber;
    },
};