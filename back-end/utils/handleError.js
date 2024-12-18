const handleError = (err, message, status_code_success, status_code_failed) => {
  if (err) {
    console.error(message, err.message);
    res.writeHead(status_code_failed, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: false }));
    return;
  } else {
    res.writeHead(status_code_success, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: true }));
  }
};
export default handleError;
