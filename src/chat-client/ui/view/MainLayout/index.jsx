import React                from "react"
import ReactDOM             from "react-dom"
import { Redirect }         from "react-router"
import Header               from "chat-client/ui/view/Header"
import NavigationBar        from "chat-client/ui/view/navigation/NavigationBar"

import classNames from "chat-client/ui/view/MainLayout/classNames"

export default class extends React.Component {
    componentWillMount() {
        this.setState({
            subNavigationIsView: true,
            subNavigationType  : "friend"
        })
    }

    componentDidMount() {
        ;(async _ => {


            if (window.Notification && Notification.permission === "default")
                Notification.requestPermission(r => {
                    if (r === "granted") {

                        const x = new Notification(
                            "Welcome to Sgnz Chat!",
                            {
                                body: "通知をおしらせします。",
                                icon: "/img/sgnz-chat-notification.png"
                            }
                        )

                        x.onclick = _ => {
                            window.focus();
                            x.close()
                        }
                        setTimeout(_ => x.close(), 5000)
                    }
                })
            
            const token = await new Promise((resolve, reject) => {
                const loop = _ => {
                    const x = this.props.tokenApi.read()
                    if(x)
                        resolve(x)
                    else
                        setTimeout(loop, 100)
                }
                loop()
            })

            const {
                tokenApi,
                databaseApi: {
                    userApi,
                    roomMessageApi
                }
            } = this.props

            let user = await userApi.read()

            if (!user) {
                const x = tokenApi.read();
                await userApi.create({
                    user: {
                        id         : x.user.uid,
                        avatarUrl  : x.photoURL    || "http://placehold.jp/464ed6/ffffff/150x150.png?text=Avatar",
                        displayName: x.displayName || "unname",
                        email      : x.email       || "",
                        friends    : [],
                        name       : x.name || "unname",
                        rooms      : []
                    }
                })
                user = await userApi.read()
            }

            const unsubscribers = user.rooms.map(x => roomMessageApi.subscribe({
                room: {
                    id: x.id
                },
                subscriber: messages => console.log(x.id, messages)
            }))

            this.setState({
                user,
                unsubscribers
            })
            
        })()
    }

    componentWillUnmount() {
        for (let f of this.state.unsubscribers)
            f()
    }

    render() {
        const {
            children,
            history,
            location,
            onError,
            tokenApi,
            ...props
        } = this.props

        const token = tokenApi.read();

        try {

            if (token) {
                if (/\/sign_in/.test(location.pathname))
                    return (
                        <Redirect
                            to={(location.state && location.state.from) || "/"}
                        />
                    )
            } else {
                if (/\/sign_in/.test(location.pathname))
                    return React.cloneElement(
                        children,
                        {
                            location,
                            onError,
                            tokenApi,
                            ...props,
                            ...children.props
                        }
                    )
                    
                else
                    return (
                        <Redirect
                            to={{
                                pathname: "/sign_in",
                                state: {
                                    from: location
                                }
                            }}
                        />
                    )
            }

        } catch (e) {
            onError(e)
        }

        return (
            <div
                className={classNames.Host}
            >
                <Header
                    onNavButtonClick={_ => this.setState({subNavigationIsView: !this.state.subNavigationIsView})}
                />
                <div>
                    <NavigationBar
                        history={history}
                        location={location}
                        onChange={type => this.setState({
                            subNavigationType: type
                        })}
                        selectedType={this.state.subNavigationType}
                    />
                    {<main
                        className={classNames.Main}
                    >
                        {this.state.user && React.cloneElement(
                            children,
                            {
                                history,
                                location,
                                subNavigationIsView: this.state.subNavigationIsView,
                                subNavigationType: this.state.subNavigationType,
                                tokenApi,
                                user: this.state.user,
                                ...props,
                                ...children.props
                            }
                        )}
                    </main>}
                </div>
            </div>
        )
    }
}
