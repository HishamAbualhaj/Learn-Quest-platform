async function useFetch(url, data = null, method) {
  let response = null;
  let res = null;
  try {
    res = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body:
        ["POST", "PATCH", "GET", "PUT"].includes(method) && data
          ? JSON.stringify(data)
          : undefined,
      credentials: "include",
    });

    const result = await res.json();
    if (res.status === 404) {
      response = {
        status: "0",
        msg: "Page is not found",
        redirect: false,
      };
    } else {
      // Handle success and fail status from server side
      result.status
        ? (response = {
            status: result.status,
            msg: result.data,
            redirect: true,
          })
        : (response = {
            status: result.status,
            msg: result.data,
            redirect: false,
          });
    }
  } catch (error) {
    console.error("Error connecting to server:", error);
    response = {
      status: false,
      msg: "Error connecting to server",
      redirect: false,
    };
  }

  return response;
}

export default useFetch;
