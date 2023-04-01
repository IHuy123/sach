
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PaginationRe from "../../../../common/Paging";
//import ArticleItemAuthor from "../../../../components/ArticleItem/ArticleItemAuthor";
import ArticleItemStatslist from "../../../../components/ArticleItem/ArticleItemStatslist";
import { actFetchAuthorPostsAsync, actFetchEditorChefPostsAsync } from "../../../../store/post/actions";
function EditorChefListPost() {
  const dispatch = useDispatch();
  const editorChefPosts = useSelector((state) => state.Post.editorChefPosts);
  const [page, setPage] = useState(0);
  const [load, setLoad] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  useEffect(
    () => {
      dispatch(actFetchEditorChefPostsAsync());
    },
    // eslint-disable-next-line
    [load]
  );
  return (
    <div className="dashboard-content">
      <div className="row">
        <div className="col-lg-12 col-md-12 col-xs-12 traffic">
          <div className="dashboard-list-box margin-top-20 user-list">
            <h4 className="gray">Danh sách bài báo</h4>
            <ul>
              {editorChefPosts && (
                <>
                  {editorChefPosts.slice(page, page + 8).map((user, index) => (
                    <ArticleItemStatslist
                      user={user}
                      key={index}
                      load={load}
                      setLoad={setLoad}
                      isEditorChef={true}
                      isEditorChefUse={true}
                    />
                  ))}
                  <PaginationRe
                    page={page}
                    setPage={setPage}
                    count={8}
                    totalPages={editorChefPosts.length}
                  />
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
      {/* <section id="mt_blog" className>
        <div className="row">
          <div className="col-md-12">
            <div className="blog_post_sec blog_post_inner">
              <div className="row">
                {authorArticles ? (
                  <>
                    {authorArticles.map((post) => {
                      return (
                        <div
                          className="col-md-6 col-sm-12 mar-bottom-30"
                          key={post.id}
                        >
                          <ArticleItemAuthor post={post} isStyleRow />
                        </div>
                      );
                    })}
                  </>
                ) : (
                  "Không tìm thấy thông tin"
                )}
              </div>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
}

export default EditorChefListPost;
