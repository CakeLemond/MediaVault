"use server";

export async function FetchData(id, type) {
  const apikey = process.env.MOVIE_APIKEY;

  if (!apikey) {
    throw new Error("API key is missing.");
  }

  const urlBase = "https://api.themoviedb.org/3";
  const endpoint = type === "movie" ? `movie/${id}/videos` : `tv/${id}/videos`;

  const option = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apikey}`,
    },
  };

  try {
    console.log(endpoint);
    const res = await fetch(`${urlBase}/${endpoint}`, option);

    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
