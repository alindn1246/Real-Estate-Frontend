import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input, Table, Button, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import './NewsTable.css';
import { useNavigate } from 'react-router-dom';

const NewsTable = () => {
  const [newsData, setNewsData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const itemsPerPage = 10;

  useEffect(() => {
    // Fetch data from the API
    axios.get('https://localhost:7088/api/News')
      .then(response => {
        setNewsData(response.data);
        setFilteredData(response.data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleSearchInput = (term) => {
    setSearchTerm(term.toLowerCase());
    const filtered = newsData.filter(news =>
      news.author.toLowerCase().includes(term) ||
      news.title.toLowerCase().includes(term) ||
      news.mainIdea.toLowerCase().includes(term) ||
      news.imageAddress.toLowerCase().includes(term) ||
      news.newsAddress.toLowerCase().includes(term) ||
      news.newsTypeId.toString().includes(term)
    );
    setFilteredData(filtered);
    setCurrentPage(1);
  };

  const handleEditClick = (newsPropId) => {
    navigate(`/EditNews/${newsPropId}`);
    console.log(`Edit clicked for property with ID: ${newsPropId}`);
  };

  const handleDeleteClick = (newsPropId) => {
    axios.delete(`https://localhost:7088/api/News/${newsPropId}`)
      .then(response => {
        console.log('Property deleted successfully', response);
        // You may want to update the data or take additional actions here
      })
      .catch(error => {
        console.error('Error deleting property', error);
      });
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="containerDataTable">
      <Input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => handleSearchInput(e.target.value)}
      />
      <Table>
        <thead>
          <tr>
            <th>News Id</th>
            <th>Title</th>
            <th>Author</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr key={index}>
              <td>{item.newsPropId}</td>
              <td>{item.title}</td>
              <td>{item.author}</td>
              <td>
                <Button color="primary" onClick={() => handleEditClick(item.newsPropId)}>Edit</Button>{' '}
                <Button color="danger" onClick={() => handleDeleteClick(item.newsPropId)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination>
        <PaginationItem disabled={currentPage <= 0}>
          <PaginationLink
            onClick={() => setCurrentPage(currentPage - 1)}
            previous
            href="#"
          />
        </PaginationItem>
        {/* Pagination links */}
        <PaginationItem disabled={currentPage >= Math.ceil(filteredData.length / itemsPerPage) - 1}>
          <PaginationLink
            onClick={() => setCurrentPage(currentPage + 1)}
            next
            href="#"
          />
        </PaginationItem>
      </Pagination>
    </div>
  );
};

export default NewsTable;
