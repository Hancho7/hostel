import { IoIosAddCircleOutline } from "react-icons/io";
import { validationSchema } from "../schemas/adminSchema";
import { useFormik } from "formik";
function AdminAdd() {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      role: "manager",
      contact: "",
      file: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("Form submitted with values:", values);
    },
  });

  const handleFileChange = (event) => {
    formik.setFieldValue("file", event.currentTarget.files[0]);
  };

  const handleSelectChange = (event) => {
    formik.handleChange(event);
    formik.setFieldTouched("role", true);
  };

  const numberOfadmins = 0;
  return (
    <div className="flex flex-col gap-y-5">
      <h1 className=" font-bold">Admins</h1>
      <div>
        <div className="flex flex-row justify-between">
          <div className="flex flex-row items-center gap-2">
            <IoIosAddCircleOutline /> <span>add admin</span>
          </div>
          <div className=" border-t-2 p-2">
            <h1>
              {numberOfadmins}
              <span> registered admins</span>
            </h1>
          </div>
        </div>

        {/* FORM FOR ADMIN REGISTRATION */}
        <form className="flex flex-col gap-y-4" onSubmit={formik.handleSubmit}>
          <div className="flex flex-row gap-x-1">
            <div className="flex flex-col flex-1 gap-y-1">
              <label htmlFor="name">Admin Name</label>
              <input
                type="text"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="name"
                id="name"
                className=" border-2 p-1 rounded"
              />
              <span className=" font-normal text-sm text-red-600 ">
                {formik.errors.name &&
                  formik.touched.name &&
                  formik.errors.name}
              </span>
            </div>
            <div className="flex flex-col flex-1 gap-y-1">
              <label htmlFor="role">Admin Role</label>
              <select
                name="role"
                id="role"
                onChange={handleSelectChange}
                onBlur={formik.handleBlur}
                value={formik.values.role}
                className=" border-2 p-1 rounded hover:cursor-pointer"
              >
                <option value="manager">manager</option>
                <option value="Owner">Owner</option>
              </select>
              <span className=" font-normal text-sm text-red-600 ">
                {formik.errors.role &&
                  formik.touched.role &&
                  formik.errors.role}
              </span>
            </div>
          </div>
          <div className=" flex flex-col gap-y-1">
            <label htmlFor="email">Admin Email</label>
            <input
              type="email"
              placeholder="email"
              id="email"
              className=" border-2 p-1 rounded"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <span className=" font-normal text-sm text-red-600 ">
              {formik.errors.email &&
                formik.touched.email &&
                formik.errors.email}
            </span>
          </div>
          <div className="flex flex-row gap-x-1">
            <div className="flex flex-col flex-1 gap-y-1">
              <label htmlFor="password">Admin Password</label>
              <input
                type="password"
                placeholder="password"
                value={formik.values.password}
                id="password"
                className=" border-2 p-1 rounded"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <span className=" font-normal text-sm text-red-600 ">
                {formik.errors.password &&
                  formik.touched.password &&
                  formik.errors.password}
              </span>
            </div>
            <div className="flex flex-col flex-1 gap-y-1">
              <label htmlFor="contact">Admin Contact</label>
              <input
                type="text"
                placeholder="contact"
                value={formik.values.contact}
                id="contact"
                className=" border-2 p-1 rounded"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <span className=" font-normal text-sm text-red-600 ">
                {formik.errors.contact &&
                  formik.touched.contact &&
                  formik.errors.contact}
              </span>
            </div>
          </div>
          <div className="flex flex-row gap-x-1">
            <div className="flex flex-col flex-1 gap-y-1">
              <label htmlFor="picture">Profile Pictuce</label>
              <div className="flex flex-row">
                <input
                  className="border-2 rounded"
                  type="file"
                  name="files"
                  accept="image/*"
                  onChange={handleFileChange}
                  onBlur={formik.handleBlur}
                />
                <span className=" font-normal text-sm text-red-600 ">
                  {formik.errors.file &&
                    formik.touched.file &&
                    formik.errors.file}
                </span>
              </div>
            </div>
            <div className="flex flex-col flex-1 gap-y-1 text-white font-bold">
              <button
                type="submit"
                className=" bg-slate-900 border-2 p-1 rounded hover:cursor-pointer hover:bg-slate-500"
              >
                Add
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* SECOND CONTAINER FOR REGISTERED ADMINS */}
      <div className="flex flex-col gap-y-3">
        <h1 className=" font-bold">Registered admins</h1>
        <table className=" w-full">
          <thead>
            <tr>
              <th>id</th>
              <th>Name</th>
              <th>Role</th>
              <th>Contact</th>
              <th>E-mail</th>
              <th>Date Added</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminAdd;
