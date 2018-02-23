import React                from "react"
import ReactDOM             from "react-dom"
import { Redirect }         from "react-router"
import NavigationBar        from "chat-client/ui/view/navigation/NavigationBar"

import classNames from "chat-client/ui/view/MainLayout/classNames"

export default class extends React.Component {
    componentWillMount() {
        this.setState({
            subNavigationType: "friend"
        })
    }

    componentDidMount() {
        ;(async _ => {
            
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

            const user = await userApi.read()

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
                <NavigationBar
                    history={history}
                    location={location}
                    onChange={type => this.setState({
                        subNavigationType: type
                    })}
                />
                {<main
                    className={classNames.Main}
                >
                    {this.state.user && React.cloneElement(
                        children,
                        {
                            history,
                            location,
                            subNavigationType: this.state.subNavigationType,
                            tokenApi,
                            user: this.state.user,
                            ...props,
                            ...children.props
                        }
                    )}
                </main>}
            </div>
        )
    }
}
