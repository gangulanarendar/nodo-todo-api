const express=require('express');
const bodyParser=require('body-parser');
const {ObjectID}=require('mongodb');

var {mongoose}=require('./db/mongoose');
var {Todo}=require('./models/Todo');
var {User}=require('./models/User');


var app=new express();
app.use(bodyParser.json());
const port= process.env.PORT||3000;

app.get('/todos/:todoId',(req,res)=>{

  console.log(req.params.todoId);
 

  var todoID=req.params.todoId;
  if(!ObjectID.isValid(todoID))
  {
     res.status(404).send();
    return console.log('Incorrect ObjectID',todoID);
  }

  Todo.findById(todoID).then((todo)=>{

    if(!todo)
    {
       res.status(404).send();
      return console.log('ID not found');
    }
    console.log('Todo found',todo);
    res.status(200).send({todo});
  })
  .catch((e)=>{
    res.status(400).send();
  });

});

app.get('/todos',(req,res)=>{
  Todo.find().then((todos)=>{
 res.status(200).send({todos:todos});

  },(e)=>{
    console.log('Error in listing the Todos',e);
    res.status(400).send(e);
  });

});
app.post('/todos',(request,res)=>{
   console.log(request.body);

   var newTodo=new Todo({
     text : request.body.text
   });
  newTodo.save().then((doc)=>{
    console.log('inserted ',JSON.stringify(doc,undefined,2));
    res.status(200);
    res.send(doc);
  },(e)=>{
    console.log('Error in TODO insertion',e);
    res.status(400);
    res.send(e);

  });
});
app.listen(port,()=>{
    console.log('Server started on ',port);
});

module.exports={
  app:app
}
