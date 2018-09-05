export default {
    userAuth: state => state.userAuth,
    profile: state => state.userAuth && state.userAuth.profile,
    list: state => state.list,
    pagination: state => state.pagination,
    detail: state => state.detail,
};
  