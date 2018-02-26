import React            from "react"
import Avatar           from "chat-client/ui/view/common/Avatar"
import Button           from "chat-client/ui/view/common/Button"
import Dialog           from "chat-client/ui/view/common/Dialog"
import DialogBody       from "chat-client/ui/view/common/DialogBody"
import DialogFooter     from "chat-client/ui/view/common/DialogFooter"
import DialogHeader     from "chat-client/ui/view/common/DialogHeader"
import TextField        from "chat-client/ui/view/common/TextField"

import classNames from "chat-client/ui/view/SearchUserDialog/classNames"

export default class extends React.Component {
    componentWillMount() {
        this.setState({
            isResultView: false,
            targetUser  : undefined
        })
    }

    render() {

        const {
            roomApi: {
                create: createRoom
            },
            user,
            rooms,
            userApi: {
                read: readUser,
                update: updateUser
            },
            onCancel,
            ...props
        } = this.props;

        return (
            <Dialog
                onCancel={onCancel}
                {...props}
            >
                <DialogHeader>友達検索</DialogHeader>
                <DialogBody>
                    <div>
                        <TextField
                            autoComplete="off"
                            name="id"
                            onKeyDown={async e => {
                                const target = e.target;
                                if (e.keyCode == 13 && target.value != "") {
                                    e.preventDefault();
                                    if(target.value.match(/\S/g)) {
                                        const targetUser = await readUser({
                                            user : {
                                                id: target.value
                                            }
                                        })

                                        this.setState({
                                            isResultView: true,
                                            targetUser
                                        })
                                    }
                                }
                            }}
                            labelText="IDを入力(Enterで検索)"
                        />
                    </div>
                    <div
                        className={classNames.Result}
                    >
                        {this.state.targetUser ? <div
                                className={classNames.TargetUser}
                            >
                                <Avatar
                                    src={this.state.targetUser.avatarUrl}
                                />
                                <div>
                                    {this.state.targetUser.displayName}
                                </div>
                                <div>
                                    {this.state.targetUser.statusMessage}
                                </div>
                                <div>
                                    <Button
                                        color="BlueGrey"
                                        onClick={() => 
                                            this.setState({
                                                isResultView: false
                                            })
                                        }
                                    >
                                        キャンセル
                                    </Button>
                                    <Button
                                        onClick={async _ => {

                                            const room = await createRoom({
                                                room: {
                                                    type: "pair"
                                                },
                                                users: [
                                                    user.id,
                                                    this.state.targetUser.id
                                                ]
                                            })

                                            await updateUser({
                                                user: {
                                                    id     : user.id,
                                                    friends: user.friends.concat({
                                                        id    : this.state.targetUser.id,
                                                        roomId: room.id
                                                    }),
                                                    rooms  : rooms.concat({
                                                        id: room.id
                                                    })
                                                }
                                            })

                                            await updateUser({
                                                user: {
                                                    id     : this.state.targetUser.id,
                                                    friends: this.state.targetUser.friends.concat({
                                                        id    : user.id,
                                                        roomId: room.id
                                                    }),
                                                    rooms  : this.state.targetUser.rooms.concat({
                                                        id: room.id
                                                    })
                                                }
                                            })

                                            onCancel()
                                        }}
                                    >
                                        追加
                                    </Button>
                                </div>
                            </div>
                    : this.state.isResultView  ? <div>
                                該当するUserがいません。IDを確認してください
                            </div>
                    :                            undefined
                        }
                    </div>
                    <DialogFooter>
                        <Button
                            onClick={onCancel}
                        >
                            閉じる
                        </Button>
                    </DialogFooter>
                </DialogBody>
            </Dialog>
        )
    }
}
