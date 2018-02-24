import React       from "react"
import List        from "chat-client/ui/view/common/List"
import ListItem    from "chat-client/ui/view/common/ListItem"
import TextField   from "chat-client/ui/view/common/TextField"

import classNames from "chat-client/ui/view/room/ChatPanel/classNames"

export default ({
    className,
    roomId,
    roomMessageApi: {
        create
    },
    user,
    ...props
}) =>
    <div
        className={[className, classNames.Host].join(" ")}
        {...props}
    >
            <TextField
                multiLine
                onKeyDown={async e => {
                    const target = e.target;
                    if ( e.shiftKey && e.keyCode == 13) {
                    } else if (e.keyCode == 13 && target.value != "") {
                        e.preventDefault();
                        if(target.value.match(/\S/g))
                            await create({
                                room : {
                                    id: roomId
                                },
                                message: {
                                    type : "text",
                                    value: target.value 
                                }
                            })
                        
                        target.value = "";
                    }
                }}
                name="textMessage"
                labelText="メッセージを送信"
                autoFocus={true}
            />
    </div>
