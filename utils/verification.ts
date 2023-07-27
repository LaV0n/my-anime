export const verification = (email: string, password: string) => {
   const regex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}')
   return password.length > 5 && regex.test(email)
}
