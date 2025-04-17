import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useQuery } from "@apollo/client"
import { GET_SITEKEYS } from "../graphql/queries"
import {
  setSitekey,
  setAvailableSitekeys,
  setLocale,
} from "../redux/slices/sitekeySlice"
import { RootState } from "../redux/store"
import Loading from "./Loading"

const SitekeySelector: React.FC = () => {
  const dispatch = useDispatch()
  const { selectedSitekey, locale } = useSelector(
    (state: RootState) => state.sitekey
  )
  const [localSitekey, setLocalSitekey] = useState(selectedSitekey || "")
  const [localLocale, setLocalLocale] = useState(locale)

  const { loading, error, data } = useQuery(GET_SITEKEYS)

  useEffect(() => {
    if (data?.sitekeys) {
      dispatch(setAvailableSitekeys(data.sitekeys))
    }
  }, [data, dispatch])

  const handleSitekeyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLocalSitekey(e.target.value)
  }

  const handleLocaleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalLocale(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(setSitekey(localSitekey))
    dispatch(setLocale(localLocale))
  }

  if (loading) return <Loading />
  if (error)
    return (
      <p className="text-red-500">Error loading sitekeys: {error.message}</p>
    )

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Select Sitekey</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label
              htmlFor="sitekey"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Sitekey
            </label>
            <select
              id="sitekey"
              value={localSitekey}
              onChange={handleSitekeyChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            >
              <option value="">Select a sitekey</option>
              {data?.sitekeys.map((sitekey: { name: string }) => (
                <option key={sitekey.name} value={sitekey.name}>
                  {sitekey.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="locale"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Locale
            </label>
            <input
              id="locale"
              type="text"
              value={localLocale}
              onChange={handleLocaleChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="e.g., en_gb"
              required
            />
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              Apply
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default SitekeySelector
