import Product from "../models/product.js";

export const addProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    return res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

export const getProductByCategory = async (req, res, next) => {
  const catId = req.params.catId;

  const id = catId.slice(2);

  try {
    const productsList = await Product.find({ category: id });

    return res.status(200).json(productsList);
  } catch (error) {
    next(error);
  }
};

export const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    return res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

export const getSingleProduct = async (req, res, next) => {
  try {
    const prodId = req.params.productId;
    const id = prodId.slice(2);
    console.log(id);
    const product = await Product.findById(id);
    return res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};
