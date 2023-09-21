const express = require('express');
const app = express();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

app.use(express.json());


//Get the student data
app.get("/list",async(req,res)=>{
    try{
        const getData = await prisma.user.findMany();
        res.status(200).json(getData)
    }catch(err){
        res.status(500).json('Error in server')
    }
});


//Create the student Details
app.post("/user",async(req,res)=>{
    
    try{
        const newData = await prisma.user.create({data:req.body});
        res.status(200).json(newData)
    }catch(err){
        console.log(err)
        res.status(500).json(err+'Error in server')
    }
});


//Update the students Data
app.put("/:id", async (req, res) => {
    const userId = req.params.id;
    const { firstName, lastName, age, phone, email } = req.body;
  
    if (!Number.isInteger(parseInt(userId))) {
      return res.status(400).json({ message: 'Please provide a valid ID' });
    }
  
    try {
      // Create an object with the fields to update, filtering out undefined values
      const updateFields = {
        firstName,
        lastName,
        age,
        phone,
        email,
      };
  
      const updatedUser = await prisma.user.update({
        where: { id: parseInt(userId) },
        data: updateFields,
      });
  
      if (updatedUser) {
        res.status(200).json({ message: 'User updated successfully', user: updatedUser });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json('Error in server');
    }
  });
  

//Delete the students Data
app.delete("/:id",async(req,res)=>{
    const id = req.params.id
    
    try{
        const deleteData = await prisma.user.delete({
            where:{id : parseInt(id)} });
            if (deleteData) {
                res.status(200).json(deleteData);
              } else {
                res.status(404).json({ message: 'User not found' });
              }
       
    }catch(err){
        res.status(500).json('Error in server')
    }
});


app.listen(3001,()=>{
    console.log(`Server running on the port ${3001}`)
});