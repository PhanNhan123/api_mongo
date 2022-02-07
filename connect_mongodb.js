const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://127.0.0.1:27017';

    // MongoClient.connect(url, {
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true
    //     }, (err, client) => {
    //     if (err) {
    //         return console.log(err);
    //     }
    
    //     // Specify database you want to access
    //     const db = client.db('test');
    
    
    
    //     const places = db.collection('places')   
    //     console.log(`MongoDB Connected: ${url}`);
    //     // client.close();
    // });
    


    // tìm kiếm 

    // places.find({ name: 'Hà Nội' }).toArray((err, result) => {
    //     console.log(result);
    // });

    // delete data

    // places.deleteOne({name : "Thành phố HCM"},(err,result)=>{
    //     console.log(`delete thanh cong`);
    // })

    // show all data
    
    // places.find().toArray((err,result)=>{
    //     if(err){
    //         console.log(`error`);
    //     }
    //     else{
    //         console.log(result);
    //     }
    // })

    // insert data
    
    // places.insertOne({name: "TP HCM"},(err,result)=>{
    //     if(err){
    //         console.log(`insert không thành công!`);
    //     }
    //     else{
    //         console.log(`insert thành công!`)
    //     }
    // })

    //update data

    // places.updateOne({name:"TP HCM"},
    // {   $set: {name: 'Thành phố HCM'}},(err,result)=>{
    //         console.log(result);
    //     }
    // )


var _db;
module.exports ={
    connectToServer: function(callback){
        MongoClient.connect(url,{useNewUrlParser: true},function(err,client){
            _db = client.db('test');
            console.log(`MongoDB Connected: ${url}`);
            return callback(err);
        
        });
    },
    getdb: function(){
        return _db; 
    }
};