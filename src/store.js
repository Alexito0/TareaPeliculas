import { configureStore } from '@reduxjs/toolkit'
import {filmsSlice} from './slices/filmsSlice'

export default configureStore({
  reducer: {
    films: filmsSlice.reducer,
  },
})