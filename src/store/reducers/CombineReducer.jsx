
import { combineReducers } from "redux";

import {
  GetLoginUsersDataReducer,
  AddAndRemoveTransportFromAdminPanelReducer,
  GetApprovedTransportReducer
} from './TransportReducers';


const combineReducer = combineReducers({
  GetLoginUsersDataReducer,
  AddAndRemoveTransportFromAdminPanelReducer,
  GetApprovedTransportReducer
})
export default combineReducer