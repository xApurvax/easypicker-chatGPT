import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import ApiMiddleware from '../../../utils/ApiMiddleware'
import Cookies from 'js-cookie'
import toast from 'react-hot-toast'

const initialState = {
  isRegisterLoading: false,
  allData: {
    token: {
      access: Cookies.get('access_token'),
      refresh: Cookies.get('refresh_token'),
    },
  },
}

export const registerFetchAPi = createAsyncThunk(
  'register/fetch',
  async (data, { rejectWithValue }) => {
    try {
      const registerUser = await ApiMiddleware.post('/api/auth/register/', {
        ...data,
      })
      toast.success(registerUser.data.message)
      return registerUser
    } catch (error) {
      if (!error.response) {
        throw rejectWithValue(error?.message || 'Something went wrong')
      }
      throw rejectWithValue(error.response.data.message)
    }
  }
)

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {},
  extraReducers: {
    [registerFetchAPi.pending]: (state, action) => {
      state.isRegisterLoading = true
    },
    [registerFetchAPi.fulfilled]: (state, { payload }) => {
      state.isRegisterLoading = false
      state.message = payload
      if (payload?.data?.status_code === 200) {
        // toast.success(payload?.data?.message);
        state.allData = payload?.data?.result[0]
        Cookies.set('coins', 1000)
        Cookies.set('access_token', payload?.data?.result[0]?.token?.access)
        Cookies.set('refresh_token', payload?.data?.result[0]?.token?.refresh)
      }
    },
    [registerFetchAPi.rejected]: (state, { payload }) => {
      state.isRegisterLoading = false
      toast.error(payload)
    },
  },
})

// export const {  } = generateHeadlineSlice.actions;
export default registerSlice.reducer
