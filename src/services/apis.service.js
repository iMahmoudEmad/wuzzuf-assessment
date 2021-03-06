export function getApiUrls() {
	const _baseUrl = 'http://46.101.108.59/api';

	return {
		getAllCountries: `${_baseUrl}/countries`,
		getCountryDetails: `${_baseUrl}/country/{countryId}/city`,
		getCityDetails: `${_baseUrl}/country/{countryId}/city/{cityId}/area`,
	};
}
