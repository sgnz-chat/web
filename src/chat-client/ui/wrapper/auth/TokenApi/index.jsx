import React        from "react"
import * as userApi from "api-common/api/user"
import config       from "api-common/config"

export default class extends React.Component {
    componentWillMount() {
        this.setState({
            auth       : undefined,
            subscribers: [],
            token      : undefined
        })
    }

    componentDidMount() {
        (async () => {

            const auth = firebase.auth(
                firebase.initializeApp(
                    config.sgnzChat.firebase
                )
            )

            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    this.setState({
                        token: {
                            type: "firebase",
                            user: auth.currentUser
                        }
                    })

                    for (let f of this.state.subscribers)
                        f(this.state.token)
                } else {
                }
            });

            this.setState({auth})

            if (auth.currentUser) {
                this.setState({
                    token: {
                        type: "firebase",
                        user: auth.currentUser
                    }
                })
            }

        })()
    }

    render() {
        const {
            render,
            ...props
        } = this.props

        return render({
            credentialApi: {
                createUserWithEmailAndPassword: async ({
                    email,
                    password
                }) => {
                    let x = await firebase.auth().createUserWithEmailAndPassword(email, password)

                    // todo check email
                    // await x.sendEmailVerification()

                    await userApi.create({
                        user: {
                            id         : x.uid,
                            avatarUrl  : "http://placehold.jp/464ed6/ffffff/150x150.png?text=Avatar",
                            displayName: "unname",
                            email,
                            friends    : [],
                            name       : "unname",
                        },
                        token: {
                            user: x
                        }
                    })

                    return x
                },
                updatePassword: async ({
                    password,
                    newPassword
                }) => {
                    let user = firebase.auth(this.state.token.app).currentUser
                    
                    await user.reauthenticateWithCredential(firebase.auth.EmailAuthProvider.credential(
                        user.email,
                        password
                    ))

                    await user.updatePassword(newPassword)

                    return true
                }
            },
            tokenApi: {
                auth: this.state.auth,
                create: async ({
                    staySignedIn,
                    email,
                    password
                }) => {

                    if(staySignedIn)
                        await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
                    else
                        await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)

                    await firebase.auth().signInWithEmailAndPassword(email, password);
                },
                delete: async () => {
                    await firebase.auth().signOut()

                    for (let f of this.state.subscribers)
                        f(this.state.token)
                },
                read: () => this.state.token,
                subscribe: f => new Promise(resolve =>
                    this.setState(
                        {
                            subscribers: this.state.subscribers.concat(f)
                        },
                        () => new Promise(resolve => 
                            this.setState({
                                subscribers: this.state.subscribers.filter(x => x !== f)
                            })
                        )
                    )
                )
            },
            ...props
        })
    }
}
