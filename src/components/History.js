import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import Card from './Card';
import Nosearchfound from './Nosearchfound';
import Seachfound from './Seachfound';

export default function History({ hdata, sethdata, deletehandler, searchTerm, searchHandler }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(7);

  const inputEl = useRef('');

  const getSearchTerm = () => {
    searchHandler(inputEl.current.value);
  };

  // Get the current items based on pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = hdata.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <h2>History</h2>
      <div className="searchbox">
        <input
          ref={inputEl}
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={getSearchTerm}
        />
      </div>
      <div className="history">
        <div>
          <table>
            <tbody>
              
              {currentItems.length < 1 ? (
                <Nosearchfound />
              ) : (
                <Seachfound />,
                currentItems.map((element) => (
                  <tr key={element.id}>
                    <Card element={element} deletehandler={deletehandler} />
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      {currentItems.length < 1 ? (" ") : (<div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => paginate(currentPage - 1)}
        >
          Previous
        </button>
        <button
          disabled={indexOfLastItem >= hdata.length}
          onClick={() => paginate(currentPage + 1)}
        >
          Next
        </button>
      </div>)}
      
    </div>
  );
}
