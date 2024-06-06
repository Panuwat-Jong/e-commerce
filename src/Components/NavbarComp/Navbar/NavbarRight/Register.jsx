function Register({ onRegisterClose }) {
  return (
    <div className="flex flex-col items-center gap-y-2">
      <h2 className="text-xl font-semibold">Register</h2>
      <p className="text-base leading-none">
        This is a hobby project for development purpose only. No well suited
        backend has been used here. Please use <strong>admin</strong> as
        username & <strong>1234</strong>as password. You can find these
        credentials in the placeholder also.{" "}
        <button className="text-blue-500" onClick={onRegisterClose}>
          Go to Login
        </button>
      </p>
    </div>
  );
}

export default Register;
