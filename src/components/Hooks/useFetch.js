import React from "react";

async function useFetch(url, data) {
  let response = null;
    e.preventDefault();
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = response.json();
      response.status === 404
        ? (response = {
            status: "0",
            msg: "Can't connect to server",
            redirect: false,
          })
        : result.then((data) => {
            data.result
              ? (response = { status: "1", msg: data.message, redirect: true })
              : (response = {
                  status: "0",
                  msg: data.message,
                  redirect: false,
                });
          });
    } catch (error) {
      console.error("Error signing up:", error);
      response = {
        status: "0",
        msg: "Can't connect to server",
        redirect: false,
      };
    
  }
  return { response };
}

export default useFetch;
