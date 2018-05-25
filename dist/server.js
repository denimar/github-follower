!function(e){var t={};function o(r){if(t[r])return t[r].exports;var s=t[r]={i:r,l:!1,exports:{}};return e[r].call(s.exports,s,s.exports,o),s.l=!0,s.exports}o.m=e,o.c=t,o.d=function(e,t,r){o.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:r})},o.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="/",o.w={},o(o.s=15)}([function(e,t){e.exports=require("sequelize")},function(e,t){e.exports=require("body-parser")},function(e,t){e.exports=require("path")},function(e,t){e.exports=require("webpack")},function(e,t){e.exports=require("cors")},function(e,t){e.exports=require("jsonwebtoken")},function(e,t,o){"use strict";o.r(t);var r=o(0),s=o.n(r);var n=class{static connect(e){return new Promise((t,o)=>{console.log(`>> MySQL: Connecting to a local database "${e.database.name}"...`);const r=new s.a(e.database.name,e.database.user,e.database.password,{host:e.database.host,port:e.database.port,dialect:"mysql",operatorsAliases:!1,query:{raw:!0},logging:!1,timezone:e.database.timezone});r.authenticate().then(()=>{console.log(">> Connection has been established successfully."),t(r)}).catch(e=>{console.error(">> Unable to connect to the database:",e),o(e)})})}};var a=class extends r.Model{static init(e){super.init({username:{type:r.DataTypes.STRING(35),allowNull:!1},active:{type:r.DataTypes.BOOLEAN,allowNull:!1,defaultValue:!0}},{modelName:"user",sequelize:e})}},l=(o(10),o(5)),i=o.n(l);class c{constructor(e){this.sequelize=e,a.init(e)}fetchAllUsers(e,t){a.findAll({where:{active:!0}}).then(e=>{t.end(JSON.stringify(e))})}ensureUserExistence(e,t){return new Promise((o,r)=>{try{this.sequelize.models.company.findOne({where:{code:t}}).then(t=>{a.findOne({where:{username:e,companyId:t.id,active:!0}}).then(r=>{r?o(r):this.createNewUser(e,t.id).then(e=>{o(r)})})})}catch(e){console.log("Error checking user existence: "+e)}})}createNewUser(e,t){return new Promise((o,r)=>{try{a.create({username:e,companyId:t}).then(()=>{a.findOne({where:{username:e,companyId:t}}).then(e=>{e?o(e):r()})})}catch(e){console.log("Error creating a new user: "+e),r()}})}static async getAutorizationData(e,t){let o=t.header("authorization"),r=i.a.decode(o,{complete:!0}).payload;return r.userId=await c.getUserId(e,r.company,r.username),r}static getUserId(e,t,o){return new Promise((r,s)=>{try{a.findOne({attributes:["id"],raw:!0,include:[{model:e.models.company,attributes:[],where:{code:t}}],where:{username:o,active:!0}}).then(e=>{r(e.id)}).catch(e=>{console.log(e),s(e)})}catch(e){console.log(e)}})}}var d=c;const u="/githubfollower/endpoints";var p={ENDPOINT:{CREDENTIAL_AUTHENTICATION:`${u}/credential/authentication`,CREDENTIAL_USER:`${u}/credential/user`,PARAM:`${u}/param`,SELECTED_REPOSITORY:`${u}/repository/selected`,SELECTED_REPOSITORY_ADD:`${u}/repository/selected/add/:repositoryId`,SELECTED_REPOSITORY_REMOVE:`${u}/repository/selected/remove/:repositoryId`,REPOSITORY:`${u}/repository/all`,REPOSITORY_ADD:`${u}/repository/add`,REPOSITORY_REMOVE:`${u}/repository/remove/:repositoryId`,REPOSITORY_UPDATE:`${u}/repository/update`,BRANCH:`${u}/branch/:repositoryId`}},h=o(1),m=o.n(h);m.a.json();var y=class{constructor(e,t){const o=new d(t);e.get(p.ENDPOINT.CREDENTIAL_USER,o.fetchAllUsers)}};var E=class extends r.Model{static init(e){super.init({fullName:{type:r.DataTypes.STRING(80),allowNull:!1}},{modelName:"repository",sequelize:e})}};var g=class extends r.Model{static init(e){super.init({},{modelName:"user_selected_repository",sequelize:e}),this.belongsTo(e.models.repository,{onDelete:"CASCADE",foreignKey:{allowNull:!1}}),this.belongsTo(e.models.user,{onDelete:"CASCADE",foreignKey:{allowNull:!1}})}};var f=class{constructor(e){this.sequelize=e,E.init(e),g.init(e)}fetchAll(e,t){try{E.findAll().then(e=>{t.end(JSON.stringify(e))})}catch(e){console.log(e)}}remove(e,t){let o=e.params.repositoryId;E.destroy({where:{id:o}}).then(e=>{t.end("true")}).catch(e=>{t.status(500).send("Error removing repository : "+e)})}addItem(e,t){let o=e.body;E.create({fullName:o.login+"/"+o.name}).then(e=>{t.end(JSON.stringify(e))}).catch(e=>{t.status(500).send("Error adding repository : "+e)})}updateItem(e,t){let o=e.body;E.update({fullName:o.login+"/"+o.name},{where:{id:o.id}}).then(e=>{t.end(JSON.stringify(e))}).catch(e=>{t.status(500).send("Error updating repository : "+e)})}fetchSelecteds(e,t){try{g.findAll({attributes:[],raw:!0,include:[{attributes:["id","fullName"],model:this.sequelize.models.repository}]}).then(e=>{t.end(JSON.stringify(e))})}catch(e){console.log(e)}}addSelected(e,t){let o=e.params.repositoryId;g.create({repositoryId:o,userId:1}).then(e=>{t.end(JSON.stringify(e.dataValues))}).catch(e=>{t.status(500).send("Error persisting selected repository : "+e)})}removeSelected(e,t){let o=e.params.repositoryId;g.destroy({where:{repositoryId:o}}).then(e=>{t.end("true")}).catch(e=>{t.status(500).send("Error removing selected repository : "+e)})}};const O=m.a.json();var w=class{constructor(e,t){const o=new f(t);e.get(p.ENDPOINT.REPOSITORY,o.fetchAll.bind(o)),e.post(p.ENDPOINT.REPOSITORY_ADD,O,o.addItem.bind(o)),e.post(p.ENDPOINT.REPOSITORY_UPDATE,O,o.updateItem.bind(o)),e.post(p.ENDPOINT.REPOSITORY_REMOVE,o.remove.bind(o)),e.get(p.ENDPOINT.SELECTED_REPOSITORY,o.fetchSelecteds.bind(o)),e.post(p.ENDPOINT.SELECTED_REPOSITORY_ADD,o.addSelected.bind(o)),e.post(p.ENDPOINT.SELECTED_REPOSITORY_REMOVE,o.removeSelected.bind(o))}};var N=class extends r.Model{static init(e){super.init({branchId:{type:r.DataTypes.STRING(50),allowNull:!1}},{modelName:"user_selected_branch",sequelize:e}),this.belongsTo(e.models.repository,{onDelete:"CASCADE",foreignKey:{allowNull:!1}}),this.belongsTo(e.models.user,{onDelete:"CASCADE",foreignKey:{allowNull:!1}})}};var b=class{constructor(e){this.sequelize=e,N.init(e)}fetchAllBranches(e,t){let o=e.params.repositoryId;try{N.findAll({where:{repositoryId:o}}).then(e=>{t.end(JSON.stringify(e))})}catch(e){console.log(e)}}};var I=class{constructor(e,t){const o=new b(t);e.get(p.ENDPOINT.BRANCH,o.fetchAllBranches)}};var v=class{static init(e,t){try{new y(e,t),new w(e,t),new I(e,t),t.sync({force:!0})}catch(e){console.log("Error loading server routes : "+e)}}},T=o(4),S=o.n(T);const R=o(14),D=R(),P=(o(13)("app:server"),process.env.PORT||3e3),A=o(3),_=o(12),x=(o(2),o(9));if(console.log("-------------------------------"),console.log("-------------------------------"),console.log(P),console.log("-------------------------------"),console.log("-------------------------------"),D.use(S()()),process.env.development){const e=A(_);D.use(o(8)(e,{logLevel:"warn",publicPath:"/"})),D.use(o(7)(e,{log:console.log,path:"/__webpack_hmr",heartbeat:1e4})),D.use(R.static("public"))}else D.use(R.static("www"));x("env.json").then(e=>{D.envJSON=e,n.connect(D.envJSON).then(e=>{v.init(D,e),D.listen(P,()=>{console.log(`>> Listening on port ${P}`)}).catch(e=>{console.log(e)})}).catch(()=>{})})},function(e,t){e.exports=require("webpack-hot-middleware")},function(e,t){e.exports=require("webpack-dev-middleware")},function(e,t){e.exports=require("load-json-file")},function(e,t){e.exports=require("axios")},function(e,t){e.exports=require("copy-webpack-plugin")},function(e,t,o){(function(t){const r=o(3),s=o(2),n=o(11);e.exports={mode:"development",entry:{client:[s.resolve(t,"../src"),"webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true"]},output:{path:s.resolve(t,"/../dist"),publicPath:"/",filename:"[name].js"},devtool:"#source-map",module:{rules:[{test:/(\.jsx|\.js)$/,exclude:[/(node_modules)/],use:{loader:"babel-loader",options:{presets:["es2015","stage-2","react","env"]}}},{test:/\.css$/,use:["style-loader","css-loader"]},{test:/\.scss$/,use:[{loader:"style-loader"},{loader:"css-loader",options:{sourceMap:!0}},{loader:"sass-loader",options:{sourceMap:!0}}]},{test:/\.(png|jpg|gif|svg)$/,use:[{loader:"file-loader",options:{}}]}]},plugins:[new r.optimize.OccurrenceOrderPlugin,new r.NamedModulesPlugin,new r.HotModuleReplacementPlugin,new r.NoEmitOnErrorsPlugin,new n([{from:"public/index.html",to:s.resolve(t,"/../dist"),force:!0}])],resolve:{extensions:[".js",".jsx"]},devServer:{contentBase:s.join(t,"/../dist"),compress:!0,port:9002,hot:!0,progress:!1}}}).call(this,"/")},function(e,t){e.exports=require("debug")},function(e,t){e.exports=require("express")},function(e,t,o){e.exports=o(6)}]);