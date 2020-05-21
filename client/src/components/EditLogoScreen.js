import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import TextEditWorkspace from './TextEditWorkspace';
import Draggable from 'react-draggable'; // Both at the same time
import domtoimage from 'dom-to-image';

 
const GET_LOGO = gql`
   query logo($logoId: String) {
       logo(id: $logoId) {
           _id
           text
           backgroundColor
           borderColor
           borderRadius
           borderWidth
           padding
           margin
           logoWidth
           logoHeight
           objectList
       }
   }
`;
 
const UPDATE_LOGO = gql`
   mutation updateLogo(
       $id: String!,
       $text: String!,
       $backgroundColor: String!,
       $borderColor: String!,
       $borderRadius: Int!,
       $borderWidth: Int!,
       $padding: Int!,
       $margin: Int!,
       $logoWidth: Int!,
       $logoHeight: Int!,
       $objectList: [[String]]!,) {
           updateLogo(
               id: $id,
               text: $text,
               backgroundColor: $backgroundColor,
               borderColor: $borderColor,
               borderRadius: $borderRadius,
               borderWidth: $borderWidth,
               padding: $padding,
               margin: $margin,
               logoWidth: $logoWidth,
               logoHeight: $logoHeight,
               objectList: $objectList,) {
                   lastUpdate
               }
       }
`;
 
