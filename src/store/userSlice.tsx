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
}

const initialState: UserState = {
  data: [],
  status: "idle",
  error:"" ,
};



// // get user data from api
export const getUsers = createAsyncThunk("getUsersData", async () => {
  try {
    const response = await fetch("http://localhost:3001/user");
    const getData = response.json();
    return getData;
  } catch (error) {
    console.log("Error", error);
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
  }
});



const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // setUser: (state, action: PayloadAction<UserForm[]>) => {
    //   state.data = action.payload;
    // },
    login: (state, action: PayloadAction<UserForm>) => {
      const { email, password } = action.payload;
      const loginUser = state.data?.filter((user) => user.email === email && user.password === password);

      if (loginUser) {
        // state.data = [loginUser];
        state.status = "succeeded";
      } else {
        state.status = "failed";
        state.error = "Invalid credentials";
      }
    },
    forgetPassword:(state,action:PayloadAction<UserForm>)=>{
      const {email} = action.payload;
      const existEmail = state.data?.filter((user)=> user.email === email);
      if(existEmail){
        state.status = "succeeded"
      }else{
        state.status = "failed";
        state.error = "Invalid credentials";
      }
    }
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
    builder.addCase(getUsers.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getUsers.fulfilled, (state, action:PayloadAction<UserForm[]>) => {
      state.status = "succeeded";
      state.data = action.payload;
    });
    builder.addCase(getUsers.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.error = action.error.message;
    });
  },
 
});

export const {  login, forgetPassword } = userSlice.actions;
export default userSlice.reducer;


