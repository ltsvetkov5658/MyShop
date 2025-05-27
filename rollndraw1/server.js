const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const Product = require('./models/product');
const Order = require('./models/order');
const Review = require('./models/review');

const app = express();

// Свързване към MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/rollndraw')
  .then(() => console.log('Успешно свързване с MongoDB'))
  .catch((error) => console.error('Грешка при свързване с MongoDB:', error));

// Настройки за EJS и публични файлове
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Начална страница: показва всички продукти
app.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.render('index', { products });
  } catch (error) {
    console.error(error);
    res.status(500).send('Грешка при зареждане на продукти');
  }
});

// Страница за продукт с детайли и ревюта
app.get('/product/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).send('Продуктът не е намерен');
    const reviews = await Review.find({ product: product._id }).sort({ createdAt: -1 });
    res.render('product', { product, reviews });
  } catch (error) {
    console.error(error);
    res.status(500).send('Грешка при зареждане на продукта');
  }
});

// Поръчка на продукт
app.post('/order/:productId', async (req, res) => {
  try {
    const { name, address } = req.body;
    const productId = req.params.productId;

    const order = new Order({ product: productId, name, address });
    await order.save();

    await Product.findByIdAndUpdate(productId, { $inc: { purchaseCount: 1 } });

    res.redirect(`/product/${productId}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Грешка при запис на поръчка');
  }
});

// Добавяне на ревю
app.post('/review/:productId', async (req, res) => {
  try {
    const { author, comment } = req.body;
    const productId = req.params.productId;

    const review = new Review({ product: productId, author: author || 'Анонимен', comment });
    await review.save();

    res.redirect(`/product/${productId}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Грешка при добавяне на ревю');
  }
});

///// --- Административен панел --- /////

/// Преглед на поръчките
app.get('/admin/orders', async (req, res) => {
  console.log('Заявка към /admin/orders');
  try {
    const orders = await Order.find().populate('product');
    res.render('admin-orders', { orders });
  } catch (error) {
    console.error(error);
    res.status(500).send('Грешка при зареждане на поръчките');
  }
});

/// Преглед на продуктите + брой покупки
app.get('/admin/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.render('admin-products', { products });
  } catch (error) {
    console.error(error);
    res.status(500).send('Грешка при зареждане на продуктите');
  }
});

/// Форма за добавяне на продукт
app.get('/admin/products/new', (req, res) => {
  res.render('admin-new-product');
});

/// Добавяне на продукт
app.post('/admin/products', async (req, res) => {
  try {
    const { name, image, shortDescription, fullDescription, price } = req.body;
    const product = new Product({ name, image, shortDescription, fullDescription, price });
    await product.save();
    res.redirect('/admin/products');
  } catch (error) {
    console.error(error);
    res.status(500).send('Грешка при добавяне на продукт');
  }
});

/// Форма за редакция на продукт
app.get('/admin/products/edit/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.render('admin-edit-product', { product });
  } catch (error) {
    console.error(error);
    res.status(500).send('Грешка при зареждане на продукта за редакция');
  }
});

/// Обновяване на продукт
app.post('/admin/products/edit/:id', async (req, res) => {
  try {
    const { name, image, shortDescription, fullDescription, price } = req.body;
    await Product.findByIdAndUpdate(req.params.id, { name, image, shortDescription, fullDescription, price });
    res.redirect('/admin/products');
  } catch (error) {
    console.error(error);
    res.status(500).send('Грешка при обновяване на продукта');
  }
});

/// Изтриване на продукт
app.post('/admin/products/delete/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect('/admin/products');
  } catch (error) {
    console.error(error);
    res.status(500).send('Грешка при изтриване на продукта');
  }
});

///Край на административния панел

// Стартиране на сървъра
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Сървърът слуша на ${PORT}`);
});

