import authService from './AuthorizeService'

export default async () => {
  const token = await authService.getAccessToken()

  return {
    headers: !token ? {} : { Authorization: `Bearer ${token}` }
  }
}
