import React from 'react'

const Dashboard = () => {

  const client_secret = import.meta.env.VITE_CLIENT_ID;
  console.log(client_secret)

  return (
    <div className='p-10'>
      <h1 className='text-3xl'>dashboard {client_secret}</h1>
    </div>
  )
}

export default Dashboard