import React from "react";

async function useFetch(url, data, method) {
  let response = null;
  let res = null;
  try {
    if (method === "GET") {
      res = await fetch(url, {
        method: method,
        credentials: 'include',
      });
    } else {
      res = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    }

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
        ? (response = { status: "1", msg: result.data, redirect: true })
        : (response = {
            status: "0",
            msg: result.data,
            redirect: false,
          });
    }
  } catch (error) {
    console.error("Error connecting to server:", error);
    response = {
      status: "0",
      msg: "Error connecting to server",
      redirect: false,
    };
  }

  return response;
}

export default useFetch;
