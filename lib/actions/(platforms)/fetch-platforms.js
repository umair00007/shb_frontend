"use server";

export async function fetchPlatforms() {
  try {
    const response = await fetch(`${process.env.SERVER_URL}/platforms`, {
      cache: "no-cache",
      method: "GET",
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}
