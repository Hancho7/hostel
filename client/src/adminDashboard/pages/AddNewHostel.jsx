import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import {
  addNewHostelAction,
  clearAddNewHostel,
} from "../../features/hostels/addNewHostel";

import { MdAdd } from "react-icons/md";
import { validationSchema } from "../schemas/newHostelSchema";

const containerStyle = {
  width: "100%",
  height: "300px",
};

const center = {
  lat: 5.769072,
  lng: 0.082758,
};

const apiKey = import.meta.env.VITE_API_KEY;

function AddNewHostel() {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.adminSignIn);
  const { loading, message, success } = useSelector(
    (state) => state.addnewhostel
  );
  const [position, setPosition] = useState(null);
  const [descriptions, setDescriptions] = useState([""]);

  const formik = useFormik({
    initialValues: {
      nameOfHostel: "",
      secondID: data.secondID,
      phoneNumber: "",
      images: [],
      description: [""],
      address: {
        Latitude: 0,
        Longitude: 0,
        formattedAddress: "",
      },
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(addNewHostelAction(values));
      console.log("values", values);
    },
  });
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        formik.resetForm();
        dispatch(clearAddNewHostel());
      }, 6000);

      return () => clearTimeout(timer);
    }
  }, [success, dispatch, formik]);

  const onMapClick = (event) => {
    const clickedPosition = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: clickedPosition }, (results, status) => {
      if (status === "OK") {
        if (results[0]) {
          const formattedAddress = results[0].formatted_address;
          console.log("Latitude:", clickedPosition.lat);
          console.log("Longitude:", clickedPosition.lng);
          console.log("Geocoded location:", formattedAddress);

          formik.setFieldValue("address.Latitude", clickedPosition.lat);
          formik.setFieldValue("address.Longitude", clickedPosition.lng);
          formik.setFieldValue("address.formattedAddress", formattedAddress);

          setPosition(clickedPosition);
        }
      } else {
        console.error("Geocode error:", status);
      }
    });
  };

  const handleDescriptionChange = (index, value) => {
    const updatedDescriptions = [...descriptions];
    updatedDescriptions[index] = value;
    setDescriptions(updatedDescriptions);
    formik.setFieldValue(`description[${index}]`, value);
  };

  const addDescription = () => {
    setDescriptions([...descriptions, ""]);
  };

  const handleFileChange = (event) => {
    const files = event.currentTarget.files;
    // Convert FileList to an array
    const filesArray = Array.from(files);
    formik.setFieldValue("images", filesArray);
  };

  return (
    <div className="flex flex-col gap-y-4">
      <div className="border-l-4 border-l-red-700 p-3">
        <h1 className="font-bold">Add details of your hostel</h1>
        <p>Let&apos;s go digital and rest from long queues. Gotcha!!</p>
      </div>

      <form
        onSubmit={formik.handleSubmit}
        encType="multipart/form-data"
        className="flex flex-col gap-7"
      >
        {success && <p className=" text-green-500">{message}</p>}
        <div className="flex flex-row gap-x-1">
          <div className="flex flex-col flex-1">
            <label htmlFor="name">Name Of Hostel</label>
            <input
              type="text"
              className="border-2 p-1 rounded"
              id="name"
              name="nameOfHostel"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <span className=" font-normal text-sm text-red-600 ">
              {formik.errors.nameOfHostel &&
                formik.touched.nameOfHostel &&
                formik.errors.nameOfHostel}
            </span>
          </div>

          <div className="flex flex-col flex-1">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              className="border-2 p-1 rounded"
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <span className=" font-normal text-sm text-red-600 ">
              {formik.errors.phoneNumber &&
                formik.touched.phoneNumber &&
                formik.errors.phoneNumber}
            </span>
          </div>
        </div>

        {/* MAPS CONTAINER */}
        <div className="flex flex-col">
          <div style={{ marginTop: "20px" }}>
            <h1 className="font-semibold mb-1">
              Add the location of the hostel
            </h1>
            <LoadScript googleMapsApiKey={apiKey}>
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
                onClick={onMapClick}
              >
                {position && <Marker position={position} />}
              </GoogleMap>
            </LoadScript>
          </div>

          <div className="flex flex-row gap-2 items-center justify-between">
            <div>
              <label className="font-semibold">Latitude: </label>
              <input
                type="text"
                value={formik.values.address.Latitude}
                readOnly
              />
            </div>

            <div>
              <label className="font-semibold">Longitude: </label>
              <input
                type="text"
                value={formik.values.address.Longitude}
                readOnly
              />
            </div>

            <div>
              <label className="font-semibold">Formatted Address: </label>
              <input
                type="text"
                value={formik.values.address.formattedAddress}
                readOnly
              />
            </div>
          </div>
        </div>

        {/* DESCRIPTIONS SECTION */}
        <div className="flex flex-row gap-x-2">
          <div className="flex-1 flex flex-col">
            <input
              type="file"
              name="images"
              className="border-2 rounded"
              multiple
              id="images"
              onChange={handleFileChange}
              onBlur={formik.handleBlur}
            />
            <span className=" font-normal text-sm text-red-600 ">
              {formik.errors.images &&
                formik.touched.images &&
                formik.errors.images}
            </span>
          </div>
          {/* NEW DESCRIPTIONS SECTION */}
          <div className="flex items-center flex-row sm:flex-row gap-3 flex-1">
            <div className="flex flex-col gap-y-2 w-full sm:w-auto">
              {descriptions.map((description, index) => (
                <div key={index} className="flex gap-y-2">
                  <input
                    className="border-2 p-1 rounded"
                    type="text"
                    placeholder="Hostel Description"
                    value={description}
                    onChange={(e) =>
                      handleDescriptionChange(index, e.target.value)
                    }
                    key={index}
                  />
                </div>
              ))}
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
                addDescription();
              }}
              className="bg-slate-200 ml-0 mt-2 md:ml-1 text-white"
            >
              <MdAdd />
            </button>
          </div>
        </div>

        <div>
          <button
            className="text-white font-semibold bg-slate-900 w-full border-2 p-1 rounded hover:cursor-pointer hover:bg-slate-500"
            type="submit"
          >
            {" "}
            {loading ? (
              <ClipLoader size="1.5rem" className=" mt-auto mb-auto" />
            ) : (
              <></>
            )}
            <span className=" mt-auto mb-auto"> Submit </span>
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddNewHostel;
