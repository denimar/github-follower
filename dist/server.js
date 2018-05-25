!function(e){var t={};function r(o){if(t[o])return t[o].exports;var s=t[o]={i:o,l:!1,exports:{}};return e[o].call(s.exports,s,s.exports,r),s.l=!0,s.exports}r.m=e,r.c=t,r.d=function(e,t,o){r.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:o})},r.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="/",r.w={},r(r.s=15)}([function(e,t){e.exports=require("sequelize")},function(e,t){e.exports=require("body-parser")},function(e,t){e.exports=require("path")},function(e,t){e.exports=require("webpack")},function(e,t){e.exports=require("cors")},function(e,t){e.exports=require("jsonwebtoken")},function(e,t,r){"use strict";r.r(t);var o=r(0),s=r.n(o);var n=class{static connect(e){return new Promise((t,r)=>{console.log(`>> MySQL: Connecting to a local database "${e.database.name}"...`);const o=new s.a(e.database.name,e.database.user,e.database.password,{host:e.database.host,port:e.database.port,dialect:"mysql",operatorsAliases:!1,query:{raw:!0},logging:!1,timezone:e.database.timezone});o.authenticate().then(()=>{console.log(">> Connection has been established successfully."),t(o)}).catch(e=>{console.error(">> Unable to connect to the database:",e),r(e)})})}};var a=class extends o.Model{static init(e){super.init({username:{type:o.DataTypes.STRING(35),allowNull:!1},active:{type:o.DataTypes.BOOLEAN,allowNull:!1,defaultValue:!0}},{modelName:"user",sequelize:e})}},i=(r(10),r(5)),l=r.n(i);class c{constructor(e){this.sequelize=e,a.init(e)}fetchAllUsers(e,t){a.findAll({where:{active:!0}}).then(e=>{t.end(JSON.stringify(e))})}ensureUserExistence(e,t){return new Promise((r,o)=>{try{this.sequelize.models.company.findOne({where:{code:t}}).then(t=>{a.findOne({where:{username:e,companyId:t.id,active:!0}}).then(o=>{o?r(o):this.createNewUser(e,t.id).then(e=>{r(o)})})})}catch(e){console.log("Error checking user existence: "+e)}})}createNewUser(e,t){return new Promise((r,o)=>{try{a.create({username:e,companyId:t}).then(()=>{a.findOne({where:{username:e,companyId:t}}).then(e=>{e?r(e):o()})})}catch(e){console.log("Error creating a new user: "+e),o()}})}static async getAutorizationData(e,t){let r=t.header("authorization"),o=l.a.decode(r,{complete:!0}).payload;return o.userId=await c.getUserId(e,o.company,o.username),o}static getUserId(e,t,r){return new Promise((o,s)=>{try{a.findOne({attributes:["id"],raw:!0,include:[{model:e.models.company,attributes:[],where:{code:t}}],where:{username:r,active:!0}}).then(e=>{o(e.id)}).catch(e=>{console.log(e),s(e)})}catch(e){console.log(e)}})}}var d=c;const u="/githubfollower/endpoints";var p={ENDPOINT:{CREDENTIAL_AUTHENTICATION:`${u}/credential/authentication`,CREDENTIAL_USER:`${u}/credential/user`,PARAM:`${u}/param`,SELECTED_REPOSITORY:`${u}/repository/selected`,SELECTED_REPOSITORY_ADD:`${u}/repository/selected/add/:repositoryId`,SELECTED_REPOSITORY_REMOVE:`${u}/repository/selected/remove/:repositoryId`,REPOSITORY:`${u}/repository/all`,REPOSITORY_ADD:`${u}/repository/add`,REPOSITORY_REMOVE:`${u}/repository/remove/:repositoryId`,REPOSITORY_UPDATE:`${u}/repository/update`,BRANCH:`${u}/branch/:repositoryId`}},h=r(1),m=r.n(h);m.a.json();var y=class{constructor(e,t){const r=new d(t);e.get(p.ENDPOINT.CREDENTIAL_USER,r.fetchAllUsers)}};var E=class extends o.Model{static init(e){super.init({fullName:{type:o.DataTypes.STRING(80),allowNull:!1}},{modelName:"repository",sequelize:e})}};var f=class extends o.Model{static init(e){super.init({},{modelName:"user_selected_repository",sequelize:e}),this.belongsTo(e.models.repository,{onDelete:"CASCADE",foreignKey:{allowNull:!1}}),this.belongsTo(e.models.user,{onDelete:"CASCADE",foreignKey:{allowNull:!1}})}};var g=class{constructor(e){this.sequelize=e,E.init(e),f.init(e)}fetchAll(e,t){try{E.findAll().then(e=>{t.end(JSON.stringify(e))})}catch(e){console.log(e)}}remove(e,t){let r=e.params.repositoryId;E.destroy({where:{id:r}}).then(e=>{t.end("true")}).catch(e=>{t.status(500).send("Error removing repository : "+e)})}addItem(e,t){let r=e.body;E.create({fullName:r.login+"/"+r.name}).then(e=>{t.end(JSON.stringify(e))}).catch(e=>{t.status(500).send("Error adding repository : "+e)})}updateItem(e,t){let r=e.body;E.update({fullName:r.login+"/"+r.name},{where:{id:r.id}}).then(e=>{t.end(JSON.stringify(e))}).catch(e=>{t.status(500).send("Error updating repository : "+e)})}fetchSelecteds(e,t){try{f.findAll({attributes:[],raw:!0,include:[{attributes:["id","fullName"],model:this.sequelize.models.repository}]}).then(e=>{t.end(JSON.stringify(e))})}catch(e){console.log(e)}}addSelected(e,t){let r=e.params.repositoryId;f.create({repositoryId:r,userId:1}).then(e=>{t.end(JSON.stringify(e.dataValues))}).catch(e=>{t.status(500).send("Error persisting selected repository : "+e)})}removeSelected(e,t){let r=e.params.repositoryId;f.destroy({where:{repositoryId:r}}).then(e=>{t.end("true")}).catch(e=>{t.status(500).send("Error removing selected repository : "+e)})}};const O=m.a.json();var w=class{constructor(e,t){const r=new g(t);e.get(p.ENDPOINT.REPOSITORY,r.fetchAll.bind(r)),e.post(p.ENDPOINT.REPOSITORY_ADD,O,r.addItem.bind(r)),e.post(p.ENDPOINT.REPOSITORY_UPDATE,O,r.updateItem.bind(r)),e.post(p.ENDPOINT.REPOSITORY_REMOVE,r.remove.bind(r)),e.get(p.ENDPOINT.SELECTED_REPOSITORY,r.fetchSelecteds.bind(r)),e.post(p.ENDPOINT.SELECTED_REPOSITORY_ADD,r.addSelected.bind(r)),e.post(p.ENDPOINT.SELECTED_REPOSITORY_REMOVE,r.removeSelected.bind(r))}};var N=class extends o.Model{static init(e){super.init({branchId:{type:o.DataTypes.STRING(50),allowNull:!1}},{modelName:"user_selected_branch",sequelize:e}),this.belongsTo(e.models.repository,{onDelete:"CASCADE",foreignKey:{allowNull:!1}}),this.belongsTo(e.models.user,{onDelete:"CASCADE",foreignKey:{allowNull:!1}})}};var b=class{constructor(e){this.sequelize=e,N.init(e)}fetchAllBranches(e,t){let r=e.params.repositoryId;try{N.findAll({where:{repositoryId:r}}).then(e=>{t.end(JSON.stringify(e))})}catch(e){console.log(e)}}};var I=class{constructor(e,t){const r=new b(t);e.get(p.ENDPOINT.BRANCH,r.fetchAllBranches)}};var v=class{static init(e,t){try{new y(e,t),new w(e,t),new I(e,t)}catch(e){console.log("Error loading server routes : "+e)}}},T=r(4),S=r.n(T);const R=r(14),D=R(),P=(r(13)("app:server"),process.env.PORT||5e3),A=r(3),_=r(12),x=(r(2),r(9));if(D.use(S()()),process.env.development){const e=A(_);D.use(r(8)(e,{logLevel:"warn",publicPath:"/"})),D.use(r(7)(e,{log:console.log,path:"/__webpack_hmr",heartbeat:1e4})),D.use(R.static("public"))}else D.use(R.static("www"));x("env.json").then(e=>{D.envJSON=e,n.connect(D.envJSON).then(e=>{v.init(D,e),D.listen(P,()=>{console.log(`>> Listening on port ${P}`)}).catch(e=>{console.log(e)})}).catch(()=>{})})},function(e,t){e.exports=require("webpack-hot-middleware")},function(e,t){e.exports=require("webpack-dev-middleware")},function(e,t){e.exports=require("load-json-file")},function(e,t){e.exports=require("axios")},function(e,t){e.exports=require("copy-webpack-plugin")},function(e,t,r){(function(t){const o=r(3),s=r(2),n=r(11);e.exports={mode:"development",entry:{client:[s.resolve(t,"../src"),"webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true"]},output:{path:s.resolve(t,"/../dist"),publicPath:"/",filename:"[name].js"},devtool:"#source-map",module:{rules:[{test:/(\.jsx|\.js)$/,exclude:[/(node_modules)/],use:{loader:"babel-loader",options:{presets:["es2015","stage-2","react","env"]}}},{test:/\.css$/,use:["style-loader","css-loader"]},{test:/\.scss$/,use:[{loader:"style-loader"},{loader:"css-loader",options:{sourceMap:!0}},{loader:"sass-loader",options:{sourceMap:!0}}]},{test:/\.(png|jpg|gif|svg)$/,use:[{loader:"file-loader",options:{}}]}]},plugins:[new o.optimize.OccurrenceOrderPlugin,new o.NamedModulesPlugin,new o.HotModuleReplacementPlugin,new o.NoEmitOnErrorsPlugin,new n([{from:"public/index.html",to:s.resolve(t,"/../dist"),force:!0}])],resolve:{extensions:[".js",".jsx"]},devServer:{contentBase:s.join(t,"/../dist"),compress:!0,port:9002,hot:!0,progress:!1}}}).call(this,"/")},function(e,t){e.exports=require("debug")},function(e,t){e.exports=require("express")},function(e,t,r){e.exports=r(6)}]);