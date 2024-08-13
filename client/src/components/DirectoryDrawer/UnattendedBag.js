// import React, { useState } from 'react';
// import AddBag from './AddBag';
// import { Stack, TextField } from '@mui/material';
// import { panelStyles } from './styles';
// import { InputAdornment, IconButton, Card, Divider, CardHeader } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';

// const UnattendedBag = () => {
//   const [bags, setBags] = useState([
//     { id: 1, title: 'Samsonite', category: 'Suitcase', color: 'red'},
//     { id: 2, title: 'Channel', category: 'bag', color: 'Black'},
//   ]);
//   const [selectedBag, setSelectedBag] = useState(null);

//   const handleEditClick = (bag) => {
//     setSelectedBag(bag);
//   };

//   const handleDeleteClick = (id) => {
//     setBags(bags.filter((bag) => bag.id !== id));
//   };

//   const handleAddBag = (bag) => {
//     if (selectedBag) {
//       // Update 
//       setBags(bags.map((b) => (b.id === selectedBag.id ? { ...b, ...bag } : b)));
//       setSelectedBag(null);
//     } else {
//       // Add 
//       setBags([...bags, { id: Date.now(), ...bag }]);
//     }
//   };

//   const [searchQuery, setSearchQuery] = useState('');

//   const filteredBags = bags.filter((bag) =>
//     bag.title.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const handleSearch = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   return (
//     <div>
//         <AddBag selectedBag={selectedBag} onAdd={handleAddBag} />
//         <Divider/>
//         <Stack spacing={2} direction="column" m={1}>
//       <TextField sx={panelStyles.textfield}  variant='outlined' size='small' type="text" placeholder="Search bags" value={searchQuery} onChange={handleSearch} InputProps={{
//           startAdornment: (
//             <InputAdornment position="start">
//               <SearchIcon />
//             </InputAdornment>
//           ),
//         }}/>
//       {filteredBags.map((bag) => (
//         <div key={bag.id}>
//             <Card style={{ borderColor: '#009193', borderWidth: '1px', borderStyle: 'solid' }}>
//       <CardHeader
//         titleTypographyProps={{ variant: 'subtitle1' }}
//         title={bag.title}
//         subheader={`Category: ${bag.category}, Color: ${bag.color}`}
//         action={    
//           <div>
//             <IconButton onClick={() => handleEditClick(bag)}><EditIcon sx={{color:"#009193"}} /></IconButton>
//             <IconButton onClick={() => handleDeleteClick(bag.id)}><DeleteIcon sx={{color:"#009193"}}/></IconButton>
//           </div>
//         }
//       />
//     </Card>
//         </div>
        
//       ))}
//       </Stack>
//     </div>

//   );
// };

// export default UnattendedBag;












// import React, { useState } from 'react';
// import AddBag from './AddBag';
// import { Stack, TextField } from '@mui/material';
// import { panelStyles } from './styles';
// import { InputAdornment, IconButton, Card, Divider, CardHeader, Avatar } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';

// const UnattendedBag = () => {
//   const [bags, setBags] = useState([
//     { id: 1, title: 'Samsonite', category: 'Suitcase', color: 'red', image: "redbag.jpg" },
//     { id: 2, title: 'Channel', category: 'bag', color: 'Black', image: "blackbag.jpg" },
//   ]);
//   const [selectedBag, setSelectedBag] = useState(null);

//   const handleEditClick = (bag) => {
//     setSelectedBag(bag);
//   };

//   const handleDeleteClick = (id) => {
//     setBags(bags.filter((bag) => bag.id !== id));
//   };

//   const handleAddBag = (bag) => {
//     if (selectedBag) {
//       // Update
//       setBags(bags.map((b) => (b.id === selectedBag.id ? { ...b, ...bag } : b)));
//       setSelectedBag(null);
//     } else {
//       // Add
//       setBags([...bags, { id: Date.now(), ...bag }]);
//     }
//   };

//   const [searchQuery, setSearchQuery] = useState('');

