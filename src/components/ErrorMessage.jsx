const ErrorMessage = ({ message }) => {
  return (
    <div style={{ padding: "1rem", color: "red" }}>
      Error: {message}
    </div>
  );
};

export default ErrorMessage;