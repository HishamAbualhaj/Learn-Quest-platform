import React from "react";

async function useFetch(url, data) {
  let response = null;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    if (res.status === 404) {
      response = {
        status: "0",
        msg: "Can't connect to server",
        redirect: false,
      };
    } else {
      result.result
        ? (response = { status: "1", msg: result.message, redirect: true })
        : (response = {
            status: "0",
            msg: result.message,
            redirect: false,
          });
    }
  } catch (error) {
    console.error("Error signing up:", error);
    response = {
      status: "0",
      msg: "Can't connect to server",
      redirect: false,
    };
  }

  return response;
}

export default useFetch;