//   const filteredBags = bags.filter((bag) =>
//     bag.title.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const handleSearch = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   return (
//     <div>
//       <AddBag selectedBag={selectedBag} onAdd={handleAddBag} />
//       <Divider />
//       <Stack spacing={2} direction="column" m={1}>
//         <TextField
//           sx={panelStyles.textfield}
//           variant="outlined"
//           size="small"
//           type="text"
//           placeholder="Search bags"
//           value={searchQuery}
//           onChange={handleSearch}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <SearchIcon />
//               </InputAdornment>
//             ),
//           }}
//         />
//         {filteredBags.map((bag) => (
//           <Card key={bag.id} style={{ borderColor: '#009193', borderWidth: '1px', borderStyle: 'solid' }}>
//             <CardHeader
//               avatar={
//                 bag.image ? (
//                   <Avatar
//                     alt="Bag Image"
//                     src={bag.image}
//                     sx={{
//                       width: 40,
//                       height: 40,
//                       borderRadius: '50%', // Make it circular
//                     }}
//                   />
//                 ) : null
//               }
//               titleTypographyProps={{ variant: 'subtitle1' }}
//               title={bag.title}
//               subheader={`Category: ${bag.category}, Color: ${bag.color}`}
//               action={
//                 <div>
//                   <IconButton onClick={() => handleEditClick(bag)}>
//                     <EditIcon sx={{ color: '#009193' }} />
//                   </IconButton>
//                   <IconButton onClick={() => handleDeleteClick(bag.id)}>
//                     <DeleteIcon sx={{ color: '#009193' }} />
//                   </IconButton>
//                 </div>
//               }
//             />
//           </Card>
//         ))}
//       </Stack>
//     </div>
//   );
// };

// export default UnattendedBag;



import React, { useState, useEffect } from 'react';
import AddBag from './AddBag';
import LazyLoad from 'react-lazyload';
import { Stack, TextField, InputAdornment, IconButton, Card, Divider, CardHeader, Avatar, Box, Skeleton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { getUserBaggages, deleteBaggage } from '../../services/baggage'; // Import the API service functions
import { panelStyles } from './styles';
import { useSelector } from 'react-redux';

const UnattendedBag = () => {
  const [bags, setBags] = useState([]);
  const [selectedBag, setSelectedBag] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(true); 
  const userId = useSelector((state) => state.auth.user._id);

  useEffect(() => {
    
    const fetchBaggages = async () => {
      try {
        const { data } = await getUserBaggages(userId);
        setBags(data);
      } catch (error) {
        console.error('Error fetching baggages:', error);
      }
      setLoading(false); 
    };
    fetchBaggages();
  }, [refresh]);

  const handleEditClick = (bag) => {
    console.log('Editing bag:', bag); 
    setSelectedBag(bag);
  };

  const handleDeleteClick = async (id) => {
    try {
      await deleteBaggage(id);
      setBags((prevBags) => prevBags.filter((bag) => bag._id !== id));
    } catch (error) {
      console.error('Error deleting baggage:', error);
    }
  };

  const handleAddBag = (bag) => {
    if (selectedBag) {
      // Update
      setBags((prevBags) => prevBags.map((b) => (b._id === selectedBag._id ? { ...b, ...bag } : b)));
      setSelectedBag(null);
      setRefresh(!refresh);
    } else {
      // Add
      setBags((prevBags) => [...prevBags, bag]);
      setRefresh(!refresh);
    }
  };

  const filteredBags = bags.filter((bag) =>
    bag.brand ? bag.brand.toLowerCase().includes(searchQuery.toLowerCase()) : false
  );

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div>
      <AddBag selectedBag={selectedBag} onAdd={handleAddBag} />
      <Divider />
      <Stack spacing={2} direction="column" m={1}>
        <TextField
          sx={panelStyles.textfield}
          variant="outlined"
          size="small"
          type="text"
          placeholder="Search bags"
          value={searchQuery}
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        {loading ? (
          // Skeleton loader while fetching data
          Array.from(new Array(5)).map((_, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 5 }}>
              <Skeleton variant="circular" width={50} height={50} />
              <Box sx={{ ml: 2, mb: 2, mt: 1 }}>
                <Skeleton variant="text" width={210} />
                <Skeleton variant="text" width={140} />
              </Box>
            </Box>
          ))
        ) : (      
        filteredBags.map((bag) => (
          <Card key={bag._id} style={{ borderColor: '#009193', borderWidth: '1px', borderStyle: 'solid' }}>
            <CardHeader
              avatar={
                bag.images && bag.images.length > 0 ? (
                  <LazyLoad height={40} offset={100}>
                  <Avatar
                    alt="Bag Image"
                    src={`data:image/jpeg;base64,${bag.images[0]}`}
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                    }}
                  />
                </LazyLoad>
                ) : null
              }
              titleTypographyProps={{ variant: 'subtitle1' }}
              title={bag.brand}
              subheader={`Category: ${bag.category}, Color: ${bag.color}`}
              action={
                <div>
                  <IconButton onClick={() => handleEditClick(bag)}>
                    <EditIcon sx={{ color: '#009193' }} />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteClick(bag._id)}>
                    <DeleteIcon sx={{ color: '#009193' }} />
                  </IconButton>
                </div>
              }
            />
          </Card>
        )))}
      </Stack>
    </div>
  );
};

export default UnattendedBag;



