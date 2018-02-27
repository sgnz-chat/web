import React     from "react"
import skyWayKey from "api-common/skyWayKey"
import setState  from "chat-client/util/setState"

export default class extends React.Component {

    componentWillMount() {
        this.setState({
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

                peer.on("open", () => {
                    for (let f of this.state.openSubscribes)
                        f()
                })

                peer.on("close", () => {
                    for (let f of this.state.closeSubscribes)
                        f()
                })

                peer.on("call", async call => {

                    try {
                        const stream = await navigator.mediaDevices.getUserMedia({
                            video: call.type == "video" ? true : false,
                            audio: true
                        })
                    
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

                    } catch(e) {
                        onError(e)
                    }
                });

                peer.on("disconnected", () => undefined)

                peer.on("error", e => {

                    if (e.type == "peer-unavailable")
                        onError(new Error("宛先に繋がりません"))
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
                        await navigator.mediaDevices.getUserMedia({
                            video: type == "video" ? true : false,
                            audio: true
                        })
                    } catch (e) {
                        onError(e)
                        throw e
                    }
                },
                call: async (userId, stream, type) => {

                    const sourceUserId = tokenApi.read().user.uid
                    
                    if (this.state.peer && sourceUserId) {

                        try {
                            if (this.state.call)
                                this.state.call.close()

                            const call = this.state.peer.call(
                                userId,
                                stream,
                                {
                                    metadata: {
                                        type,
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
                                    });
                                }),
                                sourceUserId: sourceUserId,
                                type
                            })

                        } catch (e) {
                            onError(e)
                            throw e
                        }

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
