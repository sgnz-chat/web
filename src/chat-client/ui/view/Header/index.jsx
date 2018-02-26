import React            from "react"
import Button           from "chat-client/ui/view/common/Button"
import FontAwesome      from "chat-client/ui/view/common/FontAwesome"
import List             from "chat-client/ui/view/common/List"
import ListItem         from "chat-client/ui/view/common/ListItem"

import classNames from "chat-client/ui/view/Header/classNames"

export default class extends React.Component {
    componentWillMount() {
    }

    componentDidMount() {
        ;(async () => {
            const {
                databaseApi,
                user,
                ...props
            } = this.props

        })()
    }

    render() {
        const {
            className,
            onSignOutButtonClcik = e => undefined,
            onNavButtonClick = e => undefined,
            user,
            ...props
        } = this.props

        return (
            <header
                className={[className, classNames.Host].join(" ")}
            >
                {window.innerWidth < 767 
             && <FontAwesome 
                    onClick={onNavButtonClick}
                    className={classNames.NavButton}
                >
                    {'\uf0c9'}
                </FontAwesome>
                }
                <div className={classNames.Title}>sgnz-chat</div>
                <Button
                    color="White"
                    className={classNames.Button}
                    onClick={onSignOutButtonClcik}
                >
                    ログアウト
                </Button>
            </header>
        )
    }
}
