import axios from "axios";
import { getApiUrls } from './apis.service';

export const getAllCountries = async () => {
    return await axios.get(getApiUrls().getAllCountries);
}

export const getCountryDetails = async (selectedCountryId) => {
    const path = getApiUrls().getCountryDetails.replace('{ID}', selectedCountryId);
    return await axios.get(path);
}