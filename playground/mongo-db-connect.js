const {MongoClient}=require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,client)=>{
  if(err)
  {
    return console.log('Unable to connect Mongo DB ');
  }
  else{
      console.log('Mongo DB Connected');
      const db=client.db('TodoApp');

      db.collection('Todos').insertOne({'test':'hello','cdata':{'name':'detail'}},(err,result)=>{

        if(err)
        {
          return  console.log('Unable to insert Mongo DB ',err);
        }
        else {
           console.log('Inserted ',JSON.stringify(result.ops,undefined,2));
        }

      });
  }

client.close();

});
