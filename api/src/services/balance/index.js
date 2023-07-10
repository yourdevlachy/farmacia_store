import { Balance } from '../model/models';

export const BalanceService = {
  createBalance: async data => {
    try {
      //TODO: Analizar todo lo que hay que hacer para crear un balance
      const createdBalance = await Balance.create(data);
      return createdBalance;
    } catch (error) {
      throw new Error(`Error creating balance: ${error.message}`);
    }
  },

  getBalanceById: async balanceId => {
    try {
      //TODO: Analizar la data a devolver con los productos asociados al balance
      const balance = await Balance.findByPk(balanceId);
      return balance;
    } catch (error) {
      throw new Error(`Error getting balance by ID: ${error.message}`);
    }
  },

  getBalanceByPeriod: async (startDate, endDate) => {
    try {
      //TODO: Analizar la data a devolver con los productos asociados al balance
      const balance = await Balance.findOne({
        where: {
          startDate: startDate,
          endDate: endDate
        }
      });
      return balance;
    } catch (error) {
      throw new Error(`Error getting balance by period: ${error.message}`);
    }
  }
};
