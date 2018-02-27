import React            from "react"
import List             from "chat-client/ui/view/common/List"
import ListItem         from "chat-client/ui/view/common/ListItem"
import ListItemAvatar   from "chat-client/ui/view/common/ListItemAvatar"

import classNames from "chat-client/ui/view/navigation/RoomNavigation/classNames"

export default ({
    className,
    onClickItem = e => undefined,
    rooms,
    roomId,
    user,
    ...props
}) => 
    <List>
        {rooms && rooms.map(room => {
            const friend = room.type == "pair" && user.friends.find(x => room.id == x.roomId)
            const lastMessage = (
                room.messages ? room.messages[room.messages.length - 1] || {}
              :                 []
            )

            return (
                <ListItem
                    className={classNames.ListItem}
                    key={room.id}
                    onClick={onClickItem}
                    to={`/rooms/${room.id}`}
                    selected={roomId == room.id}
                >
                    <ListItemAvatar
                        src={
                            friend ? friend.avatarUrl
                          :          room.imageUrl
                        }
                    />
                    <div>
                        <div>
                        {
                            friend ? friend.displayName
                          :          room.name   
                        }
                        </div>
                        <div>
                            {
                                lastMessage.type == "text" ? lastMessage.value
                              :                              undefined
                            }
                        </div>
                    </div>
                </ListItem>
            )
        })}
    </List>
