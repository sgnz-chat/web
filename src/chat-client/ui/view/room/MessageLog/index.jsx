import React         from "react"
import ReactDOM      from "react-dom"
import AvatarMessage from "chat-client/ui/view/room/AvatarMessage"
import MessageBox    from "chat-client/ui/view/room/MessageBox"
import MessageText   from "chat-client/ui/view/room/MessageText"

import classNames from "chat-client/ui/view/room/MessageLog/classNames"

export default class extends React.Component {
    componentWillMount() {
        this.setState({
        })
    }

    componentDidMount() {
        const e = ReactDOM.findDOMNode(this)
        e.scrollTop = e.scrollHeight
    }

    componentDidUpdate(props) {
        console.log("componentWillReceiveProps")
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
            rooms,
            ...props
        } = this.props

        const messages = (rooms.find(x => x.id == roomId) || {}).messages || []

        return (
            <div
                className={classNames.Host}
            >
                {roomId ? messages.map(x => 
                    x.type == "text" ? (
                        user.id == x.senderId ? 
                            <MessageBox
                                key={x.id}
                                position="right"
                            >
                                <MessageText>
                                    {x.value}
                                </MessageText>
                            </MessageBox>
                      :     <AvatarMessage
                                avatarUrl={x.senderAvatarUrl}
                                key={x.id}
                                position="left"
                            >
                                <MessageBox>
                                    <MessageText>
                                        {x.value}
                                    </MessageText>
                                </MessageBox>
                            </AvatarMessage>
                    )
                  :                     (
                        user.id == x.senderId ? 
                            <MessageBox
                                key={x.id}
                                position="right"
                            >
                                // TODO Image Message
                            </MessageBox>
                      :     <AvatarMessage
                                avatarUrl={x.senderAvatarUrl}
                                key={x.id}
                                position="left"
                            >  
                                <MessageBox>
                                </MessageBox>
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
