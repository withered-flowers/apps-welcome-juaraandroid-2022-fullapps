import { fetchDataAsJson } from "$lib/providers/devgoogle";

export async function post({ request }) {
  const data = await request.formData();
  const dgUrl = data.get("dg");

  try {
    const jsonData = await fetchDataAsJson(dgUrl);

    return {
      status: 200,
      body: {
        dgData: jsonData,
      },
    };
  } catch (error) {
    return {
      status: 404,
      body: {
        errors: `Error: ${error}`,
      },
    };
  }
}
