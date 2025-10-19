"use server";

export async function createPlatforms(formData) {
  try {
    const response = await fetch(`${process.env.SERVER_URL}/platforms`, {
      cache: "no-cache",
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
