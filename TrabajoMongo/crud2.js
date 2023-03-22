//---------------VEHICULOS--------------------//

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
        // "Nameplate" : "JDF-717",
        // "Mark" : "Mercedes-Benz S-Class",
        // "colour" : "negro",
        // "fuel" : "Electrico",
        // "State" : "Habilitado",
    // });

    // //insertmany
    // await CreateMany(client,[{
        // "Nameplate" : "WER-792",
        // "Mark" : "Fiat 500",
        // "colour" : "rojo",
        // "fuel" : "ACPM",
        // "State" : " Habilitado",
    // },
    // {
        // "Nameplate" : "AMK-567",
        // "Mark" : "Audi R8",
        // "colour" : "gris Mate",
        // "fuel" : "Gas",
        // "State" : "Deshabilitado",
    // },
    // {
        // "Nameplate" : "DFY-993",
        // "Mark" : "Chevrolet Camaro",
        // "colour" : "negro Mate",
        // "fuel" : "Gasolina",
        // "State" : "Habilitado",
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
// const result1 = await pipelinesVehiculos0(client);
// const result2 = await pipelinesVehiculos1(client);
// const result3 = await pipelinesVehiculos2(client);

    await client.db("admin").command({ ping: 1 });
    // console.log("Connected successfully to server");

  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

////////// Aqui desarrollamos la funciones asincronas 

///////////////////////////////crud node///////////////////////////
/////////////*****Create *****///////////////////
//insertone
async function Createone(client , vehiculo){
  await client.db("LifeJacket").collection("Vehiculos").insertOne(vehiculo);
  console.log("New purchase created");
}

//insertmany
async function CreateMany(client, vehiculos){
  await client.db("LifeJacket").collection("Vehiculos").insertMany(vehiculos);
  console.log("New purchases created");
}

/////////////***** Read ******///////////
//Findone
async function  FindOne(client){
  const query = {fuel: "Gas"}
  const  result = await client.db("LifeJacket").collection("Vehiculos").findOne(query);
  console.log(result)
}

//Find and Example Limit
async function buscar(client){
  const query = {colour: 'rojo'}
  const  result = await client.db("LifeJacket").collection("Vehiculos").find(query).limit(2).toArray();
  console.log(result)
}

/////////////***** Update *******///////////////////////////

//     // //Updateone
async function ActualizarUno(client){
  const query ={Nameplate: "AMK-567"};
  const result = await client.db("LifeJacket").collection("Vehiculos").updateOne(query,{$set:{colour: 'magenta'}});
  console.log("Successful update")
}

//     // //Updateone with ##upsert##
async function ActualizarUno(client){
  const query ={Nameplate: "FGT-890"};
  const X = await client.db("LifeJacket").collection("Vehiculos").updateOne(query,{$set:{Date: "2019-25-01"}}, {upsert:true} );
  console.log(X)
  console.log("Successful update")
}

//    // //UpdateMany
async function ActualizarVarios(client){
  const query = {fuel: "Gasolina"}
  const  X = await client.db("LifeJacket").collection("Vehiculos").updateMany(query,{$set: {fuel: "Gas"}});
  console.log("Successful update")
  console.log(X)
}

//////////  THE UPSERT DOES NOT WORK IN UPDATEMANY /////////////

/////////////***** Delete ******////////////
//     // //Deleteone
async function borraruno(client){
  const query={Nameplate: "DFY-993"};
  const X =await client.db("LifeJacket").collection("Vehiculos").deleteOne(query);
  console.log(X);
  console.log("Correct deletion")
}

    // //DeleteMany
async function borrarvarios(client){
  const query={colour: "amarillo"};
  const X =await client.db("LifeJacket").collection("Vehiculos").deleteMany(query);
  console.log(X);
  console.log("Correct deletion")
}

//  // //drop Collection
const dropCollection = (client) => {
    try{
        const result = client.db("LifeJacket").collection("Vehiculos").drop()
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
const pipelinesVehiculos0 = (client) => {
  try{
    const result1 = client.db("LifeJacket").collection("Vehiculos").aggregate([
      {$match: {Mark: {$eq: "Audi R8"}}},
      {$project: {_id: 0, Nameplate: 1, fuel: 1, State: 1}},
      {$sort: {Nameplate: 1}}
    ])
    return result1
  }catch(error){
    console.error      
  }
}
//02 Pipeline
const pipelinesVehiculos1 = (client) => {
  try{
    const result2 = client.db("LifeJacket").collection("Vehiculos").aggregate([
      {$match: {fuel: {$eq: "Gasolina"}}},
      {$project: {_id: 0, Nameplate: 1, colour: 1, Mark: 1}},
      {$sort: {Nameplate: -1}}
    ])
    return result2
  }catch(error){
    console.error      
  }
}

//03 Pipeline
const pipelinesVehiculos2 = (client) => {
  try{
    const result3 = client.db("LifeJacket").collection("Vehiculos").aggregate([
      {$match: {colour: {$eq: "gris"}}},
      {$project: {_id: 0, Nameplate: 1, Mark: 1, fuel: 1, State: 1}},
      {$sort: {Nameplate: 1}}
    ])
    return result3
  }catch(error){
    console.error      
  }
}

//------Lookup------//
//--------------There are no equal fields to use it--------------//