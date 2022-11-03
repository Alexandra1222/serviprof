/* import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const  model = mongoose.model;
const {perfiles} = require('./perfiles');



const ClienteSchema = new Schema(

   { 
    perfiles:{
        type: Schema.ObjectId,
        ref: 'perfiles',
      }
    
  }
);

export default model('Cliente', ClienteSchema); */
