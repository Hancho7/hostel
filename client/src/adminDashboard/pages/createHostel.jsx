import { GrFormAdd } from "react-icons/gr";

function CreateHostel({
  handleInputChange,
  addDescription,
  addPrice,
  handleDescriptionChange,
  handleImageChange,
  handlePriceChange,
  handleUpload,
  formData,
}) {
  return (
    <div>
      <h2 className=" text-base md:text-lg lg:text-3xl my-4 font-semibold text-center">
        Upload a Hostel
      </h2>
      <form
        className="flex flex-col  gap-4 w-[100%] md:w-[60%] md:m-auto p-5 bg-black rounded-md "
        onSubmit={handleUpload}
      >
        <input
          className=" common-input2"
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleInputChange}
        />
        <input
          className=" common-input2"
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleInputChange}
        />
        <div className=" flex items-center gap-3">
          <div className="flex flex-col gap-y-2">
            {formData.hostelDescription.map((description, index) => (
              <div key={index} className=" flex gap-y-2">
                <input
                  className=" common-input2"
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
            className=" bg-slate-200 ml-1 text-white"
          >
            <GrFormAdd className=" text-white" />
          </button>
        </div>

        <div className=" flex items-center gap-3">
          <div>
            {formData.prices.map((price, index) => (
              <div key={index} className="flex gap-x-2 flex-col md:flex-row">
                <input
                  className=" common-input2 my-2"
                  type="text"
                  placeholder="Number in Room"
                  value={price.numberInRoom}
                  onChange={(e) =>
                    handlePriceChange(index, "numberInRoom", e.target.value)
                  }
                />
                <input
                  className=" common-input2 my-2"
                  type="number"
                  placeholder="Price"
                  value={price.price}
                  onChange={(e) => {
                    handlePriceChange(index, "price", e.target.value);
                  }}
                />
              </div>
            ))}
          </div>

          <button
            onClick={(e) => {
              e.preventDefault();
              addPrice();
            }}
            className=" bg-slate-200 ml-1 text-white"
          >
            <GrFormAdd />
          </button>
        </div>

        {/* Add file input for image uploads */}
        <div>
          <input
            className="hidden"
            type="file"
            name="files"
            accept="image/*"
            multiple
            id="file-input" // Connect this input to the label using the "for" attribute
            onChange={handleImageChange}
          />
          <label
            htmlFor="file-input"
            className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-slate-500"
          >
            <span>Upload Images</span>
          </label>
        </div>
        <input
          className=" common-input2"
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleInputChange}
        />
        <button
          type="submit"
          onClick={handleUpload}
          className="h-8 w-28 bg-white text-black font-semibold rounded m-auto"
        >
          Upload Hostel
        </button>
      </form>
    </div>
  );
}

export default CreateHostel;
