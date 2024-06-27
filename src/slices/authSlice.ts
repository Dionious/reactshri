// slices/authSlice.ts
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {RootState} from '../store/store';

interface AuthState {
	isAuthenticated: boolean;
	token: string | null;
	error: string | null;
}

const initialState: AuthState = {
	isAuthenticated: false,
	token: null,
	error: null,
};

export const login = createAsyncThunk(
	'auth/login',
	async ({ username, password }: { username: string; password: string }) => {
		const response = await fetch('http://localhost:3030/api/v1/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ username, password }),
		});

		if (!response.ok) {
			throw new Error('Network response was not ok');
		}

		return await response.json();
	}
);

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logout: (state) => {
			state.isAuthenticated = false;
			state.token = null;
			localStorage.removeItem('token');
		},
		initializeAuth: (state, action) => {
			state.token = action.payload.token;
			state.isAuthenticated = true;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(login.fulfilled, (state, action) => {
				state.isAuthenticated = true;
				state.token = action.payload.token;
				localStorage.setItem('token', action.payload.token);
			})
			.addCase(login.rejected, (state, action) => {
				state.isAuthenticated = false;
				state.error = 'Login failed';
			});
	},
});

export const { logout, initializeAuth } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
