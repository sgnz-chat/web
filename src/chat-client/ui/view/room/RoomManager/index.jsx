import React            from "react"
import FontAwesome      from "chat-client/ui/view/common/FontAwesome"
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
            telephoneCall = userId => undefined,
            subNavigationType,
            user,
            rooms,
            ...props
        } = this.props

        return (
            <div
                className={classNames.Host}
            >
                {roomId ? [
                    <MessageLog
                        key={"MessageLog"}
                        roomId={roomId}
                        roomMessageApi={roomMessageApi}
                        user={user}
                        rooms={rooms}
                    />,
                    <ChatPanel
                        key={"ChatPanel"}
                        roomId={roomId}
                        roomMessageApi={roomMessageApi}
                        telephoneCall={() => {
                            const partnerUser = user.friends.find(x => x.roomId == roomId)
                            if (partnerUser)
                                telephoneCall(partnerUser.id)
                        }}
                        user={user}
                    />
                ]
              : <div
                    className={classNames.RoomNotFound}
                >
                    <FontAwesome>{'\uf27a'}</FontAwesome>
                    <div>トークを始めよう！</div>
                </div>
                }
            </div>
        )
    }
}
