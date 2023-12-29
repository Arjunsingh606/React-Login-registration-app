import { createSlice, PayloadAction, createAsyncThunk, Slice } from "@reduxjs/toolkit";

export interface UserForm {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPass?: string;
}

interface loginPayload {
  email?: string,
  password?: string
}

interface UserState {
  data: UserForm[] ;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | undefined;
}



// // get user data from api
export const getUsers = createAsyncThunk("getUsersData", async () => {
  try {
    const response = await fetch("http://localhost:3001/user");
    const getData = await response.json();
    return getData;
  } catch (error) {
    console.log("Error", error);
  }
});


// update api password upate
export const updatePassword = createAsyncThunk("userUpdatepassword", async (requestData: UserForm, id) => {
  try {
    const response = await fetch(`http://localhost:3001/user/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });
    return await response.json();
  } catch (error: any) {
    console.log(error.message, "data is not posted");
  }
});


const initialState: UserState = {
  data: [],
  status: "idle",
  error: "",
}


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
  }
});



const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userPostData.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(userPostData.fulfilled, (state, action: PayloadAction<UserForm>) => {
      state.status = "succeeded";
      state.data = [...state.data, action.payload];
    });
    builder.addCase(userPostData.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
    builder.addCase(getUsers.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getUsers.fulfilled, (state, action: PayloadAction<UserForm[]>) => {
      state.data = action.payload;
    });
    builder.addCase(getUsers.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.error = action.error.message;
    });
    builder.addCase(updatePassword.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(updatePassword.fulfilled, (state, action: PayloadAction<UserForm[]>) => {
      state.data = action.payload;
    });
    builder.addCase(updatePassword.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.error = action.error.message;
    });
  },

});

// export const { forgetPassword } = userSlice.actions;
export default userSlice.reducer;


