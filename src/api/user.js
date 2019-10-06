import request from '@/utils/request'

export function login(data) {
  if(data.username == 'admin' && data.password == '000000'){
    return Promise.resolve({
      data : {
        token : 'admin',
      }
    })
  } else {
    return Promise.reject('登陆失败')
  }

}

export function getInfo(token) {
  return Promise.resolve({
    data :{
      name : 'admin',
      avatar : 'https://c-ssl.duitang.com/uploads/item/201707/19/20170719211350_4PnBt.jpeg'
    }
  })
  
}

export function logout() {
  return Promise.resolve({})
}
