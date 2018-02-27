import React       from "react"
import List        from "chat-client/ui/view/common/List"
import ListItem    from "chat-client/ui/view/common/ListItem"
import TextField   from "chat-client/ui/view/common/TextField"
import Toolbar     from "chat-client/ui/view/room/Toolbar"
import ToolIcon    from "chat-client/ui/view/room/ToolIcon"

import classNames from "chat-client/ui/view/room/ChatPanel/classNames"

export default ({
    className,
    roomId,
    roomMessageApi: {
        create
    },
    telephoneCall,
    user,
    ...props
}) =>
    <div
        className={[className, classNames.Host].join(" ")}
        {...props}
    >
        <Toolbar>
            <ToolIcon
                onClick={_ => telephoneCall()}
                // TODO
            >{'\uf095'}</ToolIcon>
        </Toolbar>
        <TextField
            multiLine
            onKeyDown={async e => {
                const target = e.target;
                if ( e.shiftKey && e.keyCode == 13) {
                } else if (e.keyCode == 13 && target.value != "") {
                    e.preventDefault();
                    const value = target.value;
                    target.value = "";
                    if(value.match(/\S/g))
                        await create({
                            room : {
                                id: roomId
                            },
                            message: {
                                senderId       : user.id,
                                senderAvatarUrl: user.avatarUrl,
                                type           : "text",
                                value
                            }
                        })

                }
            }}
            name="textMessage"
            labelText="メッセージを送信"
        />
    </div>
