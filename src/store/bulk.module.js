// BULK VUEX STORE
//=================================
const state = {
  all: [], // stores user content
  selected: {
    title: "",
    subject: "",
    email: "",
    content: "",
    status: "",
    attachment: "",
    createdAt: ""
  }, // selected content to edit or send
  editedIndex: -1, // edited index
  loading: false // loader
};
const actions = {
  // retrive content
  retriveusercontent({ commit }) {
    let value;
    commit("updateall", value);
  },
  // send or edit content
  saveandeditbulk({ commit }, value) {
    let data = state.all; //  get all user content
    if (state.editedIndex === -1) {
      //save
      data.push(value);
    } else {
      // edit
      Object.assign(data[state.editedIndex], value);
    }
    // update the table
    commit("updateall", data);
    // reset edited index
    commit("updateeditedindex", -1);
    // timeout loader
    setTimeout(() => {
      // close loader
      commit("updateloading", false);
    }, 1000);
  },
  // save selected
  saveselected({ commit }, value) {
    commit("updateselected", value);
  },
  // save selected
  saveeditedindex({ commit }, value) {
    commit("updateeditedindex", value);
  },
  // save selected
  saveloading({ commit }, value) {
    commit("updateloading", value);
  },
  // delete loader
  deletebulkitem({ commit }) {
    let data = state.all;
    data.splice(state.editedIndex, 1);
    let item = {
      title: "",
      subject: "",
      email: "",
      content: "",
      status: "",
      attachment: "",
      createdAt: ""
    };
    // updated selected
    commit("updateselected", item);
    // update the table
    commit("updateall", data);
    // timeout loader and edited index
    setTimeout(() => {
      // reset edited index
      commit("updateeditedindex", -1);
      // close loader
      commit("updateloading", false);
    }, 1000);
  }
};
const mutations = {
  // update all content
  updateall(state, value) {
    state.all = value;
  },
  // update selected
  updateselected(state, value) {
    state.selected = value;
  },
  // reset edited
  updateeditedindex(state, value) {
    state.editedIndex = value;
  },
  // save loader
  updateloading(state, value) {
    state.loading = value;
  }
};
export const bulk = {
  namespaced: true,
  state,
  actions,
  mutations
};
