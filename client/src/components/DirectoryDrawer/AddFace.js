// import { TextField, Stack, Button, Avatar } from '@mui/material';
// import React, { useEffect } from 'react';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import axios from 'axios'; 
// import { panelStyles } from './styles';

// const AddFace = ({ selectedFace }) => {
//   const formik = useFormik({
//     initialValues: {
//       title: '',
//       id: '',
//       image: null,
//     },
//     validationSchema: Yup.object({
//       title: Yup.string().required('Name is required'),
//       id: Yup.string().required('ID is required'),
//       image: Yup.mixed().required('Image is required'),
//     }),
//     onSubmit: async (values, { resetForm }) => {
//       try {
//         const formData = new FormData();
//         formData.append('title', values.title);
//         formData.append('id', values.id);
//         formData.append('image', values.image);


//         const response = await axios.post('/api/userfaces', formData, {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         });

        
//         console.log(response.data); 

        
//         resetForm();
//       } catch (error) {
//         console.error('Error adding user face:', error);
        
//       }
//     },
//   });

//   useEffect(() => {
//     if (selectedFace) {
//       formik.setValues(selectedFace);
//     }
//   }, [selectedFace, formik]);

//   const handleImageChange = (e) => {
//     const imageFile = e.target.files[0];
//     formik.setFieldValue('image', imageFile); 
//   };

//   return (
//     <form onSubmit={formik.handleSubmit}>
//       <Stack spacing={2} direction="column" m={1}>
//         <TextField
//           sx={panelStyles.textfield}
//           variant="outlined"
//           size="small"
//           label="Name"
//           name="title"
//           value={formik.values.title}
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//           error={formik.touched.title && Boolean(formik.errors.title)}
//           helperText={formik.touched.title && formik.errors.title}
//         />
//         <TextField
//           sx={panelStyles.textfield}
//           variant="outlined"
//           size="small"
//           label="ID"
//           name="id"
//           value={formik.values.id}
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//           error={formik.touched.id && Boolean(formik.errors.id)}
//           helperText={formik.touched.id && formik.errors.id}
//         />
        
//         <input
//           type="file"
//           onChange={handleImageChange}
//           accept="image/*"
//           onBlur={formik.handleBlur}
//           style={{ marginBottom: '10px' }}
//         />
//         {formik.touched.image && formik.errors.image && (
//           <div style={{ color: 'red', marginBottom: '10px' }}>
//             {formik.errors.image}
//           </div>
//         )}
//         {formik.values.image && <Avatar alt="Face Image" src={URL.createObjectURL(formik.values.image)} sx={{ width: 100, height: 100 }} />} {/* Display uploaded image */}
        
//         <Button sx={{ background: '#009193' }} variant="contained" type="submit">
//           {selectedFace ? 'Update' : 'Add'}
//         </Button>
//       </Stack>
//     </form>
//   );
// };

// export default AddFace;


import { TextField, Stack, Button, Avatar } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import imageCompression from 'browser-image-compression';
import { createFace, updateFace } from '../../services/face'; // Import the API service functions

const AddFace = ({ selectedFace, onAdd }) => {
  const [imagesBase64, setImagesBase64] = React.useState([]);
  const fileInputRef = useRef(null);

  const formik = useFormik({
    initialValues: {
      title: '',
      // id: '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Name is required'),
      // id: Yup.string().required('ID is required'),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const formData = { ...values, images: imagesBase64 };
        if (selectedFace) {
          await updateFace(selectedFace._id, formData); // Call the update function if editing
        } else {
          await createFace(formData); // Call the create function if adding new
        }
        onAdd(formData);
        resetForm();
        setImagesBase64([]); // Reset images state
        if (fileInputRef.current) {
          fileInputRef.current.value = ''; // Clear the file input
        }
      } catch (error) {
        console.error('Error adding/updating face:', error);
      }
    },
  });

  useEffect(() => {
    if (selectedFace) {
      formik.setValues({
        title: selectedFace.title,
        // id: selectedFace.id,
      });
      setImagesBase64(selectedFace.images || []);
    } else {
      formik.resetForm();
      setImagesBase64([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = ''; // Clear the file input
      }
    }
  }, [selectedFace]);

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    const maxFileSize = 1 * 1024 * 1024; // 1 MB

    try {
      const compressedFiles = await Promise.all(
        files.map(async (file) => {
          const compressedFile = await imageCompression(file, {
            maxSizeMB: 1, // Max size in MB
            maxWidthOrHeight: 800, // Max width or height
          });
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
              const base64String = reader.result.split(',')[1]; // Remove the data URL part
              resolve(base64String);
            };
            reader.onerror = reject;
            reader.readAsDataURL(compressedFile);
          });
        })
      );

      setImagesBase64(compressedFiles);
    } catch (error) {
      console.error("Error compressing files", error);
    }
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={2} direction="column" m={1}>
        <TextField
          variant="outlined"
          size="small"
          label="Name"
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
        />
        {/* <TextField
          variant="outlined"
          size="small"
          label="ID"
          name="id"
          value={formik.values.id}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.id && Boolean(formik.errors.id)}
          helperText={formik.touched.id && formik.errors.id}
        /> */}
        <input
          type="file"
          onChange={handleImageChange}
          accept="image/*"
          multiple
          style={{ marginBottom: '10px' }}
          ref={fileInputRef} // Attach the ref to the file input
        />
        <div>
          {imagesBase64.map((image, index) => (
            <Avatar key={index} alt={`Face Image ${index}`} src={`data:image/jpeg;base64,${image}`} sx={{ width: 100, height: 100, margin: '5px' }} />
          ))}
        </div>
        <Button sx={{ background: '#009193' }} variant="contained" type="submit">
          {selectedFace ? 'Update' : 'Add'}
        </Button>
      </Stack>
    </form>
  );
};

export default AddFace;


