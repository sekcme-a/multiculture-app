import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


const CircularProgressWithLabel = ({progress}) => {
  return (
    <Box sx={{ position: 'relative', display: "flex", justifyContent: "center", alignItems: "center" }}>
      <CircularProgress variant="determinate" value={progress} color="secondary" style={{ width: "80px", marginRight:"45px" }} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="caption" component="div" color="white" style={{fontSize:"16px"}}>
          {`${Math.round(progress)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

export default CircularProgressWithLabel