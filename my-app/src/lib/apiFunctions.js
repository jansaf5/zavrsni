import axios from "axios";
import * as ApiRoutes from './api-routes'

const apiSource = axios.create({
    baseURL: "https://jansafar-2022-07-19.herokuapp.com/v1/"
});


//ili mozes sve napisati dolje unutar try catch bloka i ne koristiti asyncTryCatchHandler funkciju. sluzi iskljucivo kao wrapper koji hipotetski mozes iskoritit ili ubaciti u dedicated error handler klasu ili switch case ili hrpu ifova pa tocno znati sto i kako vratiti od podataka korisniku ili kakav "error" njima prikazati (ofc uvijek mozes unutar svake funkcije zasebno)
async function asyncTryCatchHandler({
    tryFunc = async () => { },
    catchFunc = (e) => { console.log(e) },
}) {
    try {
        return await tryFunc();
    } catch (e) {
        catchFunc(e)
    }
}

const login = async ({
    email,
    password
}) => {
    return await asyncTryCatchHandler({
        tryFunc: async () => {
            const { data } = await apiSource.post(ApiRoutes.LOGIN, {
                email,
                password
                
            });
            return data;
        }
    });
}

const register = async ({
    email,
    firstName,
    lastName,
    password
}) => {
    return await asyncTryCatchHandler({
        tryFunc: async () => {
            const { data } = await apiSource.post(ApiRoutes.REGISTER, {
                email,
                firstName,
                lastName,
                password
               
            });
            return data;
        }
    });
}

const addFavourite = async ({
    name
}) => {
    return await asyncTryCatchHandler({
        tryFunc: async () => {
            const { data } = await apiSource.post(ApiRoutes.FAVOURITE, {
                name
            });
            return data;
        }
    });
}

const removeFavourite = async ({
    name
}) => {
    return await asyncTryCatchHandler({
        tryFunc: async () => {
            const { data } = await apiSource.delete(ApiRoutes.FAVOURITE, {
                name
            });
            return data;
        }
    });
}

const getFavourite = async () => {
    return await asyncTryCatchHandler({
        tryFunc: async () => {
            const { data } = await apiSource.get(ApiRoutes.FAVOURITE);
            return data;
        }
    });
}

export {
    login,
    register,
    addFavourite,
    removeFavourite,
    getFavourite
}