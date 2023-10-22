import { useState } from "react";
import CreateHostel from "../pages/createHostel";
import { useSelector, useDispatch } from "react-redux";
import { uploadHostelAction } from "../../features/hostels/createHostel";

export default function UploadHostel() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    hostelDescription: [""],
    prices: [{ numberInRoom: "", price: 0 }],
    phone: "",
    adminId: user._id,
    // Change "images" to "files" and initialize as an empty array
    files: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const addDescription = () => {
    setFormData({
      ...formData,
      hostelDescription: [...formData.hostelDescription, ""],
    });
  };

  const addPrice = () => {
    setFormData({
      ...formData,
      prices: [
        ...formData.prices,
        { numberInRoom: "", price: 0 },
      ],
    });
  };
  
  

  const handleDescriptionChange = (index, value) => {
    const updatedDescriptions = [...formData.hostelDescription];
    updatedDescriptions[index] = value;
    setFormData({
      ...formData,
      hostelDescription: updatedDescriptions,
    });
  };
  
  
  const handlePriceChange = (index, field, value) => {
    const updatedPrices = [...formData.prices];
    updatedPrices[index][field] = value;
    setFormData({
      ...formData,
      prices: updatedPrices,
    });
  };
  

  // Handle file input change
  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    // Update "files" field with an array of file objects
    setFormData({
      ...formData,
      files: selectedFiles, // Simply set the selected files
    });
  };
  


  const handleUpload = (e) => {
    e.preventDefault();

    // Convert prices to an array of objects
    const pricesArray = formData.prices.map((price) => ({
      numberInRoom: price.numberInRoom,
      price: price.price,
    }));
  
    // Update the FormData object
    const updatedFormData = {
      ...formData,
      prices: pricesArray,
    };
  
    console.log("Form Data", updatedFormData);
    dispatch(uploadHostelAction(updatedFormData));
  };

  return (
    <CreateHostel
      handleUpload={handleUpload}
      handleImageChange={handleImageChange}
      handlePriceChange={handlePriceChange}
      handleDescriptionChange={handleDescriptionChange}
      addPrice={addPrice}
      addDescription={addDescription}
      handleInputChange={handleInputChange}
      formData={formData}
    />
  );
}
