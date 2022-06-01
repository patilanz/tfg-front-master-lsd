const login = (token, type) => {
	localStorage.setItem('auth', token);
	localStorage.setItem('type', type);
}
const logout = () => localStorage.removeItem('auth');
const isLogged = () => !!localStorage.getItem('auth');
const getToken = () => localStorage.getItem('auth');
const getUserType = () => localStorage.getItem('type');
