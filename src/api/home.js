// 设备管理
import request from '@/utils/request'
import qs from 'qs'

// 登录
export function listBaseInfo(data) {
  return request({
    url: '/daPing/listBaseInfo',
    method: 'post',
    data
  })
}
