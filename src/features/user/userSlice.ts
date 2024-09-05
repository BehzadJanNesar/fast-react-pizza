import { getAddress } from '../../services/apiGeocoding';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  username: string;
  status: string;
  position: Position | null;
  address: string;
  error?: string;
}
interface Position {
  latitude: number;
  longitude: number;
}

interface Address {
  locality?: string;
  city?: string;
  postcode?: string;
  countryName?: string;
}

function getPosition(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}
// prettier-ignore
export const fetchAddress = createAsyncThunk("user/fetchAddress" , async function() {
    const positionObj = await getPosition();
    const position: Position = {
      latitude: positionObj.coords.latitude,
      longitude: positionObj.coords.longitude,
    };

    // 2) Use reverse geocoding API to get a description of the user's address
    const addressObj: Address = await getAddress(position);
    const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

    // 3) Return the object with the position and address
    // payload of the FULFILLED state
    return { position, address };
})

const initialState: UserState = {
  username: '',
  status: 'idle',
  position: null,
  address: '',
  error: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateName(state, action: PayloadAction<string>) {
      state.username = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddress.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.position = action.payload.position;
        state.address = action.payload.address;
        state.status = 'idle';
      })
      .addCase(fetchAddress.rejected, (state) => {
        state.status = 'error';
        state.error =
          'There was a problem getting your address. Make sure to fill this field!';
      });
  },
});

export const { updateName } = userSlice.actions;
export default userSlice.reducer;
