import axios from 'axios';

export const userLogin = (reqObj) => async (dispatch) => {
    dispatch({ type: 'LOADING', payload: true });

    try {
        const response = await axios.post(`https://car-rental-platform-gs79.onrender.com/api/users/login`, reqObj);

        localStorage.setItem('user', JSON.stringify(response.data));

        dispatch({ type: 'LOADING', payload: false });
        
       setTimeout(()=>{
        window.location.href = '/';
       },500)
    } catch (error) {
        console.error('Login Error:', error);
        dispatch({ type: 'LOADING', payload: false });
    }
};

export const userRegister = (reqObj) => async (dispatch) => {
    dispatch({ type: 'LOADING', payload: true });

    try {
        await axios.post(`https://car-rental-platform-gs79.onrender.com/api/users/register`, reqObj);

        dispatch({ type: 'LOADING', payload: false });

        
       setTimeout(()=>{
        window.location.href = '/login';
       })
    } catch (error) {
        console.error('Registration Error:', error);
        dispatch({ type: 'LOADING', payload: false });
    }
};
