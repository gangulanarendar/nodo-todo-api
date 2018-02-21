var mongoose=require('mongoose');

var User=mongoose.model('User',{
   email :{
     type :String,
    // required:true,
     minlength:[1,'min length is there'],
     trim :true
   }

});

module.exports={
  User : User
}
