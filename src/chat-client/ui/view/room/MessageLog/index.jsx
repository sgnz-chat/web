import React         from "react"
import ReactDOM      from "react-dom"
import AvatarMessage from "chat-client/ui/view/room/AvatarMessage"
import Message       from "chat-client/ui/view/room/Message"

import classNames from "chat-client/ui/view/room/MessageLog/classNames"

export default class extends React.Component {
    componentWillMount() {
        this.setState({
        })
    }

    componentDidMount() {
    }

    componentWillReceiveProps(props) {

        const e = ReactDOM.findDOMNode(this)
        e.scrollTop = e.scrollHeight
    }

    componentWillUnmount() {
    }

    render() {
        const {
            roomId = undefined,
            roomMessageApi,
            user,
            ...props
        } = this.props

        const messages = (user.rooms.find(x => x.id == roomId) || {}).messages || []

        return (
            <div
                className={classNames.Host}
            >
                {roomId ? messages.map(x => 
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
