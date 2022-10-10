/* eslint-disable class-methods-use-this */
import _axios, { get, put, _delete, post } from '@/lin/plugin/axios'

// 我们通过 class 这样的语法糖使模型这个概念更加具象化，其优点：耦合性低、可维护性。
class Category {
  async createBook(data) {
    return post({
      method: 'post',
      url: '/v1/category',
      data,
    })
  }

  async getCategory(id) {
    const res = await get(`/v1/category/${id}`)
    return res
  }

  async editCategory(id, info) {
    const res = await put(`v1/category/${id}`, info)
    return res
  }

  async deleteCategory(id) {
    const res = await _delete(`v1/category/${id}`)
    return res
  }

  async getCategories() {
    return _axios({
      method: 'get',
      url: '/v1/category',
      handleError: true,
    })
  }
}

export default new Category()
