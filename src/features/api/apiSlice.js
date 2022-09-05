import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: 'pkApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:9000',
    }),
    tagTypes: ["videos", 'video', 'relatedVideos'],
    endpoints: (builder) => ({
        getVideos: builder.query({
            query: () => '/videos',
            keepUnusedDataFor: 100,
            providesTags: ['videos']

        }),
        getVideo: builder.query({
            query: (videoId) => `/videos/${videoId}`,
            providesTags: (result, error, arg) => [
                { type: 'video', id: arg}, 
            ]
        }),
        getRelatedVideos: builder.query({
            query: ({ id, title, limit = 4 }) => {
                const tags = title.split(" ");
                const likes = tags.map(tag => `title_like=${tag}`)
                const queryString = `/videos?${likes.join("&")}&_limit=${limit}&id_ne=${id}`;

                return queryString;
            },
            providesTags: (result, error, arg) => [
                { type: 'relatedVideos', id: arg.id}, 
            ]
        }),
        addVideo: builder.mutation({
            query: (data) => ({
                url: `/videos`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['videos']
        }),
        editVideo: builder.mutation({
            query: ({ id, data }) => ({
                url: `/videos/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: (result, error, arg) => ['videos',
                { type: 'video', id: arg.id },
                { type: 'relatedVideos', id: arg.id },
            ]
        }),
        deleteVideo: builder.mutation({
            query: (id) => ({
                url: `/videos/${id}`,
                method: 'DELETE', 
            }),
            invalidatesTags: ['videos']
        }),
    }),

});

export const { useGetVideosQuery, useGetVideoQuery, useGetRelatedVideosQuery, useAddVideoMutation, useEditVideoMutation, useDeleteVideoMutation } = apiSlice;