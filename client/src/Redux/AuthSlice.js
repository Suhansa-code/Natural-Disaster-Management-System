import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { get } from "../../Services/ApiEndPoint";

export const updateUser = createAsyncThunk("updateuser", async () => {
	try {
		const request = await get("/api/auth/checkuser");
		const response = request.data;
		return response;
	} catch (error) {
		console.log(error);
	}
});
const initialState = {
	loading: null,
	error: null,
	user: null,
};

const AuthSlice = createSlice({
	name: "authSlice",
	initialState: initialState,
	reducers: {
		setUser: (state, action) => {
			state.loading = false;
			state.error = null;
			state.user = action.payload;
		},
		setLoading: (state, action) => {
			state.loading = action.payload;
			state.error = null;
		},
		setError: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		clearUser: (state) => {
			state.loading = null;
			state.error = null;
			state.user = null;
		},
		Logout: (state) => {
			state.loading = null;
			state.error = null;
			state.user = null;
		},
	},

	extraReducers: (builder) => {
		builder.addCase(updateUser.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(updateUser.fulfilled, (state, action) => {
			(state.loading = null), (state.user = action.payload);
		});
		builder.addCase(updateUser.rejected, (state, action) => {
			(state.loading = null),
				(state.error = action.error.message),
				(state.user = null);
		});
	},
});

export const { setUser, setLoading, setError, clearUser, Logout } =
	AuthSlice.actions;
export default AuthSlice.reducer;
