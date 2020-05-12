import React, { Component } from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { Link } from 'react-router-dom';
import TextEditWorkspace from './TextEditWorkspace';

 
const ADD_LOGO = gql`
   mutation AddLogo(
       $text: String!,
       $color: String!,
       $fontSize: Int!,
       $backgroundColor: String!,
       $borderColor: String!,
       $borderRadius: Int!,
       $borderWidth: Int!,
       $padding: Int!,
       $margin: Int!,
       $logoWidth: Int!,
       $logoHeight: Int!,
       $textObjectList: [[String]]!,
       $imageObjectList: [[String]]!) {
       addLogo(
           text: $text,
           color: $color,
           fontSize: $fontSize,
           backgroundColor: $backgroundColor,
           borderColor: $borderColor,
           borderRadius: $borderRadius,
           borderWidth: $borderWidth,
           padding: $padding,
           margin: $margin,
           logoWidth: $logoWidth,
           logoHeight: $logoHeight,
           textObjectList: $textObjectList,
           imageObjectList: $imageObjectList) {
           _id
       }
   }
`;
 
class CreateLogoScreen extends Component {
    logoInit = false;
    constructor(props) {
        
        super(props);
        this.state = {
            text : '',
            color : '',
            fontSize : '',
            backgroundColor : '',
            borderColor: '',
            borderRadius : '',
            borderWidth: '',
            padding : '',
            margin : '',
            logoWidth: '',
            logoHeight: '',
            textObjectList: [],
            imageObjectList: []
        }
    }
    onChangeText= (event) => {
        this.setState({
            text: event.target.value
        });
    }
    onChangeColor= (event) => {
        this.setState({
            color: event.target.value
        });
    }
    onChangeFontSize= (event) => {
        this.setState({
            fontSize: event.target.value
        });
    }
    onChangeBackgroundColor= (event) => {
        this.setState({
            backgroundColor: event.target.value
        });
    }
    onChangeBorderColor= (event) => {
        this.setState({
            borderColor: event.target.value
        });
    }
    onChangeBorderRadius= (event) => {
        this.setState({
            borderRadius: event.target.value
        });
    }
    onChangeBorderWidth= (event) => {
        this.setState({
            borderWidth: event.target.value
        });
    }
    onChangePadding= (event) => {
        this.setState({
            padding: event.target.value
        });
    }
    onChangeMargin= (event) => {
        this.setState({
            margin: event.target.value
        });
    }
    onChangeLogoWidth= (event) => {
        this.setState({
            logoWidth: event.target.value
        });
    }
    onChangeLogoHeight= (event) => {
        this.setState({
            logoHeight: event.target.value
        });
    }
    initLogoProperties = () => {
        console.log("initLogoProperties")
        this.setState({
            text: "Sample Text",
            color: "#ff0000",
            fontSize: "20",
            backgroundColor: "#ffffff",
            borderColor: "#ff0000",
            borderRadius: "5",
            borderWidth: "5",
            padding: "1",
            margin: "1",
            logoWidth: "50",
            logoHeight:"30"
        })
    }
   render() {
       let text, color, fontSize, backgroundColor, borderColor, borderRadius, borderWidth, padding, margin, logoWidth, logoHeight;
       if (!this.logoInit) {
        this.initLogoProperties();
        this.logoInit = true;
    }
       return (
           <Mutation mutation={ADD_LOGO} onCompleted={() => this.props.history.push('/')}>
               {(addLogo, { loading, error }) => (
                   <div className="container">
                       <div className="panel panel-default">
                           <div className="panel-heading">
                               <h4><Link to="/">Home</Link></h4>
                               <h3 className="panel-title">
                                   Create Logo
                           </h3>
                           </div>
                           <div className="row">
                            <div className="cols2">
                           <div className="panel-body">
                               <form onSubmit={e => {
                                   e.preventDefault();
                                   addLogo({ variables: { text: text.value, color: color.value, fontSize: parseInt(fontSize.value)
                                   , backgroundColor: backgroundColor.value, borderColor: borderColor.value, borderRadius: parseInt(borderRadius.value)
                                   , borderWidth: parseInt(borderWidth.value), padding: parseInt(padding.value), margin: parseInt(margin.value)
                                   , logoWidth: parseInt(logoWidth.value), logoHeight: parseInt(logoHeight.value) } });
                                   text.value = "";
                                   color.value = "";
                                   fontSize.value = "";
                                   backgroundColor.value = "";
                                   borderColor.value = "";
                                   borderRadius.value = "";
                                   borderWidth.value = "";
                                   padding.value = "";
                                   margin.value = "";
                                   logoWidth.value = "";
                                   logoHeight.value = "";
                               }}>
                                   <div className="form-group">
                                       <label htmlFor="text">Text:</label>
                                       <input type="text" className="form-control" name="text" ref={node => {
                                           text = node;
                                       }} placeholder="Text" defaultValue={this.state.text} onChange={this.onChangeText}required pattern=".*\S+.*" title="You cannot put all whitespace" />
                                   </div>
                                   <div className="form-group">
                                       <label htmlFor="color">Color:</label>
                                       <input type="color" className="form-control" name="color" ref={node => {
                                           color = node;
                                       }} placeholder="Color" value={this.state.color} onChange={this.onChangeColor}/>
                                   </div>
                                   <div className="form-group">
                                       <label htmlFor="fontSize">Font Size:</label>
                                       <input type="number" className="form-control" name="fontSize" ref={node => {
                                           fontSize = node;
                                       }} placeholder="Font Size" min="2" max="144" defaultValue={this.state.fontSize}onChange={this.onChangeFontSize}required/>
                                   </div>
                                   <div className="form-group">
                                       <label htmlFor="backgroundColor">Background Color:</label>
                                       <input type="color" className="form-control" name="backgroundColor" ref={node => {
                                           backgroundColor = node;
                                       }} placeholder="Background Color" value={this.state.backgroundColor} onChange={this.onChangeBackgroundColor}/>
                                   </div>
                                   <div className="form-group">
                                       <label htmlFor="borderColor">Border Color:</label>
                                       <input type="color" className="form-control" name="borderColor" ref={node => {
                                           borderColor = node;
                                       }} placeholder="Border Color" value={this.state.borderColor} onChange={this.onChangeBorderColor}/>
                                   </div>
                                   <div className="form-group">
                                       <label htmlFor="borderRadius">Border Radius:</label>
                                       <input type="number" className="form-control" name="borderRadius" ref={node => {
                                           borderRadius = node;
                                       }} placeholder="Border Radius" min="0" max="50" required defaultValue={this.state.borderRadius} min="0" max="50" required onChange={this.onChangeBorderRadius}/>
                                   </div>
                                   <div className="form-group">
                                       <label htmlFor="borderWidth">Border Width:</label>
                                       <input type="number" className="form-control" name="borderWidth" ref={node => {
                                           borderWidth = node;
                                       }} placeholder="Border Width" min="0" max="50" required defaultValue={this.state.borderWidth} min="0" max="50" required onChange={this.onChangeBorderWidth}/>
                                   </div>
                                   <div className="form-group">
                                       <label htmlFor="padding">Padding:</label>
                                       <input type="number" className="form-control" name="padding" ref={node => {
                                           padding = node;
                                       }} placeholder="Padding" min="1" max="50" defaultValue={this.state.padding}onChange={this.onChangePadding}required/>
                                   </div>
                                   <div className="form-group">
                                       <label htmlFor="margin">Margin:</label>
                                       <input type="number" className="form-control" name="margin" ref={node => {
                                           margin = node;
                                       }} placeholder="Margin" min="1" max="50" defaultValue={this.state.margin}required onChange={this.onChangeMargin}/>
                                   </div>
                                   <div className="form-group">
                                       <label htmlFor="logoWidth">Logo Width:</label>
                                       <input type="number" className="form-control" name="logoWidth" ref={node => {
                                           logoWidth = node;
                                       }} placeholder="Logo Width" min="1" max="100" defaultValue={this.state.logoWidth}required onChange={this.onChangeLogoWidth}/>
                                   </div>
                                   <div className="form-group">
                                       <label htmlFor="logoHeight">Logo Height:</label>
                                       <input type="number" className="form-control" name="logoHeight" ref={node => {
                                           logoHeight = node;
                                       }} placeholder="Logo Height" min="1" max="100" defaultValue={this.state.logoHeight}required onChange={this.onChangeLogoHeight}/>
                                   </div>
                                   <button type="submit" className="btn btn-success">Submit</button>
                               </form>
                               {loading && <p>Loading...</p>}
                               {error && <p>Error :( Please try again</p>}
                           </div>
                           </div>
                           <div className="col">
                           <TextEditWorkspace
                                                text={this.state.text}
                                                color={this.state.color}
                                                fontSize={this.state.fontSize}
                                                backgroundColor={this.state.backgroundColor}
                                                borderColor={this.state.borderColor}
                                                borderRadius={this.state.borderRadius}
                                                borderWidth={this.state.borderWidth}
                                                padding={this.state.padding}
                                                margin={this.state.margin}
                                                logoWidth={this.state.logoWidth}
                                                logoHeight={this.state.logoHeight}
                                            
                                                />

                           </div>
                       </div>
                       </div>
                   </div>
               )}
           </Mutation>
       );
   }
}
 
export default CreateLogoScreen;
