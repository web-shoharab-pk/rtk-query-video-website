import {createApi, fetchBaseQuery, } from "@reduxjs/toolkit/query/react"

export const apiSlice  = createApi({
    reducerPath: 'pkApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:9000', 
    }),
    endpoints: (builder) =>  ({
        getVideos: builder.query({
            query: () => '/videos',
        }),
        getVideo: builder.query({
            query: (videoId) => `/videos/${videoId}`,
        }),
        getRelatedVideos: builder.query({
            query: ({id, title, limit= 4}) =>  {
                const tags = title.split(" ");
                const likes = tags.map(tag => `title_like=${tag}`)
                const queryString = `/videos?${likes.join("&")}&_limit=${limit}&id_ne=${id}`;

                return queryString;
            }
        }),
    }),
});

export const {useGetVideosQuery, useGetVideoQuery, useGetRelatedVideosQuery} = apiSlice;