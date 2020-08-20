export const state = () => ({
    layout: 'default',
    darkTheme: true,
    fontSize: '22px',
    selectedConf: {},
    user: null,
});

export const getters = {
    getUser: state => {
        return state.user
    },
    getSelectedConf: state => {
        return state.selectedConf
    },
}


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
    updateConferenceSelection(state, conference) {
        state.selectedConf = conference;
    },
    updateUser(state, user) {
        state.user = user;
    }
};