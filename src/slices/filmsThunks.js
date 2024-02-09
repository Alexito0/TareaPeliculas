import { getMoviesBy, getMoviesBy2 } from "../services/films"
import { setFilms, setFilms2, startLoadingFilms } from "./filmsSlice"


//El thunk es una funcion que devuelve una accion asincrona
export const getFilms = (key) => {
    return async (dispatch, getState) => {
        dispatch(startLoadingFilms())

        try {
            let res = null;
            if (key != null){
                res = await getMoviesBy(key);
            }else {
                res = await getMoviesBy("pok");
            }

            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await res.json();
            const films = data["description"];
            console.log(films)


            dispatch(setFilms({ films: films }))

        } catch (error) {
            console.error('Error fetching movies:', error);
            throw error;
        }

    }
}

export const getFilms2 = (key) => {
    return async (dispatch, getState) => {
        dispatch(startLoadingFilms())

        try {
            let res = null;
            if (key != null){
                res = await getMoviesBy2(key);
            }else {
                res = await getMoviesBy2("pok");
            }

            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await res.json();
            const films2 = data["short"];
            console.log(films2)


            dispatch(setFilms2({ films2: films2 }))

        } catch (error) {
            console.error('Error fetching movies:', error);
            throw error;
        }

    }
}