var GraphQLSchema = require('graphql').GraphQLSchema;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require('graphql').GraphQLList;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLInt = require('graphql').GraphQLInt;
var GraphQLDate = require('graphql-date');
var LogoModel = require('../models/Logo');

// var textType = new GraphQLObjectType({
//     name: 'textObject',
//     fields: function() {
//         return {
//             text: {
//                 GraphQLString
//             },
//             color: {
//                 type: GraphQLString
//             }, 
//             fontSize: {
//                 type: GraphQLInt
//             },
//             x: {
//                 type: GraphQLInt
//             },
//             y: {
//                 type: GraphQLInt
//             }
//         }
//     }
// });
// var imageType = new GraphQLObjectType({
//     name: 'imageObject',
//     fields: function() {
//         return {
//             url: {
//                 GraphQLString
//             },
//             scaling: {
//                 type: GraphQLInt
//             }, 
//             x: {
//                 type: GraphQLInt
//             },
//             y: {
//                 type: GraphQLInt
//             }
//         }
//     }
// });
var logoType = new GraphQLObjectType({
    name: 'logo',
    fields: function () {
        return {
            _id: {
                type: GraphQLString
            },
            text: {
                type: GraphQLString
            },
            color: {
                type: GraphQLString
            },
            fontSize: {
                type: GraphQLInt
            },
            backgroundColor: {
                type: GraphQLString
            },
            borderColor: {
                type: GraphQLString
            },
            borderRadius: {
                type: GraphQLInt
            },
            borderWidth: {
                type: GraphQLInt
            },
            padding: {
                type: GraphQLInt
            },
            margin: {
                type: GraphQLInt
            },
            logoWidth: {
                type: GraphQLInt
            },
            logoHeight: {
                type: GraphQLInt
            },
            textObjectList: {
                type: GraphQLList(GraphQLList(GraphQLString))
            },
            imageObjectList: {
                type: GraphQLList(GraphQLList(GraphQLString))
            },
            lastUpdate: {
                type: GraphQLDate
            }
        }
    }
});

var queryType = new GraphQLObjectType({
    name: 'Query',
    fields: function () {
        return {
            logos: {
                type: new GraphQLList(logoType),
                resolve: function () {
                    const logos = LogoModel.find().exec()
                    if (!logos) {
                        throw new Error('Error')
                    }
                    return logos
                }
            },
            logo: {
                type: logoType,
                args: {
                    id: {
                        name: '_id',
                        type: GraphQLString
                    }
                },
                resolve: function (root, params) {
                    const logoDetails = LogoModel.findById(params.id).exec()
                    if (!logoDetails) {
                        throw new Error('Error')
                    }
                    return logoDetails
                }
            }
        }
    }
});

var mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: function () {
        return {
            addLogo: {
                type: logoType,
                args: {
                    text: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    color: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    fontSize: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    backgroundColor: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    borderColor: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    borderRadius: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    borderWidth: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    padding: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    margin: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    logoWidth: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    logoHeight: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    textObjectList: {
                        type: new GraphQLList(GraphQLList(GraphQLString))
                    },
                    imageObjectList: {
                        type: new GraphQLList(GraphQLList(GraphQLString))
                    },
                    
                },
                resolve: function (root, params) {
                    const logoModel = new LogoModel(params);
                    const newLogo = logoModel.save();
                    if (!newLogo) {
                        throw new Error('Error');
                    }
                    return newLogo
                }
            },
            updateLogo: {
                type: logoType,
                args: {
                    id: {
                        name: 'id',
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    text: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    color: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    fontSize: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    backgroundColor: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    borderColor: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    borderRadius: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    borderWidth: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    padding: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    margin: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    logoWidth: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    logoHeight: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    textObjectList: {
                        type: new GraphQLList(GraphQLList(GraphQLString))
                    },
                    imageObjectList: {
                        type: new GraphQLList(GraphQLList(GraphQLString))
                    },
                },
                resolve(root, params) {
                    return LogoModel.findByIdAndUpdate(params.id, { text: params.text, color: params.color, fontSize: params.fontSize, backgroundColor: params.backgroundColor, borderColor: params.borderColor, borderRadius: params.borderRadius, borderWidth: params.borderWidth, padding: params.padding, margin: params.margin, logoWidth: params.logoWidth, logoHeight: params.logoHeight, textObjectList: params.textObjectList, imageObjectList: params.imageObjectList, lastUpdate: new Date() }, function (err) {
                        if (err) return next(err);
                    });
                }
            },
            removeLogo: {
                type: logoType,
                args: {
                    id: {
                        type: new GraphQLNonNull(GraphQLString)
                    }
                },
                resolve(root, params) {
                    const remLogo = LogoModel.findByIdAndRemove(params.id).exec();
                    if (!remLogo) {
                        throw new Error('Error')
                    }
                    return remLogo;
                }
            }
        }
    }
});

module.exports = new GraphQLSchema({ query: queryType, mutation: mutation });