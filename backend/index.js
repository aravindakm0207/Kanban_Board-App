require('dotenv').config();
const express = require('express');
const app = express();
const port = 5000;
const configureDB = require('./config/db');
const cors = require('cors');
const { checkSchema } = require('express-validator');

const userRegisterValidation = require('./app/validations/user-register-validations');
const userLoginValidation = require('./app/validations/user-login-validations');


const userCltr = require('./app/controllers/user-ctrl');
const authenticateUser = require('./app/middlewares/authenticateUser');
const sectionCtrl = require('./app/controllers/section-ctrl');
const taskCtrl = require('./app/controllers/task-ctrl');

const initializeDefaultSections = require('./initializeSections');

app.use(express.json());
app.use(cors())
{/*
app.use(cors({
    origin: 'https://expense-app-frontend-jegs.vercel.app', 
    credentials: true
}));*/}
configureDB();
(async () => {
    await initializeDefaultSections();
})()

app.post('/users/register', checkSchema(userRegisterValidation), userCltr.register);
app.post('/users/login', checkSchema(userLoginValidation), userCltr.login);
app.get('/users/account', authenticateUser, userCltr.account);
app.put('/users/account', authenticateUser, userCltr.account);



app.post('/create-section', authenticateUser, sectionCtrl.create );
app.get('/all-sections',authenticateUser, sectionCtrl.list);
app.get('/single-section/:sectionId',authenticateUser, sectionCtrl.single);
app.put('/update-section/:sectionId',authenticateUser, sectionCtrl.update);
app.delete('/removing-section/:sectionId',authenticateUser, sectionCtrl.remove);

app.post('/create-tasks', authenticateUser, taskCtrl.create);
app.get('/all-tasks',authenticateUser, taskCtrl.list);
app.get('/single-task/:taskId',authenticateUser, taskCtrl.single);
app.put('/update-task/:taskId', authenticateUser, taskCtrl.update);
app.put('/move-task/:taskId', authenticateUser, taskCtrl.moveTask);
app.delete('/remove-task/:taskId',authenticateUser, taskCtrl.remove);



app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ error: 'Something went wrong!' });
});

app.listen(port, () => {
    console.log('server running on port', port);
});
