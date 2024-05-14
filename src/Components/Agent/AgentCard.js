
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AgentCard.css';
import { MdOutlineMailOutline } from 'react-icons/md';
import { IoIosStarOutline } from 'react-icons/io';
import { Modal, Button } from 'react-bootstrap';
import { Rating } from '@mui/material';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
const AgentCard = ({ agentId }) => {
  const [show, setShow] = useState(false);
  const [imageAgency, setimageAgency] = useState([]);
  const [imageAgent, setimageAgent] = useState([]);
  const [countAgent, setCountAgent] = useState(0);
  const [countAgentBuy, setCountAgentBuy] = useState(0);
  const [countAgentSold, setCountAgentSold] = useState(0);
  const [agent, setAgent] = useState({});
  const [rating, setRating] = useState(0);
 
  const [comment, setComment] = useState('');
  const [token, setToken] = useState('');
  const [userData, setUserData] = useState([]);
    ///////////////////////////////////////////////
    useEffect(() => {
      const savedToken = Cookies.get('authToken');
      const savedUserData = Cookies.get('userData');
  
      if (savedToken) {
        setToken(savedToken);
      }
  
      if (savedUserData) {
        setUserData(JSON.parse(savedUserData));
      }
   
    }, []);
    
    ///////////////////////////////////////////

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const fetchAgentById = async () => {
      try {
        const responseAgent = await axios.get(`https://localhost:7088/api/Agents/${agentId}`);
        setAgent(responseAgent.data);

        const responseImageAgency = await axios.get(
          `https://localhost:7088/api/ImageAgency/ByAgencyId/${responseAgent.data.agencyId}`
        );
        setimageAgency(responseImageAgency.data);

        const responseImageAgent = await axios.get(
          `https://localhost:7088/api/ImageAgent/ByAgentId/${responseAgent.data.agentId}`
        );
        setimageAgent(responseImageAgent.data);

        const responseCount = await axios.get(
          `https://localhost:7088/api/Properties/GetByCount?agentId=${agentId}&statusName=Rent`
        );
        setCountAgent(responseCount.data)

        const responseCountBuy = await axios.get(
          `https://localhost:7088/api/Properties/GetByCount?agentId=${agentId}&statusName=Buy`
        );
        setCountAgentBuy(responseCountBuy.data)

        const responseCountSold = await axios.get(
          `https://localhost:7088/api/Properties/GetByCount?agentId=${agentId}&statusName=Sold`
        );
        setCountAgentSold(responseCountBuy.data)
      
        
      } catch (error) {
        console.error('Error fetching Agent by ID:', error);
      }
    };

    fetchAgentById();
  }, [agentId]);

  const emailLink = `mailto:${agent.useremail}`;

  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSaveChanges = async () => {
    try {
      // User has not posted a comment, proceed with posting
      const response = await axios.post(
        'https://localhost:7088/api/Comments',
        {
          value: rating,
          comments: comment,
          userId: userData.userId,
          agentId: agentId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      handleClose();
      toast.success('Comment posted successfully');
  
      
     
    } catch (error) {
      if (error.response && error.response.status === 401) {
        handleClose();
        toast.error('Forbidden: You do not have permission to post a comment.');
        console.log('Forbidden: You do not have permission to post a comment.');
      } 
      else if (error.response && error.response.status === 409) {
        handleClose();
        toast.error('already posted comment.');
        console.log('already posted comment.');
      } 
      else {
        // Other errors
        toast.error('Error posting comment. Please log in.');
      }
    }
  };
  



  return (
    <div className='agent-container'>
   
     <div className="agent-card">
      <div className="banner-agentcard">
        <div className="banner-agencyImg">
          {imageAgency.map((image) => (
            <img key={image.imageId} src={image.imageSrc} alt={image.imageName} className="logoagency-banner" />
          ))}
          <div className="agent-info"></div>
        </div>
      </div>
      <div className="left-section">
        {imageAgent.map((image) => (
          <img key={image.imageId} src={image.imageSrc} alt={image.imageName} className="avatar" />
        ))}
        <div className="agent-info">
          <h4 className="agent-name">{agent.agentName}</h4>
          <p className="agent-occupation">Director licensed agent</p>
          <p className="agency-name">{agent.agencyName}</p>
        </div>
      </div>

      <div className="agent-stats">
        <div className="stat">
          <p className="number sold-number">{countAgentSold}</p>
          <p className=" sold-label">Sold</p>
        </div>
        <div className="stat">
          <p className="number for-sale-number">{countAgentBuy}</p>
          <p className=" for-sale-label">For Sale</p>
        </div>
        <div className="stat">
          <p className="number for-rent-number">{countAgent}</p>
          <p className=" for-rent-label">For Rent</p>
        </div>
      </div>
      <div className="agent-buttons">
        <button className="emailAgentbtn" onClick={() => window.location.href = emailLink}>
          <MdOutlineMailOutline />
          <span className="email-agents">Email</span>
        </button>
        <button variant="primary" onClick={handleShow} className="emailAgentbtn">
          <IoIosStarOutline />
          <span className="email-agents">Rate</span>
        </button>

        <Modal show={show} onHide={handleClose} className="agent-modal">
          <Modal.Header closeButton className="modal-header">
            <Modal.Title className="modal-title">{agent.agentName}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="modal-body">
            <div className="rating-section">
              <p className="rating-label">Rating:</p>
              <Rating name="agent-rating" value={rating} onChange={handleRatingChange} />
              <p className="rating-given">No rating given</p>
            </div>
            <div className="comment-section">
              <p className="comment-label">Write a comment:</p>
              <TextareaAutosize
                minRows={3}
                placeholder="Type your comment here..."
                className="comment-textarea"
                value={comment}
                onChange={handleCommentChange}
              />
            </div>
          </Modal.Body>
          <Modal.Footer className="modal-footer">
            <Button variant="secondary" onClick={handleClose} className="close-button">
              Close
            </Button>
            <Button variant="primary" onClick={handleSaveChanges} className="save-button">
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
    </div>
   
  );
};

export default AgentCard;
