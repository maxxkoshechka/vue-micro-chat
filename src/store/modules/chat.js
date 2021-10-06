// initial state
const state = () => ({
    count: 0,
    todos: [
        {id: 1, text: '...', done: true},
        {id: 2, text: '...', done: false}
    ],
    messages: [],
})

// getters
const getters = {
    doneTodos(state) {
        return state.todos.filter(todo => todo.done)
    },
    doneTodosCount(state, getters) {
        return getters.doneTodos.length
    },
    getTodoById: (state) => (id) => {
        return state.todos.find(todo => todo.id === id)
    }
}

// actions
const actions = {
    async incrementAsync({dispatch}, number) {
        await dispatch('newFunc', number)
        console.debug('жопа');
    },
    async newFunc({commit}, number) {
        return new Promise((resolve) => {
            commit({type: 'increment', amount: number})
            resolve()
        })
    },
    setMessage({ commit }, payload) {
        commit({type: 'setMessageMutation', data: payload})
    }
}

// mutations
const mutations = {
    increment(state, payload) {
        // mutate state
        state.count += payload.amount
    },
    setMessageMutation(state, payload) {
        state.messages.push(payload.data);
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}

