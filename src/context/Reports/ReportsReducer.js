import {

    CLEAR_MESSAGE,

} from "../types"

export const ReportsReducer = (state, action) => {


    switch (action.type) {


        case CLEAR_MESSAGE:

            if (state.message && state.message.uid == action.payload.uid)
                return {

                    ...state,
                    message: null
                }
            else {
                return state;
            }

       default:
            return state
    }

}