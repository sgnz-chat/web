import React     from "react"
import Avatar    from "chat-client/ui/view/common/Avatar"
import Button    from "chat-client/ui/view/common/Button"
import TextField from "chat-client/ui/view/common/TextField"

import classNames from "chat-client/ui/view/setting/SettingPage/classNames"

export default ({
    databaseApi: {
        userApi: {
            update
        }
    },
    user,
    ...props
}) => 
    <div
        className={classNames.Host}
    >
        <Avatar
            className={classNames.Avatar}
            src={user.avatarUrl}
        />

        <form
            onSubmit={async e => {
                e.preventDefault()

                const form = e.target


                const room = await update({
                    user: {
                        ...user,
                        displayName: form.elements["displayName"].value,
                        name       : form.elements["statusMessage"].value,
                    }
                })

            }}
        >
            <TextField
                labelText="表示名"
                name="displayName"
                required
                defaultValue={user.name}
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
                className={classNames.Button}
                component="button"
            >
                保存
            </Button>
        </form>
    </div>
