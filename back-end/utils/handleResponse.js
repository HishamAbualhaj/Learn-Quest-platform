const handleResponse = (
  res,
  err,
  message,
  status_code_success,
  status_code_failed,
  responseData,
  failData,
  color = true
) => {
  if (err) {
    console.error(message, err.message);
    res.writeHead(status_code_failed, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: false, data: failData }));
    return;
  } else {
    res.writeHead(status_code_success, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: color, data: responseData }));
  }
};
export default handleResponse;
