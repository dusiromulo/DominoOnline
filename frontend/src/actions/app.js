export const loginUser = (user, auth, refresh) => ({
    type: 'USER_LOGIN',
    user: user,
    auth: auth,
    refresh: refresh
});

export const logoutUser = () => ({
    type: 'USER_LOGOUT'
});

export const profileUser = (user) => ({
    type: 'USER_PROFILE',
    user: user
});

export const openSigninOrSignup = (isSignin) => ({
    type: 'CHANGE_PAGE',
    isSignin: isSignin
});