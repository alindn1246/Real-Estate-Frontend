import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import './PostAvailableDate.css'; // Import the CSS file


const PostAvailableDate = (props) => {
    const [selectedDate, handleDateChange] = useState(new Date());
    const propertyID = props.propertyID;

    const handleSubmit = async () => {
        try {
            const response = await axios.post('https://localhost:7088/api/AvailableDates', {
                id: 0,
                dateTime: selectedDate,
                propertyId: propertyID,
            });

            console.log(response.data);
         
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="DateTimeContainer">
            <h3> Add  Available Incpections  dates for Property</h3>
            <div >
                <label>Date Time</label>
                <DatePicker
                    selected={selectedDate}
                    onChange={(date) => handleDateChange(date)}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    dateFormat="MMMM d, yyyy h:mm aa"
                    className="PropertyDateTime" // Add the WideInput class
                />
            </div>

        
            
            <div className="SubmitButton">
                <button  onClick={handleSubmit} className="GreenHover">
                    Submit
                </button>
            </div>
            
        </div>
    );
};

export default PostAvailableDate;
