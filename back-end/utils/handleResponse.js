const handleResponse = (
  res,
  err,
  message,
  status_code_success,
  status_code_failed,
  responseMsg,
  failMsg,
  color = true
) => {
  if (err) {
    console.error(message, err.message);
    res.writeHead(status_code_failed, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ result: false, message: failMsg }));
    return;
  } else {
    res.writeHead(status_code_success, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ result: color, message: responseMsg }));
  }
};
export default handleResponse;
