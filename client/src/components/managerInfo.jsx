

function ManagerInfo({manager}) {
    console.log("manager profile", manager.profilePic)
    const [managerProfilePhotoLink] = manager.profilePic;
    console.log("manager profile", managerProfilePhotoLink)
  return (
    <div className="flex flex-col gap-4 px-6 py-8 bg-[#ece9e9] rounded shadow-md">
        <div className="flex flex-row justify-around">
            <div className="">
                <h1 className=" text-2xl font-semibold">Hosted By:</h1>
                <h2>{manager.name}</h2>
            </div>
            <div className=" bg-black">
                <img
                    src={managerProfilePhotoLink}
                    alt=''
                    className="rounded-full w-full "
                 />
            </div>
        </div>

        <div className=" mx-auto">
            <h1>Contact the Manager:</h1>
            <p>{manager.email}</p>
        </div>
    </div>
  )
}

export default ManagerInfo