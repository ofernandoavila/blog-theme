import { Button, LoginForm, SignUpForm } from "@avilalab/elements";
import { BasicView } from "../../components/basic-view/BasicView";
import { useLocation, useNavigate } from "react-router-dom";
import { useGlobal } from "../../hooks/useGlobal";
import React, { SetStateAction, useState } from "react";

export function Login() {
    const navigate = useNavigate();
    const { lastRoute } = useGlobal();
    const { pathname } = useLocation();

    const [mode, setMode] = useState<'signin' | 'signup'>('signin');

    return (
        <BasicView hideHeader>
            <div id="login">
                { lastRoute !== pathname ? (
                    <div className="back-to-site">
                        <Button
                            label=""
                            color="primary"
                            onClick={() => navigate(lastRoute!)}
                        ><i className="fa fa-arrow-left mx-2"></i> Back to the site</Button>
                    </div>
                ) : '' }
                <div className="row">
                    <div className="col-8 bg-dark">
                        <img src="https://ofernandoavila.com/assets/images/spaceship.svg" alt="" />
                    </div>
                    <div className="col-4 d-flex flex-column align-items-center justify-content-center">
                        { mode === 'signin' ? <SignIn setMode={setMode} /> : <SignUp setMode={setMode} /> }
                    </div>
                </div>
            </div>
        </BasicView>
    );
}

function SignIn({ setMode }: { setMode: React.Dispatch<SetStateAction<'signin' | 'signup'>> }) {
    const navigate = useNavigate();
    const { lastRoute } = useGlobal();
    
    return (
        <>
            <LoginForm
                title="Sign in"
                onSubmitForm={ () => {
                    navigate(lastRoute!);

                    return true;
                } }
            />
            <span>Or</span>
            <Button label="Create new account" color="primary" onClick={() => setMode('signup')} />
        </>
    );
}

function SignUp({ setMode }: { setMode: React.Dispatch<SetStateAction<'signin' | 'signup'>> }) {
    const navigate = useNavigate();
    const { lastRoute } = useGlobal();
    
    return (
        <>
            <SignUpForm
                title="Sign up"
                completeMessage=""
                onSubmitForm={ () => {
                    navigate(lastRoute!);

                    return true;
                } }
            />
            <span>Or</span>
            <Button label="Login in your account" color="primary" onClick={() => setMode('signin')} />
        </>
    );
}