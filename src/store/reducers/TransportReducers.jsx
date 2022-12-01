import { ActionTypes } from "../constants"

const INITIAL_STATE = {
    // loading: true,
    role: [],
    transportsToApprove: [],
    approvedTransports: []
}


const GetLoginUsersDataReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ActionTypes.GET_LOGIN_USERS_SUCCESS:
            return {
                ...state,
                role: action.payload
            }
        case ActionTypes.GET_LOGIN_USERS_FAIL:
            return {
                ...state,
                role: []
            }
        default:
            return state;
    }
}

const AddAndRemoveTransportFromAdminPanelReducer = (state = INITIAL_STATE, action) => {
    const remainingTransports = state.transportsToApprove.filter((transport) => transport.id !== action.payload.id);
    switch (action.type) {
        case ActionTypes.ADD_TRANSPORT_TO_ADMIN_PANEL:
            return {
                ...state,
                transportsToApprove: [...state.transportsToApprove, action.payload],
            }

        case ActionTypes.TRANSPORT_APPROVED:
            return {
                ...state,
                transportsToApprove: [...remainingTransports]
            }

        case ActionTypes.TRANSPORT_REJECTED:
            console.log('action.payload ==>', action.payload);
            return {
                ...state,
                transportsToApprove: [...remainingTransports],
            };
        default:
            return state;
    }
}

const GetApprovedTransportReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ActionTypes.GET_APPROVED_TRANSPORT_SUCCESS:
            return {
                ...state,
                approvedTransports: [...state.approvedTransports, action.payload]
            }
        case ActionTypes.GET_APPROVED_TRANSPORT_FAIL:
            return {
                ...state,
                approvedTransports: []
            }
        default:
            return state;
    }

}
export {
    GetLoginUsersDataReducer,
    AddAndRemoveTransportFromAdminPanelReducer,
    GetApprovedTransportReducer
}
