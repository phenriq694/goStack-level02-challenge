import { Router } from 'express';
import { getRepository, getCustomRepository } from 'typeorm';

import TransactionsRepository from '../repositories/TransactionsRepository';
// import ImportTransactionsService from '../services/ImportTransactionsService';
import Category from '../models/Category';

import CreateTransactionService from '../services/CreateTransactionService';
import DeleteTransactionService from '../services/DeleteTransactionService';

const transactionsRouter = Router();

transactionsRouter.get('/', async (request, response) => {
  const transactionRepository = getCustomRepository(TransactionsRepository);

  const transactions = await transactionRepository.find({
    select: [
      'id',
      'title',
      'value',
      'type',
      'category',
      'created_at',
      'updated_at',
    ],
    relations: ['category'],
  });

  const balance = await transactionRepository.getBalance();

  return response.json({ transactions, balance });
});

transactionsRouter.post('/', async (request, response) => {
  const { title, value, type, category: categoryTitle } = request.body;

  const categoryRepository = getRepository(Category);

  let category_id = '';

  const checkCategoryExists = await categoryRepository.findOne({
    where: { title: categoryTitle },
  });

  if (checkCategoryExists) {
    category_id = checkCategoryExists.id;
  } else {
    const category = categoryRepository.create({
      title: categoryTitle,
    });

    await categoryRepository.save(category);

    category_id = category.id;
  }

  const createTransaction = new CreateTransactionService();

  const transaction = await createTransaction.execute({
    title,
    value,
    type,
    category_id,
  });

  delete transaction.category_id;

  return response.json(transaction);
});

transactionsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const deleteTransaction = new DeleteTransactionService();

  await deleteTransaction.execute(id);

  return response.json();
});

transactionsRouter.post('/import', async (request, response) => {
  // TODO
});

export default transactionsRouter;
