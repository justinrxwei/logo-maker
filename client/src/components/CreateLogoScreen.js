import React, { Component } from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { Link } from 'react-router-dom';
import TextEditWorkspace from './TextEditWorkspace';
import Draggable from 'react-draggable'; // Both at the same time



const ADD_LOGO = gql`
   mutation AddLogo(
       $text: String!,
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
            backgroundColor : '',
            borderColor: '',
            borderRadius : '',
            borderWidth: '',
            padding : '',
            margin : '',
            logoWidth: '',
            logoHeight: '',
            textObjectList: [],
            imageObjectList: [],
        }
    }
    onChangeText= (event) => {
        this.setState({
            text: event.target.value
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
    handleStop = (e, ui, item, index) => { //passes in event and current text array as item
        let textObjectListCopy = JSON.parse(JSON.stringify(this.state.textObjectList));
        //textObjectListCopy[index][0] = e.pageX - e.target.offsetLeft + "px";
        //textObjectListCopy[index][1] = e.pageY - e.target.offsetTop + "px";
        textObjectListCopy[index][0] = ui.x + "";
        textObjectListCopy[index][1] = ui.y + "";
        console.log(e)
        this.setState({textObjectList: textObjectListCopy})
        //return false;
    }
    handleFont = (e, index) => {
        let textObjectListCopy = JSON.parse(JSON.stringify(this.state.textObjectList));
        textObjectListCopy[index][3] = e.target.value;
        this.setState({textObjectList: textObjectListCopy})
    }
    handleText = (e, index) => {
        let textObjectListCopy = JSON.parse(JSON.stringify(this.state.textObjectList));
        textObjectListCopy[index][2] = e.target.value;
        this.setState({textObjectList: textObjectListCopy})
    }
    handleColor = (e, index) => {
        let textObjectListCopy = JSON.parse(JSON.stringify(this.state.textObjectList));
        textObjectListCopy[index][4] = e.target.value;
        this.setState({textObjectList: textObjectListCopy})
    }
    createText() {
        let textObjectListCopy = JSON.parse(JSON.stringify(this.state.textObjectList));
        const x = "0";
        const y = "0";
        const text = "Sample Text";
        const fontSize = "15";
        const color = "#ff0000";
        textObjectListCopy.push([x, y, text, fontSize, color])
        console.log(textObjectListCopy)
        this.setState({textObjectList: textObjectListCopy})
    }
      
    initLogoProperties = () => {
        console.log("initLogoProperties");
        this.setState({
            text: "Logo Name",
            backgroundColor: "#ffffff",
            borderColor: "#ff0000",
            borderRadius: "5",
            borderWidth: "5",
            padding: "1",
            margin: "1",
            logoWidth: "200",
            logoHeight:"150",
            textObjectList: [],
            imageObjectList: []
        })
    }
   render() {
       let text, backgroundColor, borderColor, borderRadius, borderWidth, padding, margin, logoWidth, logoHeight;
       let textObjectList=this.state.textObjectList, imageObjectList;
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
                            <div className="cols2"  style={{paddingRight: "15px"}}>
                           <div className="panel-body">
                               <form onSubmit={e => {
                                   e.preventDefault();
                                   addLogo({ variables: { text: text.value
                                   , backgroundColor: backgroundColor.value, borderColor: borderColor.value, borderRadius: parseInt(borderRadius.value)
                                   , borderWidth: parseInt(borderWidth.value), padding: parseInt(padding.value), margin: parseInt(margin.value)
                                   , logoWidth: parseInt(logoWidth.value), logoHeight: parseInt(logoHeight.value), textObjectList: textObjectList
                                   , imageObjectList: ['test'] } });
                                   text.value = "";
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
                                       <label htmlFor="text">Logo Name:</label>
                                       <input type="text" className="form-control" name="text" ref={node => {
                                           text = node;
                                       }} placeholder="Logo Name" defaultValue={this.state.text} onChange={this.onChangeText}required pattern=".*\S+.*" title="You cannot put all whitespace" />
                                   </div>
                                   <div className="form-group">
                                       <label htmlFor="logoWidth">Logo Width:</label>
                                       <input type="number" className="form-control" name="logoWidth" ref={node => {
                                           logoWidth = node;
                                       }} placeholder="Logo Width" min="50" max="600" defaultValue={this.state.logoWidth}required onChange={this.onChangeLogoWidth}/>
                                   </div>
                                   <div className="form-group">
                                       <label htmlFor="logoHeight">Logo Height:</label>
                                       <input type="number" className="form-control" name="logoHeight" ref={node => {
                                           logoHeight = node;
                                       }} placeholder="Logo Height" min="50" max="600" defaultValue={this.state.logoHeight}required onChange={this.onChangeLogoHeight}/>
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
                                       }} placeholder="Padding" min="0" max="50" defaultValue={this.state.padding}onChange={this.onChangePadding}required/>
                                   </div>
                                   <div className="form-group">
                                       <label htmlFor="margin">Margin:</label>
                                       <input type="number" className="form-control" name="margin" ref={node => {
                                           margin = node;
                                       }} placeholder="Margin" min="0" max="50" defaultValue={this.state.margin}required onChange={this.onChangeMargin}/>
                                   </div>

                                   
                                   {this.state.textObjectList.map((item, index) => {
                                        return (
                                            <div key={index}>
                                            <div key={index+"text"}className="form-group">
                                            <label htmlFor={index+"text"}>{"Text for " + index + " at " + item}</label>
                                            <input type="text" className="form-control" name={index+"text"}  placeholder="Text" defaultValue={item[2]} onChange={(e) => this.handleText(e, index)}required pattern=".*\S+.*" title="You cannot put all whitespace" />
                                            </div>
                                            
                                            <div key={index+"font"} className="form-group">
                                            <label htmlFor={index}>{"Font for " + index + " at " + item}:</label>
                                            <input type="number" className="form-control" name={index+"font"}  placeholder="Font Size" min="1" max="100" defaultValue={item[3]}required onChange={(e) => this.handleFont(e, index)}/>
                                            </div>
                                            
                                            <div key={index+"color"} className="form-group">
                                            <label htmlFor={index+"color"}>{"Text color for " + index + " at " + item}</label>
                                            <input type="color" className="form-control" name={index+"text"}  placeholder="Color" value={item[4]} onChange={(e) => this.handleColor(e, index)}/>
                                            </div>
                                            </div>
                                        )
                                   })}


                                   <button type="button" onClick={this.createText.bind(this)}>Create New Text</button>
                                   
                                   <button type="submit" className="btn btn-success">Submit</button>
                               </form>
                               {loading && <p>Loading...</p>}
                               {error && <p>Error :( Please try again</p>}
                           </div>
                           </div>
                           <div className="col" style={{paddingLeft: 0}}>
                                <div style={{
                                    backgroundColor: this.state.backgroundColor,
                                    width: this.state.logoWidth + "px",
                                    height: this.state.logoHeight + "px", 
                                    padding: this.state.padding + "px", 
                                    margin: this.state.margin + "px",
                                    border: "solid",
                                    borderColor: this.state.borderColor,
                                    borderWidth: this.state.borderWidth + "px",
                                    borderRadius: this.state.borderRadius + "px",
                                    }}>
                                
                                    {this.state.textObjectList.map((item, index) => {
                                        return (
                                            // <div className="box" key={index}> 
                                            //     <div>
                                            //         <h2>{item[0]}</h2> //prints out what's in index 0 & 1 of each list
                                            //         <p>{item[1]}</p>
                                            //     </div>
                                            // </div>

                                                <Draggable bounds="parent" position={{x: parseInt(item[0]), y: parseInt(item[1])}} key={index} onStop={(e, ui) => this.handleStop(e, ui, item, index)}>
                                                    <div style="z-index: -2;" style={{position: "absolute"}}>
                                                        <TextEditWorkspace
                                                                text={item[2]}
                                                                color={item[4]}
                                                                fontSize={item[3]}
                                                                //backgroundColor={this.state.backgroundColor}
                                                                //borderColor={this.state.borderColor}
                                                                //borderRadius={this.state.borderRadius}
                                                                borderWidth="0"
                                                                //padding={this.state.padding}
                                                                //margin={this.state.margin}
                                                                //logoWidth={this.state.logoWidth}
                                                                //logoHeight={this.state.logoHeight}
                                                                        
                                                            />
                                                    </div>
                                                </Draggable>
                                        )
                                        })}
                                
                                   </div>                                

                                {/* <Draggable onDrag={this.handleDrag}>
                                <div style={{position: 'absolute', bottom: (textObjectList)[1][0], right: (textObjectList)[0][1]}}>
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
                                        <div>x: {deltaPosition.x.toFixed(0)}, y: {deltaPosition.y.toFixed(0)}</div>
                                </div>
                                </Draggable> */}
                           
                            
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
