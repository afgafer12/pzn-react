import {Link, useNavigate} from "react-router";
import {useState} from "react";
import {userLogin} from "../../lib/api/UserApi.js";
import {alertError} from "../../lib/alert.js";
import {useLocalStorage} from "react-use";
import {labelConfigs as lbl } from "../../helper/LabelConfigs.js";
import Input from "../Shared/Input/index.jsx";

export default function UserLogin() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [_, setToken] = useLocalStorage("token", "")
  const [errors, setErrors] = useState({});
  
  const iconUser = <i className="fa fa-user text-dark"></i>
  const iconLock = <i className="fa fa-lock text-dark"></i>

  async function handleSubmit(e) {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const response = await userLogin({username, password});
    const responseBody = await response.json();
    console.log(responseBody);

    if (response.status === 200) {
      const token = responseBody.data.token;
      setToken(token);
      await navigate({
        pathname: "/dashboard/produk"
      });
    } else {
      await alertError(responseBody.errors);
    }
  }

  const validate = () => {
    const newErrors = {};

    if (!username) {
      newErrors.username = "Username is required";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    return newErrors;
  };

  const viewNew = <>
    <div className="row justify-content-center" style={{height: '100%'}}>
      <div className="col-md-4">
        <div className="card m-auto">
          <div className="card-body">
            <div className={'h3 fw-bold text-center text-primary '+lbl.app.textPrimary}>{lbl.app.name}</div>
            <div className="text-center">Sign in to your account</div>
            <br />
            <br />
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <Input type="text-group" name="username" onChange={(e) => setUsername(e.target.value)} label="Username" groupText={iconUser} errorMsg={errors.username}></Input>
              </div>
              <div className="mb-3">
                <Input type="password-group" name="password" onChange={(e) => setPassword(e.target.value)} label="Password" groupText={iconLock} errorMsg={errors.password}></Input>
              </div>
              <div className="mb-3">
                <button type="submit" className={lbl.submitForm.btn}>
                  <i className={lbl.signIn.icon+` me-1`}></i>
                  Sign In
                </button>
              </div>
              <div className="text-center text-sm text-gray-400">
                Don't have an account?
                <Link to="/register"
                      className="ms-1">Sign up</Link>
              </div>
            </form>
            {username}
            {password}
            {JSON.stringify(errors)}
          </div>
        </div>
      </div>
    </div>
  </>

  const viewOld = <>
    <div
      className="animate-fade-in bg-gray-800 bg-opacity-80 p-8 rounded-xl shadow-custom border border-gray-700 backdrop-blur-sm w-full max-w-md">
      <div className="text-center mb-8">
        <div className="inline-block p-3 bg-gradient rounded-full mb-4">
          <i className="fas fa-address-book text-3xl text-white"></i>
        </div>
        <h1 className="text-3xl font-bold text-white">Contact Management</h1>
        <p className="text-gray-300 mt-2">Sign in to your account</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label htmlFor="username" className="block text-gray-300 text-sm font-medium mb-2">Username</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i className="fas fa-user text-gray-500"></i>
            </div>
            <input type="text" id="username" name="username"
                   className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                   placeholder="Enter your username" required
                   value={username} onChange={(e) => setUsername(e.target.value)}/>
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-300 text-sm font-medium mb-2">Password</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i className="fas fa-lock text-gray-500"></i>
            </div>
            <input type="password" id="password" name="password"
                   className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                   placeholder="Enter your password" required
                   value={password} onChange={(e) => setPassword(e.target.value)}/>
          </div>
        </div>

        <div className="mb-6">
          <button type="submit"
                  className="w-full bg-gradient text-white py-3 px-4 rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-lg transform hover:-translate-y-0.5">
            <i className="fas fa-sign-in-alt mr-2"></i> Sign In
          </button>
        </div>

        <div className="text-center text-sm text-gray-400">
          Don't have an account?
          <Link to="/register"
                className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200">Sign up</Link>
        </div>
      </form>
    </div>
  </>

  return <>
  <br />
  {viewNew} 
  {/* {viewOld} */}
  <br />
  </>;
}