import { Get, JsonController, Post } from 'routing-controllers'

@JsonController()
export class ProductController {
  @Get('/products')
  async getListOfProducts() {
    return ''
  }

  @Get('/products')
  async getProductById() {
    return ''
  }

  @Post('/products/:id')
  async buyProductById() {
    return ''
  }
}
