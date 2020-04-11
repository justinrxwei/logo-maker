import React, { Component } from 'react'

// THIS IS HOW WE DISPLAY THE LOGO, IN THIS COMPONENT
class TextEditWorkspace extends Component {
    render() {
        const styles = {
            container: {
                color: this.props.color,
                fontSize: this.props.fontSize + "pt",
                backgroundColor: this.props.backgroundColor,
                border: "solid",
                borderColor: this.props.borderColor,
                borderWidth: this.props.borderWidth + "pt",
                borderRadius: this.props.borderRadius + "pt",
                padding: this.props.padding + "pt",
                margin: this.props.margin + "pt",
                display: "inline-block"
            }
        }
        return (
            <div className="cols8"
                style={styles.container }>
                {this.props.text}
            </div>
        )
    }
}

export default TextEditWorkspace