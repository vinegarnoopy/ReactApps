import { Link } from "react-router-dom";
import "/src/styles/Login.css"
function Login() {
  return (
    <div className="loginpage">
      <div className="logo-section">
          <img src="/src/assets/OverSea_Logo.png" alt="OverSea-Logo" className="logo" />
      </div>
      <div className="form-section">
        <form>
          <h2>Login</h2>
          <div className="form">
            <label htmlFor="Username" className="text">Username</label><br/>
            <input type="Username"  className="textBox" id="Username" name="Username" required />
          </div>
          <div className="form">
            <label htmlFor="password" className="text">Password</label><br/>
            <input type="password" className="textBox" id="password" name="password" required />
          </div>
          <button type="submit" className="btn-login">Login</button>
          <Link to="/reset-password">
          <p className="forgetpass">Passwordを忘れた</p>
          </Link>
          <div className="signup-section">
            <p>アカウントをお持ちでない場合は</p>
            <Link to="/signup">
            <button className="btn-signup">Signup</button>
            </Link>
          </div>

          
        </form>
      </div>
    </div>
  );
}

export default Login;