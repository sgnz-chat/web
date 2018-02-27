import React     from "react"
import skyWayKey from "api-common/skyWayKey"
import setState  from "chat-client/util/setState"

export default class extends React.Component {

    componentWillMount() {
        this.setState({
            receiveSubscribes: []
        })
    }

    componentDidMount() {
        (async () => {

            const {
                tokenApi,
                onError,
                ...props
            } = this.props
    

            const token = await new Promise((resolve, reject) => {
                const loop = _ => {
                    const x = tokenApi.read()
                    if(x)
                        resolve(x)
                    else
                        setTimeout(loop, 100)
                }
                loop()
            })

            try {
                const devices = await navigator.mediaDevices.enumerateDevices()
                if (devices.length == 0) {
                    try {
                        await navigator.mediaDevices.getUserMedia({
                            video: call.type == "video" ? true : false,
                            audio: true
                        })
                    } catch (e) {
                        onError(e)
                    }

                }
                
                const peer = new Peer(
                    token.user.uid,
                    {
                        key: skyWayKey,
                        debug: 2
                    }
                );

                this.setState({peer})

                peer.on("open", () => console.log("webrtc open"))

                peer.on("close", () => console.log("webrtc close"))

                peer.on("call", call => {
                    for (let f of this.state.receiveSubscribes)
                        f(call)
                });

                peer.on("disconnected", () => console.log("webrtc disconnect"))

                peer.on("error", e => {
                    onError(
                        e.type == "peer-unavailable" ? new Error("宛先に繋がりません")
                      : e.type == "unavailable-id"   ? new Error("他のデバイスでログインされています。通話の利用はできません。")
                      :                                e
                    )
                });

            } catch (e) {
                onError(e)
            }
        })()
    }

    render() {
        const {
            onError,
            render,
            tokenApi,
            ...props
        } = this.props
        
        return render({
            rtcApi: {
                isReady: this.state.isReady,
                createStream: async type => {
                    try {
                        return await navigator.mediaDevices.getUserMedia({
                            video: type == "video" ? true : false,
                            audio: true
                        })
                    } catch (e) {
                        onError(e)
                        throw e
                    }
                },
                call: (userId, stream, type) => {

                    const sourceUserId = tokenApi.read().user.uid
                    
                    if (this.state.peer && sourceUserId) {

                        try {

                            return this.state.peer.call(
                                userId,
                                stream,
                                {
                                    metadata: {
                                        type,
                                        sourceUserId
                                    }
                                }
                            )

                        } catch (e) {
                            onError(e)
                            throw e
                        }

                    }
                },
                subscribeReceive: f => {
                    this.setState({
                        receiveSubscribes: this.state.receiveSubscribes.concat(f)
                    })
                    
                    return () => this.setState({
                        receiveSubscribes: this.state.receiveSubscribes.filter(x => x != f)
                    })
                }
            },
            onError,
            tokenApi,
            ...props
        })
    }
}
