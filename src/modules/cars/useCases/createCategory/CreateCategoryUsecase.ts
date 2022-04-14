import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

interface IRequest {
  name: string;
  description: string;
}

class CreateCategoryUseCase {
  //*modo antigo do constructor:
  /* private categoriesRepository: CategoriesRepository;
  /* constructor(categoriesRepository: CategoriesRepository) {
  /*   this.categoriesRepository = categoriesRepository
  /*  }
  */
  //*modo novo do constructor:
  constructor(private categoriesRepository: ICategoriesRepository) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(name);
    if (categoryAlreadyExists) {
      throw new Error('Category Already exists!');
    }

    this.categoriesRepository.create({ name, description });
  }
}

export { CreateCategoryUseCase };
