// import { TextField, Stack, Button, Avatar } from '@mui/material';
// import React, { useEffect } from 'react';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { panelStyles } from './styles';
// import { createBaggage, uploadBaggageImages } from '../../services/baggage'; 


// const AddBag = ({ selectedBag, onAdd }) => {
//   const formik = useFormik({
//     initialValues: {
//       title: '',
//       category: '',
//       color: '',
//       image: null,
//     },
//     validationSchema: Yup.object({
//       title: Yup.string().required('Brand is required'),
//       category: Yup.string().required('Category is required'),
//       color: Yup.string().required('Colour is required'),
//       image: Yup.mixed().required('Image is required'),
//     }),
//     onSubmit: async (values, { resetForm }) => {
//       try {
//         const formData = new FormData();
//         formData.append('category', values.category);
//         formData.append('color', values.color);
//         formData.append('brand', values.title);
//         formData.append('images', values.image);

//         console.log(formData);

//         if (selectedBag) {
//           await uploadBaggageImages(selectedBag._id, formData); // Call the update function
//         } else {
//           await createBaggage(formData); // Call the create function
//         }
//         onAdd(values);
//         resetForm();
//       } catch (error) {
//         console.error('Error adding/updating bag:', error);
//       }
//     },
//   });

//   useEffect(() => {
//     if (selectedBag) {
//       formik.setValues(selectedBag);
//     }
//   }, [selectedBag, formik]);

//   const handleImageChange = (e) => {
//     const imageFile = e.target.files[0];
//     formik.setFieldValue('image', URL.createObjectURL(imageFile));
//   };

//   return (
//     <form onSubmit={formik.handleSubmit}>
//       <Stack spacing={2} direction="column" m={1}>
//         <TextField
//           sx={panelStyles.textfield}
//           variant="outlined"
//           size="small"
//           label="Brand"
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
//           label="Category"
//           name="category"
//           value={formik.values.category}
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//           error={formik.touched.category && Boolean(formik.errors.category)}
//           helperText={formik.touched.category && formik.errors.category}
//         />
//         <TextField
//           sx={panelStyles.textfield}
//           variant="outlined"
//           size="small"
//           label="Colour"
//           name="color"
//           value={formik.values.color}
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//           error={formik.touched.color && Boolean(formik.errors.color)}
//           helperText={formik.touched.color && formik.errors.color}
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
//         {formik.values.image && <Avatar alt="Bag Image" src={formik.values.image} sx={{ width: 100, height: 100 }} />}
//         <Button sx={{ background: '#009193' }} variant="contained" type="submit">
//           {selectedBag ? 'Update' : 'Add'}
//         </Button>
//       </Stack>
//     </form>
//   );
// };

// export default AddBag;



import { TextField, Stack, Button, Avatar } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createBaggage, updateBaggage } from '../../services/baggage'; // Import the API service functions

const AddBag = ({ selectedBag, onAdd }) => {
  const [imagesBase64, setImagesBase64] = React.useState([]);
  const fileInputRef = useRef(null);

  const formik = useFormik({
    initialValues: {
      brand: '',
      category: '',
      color: '',
    },
    validationSchema: Yup.object({
      brand: Yup.string().required('Brand is required'),
      category: Yup.string().required('Category is required'),
      color: Yup.string().required('Colour is required'),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const formData = { ...values, images: imagesBase64 };
        if (selectedBag) {
          await updateBaggage(selectedBag._id, formData); // Call the update function if editing
        } else {
          await createBaggage(formData); // Call the create function if adding new
        }
        onAdd(formData);
        resetForm();
        setImagesBase64([]); // Reset images state
        if (fileInputRef.current) {
          fileInputRef.current.value = ''; // Clear the file input
        }
      } catch (error) {
        console.error('Error adding/updating bag:', error);
      }
    },
  });

  useEffect(() => {
    if (selectedBag) {
      formik.setValues({
        brand: selectedBag.brand,
        category: selectedBag.category,
        color: selectedBag.color,
      });
      setImagesBase64(selectedBag.images || []);
    } else {
      formik.resetForm();
      setImagesBase64([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = ''; // Clear the file input
      }
    }
  }, [selectedBag]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const maxFileSize = 5 * 1024 * 1024; // 5 MB
    Promise.all(files.map(file => {
      return new Promise((resolve, reject) => {
        if (file.size > maxFileSize) {
          reject(new Error(`Image size exceeds the maximum (${maxFileSize / 1024 / 1024} MB) allowed limit.`));
        }
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result.split(',')[1]; // Remove the data URL part
          resolve(base64String);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    }))
    .then(base64Images => setImagesBase64(base64Images))
    .catch(error => console.error("Error reading files", error));
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={2} direction="column" m={1}>
        <TextField
          variant="outlined"
          size="small"
          label="Brand"
          name="brand"
          value={formik.values.brand}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.brand && Boolean(formik.errors.brand)}
          helperText={formik.touched.brand && formik.errors.brand}
        />
        <TextField
          variant="outlined"
          size="small"
          label="Category"
          name="category"
          value={formik.values.category}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.category && Boolean(formik.errors.category)}
          helperText={formik.touched.category && formik.errors.category}
        />
        <TextField
          variant="outlined"
          size="small"
          label="Colour"
          name="color"
          value={formik.values.color}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.color && Boolean(formik.errors.color)}
          helperText={formik.touched.color && formik.errors.color}
        />
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
            <Avatar key={index} alt={`Bag Image ${index}`} src={`data:image/jpeg;base64,${image}`} sx={{ width: 100, height: 100, margin: '5px' }} />
          ))}
        </div>
        <Button sx={{ background: '#009193' }} variant="contained" type="submit">
          {selectedBag ? 'Update' : 'Add'}
        </Button>
      </Stack>
    </form>
  );
};

export default AddBag;




