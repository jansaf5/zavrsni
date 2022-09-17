import axios from "axios";
import * as ApiRoutes from './api-routes'

const apiSource = axios.create({
    baseURL: "http://localhost:9000/v1"
});



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
    firstName,
    lastName,
    email,
    password
}) => {
  
    console.log(firstName,lastName,email,password);
    return await asyncTryCatchHandler({
        tryFunc: async () => {
            const  {data}  = await apiSource.post(ApiRoutes.REGISTER, {
                firstName,
                lastName,
                email,
                password
            }
            );
            
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