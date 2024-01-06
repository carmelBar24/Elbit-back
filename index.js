const express=require('express');
const app=express();
const cors=require('cors');

app.use(express.json());
app.use(cors());

const {sequelize}=require('./database');

//Routers
const postRouter=require('./routs/posts');
app.use('/posts',postRouter);

const commentRouter=require('./routs/comments');
app.use('/comments',commentRouter);

const usersRouter=require('./routs/users');
app.use('/auth',usersRouter);

const likesRouter=require('./routs/likes');
app.use('/likes',likesRouter);


sequelize.sync().then(()=>{

    app.listen(3002,()=>{
        console.log('Server running on port 3002');
    });

})

// async function startApp() {
//     try {
//         await sequelize.authenticate();
//         console.log('Connection has been established successfully.');
//
//         // Sync all defined models to the database
//         await sequelize.sync();
//         console.log('All models were synchronized successfully.');
//
//         // Your application logic here...
//     } catch (error) {
//         console.error('Unable to connect to the database:', error);
//     }
// }
//
// startApp();






