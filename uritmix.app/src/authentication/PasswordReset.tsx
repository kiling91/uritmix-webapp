import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { TextBox, Validator } from 'devextreme-react';
import { EmailRule, RequiredRule, StringLengthRule } from 'devextreme-react/validator';
import { RuleCaption } from '../base/ruleCaption';
import { AuthDomain } from '../domainConfig';
import { AppUrl } from '../config';
import BtnLoading from '../ui/BtnLoading';
import ShowErrors from '../ui/ShowErrors';
import PasswordResetStore from './store/passwordResetStore';

const PasswordReset = observer(() => {
    const [successResetPassword, setSuccessResetPassword] = useState<boolean>(false)
    const [email, setEmail] = useState<string>('');
    const store = useLocalObservable(() => new PasswordResetStore());

    useEffect(() => {
        return () => store.init();
    }, []);

    const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        store.clearErrors();
        if (email) {
            if (await store.reset(email)) {
                setSuccessResetPassword(true)
            }
        } else {
            store.addError(RuleCaption.requiredFieldsNotAssigned());
        }
    };

    const formPasswordReset = () => {
        return (
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
                </fieldset>

                {/*Bottom*/}
                <button type="submit" className="btn btn-primary" disabled={store.loading}>
                    {store.loading ? <BtnLoading /> : "Reset password"}
                </button>
            </form>);
    }

    const formSuccess = () => {
        return <div className="text-center mt-4">
            <p className="lead">
                {`Instructions for changing your password have been sent to your email ${email}`}
            </p>
            <Link to={AppUrl.Login} >{"Return to login page"}</Link>
        </div>
    }

    return (
        <div className="card w-25 mx-auto mt-5" style={{minWidth: "320px"}}>
            <div className="card-header">
                {"Reset your password"}
            </div>
            <div className="card-body">
                <ShowErrors errors={store.errors} />
                {!successResetPassword ? formPasswordReset() : formSuccess()}
            </div>
        </div>
    );
});

export default PasswordReset;
