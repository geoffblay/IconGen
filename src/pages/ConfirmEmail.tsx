import { Link } from 'react-router-dom';

export default function ConfirmEmail() {
  return (
    <div className="flex flex-col items-center h-screen mt-20">
        <h1 className="text-2xl font-bold">Confirm your email</h1>
        <p className="text-gray-500 text-center mt-2">Please check your email for a confirmation link. Once you have <br />confirmed your email, you can <Link to="/login" className="text-blue-500">Login</Link></p>
    </div>
  );
}
