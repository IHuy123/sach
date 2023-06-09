import "./post-detail.css";
import { useEffect, useState } from "react";
import PostDetailHead from "../../components/PostDetail/PostDetailHead";
import PostDetailContent from "../../components/PostDetail/PostDetailContent";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  actFetchPostDetailAsync,
  actResetDataDetail,
} from "../../store/post/actions";
import Loading from "../../common/Loading";
import PageNotFound from "../404";

function PostDetail() {
  const dispatch = useDispatch();
  const params = useParams();
    const history = useHistory();
  const slug = params.slug;
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    setStatus("loading");
    dispatch(actFetchPostDetailAsync(slug)).then((res) => {
      if (res.ok) {
        setStatus("success");
      } else {
        history.push("/login");
        setStatus("error");
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  useEffect(() => {
    return () => {
      dispatch(actResetDataDetail());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (status === "loading") {
    return <Loading isFixed />;
  }

  return (
    <>
      <PostDetailHead isShowCategories />
      <section id="blog_main_sec" className="section-inner">
        <div className="container">
          <PostDetailContent />
          {/* <PostDetailSidebar /> */}
        </div>
      </section>
    </>
  );
}

export default PostDetail;
