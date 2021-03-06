import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
 
const GET_LOGOS = gql`
 {
   logos {
     _id
     text
     lastUpdate
   }
 }
`;
 
class HomeScreen extends Component {
 
   render() {
       return (
           <Query pollInterval={500} query={GET_LOGOS}>
               {({ loading, error, data }) => {
                   if (loading) return 'Loading...';
                   if (error) return `Error! ${error.message}`;
                    let sorted = data.logos.sort((a,b) => Date.parse(b.lastUpdate) - Date.parse(a.lastUpdate));
                   return (
                       <div className="container row">
                           <div className="col s4">
                               <h3>Recent Work</h3>
                               

                               {sorted.map((logo, index) => (
                                   <div key={index} className='home_logo_link'
                                       style={{ cursor: "pointer" }}>
                                       <Link to={`/edit/${logo._id}`}>{logo.text}</Link>
                                   </div>
                               ))}
                           </div>
                           <div className="col s8">
                               <div id="home_banner_container">
                                   @todo<br />
                                   List Maker
                               </div>
                               <div>
                                   <Link id="add_logo_button" class="btn btn-primary" to="/create">
                                       Add Logo
                                   </Link>
                                  
                                  
                               </div>
                           </div>
                       </div>
                   );
               }
               }
           </Query >
       );
   }
}
 
export default HomeScreen;
