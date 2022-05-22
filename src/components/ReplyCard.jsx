export const ReplyCard = () => {
  return (
    <div className="postcard-container">
      <div className="avatar-content-container">
        <div className="post-content">
          <p>
            {/* <strong>{`${item.username}${" "}`}</strong> */}
            {/* {new Date(item.createdAt).getHours()} hours ago */}
          </p>
          <p>content</p>
        </div>
      </div>
      <div className="user-action-icons-container">
        {/* <span><i className="fa-regular fa-comment"></i></span> */}
        <span>{/* <i className="fa-solid fa-retweet"></i> */}</span>

        <i className="fa-solid fa-reply"></i>
        <span>
          <i className="fa-regular fa-heart"></i>
          Likes{" "}
        </span>
        <span>
          <i className="fa-solid fa-trash"></i>
        </span>
      </div>
    </div>
  );
};
