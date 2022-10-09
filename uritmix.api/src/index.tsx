import * as api from './api';
const API_URL = process.env.REACT_API_URL || 'http://localhost:3000';

export namespace Api {
    export const authApi = new api.AuthApi(
        new api.Configuration({
            basePath: API_URL
        })
    );

    export const personApi = new api.PersonApi(
        new api.Configuration({
            basePath: API_URL
        })
    );

    export const roomApi = new api.RoomApi(
        new api.Configuration({
            basePath: API_URL
        })
    );

    export const lessonApi = new api.LessonApi(
        new api.Configuration({
            basePath: API_URL
        })
    );

    export const abonnementApi = new api.AbonnementApi(
        new api.Configuration({
            basePath: API_URL
        })
    );
}

export * as dto from './api';