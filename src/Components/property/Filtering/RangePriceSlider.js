import React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';


const RangePriceSlider = ({ onPriceChange }) => {
  const [value, setValue] = React.useState([50000, 1000000]);

  const handleChange = (event, newValue) => {
    setValue([
      newValue[0],
      newValue[1] >= 1000000 ? Math.ceil(newValue[1] / 100000) * 100000 : newValue[1],
    ]);

    // Call the callback function with the updated values
    onPriceChange(newValue[0], newValue[1]);
  };

  const formatValue = (value) => (
    value >= 1000000 ? `${(value / 1000000).toFixed(1)}M` : `${(value / 1000).toFixed(0)}K`
  );

  return (
    <Box className='RangePriceBar'>
      <Slider
        getAriaLabel={() => 'Salary range'}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        valueLabelFormat={formatValue}
        min={50000}
        max={5000000}
        step={50000}
        size="small"
        sx={{
          color: 'green', // replace 'yourColor' with your desired color
          width: '200px', // change the size to 200px
        }}
      />
    </Box>
  );
};

export default RangePriceSlider;
