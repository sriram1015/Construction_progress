const mongoose = require('mongoose');

const predictionSchema = new mongoose.Schema({
    filename:{type:String , required:true},
    username:{type:String , required:true},
    tile:{type:String, required:true},
    file_id:{type: String, required: true, unique: true},
    prediction: { type: String, required: true },
    similarity:{type:Number, requi}
})

const pred = mongooose.model('prediction', predictionSchema);
module.export = pred;