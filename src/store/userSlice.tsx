// userSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

export interface UserForm {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPass?: string;
}

interface UserState {
  data: UserForm[] | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | undefined;
  otp: string | null;
  user: UserForm | null; // Added user field
}
interface LoginPayload {
  email: string;
  password: string;
}
const initialState: UserState = {
  data: [] ,
  status: "idle",
  error: "",
  otp: "",
  user: null, 
};

interface LoginPayload {
  email: string;
  password: string;
}

export const userFetchData = createAsyncThunk("userData/fetch", async () => {
  try {
    const response = await fetch("http://localhost:3001/user");
    return (await response.json()) as LoginPayload[];
  } catch (error) {
    console.error( "data fetch failed");
   
  }
});


// post user data at api
export const userPostData = createAsyncThunk("userdata", async (requestData: UserForm) => {
  try {
    const response = await fetch("http://localhost:3001/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });
    return await response.json();
  } catch (error: any) {
    console.log(error.message, "data is not posted");
    throw error; // Re-throw the error to be caught in the rejected state
  }
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserForm[]>) => {
      state.data = action.payload;
    },
    login: (state, action: PayloadAction<LoginPayload>) => {
      const { email, password } = action.payload;
      const user = state.data?.find((u) => u.email === email && u.password === password);

      if (user) {
        state.user = user; // Set the user in the state
        state.status = "succeeded";
      } else {
        state.status = "failed";
        state.error = "Invalid credentials";
      }
    },
    forgetPassword: (state, action: PayloadAction<UserForm>) => {
      const { email } = action.payload;
      const userEmail = state.data?.find((u) => u.email === email);

      if (userEmail) {
        state.user = userEmail; // Set the user in the state
        state.status = "succeeded";
      } else {
        state.status = "failed";
        state.error = "Invalid credentials";
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userPostData.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(userPostData.fulfilled, (state, action: PayloadAction<UserForm[]>) => {
      state.status = "succeeded";
      state.data = action.payload;
    });
    builder.addCase(userPostData.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
    builder.addCase(userFetchData.pending, (state) => {
      state.status = "loading";
    })
    builder.addCase(userFetchData.fulfilled, (state, action) => {
      state.status = "succeeded";
      // state.users = action.payload;
    })
    builder.addCase(userFetchData.rejected, (state) => {
      state.status = "failed";
    });
  },
});

export const { setUser, login, forgetPassword } = userSlice.actions;
export default userSlice.reducer;
