export const errorAsString = (err: any): string =>
   err.response ? `${err.response.data.error}, ${err.response.data.message}` : 'Unexpected error'
