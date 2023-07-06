import { ORM } from './orm';
import { DataTypes, Sequelize } from 'sequelize';

const System = ORM.define('system', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE
});

const TypeProduct = ORM.define('type', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
  name: { type: DataTypes.STRING, allowNull: false, unique: true },
  description: { type: DataTypes.STRING, allowNull: true },
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE
});

const CategoryProduct = ORM.define('category', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
  name: { type: DataTypes.STRING, allowNull: false, unique: true },
  description: { type: DataTypes.STRING, allowNull: true },
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE
});

const Product = ORM.define('product', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
  name: { type: DataTypes.STRING, allowNull: false, unique: true },
  image: { type: DataTypes.STRING, allowNull: true },
  prize: { type: DataTypes.DECIMAL, allowNull: false },
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE
});

const History = ORM.define('history', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
  type: { type: DataTypes.STRING, allowNull: false },
  amount: { type: DataTypes.DECIMAL, allowNull: true, defaultValue: 0.0 },
  date: Sequelize.DATE,
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE
});

const Balance = ORM.define('balance', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
  startDate: { type: DataTypes.DATE, allowNull: false },
  endDate: { type: DataTypes.DATE, allowNull: false },
  totalSales: { type: DataTypes.DECIMAL, allowNull: false },
  totalQuantitySold: { type: DataTypes.INTEGER, allowNull: false },
  initialQuantityByProduct: { type: DataTypes.JSON, allowNull: false },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE
});

const BalanceProduct = ORM.define('balanceProduct', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
  initialQuantity: { type: DataTypes.INTEGER, allowNull: false },
  currentQuantity: { type: DataTypes.INTEGER, allowNull: false },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE
});

TypeProduct.hasMany(Product);
Product.hasOne(TypeProduct);

CategoryProduct.hasMany(Product);
Product.hasOne(CategoryProduct);

Product.hasMany(History);
History.belongsTo(Product);

Balance.belongsToMany(Product, { through: BalanceProduct });
Product.belongsToMany(Balance, { through: BalanceProduct });

export { System, TypeProduct, CategoryProduct, Product, History, Balance, BalanceProduct };
