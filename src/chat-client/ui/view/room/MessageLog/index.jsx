import React         from "react"
import ReactDOM      from "react-dom"
import AvatarMessage from "chat-client/ui/view/room/AvatarMessage"
import Message       from "chat-client/ui/view/room/Message"

import classNames from "chat-client/ui/view/room/MessageLog/classNames"

export default class extends React.Component {
    componentWillMount() {
        this.setState({
            roomId       : undefined,
            messages     : [],
            unsubscribers: []
        })
    }

    componentDidMount() {
        ;(async () => {
            const {
                roomId = undefined,
                roomMessageApi: {
                    subscribe
                },
                ...props
            } = this.props

            if (roomId)
                this.setState({
                    roomId,
                    unsubscribers: [
                        subscribe({
                            room: {
                                id: roomId
                            },
                            subscriber: messages => 
                                this.setState(
                                    {
                                        messages
                                    },
                                    () => {
                                        const e = ReactDOM.findDOMNode(this)
                                        e.scrollTop = e.scrollHeight
                                    }
                                )
                        })
                    ]
                })
            
        })
    }

    componentWillReceiveProps(props) {

        const {
            roomId = undefined,
            roomMessageApi: {
                subscribe
            }
        } = props

        if (roomId && roomId !== this.state.roomId) {

            for (let f of this.state.unsubscribers)
                f()
            console.log(roomId, "MessageLog")
            this.setState({
                unsubscribers: [
                    subscribe({
                        room: {
                            id: roomId
                        },
                        subscriber: messages =>
                            this.setState(
                                {
                                    messages
                                },
                                () => {
                                    const e = ReactDOM.findDOMNode(this)
                                    e.scrollTop = e.scrollHeight
                                }
                            )
                    })
                ]
            })
            
        }
    }

    componentWillUnmount() {
        for (let f of this.state.unsubscribers)
            f()
    }

    render() {
        const {
            roomId = undefined,
            roomMessageApi,
            user,
            ...props
        } = this.props

        return (
            <div
                className={classNames.Host}
            >
                {roomId ? this.state.messages.map(x => 
                    x.type == "text" ? (
                        user.id == x.senderId ? 
                            <Message
                                key={x.id}
                                position="right"
                                text={x.value}
                            />
                      :     <AvatarMessage
                                avatarUrl={x.senderAvatarUrl}
                                key={x.id}
                                position="left"
                            >
                                <Message
                                    text={x.value}
                                />
                            </AvatarMessage>
                    )
                  :                     (
                        user.id == x.senderId ? 
                            <Message
                                key={x.id}
                                position="right"
                            >
                                // TODO Image Message
                            </Message>
                      :     <AvatarMessage
                                avatarUrl={x.senderAvatarUrl}
                                key={x.id}
                                position="left"
                            >  
                                <Message
                                    text={x.value}
                                />
                            </AvatarMessage>
                    )
                )
              :         (
                    <div
                        className={classNames.None}
                        key="none"
                    >
                        none
                    </div>
                )
                }
            </div>
        )
    }
}
