import React  from "react"
import config from "api-common/config"

export default class extends React.Component {
    componentWillMount() {
        this.setState({
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
            tokenApi: {
                create: async ({
                    staySignedIn,
                    email,
                    password
                }) => {

                    if(staySignedIn)
                        await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
                    else
                        await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)

                    this.setState(
                        {
                            token: {
                                type: "firebase",
                                user: await firebase.auth().signInWithEmailAndPassword(email, password)
                            }
                        },
                        () => {
                            for (let f of this.state.subscribers)
                                f(this.state.token)
                        }
                    )
                },
                delete: () => {
                    firebase.auth().signOut()

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
