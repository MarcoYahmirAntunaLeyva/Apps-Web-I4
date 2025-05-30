import express from 'express';
import morgan from 'morgan';
import authRoutes from './routes/auth.route';
import connectDB from './Configuracion/db';
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan('dev'));

app.use('/api/auth', authRoutes)

connectDB().then(()=> {
    app.listen(PORT,()=> {
    console.log(`Server is running on port ${PORT}`);
    });
});