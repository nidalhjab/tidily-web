import React, { useState } from "react"
import { Login } from "../../common/components/Login/Login";
import { SignUp } from "../../common/components/SignUp/SignUp";

import './Home.css'

export const Home: React.FC = () => {
    const [logginForm, setLoginForm] = useState(true);
    return <React.Fragment>
        <div className="content">
            <div className="text">
                <span id="head">Tidily...</span>
                <p>Organize your tasks in a tidy way with the simplest tool</p>
            </div>
            <div className="form-container">
                {logginForm ? <Login isLogin={setLoginForm} /> : <SignUp isLogin={setLoginForm} />}
            </div>
        </div>
    </React.Fragment>
}