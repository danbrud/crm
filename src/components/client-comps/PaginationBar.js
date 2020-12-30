import React from 'react'

const PaginationBar = ({ pageNum, changePage, totalClients }) => {
  const topNum = pageNum * 20
  const lowNum = topNum - 19

  return (
    <div id="paging">
      <i className="fas fa-chevron-left" onClick={changePage('previous')}></i>
      <p>{lowNum} - {pageNum * 20 > totalClients && totalClients ? 'END' : topNum}</p>
      <i className="fas fa-chevron-right" onClick={changePage('next')}></i>
    </div>
  )
}

export default PaginationBar