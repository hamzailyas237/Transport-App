
import { ActionTypes } from "../constants"
import { collection, query, where, onSnapshot, getDocs } from "firebase/firestore";
import { db } from "../../firebase/Firebase";


const AddTransportToAdminPanelAction = (transport) => {
    return (dispatch) => {
        dispatch({
            type: ActionTypes.ADD_TRANSPORT_TO_ADMIN_PANEL,
            payload: transport
        })
    }
}


const uid = localStorage.getItem('uid')
const GetLoginUsersDataAction = () => {
    return async (dispatch) => {

        try {
            const q = query(collection(db, "Sign Up Data"), where("uid", "==", uid));
            onSnapshot(q, (querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    dispatch({
                        type: ActionTypes.GET_LOGIN_USERS_SUCCESS,
                        payload: doc.data().role
                    })
                });
            });
        }
        catch (err) {
            dispatch({
                type: ActionTypes.GET_LOGIN_USERS_FAIL,
            })
            console.log(err);
        }
    }
}


const TransportApprovedAction = (product) => {
    return (dispatch) => {
        dispatch({
            type: ActionTypes.TRANSPORT_APPROVED,
            payload: product
        })
    }
}

const TransportRejectedAction = (product) => {
    return (dispatch) => {
        dispatch({
            type: ActionTypes.TRANSPORT_REJECTED,
            payload: product
        })
    }
}


const GetApprovedTransportsAction = () => {
    return async (dispatch) => {
        try {
            const querySnapshot = await getDocs(collection(db, "Approved Transports"));
            querySnapshot.forEach((doc) => {
                dispatch({
                    type: ActionTypes.GET_APPROVED_TRANSPORT_SUCCESS,
                    payload: doc.data()
                })
            });
        }
        catch (err) {
            dispatch({
                type: ActionTypes.GET_APPROVED_TRANSPORT_FAIL,
            })
            console.log(err);
        }
    }
}


export {
    AddTransportToAdminPanelAction,
    GetLoginUsersDataAction,
    TransportApprovedAction,
    TransportRejectedAction,
    GetApprovedTransportsAction
}