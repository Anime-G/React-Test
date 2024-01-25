import { Button, Result } from 'antd'

import React from 'react'
import { Link } from 'react-router-dom'

const Page404 = () => {
  return (
    <div>
       <Result
    status="404"
    title="Invalid Request"
    subTitle="Sorry, this page does not exist."
    extra={<Link to="/" ><Button type="primary">Back Home</Button></Link>}
  />
    </div>
  )
}

export default Page404
