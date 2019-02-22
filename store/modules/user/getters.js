export default {
    userAuth: state => state.userAuth,
    profile: state => state.userAuth && state.userAuth.profile,
    signinMessage: state => state.signinMessage,
    userList: state => state.userList,
    userPagination: state => state.userPagination,
    userDetail: state => state.userDetail,
};
  