const DELETE_LOGO = gql`
  mutation removeLogo($id: String!) {
    removeLogo(id:$id) {
      _id
    }
  }
`;
class EditLogoScreen extends Component {
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
            objectList: [],
        }
        this.refs = React.createRef();
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
    handleStopText = (e, ui, item, index) => { //passes in event and current text array as item
        let objectListCopy = JSON.parse(JSON.stringify(this.state.objectList));
        objectListCopy[index][0] = ui.x +"";
        objectListCopy[index][1] = ui.y + "";
        
        console.log(ui)
        this.setState({objectList: objectListCopy})
        //return false;
    }
    handleStopImage = (e, ui, item, index) => { //passes in event and current text array as item
        let objectListCopy = JSON.parse(JSON.stringify(this.state.objectList));
        objectListCopy[index][0] = ui.x + "";
        objectListCopy[index][1] = ui.y + "";
        console.log(e)
        this.setState({objectList: objectListCopy})
        //return false;
    }
    handleScaling = (e, index) => {
        let objectListCopy = JSON.parse(JSON.stringify(this.state.objectList));
        objectListCopy[index][3] = e.target.value;
        this.setState({objectList: objectListCopy})
    }
    handleURL = (e, index) => {
        let objectListCopy = JSON.parse(JSON.stringify(this.state.objectList));
        objectListCopy[index][2] = e.target.value;
        this.setState({objectList: objectListCopy})
    }  
    handleFont = (e, index) => {
        let objectListCopy = JSON.parse(JSON.stringify(this.state.objectList));
        objectListCopy[index][3] = e.target.value;
        this.setState({objectList: objectListCopy})
    }
    handleText = (e, index) => {
        let objectListCopy = JSON.parse(JSON.stringify(this.state.objectList));
        objectListCopy[index][2] = e.target.value;
        this.setState({objectList: objectListCopy})
    }
    handleColor = (e, index) => {
        let objectListCopy = JSON.parse(JSON.stringify(this.state.objectList));
        objectListCopy[index][4] = e.target.value;
        this.setState({objectList: objectListCopy})
    }
    createText() {
        let objectListCopy = JSON.parse(JSON.stringify(this.state.objectList));
        const x = "0";
        const y = "0";
        const text = "Sample Text";
        const fontSize = "15";
        const color = "#ff0000";
        objectListCopy.push([x, y, text, fontSize, color, "text"])
        console.log(objectListCopy)
        this.setState({objectList: objectListCopy})
    }
    createImage() {
        let objectListCopy = JSON.parse(JSON.stringify(this.state.objectList));
        const x = "0";
        const y = "0";
        const URL = "https://i.insider.com/5df126b679d7570ad2044f3e?width=2500&format=jpeg&auto=webp";
        const scaling = "200";
        objectListCopy.push([x, y, URL, scaling,'',''])
        console.log(objectListCopy)
        this.setState({objectList: objectListCopy})
    }
    exportImage() {
        var logoObject = document.getElementById('LogoCanvas');
        domtoimage.toJpeg(logoObject, { quality: 1.00 })
            .then(function (dataUrl) {
                var link = document.createElement('a');
                link.download = 'Logo.jpeg';
                link.href = dataUrl;
                link.click();
        });
    }
    moveBackwards(item,index) {
        let objectListCopy = JSON.parse(JSON.stringify(this.state.objectList));
        if (index != 0) {
            let temp = objectListCopy[index];
            objectListCopy[index] = objectListCopy[index-1];
            objectListCopy[index-1] = temp;
            this.setState({objectList: objectListCopy})
        }

    }
    moveForwards(item,index) {
        let objectListCopy = JSON.parse(JSON.stringify(this.state.objectList));
        if (index != objectListCopy.length - 1) {
            let temp = objectListCopy[index];
            objectListCopy[index] = objectListCopy[index+1];
            objectListCopy[index+1] = temp;
            this.setState({objectList: objectListCopy})
        }

    }
    deleteObject(item,index) {
        let objectListCopy = JSON.parse(JSON.stringify(this.state.objectList));
        objectListCopy.splice(index,1);
        this.setState({objectList: objectListCopy})
    }
    initLogoProperties = (logo) => {
        console.log("initLogoProperties")
        this.setState({
            text: logo.text,
            backgroundColor: logo.backgroundColor,
            borderColor: logo.borderColor,
            borderRadius: logo.borderRadius,
            borderWidth: logo.borderWidth,
            padding: logo.padding,
            margin: logo.margin,
            logoWidth: logo.logoWidth,
            logoHeight: logo.logoHeight,
            objectList: logo.objectList,
        })
    }

    render() {
        let text, backgroundColor, borderColor, borderRadius, borderWidth, padding, margin, logoWidth, logoHeight;
        let objectList=this.state.objectList

        return (
           <Query query={GET_LOGO} variables={{ logoId: this.props.match.params.id }} fetchPolicy="no-cache">
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
                                        <div className="cols2" style={{paddingRight: "15px"}}>
                                       <div className="panel-body" style={{overflowY:"scroll", height:"80vh", background: "#ffffe6", padding: "10px", borderRadius: "5px"}}>                                                                                   
                                               <form onSubmit={e => {
                                                   e.preventDefault();
                                                   updateLogo({ variables: { id: data.logo._id, text: text.value
                                                   , backgroundColor: backgroundColor.value, borderColor: borderColor.value, borderRadius: parseInt(borderRadius.value)
                                                   , borderWidth: parseInt(borderWidth.value), padding: parseInt(padding.value), margin: parseInt(margin.value)
                                                   , logoWidth: parseInt(logoWidth.value), logoHeight: parseInt(logoHeight.value), objectList: objectList
                                                   } });
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
                                                       }} placeholder="Text" defaultValue={data.logo.text} onChange={this.onChangeText} required pattern=".*\S+.*" title="You cannot put all whitespace"/>
                                                   </div>
                                                   <div className="form-group">
                                                        <label htmlFor="logoWidth">Logo Width:</label>
                                                        <input type="number" className="form-control" name="logoWidth" ref={node => {
                                                        logoWidth = node;
                                                        }} placeholder="Logo Width" min="50" max="1000" defaultValue={data.logo.logoWidth}required onChange={this.onChangeLogoWidth}/>
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="logoHeight">Logo Height:</label>
                                                        <input type="number" className="form-control" name="logoHeight" ref={node => {
                                                        logoHeight = node;
                                                        }} placeholder="Logo Height" min="50" max="1000" defaultValue={data.logo.logoHeight}required onChange={this.onChangeLogoHeight}/>
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
                                                       }} placeholder="Padding" defaultValue={data.logo.padding} min="0" max="50" required onChange={this.onChangePadding}/>
                                                   </div>
                                                   <div className="form-group">
                                                       <label htmlFor="margin">Margin:</label>
                                                       <input type="number" className="form-control" name="margin" ref={node => {
                                                           margin = node;
                                                       }} placeholder="Margin" defaultValue={data.logo.margin} min="0" max="50" required onChange={this.onChangeMargin}/>
                                                   </div>

                                                   {this.state.objectList.map((item, index) => {
                                                            if (objectList[index][5] == "text")
                                                                return (
                                                                    <div style={{background: "#feebb4", padding: "10px", borderRadius: "10px", marginTop: "8px"}}>
                                                                    <div key={index+"text"}className="form-group">
                                                                    <label htmlFor={index+"text"}>{"Text #" + (index+1) + " Text Input:"}</label>
                                                                    <input type="text" className="form-control" name={index+"text"}  placeholder="Text" value={item[2]} onChange={(e) => this.handleText(e, index)}required pattern=".*\S+.*" title="You cannot put all whitespace" />
                                                                    </div>
                                                                    
                                                                    <div key={index+"font"} className="form-group">
                                                                    <label htmlFor={index}>{"Text #" + (index+1) + " Font Size:"}:</label>
                                                                    <input type="number" className="form-control" name={index+"font"}  placeholder="Font Size" min="1" max="150" value={item[3]}required onChange={(e) => this.handleFont(e, index)}/>
                                                                    </div>
                                                                    
                                                                    <div key={index+"color"} className="form-group">
                                                                    <label htmlFor={index+"color"}>{"Text #" + (index+1) + " Text Color:"}</label>
                                                                    <input type="color" className="form-control" name={index+"text"}  placeholder="Color" value={item[4]} onChange={(e) => this.handleColor(e, index)}/>
                                                                    </div>
                                                                    <div>
                                                                    <button type="button" style={{margin:5}} className="btn btn-primary" onClick={() => this.moveForwards(item,index)}>Move Forwards</button>
                                                                    <button type="button" style={{margin:5}} className="btn btn-primary" onClick={() => this.moveBackwards(item,index)}>Move Backwards</button>
                                                                    </div>
                                                                    <button type="button" style={{margin:5}} className="btn btn-danger" onClick={() => this.deleteObject(item,index)}>Delete Text</button>

                                                                    </div>
                                                                )
                                                            else
                                                                return (
                                                                    <div style={{background: "#e7fefd", padding: "10px", borderRadius: "10px", marginTop: "8px"}}>
                                                                    <div key={index+"image"}className="form-group">
                                                                    <label htmlFor={index+"image"}>{"Set Image URL:"}</label>
                                                                    <input type="text" className="form-control" name={index+"url"}  placeholder="URL" value={item[2]} onChange={(e) => this.handleURL(e, index)}required pattern=".*\S+.*" title="You cannot put all whitespace" />
                                                                    </div>
                                                                    
                                                                    <div key={index+"scaling"} className="form-group">
                                                                    <label htmlFor={index+"scaling"}>{"Set Image Size:"}:</label>
                                                                    <input type="number" className="form-control" name={index+"font"}  placeholder="Scaling" min="50" max="1000" value={item[3]}required onChange={(e) => this.handleScaling(e, index)}/>
                                                                    </div>
                                                                    <div>
                                                                    <button type="button" style={{margin:5}} className="btn btn-primary" onClick={() => this.moveForwards(item,index)}>Move Forwards</button>
                                                                    <button type="button" style={{margin:5}} className="btn btn-primary" onClick={() => this.moveBackwards(item,index)}>Move Backwards</button>
                                                                    </div>

                                                                    <button type="button" style={{margin:5}} className="btn btn-danger" onClick={() => this.deleteObject(item,index)}>Delete Image</button>

                                                                    </div>
                                                                    
                                                                )
                                                    })}
                                                    <button type="button" style={{margin:5}} className="btn btn-primary" onClick={this.createText.bind(this)}>Create New Text </button>
                                                    <button type="button" style={{margin:5}} className="btn btn-primary" onClick={this.createImage.bind(this)}>Create New Image</button>
                                                    <div>
                                                    <button type="button" style={{margin:5}} className="btn btn-primary" onClick={this.exportImage.bind(this)}>    Export Logo    </button>

                                                    <button type="submit" style={{margin:5}} className="btn btn-success">    Submit Logo    </button>    
                                                    </div>
                                                    <Mutation mutation={DELETE_LOGO} key={data.logo._id} onCompleted={() => this.props.history.push('/')}>
                                                        {(removeLogo, { loading, error }) => (
                                                            <div>
                                                                <form
                                                                    onSubmit={e => {
                                                                        e.preventDefault();
                                                                        removeLogo({ variables: { id: data.logo._id } });
                                                                    }}>                                                                   
                                                                <button type="submit" style={{margin:5}} className="btn btn-danger">Delete Logo</button>
                                                                </form>
                                                                {loading && <p>Loading...</p>}
                                                                {error && <p>Error :( Please try again</p>}
                                                            </div>
                                                        )}
                                                    </Mutation>
                                                
                                               </form>
                                               {loading && <p>Loading...</p>}
                                               {error && <p>Error :( Please try again</p>}
                                            

                                            
 
                                           </div>
                                           </div>
                                           <div className="col" style={{paddingLeft: 0}} >
                                                <div id="LogoCanvas" style={{
                                                    width: parseInt(this.state.logoWidth) + parseInt(this.state.margin)*2 + parseInt(this.state.padding)*2 + + parseInt(this.state.borderWidth)*2 +"px",
                                                    height: parseInt(this.state.logoHeight) + parseInt(this.state.margin)*2 + parseInt(this.state.padding)*2 + + parseInt(this.state.borderWidth)*2 +"px" ,
                                                    
                                                }} > 
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
                                                    boxSizing: "content-box",
                                                    position: "relative"
                                                    }}>
                                                {this.state.objectList.map((item, index) => {
                                                    if (objectList[index][5] == "text")
                                                        return (
                                                            <Draggable bounds="parent" position={{x: parseInt(item[0]), y: parseInt(item[1])}} key={index} onStop={(e, ui) => this.handleStopText(e, ui, item, index)}>
                                                                <div style={{position: "absolute"}}>
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
                                                    else
                                                    return (
                                                        <Draggable bounds="parent" position={{x: parseInt(item[0]), y: parseInt(item[1])}} key={index} onStop={(e, ui) => this.handleStopImage(e, ui, item, index)}>
                                                            <div style={{position: "absolute"}}>
                                                                <img src={item[2]}  width={item[3]} draggable="false"                                                                                                                  
                                                                    />
                                                            </div>
                                                        </Draggable>
                                                    )
                                                    })}
 
                                                </div>                                
                                           </div>
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
