import React from 'react'

const Topic = ({name,onClick}) => {
  return (
    <div onClick={onClick} className="p-3 m-2 border rounded shadow cursor-pointer hover:bg-gray-100">
      {name}
    </div>
  )
}

export default Topic