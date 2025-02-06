"use server";

export async function FetchMediaByID(id, type) {
  const apikey = process.env.MOVIE_APIKEY;

  if (!apikey) {
    throw new Error("API key is missing.");
  }
  const urlBase = "https://api.themoviedb.org/3/discover";
  const typePath = type === "movie" ? "movie" : "tv"; // Correct path
  const endpoint = `with_genres=${id}`;
  const finalUrl = `${urlBase}/${typePath}?${endpoint}`;
  const option = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apikey}`,
    },
  };

  try {
    const res = await fetch(finalUrl, option);
    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.statusText}`);
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
