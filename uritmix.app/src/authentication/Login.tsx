import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { CheckBox, TextBox, Validator } from 'devextreme-react';
import { EmailRule, RequiredRule, StringLengthRule } from 'devextreme-react/validator';
import { AppUrl } from '../config';
import { RuleCaption } from '../base/ruleCaption';
import LoginStore from './store/loginStore';
import { AuthDomain } from '../domainConfig';
import BtnLoading from '../ui/BtnLoading';
import ShowErrors from '../ui/ShowErrors';

const Login = observer(() => {
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [rememberMe, setRememberMe] = useState(false);
    const store = useLocalObservable(() => new LoginStore());

    useEffect(() => {
        return () => store.init();
    }, []);

    const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        store.clearErrors();
        if (email && password) {
            if (await store.login(email, password, rememberMe)) {
                navigate(AppUrl.Home);
            }
        } else {
            store.addError(RuleCaption.requiredFieldsNotAssigned());
        }
    };

    return (
        <div className="card w-25 mx-auto mt-5" style={{minWidth: "320px"}}>
            <div className="card-header">
                {"Login"}
            </div>
            <div className="card-body">
                <ShowErrors errors={store.errors} />
                <form onSubmit={handleSubmit}>
                    <fieldset disabled={store.loading}>
                        {/*Email*/}
                        <div className="mb-3 required">
                            <label className="small mb-1">
                                {'Email'}
                            </label>
                            <TextBox
                                mode="email"
                                placeholder={'Enter your email address'}
                                value={email}
                                width={"auto"}
                                onValueChanged={(e) => setEmail(e.value)}
                            >
                                <Validator>
                                    <RequiredRule message={RuleCaption.required('E-mail address')} />
                                    <EmailRule message={'Email address is incorrect'} />
                                    <StringLengthRule
                                        trim
                                        min={AuthDomain.NameAndEmailMinLength}
                                        max={AuthDomain.NameAndEmailMaxLength}
                                        message={RuleCaption.length(AuthDomain.NameAndEmailMinLength, AuthDomain.NameAndEmailMaxLength)}
                                    />
                                </Validator>
                            </TextBox>
                        </div>

                        {/*Password*/}
                        <div className="my-3 required">
                            <label className="small mb-1">
                                {"Password"}
                            </label>
                            <TextBox
                                mode="password"
                                placeholder={"Enter password"}
                                value={password}
                                onValueChanged={(e) => setPassword(e.value)}
                            >
                                <Validator>
                                    <RequiredRule message={RuleCaption.required('Password')} />
                                    <StringLengthRule
                                        trim
                                        min={AuthDomain.PasswordMinLength}
                                        max={AuthDomain.PasswordMaxLength}
                                        message={RuleCaption.length(AuthDomain.PasswordMinLength, AuthDomain.PasswordMaxLength)}
                                    />
                                </Validator>
                            </TextBox>
                        </div>

                        {/*Remember me*/}
                        <div className="mb-4">
                            <CheckBox
                                id="rememberMeCheck"
                                name="rememberMe"
                                text={"Remember me"}
                                value={rememberMe}
                                onValueChanged={(e) => setRememberMe(e.value)}
                            />
                        </div>

                    </fieldset>

                    {/*Bottom*/}
                    <div className="d-flex align-items-center justify-content-between">
                        <Link className="small" to={AppUrl.PasswordReset}>
                            {"Forgot your password?"}
                        </Link>
                        <button type="submit" className="btn btn-primary" disabled={store.loading}>
                            {store.loading ? <BtnLoading /> : "Login"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
});

export default Login;
