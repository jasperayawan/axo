import getCurrentUser from '@/actions/getCurrentUser'
import React from 'react'

export default async function page() {
  const jsonUser = await getCurrentUser().catch((err) => {
    console.error(
      'Error happened while getting getCurrentUser() on Feed component: ',
      err
    );
  });

  console.log(JSON.stringify(jsonUser!))
  return (
    <div className='text-black'>
      Welcome to home page
    </div>
  )
}
