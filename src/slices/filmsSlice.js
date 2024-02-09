import { createSlice } from '@reduxjs/toolkit'

export const filmsSlice = createSlice({
  name: 'films',
  initialState: {
    films: [],
    films2: [],
  },
  reducers: {
    startLoadingFilms: (state) => {
      state.isLoading = true;
    },
    setFilms: (state, action) => {
      //state.films = state.films
      console.log(action)
      console.log(state)
      
      state.films = action.payload.films
    },
    setFilms2: (state, action) => {
      //state.films = state.films
      console.log(action)
      console.log(state)
      
      state.films2 = action.payload.films2
    },
    otherAction: (state) => {
      console.log("TODO")
    }
  },
})

// Action creators are generated for each case reducer function
export const {startLoadingFilms, setFilms, setFilms2, otherAction } = filmsSlice.actions

//export default filmsSlice.reducer
