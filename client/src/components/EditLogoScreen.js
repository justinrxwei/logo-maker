import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import TextEditWorkspace from './TextEditWorkspace';
 
const GET_LOGO = gql`
   query logo($logoId: String) {
       logo(id: $logoId) {
           _id
           text
           color
           fontSize
           backgroundColor
           borderColor
           borderRadius
           borderWidth
           padding
           margin
       }
   }
`;
 
const UPDATE_LOGO = gql`
   mutation updateLogo(
       $id: String!,
       $text: String!,
       $color: String!,
       $fontSize: Int!,
       $backgroundColor: String!,
       $borderColor: String!,
       $borderRadius: Int!,
       $borderWidth: Int!,
       $padding: Int!,
       $margin: Int!) {
           updateLogo(
               id: $id,
               text: $text,
               color: $color,
               fontSize: $fontSize,
               backgroundColor: $backgroundColor,
               borderColor: $borderColor,
               borderRadius: $borderRadius,
               borderWidth: $borderWidth,
               padding: $padding,
               margin: $margin) {
                   lastUpdate
               }
       }
`;
 
class EditLogoScreen extends Component {
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
    initLogoProperties = (logo) => {
        console.log("initLogoProperties")
        this.setState({
            text: logo.text,
            color: logo.color,
            fontSize: logo.fontSize,
            backgroundColor: logo.backgroundColor,
            borderColor: logo.borderColor,
            borderRadius: logo.borderRadius,
            borderWidth: logo.borderWidth,
            padding: logo.padding,
            margin: logo.margin
        })
    }

    render() {
       let text, color, fontSize, backgroundColor, borderColor, borderRadius, borderWidth, padding, margin;
       return (
           <Query query={GET_LOGO} variables={{ logoId: this.props.match.params.id }}>
               {({ loading, error, data }) => {
                   if (loading) return 'Loading...';
                   if (error) return `Error! ${error.message}`;
                   if (!this.logoInit) {
                       this.initLogoProperties(data.logo);
                       this.logoInit = true;
                   }
                   return (
                       <Mutation mutation={UPDATE_LOGO} key={data.logo._id} onCompleted={() => this.props.history.push(`/`)}>
                           {(updateLogo, { loading, error }) => (
                               <div className="container">
                                   <div className="panel panel-default">
                                       <div className="panel-heading">
                                           <h4><Link to="/">Home</Link></h4>
                                           <h3 className="panel-title">
                                               Edit Logo
                                       </h3>
                                       </div>
                                       <div className="row">
                                        <div className="cols2">
                                       <div className="panel-body">                                                                                   
                                               <form onSubmit={e => {
                                                   e.preventDefault();
                                                   updateLogo({ variables: { id: data.logo._id, text: text.value, color: color.value, fontSize: parseInt(fontSize.value)
                                                   , backgroundColor: backgroundColor.value, borderColor: borderColor.value, borderRadius: parseInt(borderRadius.value)
                                                   , borderWidth: parseInt(borderWidth.value), padding: parseInt(padding.value), margin: parseInt(margin.value) } });
                                                   text.value = "";
                                                   color.value = "";
                                                   fontSize.value = "";
                                                   backgroundColor.value = "";
                                                   borderColor.value = "";
                                                   borderRadius.value = "";
                                                   borderWidth.value = "";
                                                   padding.value = "";
                                                   margin.value = "";
                                               }}>
                                                   <div className="form-group">
                                                       <label htmlFor="text">Text:</label>
                                                       <input type="text" className="form-control" name="text" ref={node => {
                                                           text = node;
                                                       }} placeholder="Text" defaultValue={data.logo.text} onChange={this.onChangeText} required pattern=".*\S+.*" title="You cannot put all whitespace"/>
                                                   </div>
                                                   <div className="form-group">
                                                       <label htmlFor="color">Color:</label>
                                                       <input type="color" className="form-control" name="color" ref={node => {
                                                           color = node;
                                                       }} placeholder="Color" defaultValue={data.logo.color} onChange={this.onChangeColor}/>
                                                   </div>
                                                   <div className="form-group">
                                                       <label htmlFor="fontSize">Font Size:</label>
                                                       <input type="number" id="fontSlider" className="form-control" name="fontSize" ref={node => {
                                                           fontSize = node;
                                                       }} placeholder="Font Size" defaultValue={data.logo.fontSize} min="2" max="144" required onChange={this.onChangeFontSize}/>
                                                   </div>
                                                   <div className="form-group">
                                                       <label htmlFor="backgroundColor">Background Color:</label>
                                                       <input type="color" className="form-control" name="backgroundColor" ref={node => {
                                                           backgroundColor = node;
                                                       }} placeholder="Background Color" defaultValue={data.logo.backgroundColor} onChange={this.onChangeBackgroundColor} />
                                                   </div>
                                                   <div className="form-group">
                                                       <label htmlFor="borderColor">Border Color:</label>
                                                       <input type="color" className="form-control" name="borderColor" ref={node => {
                                                           borderColor = node;
                                                       }} placeholder="Border Color" defaultValue={data.logo.borderColor} onChange={this.onChangeBorderColor}/>
                                                   </div>
                                                   <div className="form-group">
                                                       <label htmlFor="borderRadius">Border Radius:</label>
                                                       <input type="number" className="form-control" name="borderRadius" ref={node => {
                                                           borderRadius = node;
                                                       }} placeholder="Border Radius" defaultValue={data.logo.borderRadius} min="0" max="50" required onChange={this.onChangeBorderRadius}/>
                                                   </div>
                                                   <div className="form-group">
                                                       <label htmlFor="borderWidth">Border Width:</label>
                                                       <input type="number" className="form-control" name="borderWidth" ref={node => {
                                                           borderWidth = node;
                                                       }} placeholder="Border Width" defaultValue={data.logo.borderWidth} min="0" max="50" required onChange={this.onChangeBorderWidth}/>
                                                   </div>
                                                   <div className="form-group">
                                                       <label htmlFor="padding">Padding:</label>
                                                       <input type="number" className="form-control" name="padding" ref={node => {
                                                           padding = node;
                                                       }} placeholder="Padding" defaultValue={data.logo.padding} min="1" max="50" required onChange={this.onChangePadding}/>
                                                   </div>
                                                   <div className="form-group">
                                                       <label htmlFor="margin">Margin:</label>
                                                       <input type="number" className="form-control" name="margin" ref={node => {
                                                           margin = node;
                                                       }} placeholder="Margin" defaultValue={data.logo.margin} min="1" max="50" required onChange={this.onChangeMargin}/>
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
                                            
                                                />
                                           </div>
                                        </div>
                                      
 
                                   </div>
                               </div>
                           )}
                       </Mutation>
                   );
               }}
           </Query>
       );
   }
}
 
export default EditLogoScreen;
