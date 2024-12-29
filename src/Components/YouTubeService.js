import axios from "axios";

const API_BASE_URL = "https://www.googleapis.com/youtube/v3";

export const fetchPlaylists = async (accessToken) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/playlists`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        part: "snippet",
        mine: true,
        maxResults: 10,
      },
    });
    return response.data.items;
  } catch (error) {
    console.error("Error fetching playlists:", error);
    throw error;
  }
};
