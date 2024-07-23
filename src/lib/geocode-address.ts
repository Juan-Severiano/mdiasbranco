import axios, { isAxiosError } from 'axios';

const MAPBOX_API_URL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
const MAPBOX_ACCESS_TOKEN = 'sk.eyJ1IjoianVhbnNldjA3IiwiYSI6ImNseXhtNXlhOTBpZm4yaXB6Yjg1MDNnbjcifQ.zQBuh2XgQqKgSqIHi8F_lw';

export const geocodeAddress = async (address: string) => {
  const encodedAddress = encodeURIComponent(address);
  const url = `${MAPBOX_API_URL}${encodedAddress}.json?access_token=${MAPBOX_ACCESS_TOKEN}&limit=1`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    if (data.features.length > 0) {
      const { center } = data.features[0];
      return {
        lat: center[1],
        lon: center[0]
      };
    } else {
      throw new Error('Nenhum resultado encontrado.');
    }
  } catch (error) {
    if (isAxiosError(error)) {
      console.error(`Erro ao obter geocodificação: ${error.message}`);
    }
    throw error;
  }
};
