import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice} from "../../app/api/apiSlice"

const notesAdapter = createEntityAdapter({})

const initialState = notesAdapter.getInitialState()

export const notesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getNotes: builder.query({
            query: () => '/users',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            keepUnusedDataFor: 5,
            transformResponse: responseData => {
                const loadedNotes = responseData.map(user => {
                    note.id = note._id
                    return note
                });
                return notesAdapter.setAll(initialState, loadedNotes)
            },
            providesTags: (result, error, arg) => {
                if(result?.ids){
                    return [
                        { type: 'User', id: 'LIST'},
                        ...result.ids.map(id => ({
                             type: "User", id
                        }))
                    ]
                }
            }
        }),
    }),
})

export const {
    useGetNotesQuery,
} = notesApiSlice

export const selectNotesResult = notesApiSlice.endpoints.getNotes.select()

//create memoized selector
const selectNotesData = createSelector(
    selectNotesResult,
    notesResult => notesResult.data
)

export const {
    selectAll: selectAllNotes,
    selectById: selectNoteById,
    selectIds: selectNoteIds,
} = notesAdapter.getSelectors(
    state => selectNotesData(state) ?? initialState
);