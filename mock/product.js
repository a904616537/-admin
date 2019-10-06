import Mock from 'mockjs'

const data = Mock.mock({
  'items|30': [{
    _id: '@id',
    name: '@sentence(10, 20)',
    img: 'name',
    desc: '@datetime',
    price: '@integer(300, 5000)'
  }]
})

export default [
  {
    url: '/product',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  }
]
