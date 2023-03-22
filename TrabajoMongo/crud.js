//-------------VENDEDORES----------------//

const { MongoClient, Db } = require("mongodb");
// Connection URI
const uri = "mongodb+srv://LifeJacket:lifejacket123@cluster0.yrvnibf.mongodb.net/?retryWrites=true&w=majority";
// Create a new MongoClient
const client = new MongoClient(uri);
async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Establish and verify connection
    
    // //insertone
    // await Createone(client , {
        // "ID_Vendedor": 100,
        // "num_documento": 485719365,
        // "Name": "Andres",
        // "LastName": "Navarro",
        // "Telefon": 3021458726,
        // "Email": "Sicario1000sena@gmail.com",
        // "State": true
    // });

    // //insertmany
    // await CreateMany(client,[{
    // "ID_Vendedor": 101,
    // "num_documento": 4857196842,
    // "Name": "Felipe",
    // "LastName": "Florez",
    // "Telefon": 3014587521,
    // "Email": "Vocerosena13@gmail.com",
    // "State": false
    // },
    // {
    //  "ID_Vendedor": 102,
    //  "num_documento": 485719365,
    //  "Name": "Miguel",
    //  "LastName": "Carton",
    //  "Telefon": 1029865742,
    //  "Email": "Mcarton45@gmail.com",
    //  "State": true
    // },
    // {
    //  "ID_Vendedor": 103,
    //  "num_documento": 485719365,
    //  "Name": "Yen",
    //  "LastName": "Lalinda",
    //  "Telefon": 1023856974,
    //  "Email": "Lalinda52@gmail.com",
    //  "State": false
    // }]
    // )


//     // //Findone
    // await FindOne(client);

//     // //Find
// await buscar(client);


//     // //Updateone y ##upsert##
// await ActualizarUno(client);

//     // //UpdateMany
// await ActualizarVarios(client);


//     // //Deleteone
// await borraruno(client);

//     // //DeleteMany
// await borrarvarios(client);

//    //  //Drop Collection
// const result1 = await dropCollection(client);

//   //  //Drop DATABASE
// const result = await dropDatabase(client);

//  // //Pipelines and Sort
// const result1 = await pipelinesVendedores0(client);
// const result2 = await pipelinesVendedores1(client);
// const result3 = await pipelinesVendedores2(client);

    await client.db("admin").command({ ping: 1 });
    console.log("Connected successfully to server");

  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

////////// Aqui desarrollamos la funciones asincronas 

///////////////////////////////crud node///////////////////////////
/////////////***** Create *****///////////////////
//insertone
async function Createone(client , vendedor){
  await client.db("LifeJacket").collection("Vendedores").insertOne(vendedor);
  console.log("A new vendor was created");
}

//insertmany
async function CreateMany(client, Vendedores){
  await client.db("LifeJacket").collection("Vendedores").insertMany(Vendedores);
  console.log("New sellers have been registered");
}

/////////////***** Read ******////////////////
//Findone
async function  FindOne(client){
  const query = {ID_Vendedor: 59}
  const  result = await client.db("LifeJacket").collection("Vendedores").findOne(query);
  console.log(result)
}

//Find and Example Limit
async function buscar(client){
  const query = {Name: 'Pedro'}
  const  result = await client.db("LifeJacket").collection("Vendedores").find(query).limit(3).toArray();
  console.log(result)
}

/////////////***** Update *******//////////////////////

//     // //Updateone
async function ActualizarUno(client){
  const query ={ID_Vendedor: 102};
  const result = await client.db("LifeJacket").collection("Vendedores").updateOne(query,{$set:{LastName: "Medina"}});
  console.log("Successful update")
}

//     // //Updateone with ##upsert##
async function ActualizarUno(client){
  const query ={ID_Vendedor: 104};
  const X = await client.db("LifeJacket").collection("Vendedores").updateOne(query,{$set:{num_documento: 4857196842,Name: "David",LastName: "Millan",Telefon: 3027851423, Email: "David584@gmail.com", State: false}}, {upsert:true} );
  console.log(X)
  console.log("Successful update")
}

//    // //UpdateMany
async function ActualizarVarios(client){
  const query = {Name: "Juan"}
  const  X = await client.db("LifeJacket").collection("Vendedores").updateMany(query,{$set: {LastName: "Cano"}});
  console.log("Successful update")
  console.log(X)
}

//////////  THE UPSERT DOES NOT WORK IN UPDATEMANY /////////////////////////////

/////////////***** Delete *********///////////////
//     // //Deleteone
async function borraruno(client){
  const query={ID_Vendedor: 104};
  const X =await client.db("LifeJacket").collection("Vendedores").deleteOne(query);
  console.log(X);
  console.log("Correct deletion")
}

//    // //DeleteMany
async function borrarvarios(client){
  const query={Name: "Pedro"};
  const X =await client.db("LifeJacket").collection("Vendedores").deleteMany(query);
  console.log(X);
  console.log("Correct deletion")
}


//  // //drop Collection
const dropCollection = (client) => {
    try{
        const result = client.db("LifeJacket").collection("Vendedores").drop()
        console.log('The collection was successfully deleted!!')
        return result
    }catch(error){
        console.log(error)
    }
}


//  //  //drop database
const dropDatabase = (client) => {
    try{
        const result = client.db("LifeJacket").dropDatabase()
        console.log('Deleted database successfully!!')
        return result
    }catch(error){
        console.log(error)
    }
}



//  //  //Unwind
///-------------The $unwind fails, since we don't have an array-------------///

//  //  //Pipelines and Examples Sort
//01 Pipeline
const pipelinesVendedores0 = (client) => {
  try{
    const result1 = client.db("LifeJacket").collection("Vendedores").aggregate([
      {$match: {Name: {$eq: "Pedro"}}},
      {$project: {_id: 0, Name: 1, num_documento: 1, Email: 1}},
      {$sort: {Name: -1}}
    ])
    return result1
  }catch(error){
    console.error      
  }
}
//02 Pipeline
const pipelinesVendedores1 = (client) => {
  try{
    const result2 = client.db("LifeJacket").collection("Vendedores").aggregate([
      {$match: {Name: {$eq: "Pedro"}}},
      {$project: {_id: 0, Name: 1, num_documento: 1, Email: 1}},
      {$sort: {Name: -1}}
    ])
    return result2
  }catch(error){
    console.error      
  }
}

//03 Pipeline
const pipelinesVendedores2 = (client) => {
  try{
    const result3 = client.db("LifeJacket").collection("Vendedores").aggregate([
      {$match: {LastName: {$eq: "López"}}},
      {$project: {_id: 0, LastName: 1, num_documento: 1, Email: 1, Telefon: 1}},
      {$sort: {Telefon: 1}}
    ])
    return result3
  }catch(error){
    console.error      
  }
}

//------Lookup------//
//--------------There are no equal fields to use it--------------//