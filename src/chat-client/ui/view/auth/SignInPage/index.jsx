import React     from "react"

import classNames from "chat-client/ui/view/auth/SignInPage/classNames"

export default class extends React.Component {
    componentWillMount() {
        this.setState({
            checkBoxIsSelected: false,
            isSending         : false,
        })
    }

    render() {
        const {
            onError = error => undefined,
            tokenApi: {
                create
            }
        } = this.props

        return (
            <div
                className={classNames.Host}
            >
                <form
                    onSubmit={async e => {
                        e.preventDefault()

                        this.setState({
                            isSending: true
                        })

                        try {
                            const form = e.target

                            await create({
                                email       : form.elements["email"].value,
                                password    : form.elements["password"].value,
                                staySignedIn: this.state.checkBoxIsSelected
                            })
                        } catch (e) {
                            throw e
                            onError(e)

                            this.setState({
                                isSending: false
                            })
                        }
                    }}
                >
                    <div>
                        <input
                            autoComplete="email"
                            name="email"
                            type="text"
                            required
                        />
                        <input
                            autoComplete="current-password"
                            name="password"
                            type="password"
                            required
                        />
                    </div>
                    <div>
                        <div>
                            <input
                                type="checkbox"
                                selected={this.state.checkBoxIsSelected}
                                onClick={e =>
                                    this.setState({
                                        checkBoxIsSelected: !this.state.checkBoxIsSelected
                                    })
                                }
                            />
                            ログイン状態を維持
                        </div>
                        <button
                            disabled={this.state.isSending}
                        >
                            ログイン
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}


