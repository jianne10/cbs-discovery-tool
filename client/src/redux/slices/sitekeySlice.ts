import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Sitekey } from "../../types"

interface SitekeyState {
  selectedSitekey: string | null
  locale: string
  availableSitekeys: Sitekey[]
}

const initialState: SitekeyState = {
  selectedSitekey: null,
  locale: "en_gb",
  availableSitekeys: [],
}

const sitekeySlice = createSlice({
  name: "sitekey",
  initialState,
  reducers: {
    setSitekey(state, action: PayloadAction<string>) {
      state.selectedSitekey = action.payload
    },
    setLocale(state, action: PayloadAction<string>) {
      state.locale = action.payload
    },
    setAvailableSitekeys(state, action: PayloadAction<Sitekey[]>) {
      state.availableSitekeys = action.payload
    },
  },
})

export const { setSitekey, setLocale, setAvailableSitekeys } =
  sitekeySlice.actions
export default sitekeySlice.reducer
