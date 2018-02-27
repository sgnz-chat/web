import React           from "react"
import Avatar          from "chat-client/ui/view/common/Avatar"
import Button          from "chat-client/ui/view/common/Button"
import TextField       from "chat-client/ui/view/common/TextField"
import SendImageDialog from "chat-client/ui/view/common/SendImageDialog"

import classNames from "chat-client/ui/view/setting/SettingPage/classNames"

export default class extends React.Component {

    componentWillMount() {
        this.setState({
            dialogIsVisible: false
        })
    }

    render() {
        const {
            databaseApi: {
                userApi: {
                    update: updateUser
                },
                userImageApi: {
                    create: createUserImage
                }
            },
            user,
            ...props
        } = this.props

        return (
            <div
                className={classNames.Host}
            >
                <div>
                    <Avatar
                        className={classNames.Avatar}
                        src={user.avatarUrl}
                    />
                    <Button
                        className={classNames.Button}
                        onClick={_ => this.setState({dialogIsVisible: true})}
                    >
                        画像を変更
                    </Button>
                </div>
                <form
                    onSubmit={async e => {
                        e.preventDefault()

                        const form = e.target


                        const room = await updateUser({
                            user: {
                                ...user,
                                displayName  : form.elements["displayName"].value,
                                statusMessage: form.elements["statusMessage"].value,
                            }
                        })

                    }}
                >
                    <div
                        className={classNames.IdContent}
                    >
                        <div>ID : </div>
                        <div>{user.id}</div>
                    </div>
                    <TextField
                        labelText="表示名"
                        name="displayName"
                        required
                        defaultValue={user.displayName}
                        minLength={"1"}
                        maxLength={"8"}
                    />
                    <TextField
                        labelText="ステータスメッセージ"
                        name="statusMessage"
                        defaultValue={user.statusMessage}
                        maxLength={"18"}
                    />
                    <Button
                        className={classNames.FormButton}
                        component="button"
                    >
                        保存
                    </Button>
                </form>
                <SendImageDialog
                    isVisible={this.state.dialogIsVisible}
                    title="画像アップロード"
                    onCancel={_ => this.setState({dialogIsVisible: false})}
                    onSubmit={async e => {
                        e.preventDefault()
                        let form  = e.target
                        let image = form.elements["image"].files[0]
                        console.log(image, "!?!??!")
                        await createUserImage({image})

                        this.setState({
                            dialogIsVisible: false
                        })
                    }}
                    name="image"
                />
            </div>
        )
    }
}
