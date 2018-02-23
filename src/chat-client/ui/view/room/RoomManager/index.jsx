import React            from "react"
import ChatPanel        from "chat-client/ui/view/room/ChatPanel"
import MessageLog       from "chat-client/ui/view/room/MessageLog"

import classNames from "chat-client/ui/view/room/RoomManager/classNames"

export default class extends React.Component {
    componentWillMount() {
        this.setState({
            unsubscribers: [],
        })
    }

    componentDidMount() {
        (async () => {

            const {
                databaseApi: {
                    roomApi
                },
                roomId,
                user,
                ...props
            } = this.props


            if (roomId)
                this.setState({
                    unsubscribers: [
                        roomApi.subscribe({
                            room: {
                                id: roomId
                            },
                            subscriber: room => this.setState({room})
                        })
                    ]
                })

        })()
    }


    componentWillUnmount() {
        this.state.unsubscribers.map(f => f())
    }

    render() {
        const {
            databaseApi: {
                roomMessageApi
            },
            roomId,
            subNavigationType,
            user,
            ...props
        } = this.props

        return (
            <div
                className={classNames.Host}
            >
                <MessageLog
                    roomId={roomId}
                    roomMessageApi={roomMessageApi}
                />
                <ChatPanel
                    roomId={roomId}
                    roomMessageApi={roomMessageApi}
                />
            </div>
        )
    }
}
