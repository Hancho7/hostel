// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { readCommentAction } from "../../features/comments/getCommentslice.jsx";
// import {BiArrowBack} from 'react-icons/bi'
// import {IoMdArrowForward} from 'react-icons/io'

export default function Part3() {
  // const dispatch = useDispatch();
  // const loading = useSelector((state) => state.readComment.loading);
  // const comments = useSelector((state) => state.readComment.comments);
  // const error = useSelector((state) => state.readComment.commentsError);

  // const [currentPage, setCurrentPage] = useState(1);

  // useEffect(() => {
  //   dispatch(readCommentAction(currentPage)); // Pass the current page to the action
  // }, [dispatch, currentPage]);

  // const handleNextPage = () => {
  //   setCurrentPage(currentPage + 1);
  // };

  // const handlePrevPage = () => {
  //   if (currentPage > 1) {
  //     setCurrentPage(currentPage - 1);
  //   }
  // };

  return (
    <div>
      {/* <section>
        <p className="text-[#fec615] font-semibold">Testimonials</p>
        <h1 className="font-bold text-3xl mb-6 capitalize text-[#292a66]">see what our students are saying</h1>
      </section>
      <section>
        {loading && <p>Loading comments...</p>}
        {error && <p>Error: {error.message}</p>}
        {comments && (
          <div>
            <ul>
              {comments.map((comment) => (
                <li key={comment._id}>
                  <p>{`${comment.user.firstName} ${comment.user.lastName}`}</p>
                  <p>{comment.text}</p>
                </li>
              ))}
            </ul>
            <div>
              <button onClick={handlePrevPage}><BiArrowBack/></button>
              <button onClick={handleNextPage}><IoMdArrowForward/></button>
            </div>
          </div>
        )}
      </section> */}
    </div>
  );
}
