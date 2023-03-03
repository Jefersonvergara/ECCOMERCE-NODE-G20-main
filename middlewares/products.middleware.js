const Product = require('../models/product.model');
const ProductImg = require('../models/productImg.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');


/* Un middleware que verifica si el productId es válido. */
exports.validProductById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const product = await Product.findOne({
    where: {
      id,
      status: true,
    },
    include: [
      {
        model: ProductImg,
      },
    ],
  });

  if (!product) {
    return next(new AppError('Product not found', 404));
  }

  req.product = product;
  next();
});


/* Comprobando si el productId es válido. */
exports.validBodyProductById = catchAsync(async (req, res, next) => {
  const { productId } = req.body;

  const product = await Product.findOne({
    where: {
      id: productId,
      status: true,
    },
  });

  if (!product) {
    return next(new AppError('Product not found', 404));
  }

  req.product = product;
  next();
});

/* Un middleware que comprueba si hay suficientes productos en stock. */
exports.validIfExistProductsInStock = catchAsync(async (req, res, next) => {
  const { product } = req;
  const { quantity } = req.body;

  if (product.quantity < quantity) {
    return next(
      new AppError('There are not enaugh products in the stock', 400)
    );
  }

  next();
});

exports.validExistProductInStockForUpdate = catchAsync(
  async (req, res, next) => {
    const { product } = req;
    const { newQty } = req.body;

    if (newQty > product.quantity) {
      return next(
        new AppError('There are not enaugh products in the stock', 400)
      );
    }

    next();
  }
);

exports.validExistProductIdByParams = catchAsync(async (req, res, next) => {
  const { productId } = req.params;

  const product = await Product.findOne({
    where: {
      id: productId,
      status: true,
    },
  });

  if (!product) {
    return next(new AppError('Product not found', 404));
  }

  next();
});
