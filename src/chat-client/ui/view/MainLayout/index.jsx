import React                from "react"
import ReactDOM             from "react-dom"
import { Redirect }         from "react-router"
import Header               from "chat-client/ui/view/Header"
import NavigationBar        from "chat-client/ui/view/navigation/NavigationBar"

import classNames from "chat-client/ui/view/MainLayout/classNames"

const executeNotification = ({
    title,
    body,
}) => {
    const x = new Notification(
        title,
        {
            body,
            icon: "/img/sgnz-chat-notification.png"
        }
    )

    x.onclick = _ => {
        window.focus();
        x.close()
    }
    setTimeout(_ => x.close(), 5000)
}


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
                        executeNotification({
                            title: "Welcome to Sgnz Chat!",
                            body: "通知をおしらせします。"
                        })
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

            const roomMessageSubscriber = roomId => {}

            const userUnsubscriber = userApi.subscribe({
                subscriber: user => {
                    const newRoom =  user.rooms.filter(room => !this.state.user.rooms.map(x => x.id).includes(room.id))

                    if (newRoom) {
                        newRoom
                    }

                    this.setState({user})
                }
            })
            
            const roomUnsubscribers = user.rooms.map(room => roomMessageApi.subscribe({
                room: {
                    id: room.id
                },
                subscriber: messages => {

                    const targetRoom = (this.state.user.rooms.find(x => x.id == room.id) || {})

                    const prevMessages = targetRoom.messages || []

                    if (prevMessages.length < messages.length)
                        window.Notification && executeNotification({
                            title: room.type == "pair" ? (user.friends.find(x => room.id == x.roomId) || {}).name
                                 :                       targetRoom.name,
                            body : messages.type == "text" ? messages.value
                                 :                           "新着メッセージ"
                        })

                    this.setState({
                        user: {
                            ...user,
                            ...{
                                rooms: this.state.user.rooms.map(x => {
                                    if (x.id == room.id)
                                        x.messages = messages
            
                                    return x
                                })
                            }
                        }
                    })
                }
            }))

            this.setState({
                user,
                unsubscribers: roomUnsubscribers.concat(userUnsubscriber)
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
                    onSignOutButtonClcik={async _ => {
                        await tokenApi.delete()
                        console.log('delete')

                        // TODO fix
                        location.reload()
                        history.push("/sign_in")
                    }}
                    onNavButtonClick={_ => 
                        this.setState({subNavigationIsView: !this.state.subNavigationIsView})
                    }
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
