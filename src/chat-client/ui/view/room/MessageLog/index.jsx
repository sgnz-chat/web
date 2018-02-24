import React from "react"

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
                            subscriber: messages => this.setState({messages})
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
                        subscriber: messages => this.setState({messages})
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

        console.log(roomId, this.state.messages)

        return (
            <div
                className={classNames.Host}
            >
                {roomId ? this.state.messages.map(x => 
                    x.type == "text" ? (
                        <div
                            key={x.id}
                        >
                            {x.value}
                        </div>
                    )
                  :                     (
                        <div
                            key={x.id}
                        >
                            // TODO
                        </div>
                    )
                )
              :         (
                    <div
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
