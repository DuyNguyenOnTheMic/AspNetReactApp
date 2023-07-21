import authService from './AuthorizeService'

export default async function () {
  const token = await authService.getAccessToken()

  return {
    headers: !token ? {} : { Authorization: `Bearer ${token}` }
  }
}
