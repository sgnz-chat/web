import React       from "react"
import Button      from "chat-client/ui/view/common/Button"
import FontAwesome from "chat-client/ui/view/common/FontAwesome"
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
            >{'\uf095'}</ToolIcon>
        </Toolbar>
        <form
            className={classNames.Form}
            onSubmit={async e => {
                e.preventDefault();
                let form = e.target;

                let textarea = form.querySelector("*[name='textMessage']");
                if (textarea.value != "" && textarea.value.match(/\S/g)) {
                    const value = textarea.value
                    await create({
                        room : {
                            id: roomId
                        },
                        message: {
                            sender         : user,
                            type           : "text",
                            value
                        }
                    })
                    textarea.value = "";
                }
            }}
        >
            <TextField
                labelText="メッセージを送信"
                multiLine
                name="textMessage"
                onKeyDown={async e => {
                    const target = e.target;
                    if ( e.shiftKey && e.keyCode == 13) {
                    } else if (window.innerWidth > 767 && e.keyCode == 13 && target.value != "") {
                        e.preventDefault();
                        const value = target.value;
                        target.value = "";
                        if(value.match(/\S/g))
                            await create({
                                room : {
                                    id: roomId
                                },
                                message: {
                                    sender         : user,
                                    type           : "text",
                                    value
                                }
                            })

                    }
                }}
            />
            <Button
                component="button"
                type="raised"
            >
                <FontAwesome>{'\uf1d8'}</FontAwesome>
            </Button>
        </form>
    </div>
