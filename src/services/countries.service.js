import axios from "axios";
import { getApiUrls } from './apis.service';

export const getAllCountries = async () => {
    return await axios.get(getApiUrls().getAllCountries);
}

export const getCountryDetails = async (selectedCountryId) => {
    const path = getApiUrls().getCountryDetails.replace('{countryId}', selectedCountryId);
    return await axios.get(path);
}

export const getCityDetails = async (selectedCountryId, selectedCityId) => {
    const path = getApiUrls().getCityDetails.replace('{countryId}', selectedCountryId).replace('{cityId}', selectedCityId);
    return await axios.get(path);
}