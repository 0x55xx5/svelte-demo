/**
 * This file is generated by vite-plugin-sveltekit-api-codegen.
 * Do not edit this file directly, it will be overwritten.
 */

export default {
    api: {
        album: {
            getalbumDetails: {
                /**
                 * GET /api/album/getalbumDetails
                 */
                async GET(
                    init?: RequestInit,
                ): Promise<{
                    status: string;
                    descrption: string;
                    data: any[];
                }> {
                    return fetch(`/api/album/getalbumDetails`, {
                        method: 'GET',
                        ...init,
                    }).then((res) => res.json());
                },
            },

            getalbums: {
                /**
                 * GET /api/album/getalbums
                 */
                async GET(init?: RequestInit): Promise<any[]> {
                    return fetch(`/api/album/getalbums`, {
                        method: 'GET',
                        ...init,
                    }).then((res) => res.json());
                },
            },

            getalbumSongs: {
                /**
                 * GET /api/album/getalbumSongs
                 */
                async GET(
                    init?: RequestInit,
                ): Promise<{
                    status: string;
                    descrption: string;
                    data: any[];
                }> {
                    return fetch(`/api/album/getalbumSongs`, {
                        method: 'GET',
                        ...init,
                    }).then((res) => res.json());
                },
            },
        },

        auth: {
            /**
             * POST /api/auth
             */
            async POST(
                init?: RequestInit,
            ): Promise<{ StatusCode: number; Data: { sign: any } }> {
                return fetch(`/api/auth`, {
                    method: 'POST',
                    ...init,
                }).then((res) => res.json());
            },
        },

        authentication: {
            login: {
                /**
                 * POST /api/authentication/login
                 */
                async POST(
                    init?: RequestInit,
                ): Promise<{ status: string; sessionToken: string }> {
                    return fetch(`/api/authentication/login`, {
                        method: 'POST',
                        ...init,
                    }).then((res) => res.json());
                },
            },

            register: {
                /**
                 * POST /api/authentication/register
                 */
                async POST(
                    init?: RequestInit,
                ): Promise<
                    | { status: string; description: string }
                    | { status: string; sessionToken: string }
                > {
                    return fetch(`/api/authentication/register`, {
                        method: 'POST',
                        ...init,
                    }).then((res) => res.json());
                },
            },

            userdata: {
                /**
                 * POST /api/authentication/userdata
                 */
                async POST(
                    init?: RequestInit,
                ): Promise<
                    | { status: string; description: string }
                    | { status: string; description: string }
                    | { status: string; description: string }
                    | {
                          status: string;
                          dataUser: import('C:/Users/admin/Desktop/demo/svelte-demo/src/lib/models/UserDatas').UserData;
                      }
                > {
                    return fetch(`/api/authentication/userdata`, {
                        method: 'POST',
                        ...init,
                    }).then((res) => res.json());
                },
            },
        },

        auth_for_synd: {
            /**
             * POST /api/auth_for_synd
             */
            async POST(
                init?: RequestInit,
            ): Promise<{ StatusCode: number; Data: { sign: any } }> {
                return fetch(`/api/auth_for_synd`, {
                    method: 'POST',
                    ...init,
                }).then((res) => res.json());
            },
        },

        cal: {
            /**
             * POST /api/cal
             */
            async POST(
                init?: RequestInit,
            ): Promise<{ success: boolean; result: string }> {
                return fetch(`/api/cal`, {
                    method: 'POST',
                    ...init,
                }).then((res) => res.json());
            },
        },

        getHelloworld: {
            /**
             * GET /api/getHelloworld
             */
            async GET(init?: RequestInit): Promise<string> {
                return fetch(`/api/getHelloworld`, {
                    method: 'GET',
                    ...init,
                }).then((res) => res.json());
            },
        },

        getProducts: {
            /**
             * GET /api/getProducts
             */
            async GET(init?: RequestInit): Promise<any[]> {
                return fetch(`/api/getProducts`, {
                    method: 'GET',
                    ...init,
                }).then((res) => res.json());
            },
        },

        getResult: {
            /**
             * GET /api/getResult
             */
            async GET(init?: RequestInit): Promise<any> {
                return fetch(`/api/getResult`, {
                    method: 'GET',
                    ...init,
                }).then((res) => res.json());
            },
        },

        search: {
            /**
             * GET /api/search
             */
            async GET(init?: RequestInit): Promise<any[] | any[] | any[]> {
                return fetch(`/api/search`, {
                    method: 'GET',
                    ...init,
                }).then((res) => res.json());
            },
        },

        song: {
            genre: {
                /**
                 * GET /api/song/genre
                 */
                async GET(
                    init?: RequestInit,
                ): Promise<{
                    status: string;
                    descrption: string;
                    data: any[];
                }> {
                    return fetch(`/api/song/genre`, {
                        method: 'GET',
                        ...init,
                    }).then((res) => res.json());
                },
            },

            getallsongs: {
                /**
                 * GET /api/song/getallsongs
                 */
                async GET(init?: RequestInit): Promise<any[]> {
                    return fetch(`/api/song/getallsongs`, {
                        method: 'GET',
                        ...init,
                    }).then((res) => res.json());
                },
            },

            getsongbyid: {
                /**
                 * GET /api/song/getsongbyid
                 */
                async GET(
                    init?: RequestInit,
                ): Promise<{ status: string; descrption: string; data: any }> {
                    return fetch(`/api/song/getsongbyid`, {
                        method: 'GET',
                        ...init,
                    }).then((res) => res.json());
                },
            },
        },
    },
};
