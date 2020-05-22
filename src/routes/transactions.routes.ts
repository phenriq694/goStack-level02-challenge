import { Router } from 'express';
import { getRepository } from 'typeorm';

// import TransactionsRepository from '../repositories/TransactionsRepository';
// import DeleteTransactionService from '../services/DeleteTransactionService';
// import ImportTransactionsService from '../services/ImportTransactionsService';
import Category from '../models/Category';

import CreateTransactionService from '../services/CreateTransactionService';

const transactionsRouter = Router();

transactionsRouter.get('/', async (request, response) => {
  // TODO
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

  return response.json(transaction);
});

transactionsRouter.delete('/:id', async (request, response) => {
  // TODO
});

transactionsRouter.post('/import', async (request, response) => {
  // TODO
});

export default transactionsRouter;
