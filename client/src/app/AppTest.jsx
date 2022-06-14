import React from "react";
import SignIn from "./Test/SignIn";
import SignUp from "./Test/SignUp";
import { Account } from "./Test/Account";
import Status from "./Test/Status";
import Settings from "./Test/Settings";

const AppTest = ()=>{
    return(
        <Account>
            <h5>test@test.com</h5>
            <h5>Password1!</h5>
            <Status/>
            <SignUp/>
            <SignIn/>
            <Settings/>
        </Account>
    )
}

export default AppTest