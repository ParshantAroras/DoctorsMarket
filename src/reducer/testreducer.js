
//import {FORGOT_UPDATE,FORGOT_CHECK,FORGOT_SUCCESSFULL,FORGOT_FAIL} from './ForgotActions';

const INITIAL_STATE = {
    tabone: false,
    tabtwo: false,
    tabthree: true,
    tabfour: false,
    tabfive: false
  };
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case "TAB_ONE":
        return {
          tabone: true,
          tabtwo: false,
          tabthree: false,
          tabfour: false,
          tabfive: false
        };
      case "TAB_TWO":
        return {
          tabone: false,
          tabtwo: true,
          tabthree: false,
          tabfour: false,
          tabfive: false
        };
      case "TAB_THREE":
        return {
          tabone: false,
          tabtwo: false,
          tabthree: true,
          tabfour: false,
          tabfive: false
        };
      case "TAB_FOUR":
        return {
          tabone: false,
          tabtwo: false,
          tabthree: false,
          tabfour: true,
          tabfive: false
        };
      case "TAB_FIVE":
        return {
          tabone: false,
          tabtwo: false,
          tabthree: false,
          tabfour: false,
          tabfive: true
        };
      default:
        return {
          tabone: false,
          tabtwo: false,
          tabthree: true,
          tabfour: false,
          tabfive: false
        };
    }
  };