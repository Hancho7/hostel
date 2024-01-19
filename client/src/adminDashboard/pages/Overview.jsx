function Overview() {
  return (
    <div>
      <h1 className=" font-bold">Overview</h1>
      <div className=" border-l-2 border-l-red-500 p-4 my-7">
        <h1>Welcome </h1>
        <p>
          This panel gives access to control all the activities of booking and
          tracking of students bookings and their review
        </p>
      </div>

      <div className=" flex items-center justify-between flex-row">
        <div className="flex items-center flex-col flex-1">
          <h5>Total Bookings</h5>
          <p className=" text-lg font-bold">0</p>
          <h5>View</h5>
        </div>
        <div className="flex items-center flex-col flex-1">
          <h5>Admins</h5>
          <p className=" text-lg font-bold">0</p>
          <h5>View</h5>
        </div>
        <div className="flex items-center flex-col flex-1">
          <h5>Rooms</h5>
          <p className=" text-lg font-bold">0</p>
          <h5>View</h5>
        </div>
        <div className="flex items-center flex-col flex-1">
          <h5>Reviews</h5>
          <p className=" text-lg font-bold">0</p>
          <h5>View</h5>
        </div>
      </div>
    </div>
  );
}

export default Overview;
