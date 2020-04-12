Example Queries

Query All Logos:
query {
  logos {
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
    lastUpdate
  }
}


Query a Logo:
query {
  logo(id: "5e923592031b6c393ae4a8c7") {
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
    lastUpdate
  }
}



Add a Logo:
mutation {
  addLogo (
    text:"hellothere",
    color:"#ff0000",
    fontSize:30,
    borderColor:"#ffffff",
    backgroundColor:"#000000"
    borderRadius:1,
    borderWidth:1,
    padding:1,
    margin:1
    ) {
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
    lastUpdate
  } 
}



Update a Logo:
mutation {
  updateLogo (
    id: "5e9013f1f151842b53d80b70",
    text:"testing",
    color:"#fffa00",
    fontSize:10,
    borderColor:"#ff19ff",
    backgroundColor:"#ff0000"
    borderRadius:10,
    borderWidth:10,
    padding:10,
    margin:10
    ) {
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
    lastUpdate
  }
}


Delete a Logo:
mutation {
  removeLogo (
    id:"5e92385a031b6c393ae4a8c9"
  ) {
    lastUpdate
  }
}