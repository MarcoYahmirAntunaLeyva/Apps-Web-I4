import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import authRoutes from './routes/auth.route';
import productRoutes from './routes/product.route';
import orderRoutes from './routes/order.route';
import rolRoutes from './routes/rol.route';
import connectDB from './Configuracion/db';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan('dev'));
app.use(cors({
  origin: 'http://localhost:8081',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/auth', productRoutes);
app.use('/api/auth', orderRoutes);
app.use('/api/auth', rolRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
