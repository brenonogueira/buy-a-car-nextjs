
// Estado global (variáveis globais)
export const initialState = {
  index: null,
  show_cars: null,
  show: null
}

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case 'PROFILE': return { ...state, index: action.values }; // sempre que precisar alterar o state, tem que fazer a desestruturação para add a action dentro do state
    case 'PROFILE_CARS': return { ...state, show_cars: action.values }; // sempre que precisar alterar o state, tem que fazer a desestruturação para add a action dentro do state
    default: return state
    }
}
