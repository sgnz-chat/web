import React     from "react"
import config    from "api-common/config"

import classNames from "chat-client/ui/view/auth/SignInPage/classNames"


const uiConfig = {
    signInSuccessUrl: config.HOSTING_DOMAIN.url,
    signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        {
            provider      : firebase.auth.PhoneAuthProvider.PROVIDER_ID,
            defaultCountry: "JP"
        }
        // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        // firebase.auth.GithubAuthProvider.PROVIDER_ID,
    ],
};

export default class extends React.Component {
    componentWillMount() {
        this.setState({
            auth              : undefined,
            checkBoxIsSelected: false,
            isSending         : false,
        })
    }

    componentDidMount() {

        const {
            tokenApi: {
                auth
            }
        } = this.props;

        if (auth) {

            // Initialize the FirebaseUI Widget using Firebase.
            const ui = new firebaseui.auth.AuthUI(auth);
            // The start method will wait until the DOM is loaded.
            ui.start('#firebaseui-auth-container', uiConfig);
            
            this.setState({auth})
        }
    }

    componentWillReceiveProps(props) {

        const {
            tokenApi: {
                auth
            }
        } = props

        if (!this.state.auth && auth) {
            const ui = new firebaseui.auth.AuthUI(auth);
            ui.start('#firebaseui-auth-container', uiConfig);
            this.setState({auth})
        }
    }

    render() {
        const {
            onError = error => undefined,
            tokenApi: {
                auth,
                create
            },
            credentialApi: {
                createUserWithEmailAndPassword
            }
        } = this.props

        return (
            <div
                className={classNames.Host}
            >
                <div>
                    <div className={classNames.Title}>sgnz-chat</div>
                    <div className={classNames.Content}>
                        <div id="firebaseui-auth-container"></div>
                    </div>
                </div>
            </div>
        )
    }
}


