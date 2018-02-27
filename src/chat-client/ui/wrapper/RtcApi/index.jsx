import React     from "react"
import skyWayKey from "api-common/skyWayKey"
import setState  from "chat-client/util/setState"

const permissionError = ({
    message = "カメラとマイクの使用を許可してください"
}) => new Error(message)

export default class extends React.Component {

    componentWillMount() {
        this.setState({
            isready          : false,
            receiveSubscribes: [],
            openSubscribes   : [],
            closeSubscribes  : []
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
                if (devices.length == 0)
                    onError(permissionError())
                

                const peer = new Peer(
                    token.user.uid,
                    {
                        key: skyWayKey,
                        debug: 3
                    }
                );

                this.setState({peer})

                peer.on("open", () => {
                    this.setState({isready: true})
                    for (let f of this.state.openSubscribes)
                        f()
                })

                peer.on("close", () => {
                    this.setState({isready: false})
                    for (let f of this.state.closeSubscribes)
                        f()
                })



                peer.on("call", async call => {

                    const stream = await navigator.mediaDevices.getUserMedia({
                        video: call.type == "video" ? true : false,
                        audio: true
                    })

                    if (!stream)
                        onError(permissionError())
                    
                    for (let f of this.state.receiveSubscribes)
                        f({
                            answer      : () => {
                                this.setState({call})
                                call.answer(stream)
                            },
                            close      : () => call.close(),
                            stream,
                            getPartnerStream: () => new Promise(resolve => {
                                call.on("stream", x => {
                                    resolve (x)
                                })
                            }),
                            sourceUserId: call.metadata.sourceUserId,
                            type        : call.metadata.type
                        })
                        
                });

                peer.on("disconnected", () => undefined)

                peer.on("error", e => onError(e.message));

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
                createStream: async type => await navigator.mediaDevices.getUserMedia({
                    video: type == "video" ? true : false,
                    audio: true
                }),
                call: async (userId, stream) => {

                    const sourceUserId = tokenApi.read().user.uid
                    
                    if (this.state.peer && sourceUserId) {

                        if (this.state.call)
                            this.state.call.close()

                        const call = this.state.peer.call(
                            userId,
                            stream,
                            {
                                metadata: {
                                    type: "voice",
                                    sourceUserId
                                }
                            }
                        )

                        await setState(
                            this,
                            {call}
                        )
                        
                        return ({
                            close      : () => call.close(),
                            stream,
                            getPartnerStream: () => new Promise(resolve => {
                                call.on("stream", x => {
                                    resolve (x)
                                    console.log('debug')
                                });
                            }),
                            sourceUserId: call.metadata.sourceUserId,
                            type        : call.metadata.type
                        })
                    } else {
                        onError("rtcApi call error")
                    }
                },
                closeCall: () => {
                    if (this.state.call) {
                        this.state.call.close()
                        this.setState({
                            call: undefined
                        })
                    }
                },
                subscribeReceive: f => {
                    this.setState({
                        receiveSubscribes: this.state.receiveSubscribes.concat(f)
                    })
                    
                    return () => this.setState({
                        receiveSubscribes: this.state.receiveSubscribes.filter(x => x != f)
                    })
                },
                subscribeOpen: f => {
                    this.setState({
                        openSubscribes: this.state.openSubscribes.concat(f)
                    })
                    
                    return () => this.setState({
                        openSubscribes: this.state.openSubscribes.filter(x => x != f)
                    })
                },
                subscribeClose: f => {
                    this.setState({
                        closeSubscribes: this.state.closeSubscribes.concat(f)
                    })
                    
                    return () => this.setState({
                        closeSubscribes: this.state.closeSubscribes.filter(x => x != f)
                    })
                }
            },
            onError,
            tokenApi,
            ...props
        })
    }
}
