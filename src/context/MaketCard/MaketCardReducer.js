import {
    SHOW_LOADER
} from "../types"

export const MaketCardReducer = (state, action) => {

    switch (action.type) {

        case SHOW_LOADER:
            return { ...state, error: '' }
        default:
            return state
    }

}