import { Link, useParams } from "react-router-dom";
import MainTitle from "../../common/MainTitle";
// import Button from "../../common/Button";
import ArticleItem from "../../components/ArticleItem";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { actFetchPostsSearchAsync } from "../../store/post/actions";
// import { usePaging } from "../../hooks/usePaging";
import { posts } from "../../data";

function CategoryPage() {
  const dispatch = useDispatch();
  const params = useParams();
  const slug = params.slug;
  const category = useSelector((state) => {
    const hashCategoryFromId = state.Category.hashCategoryFromId;
    for (const key in hashCategoryFromId) {
      const element = hashCategoryFromId[key];
      if (element.slug === slug && element.lang === "vi") {
        return element;
      }
    }
    return null;
  });
  const categoryId = category !== null ? category.id : "";
  useEffect(() => {
    if (categoryId !== "") {
      dispatch(
        actFetchPostsSearchAsync({
          page: 1,
          categories: [categoryId],
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId]);

  // const {
  //   items: posts,
  //   loading,
  //   totalElement,
  //   handleLoadMore,
  //   hasMoreItems,
  // } = usePaging({
  //   funcSelector: (state) => state.Post.articlesSearchPaging,
  //   actionAsync: actFetchPostsSearchAsync,
  //   extraParams: {
  //     categories: [categoryId],
  //   },
  // });

  // if (!category) {
  //   return null;
  // }

  return (
    <main className="home-1">
      <section className="breadcrumb-outer text-center bg-red">
        <div className="container">
          <div className="breadcrumb-content">
            <h2>Thể loại</h2>
            <nav aria-label="breadcrumb">
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">Trang Chủ</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link to="#">Thể loại</Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </section>
      <section id="mt_blog" className="nomargin">
        <div className="container">
          <div className="row">
            <MainTitle isSearch>
              {/* {totalElement} */}
              {/* Kết quả tìm kiếm cho danh mục "{category.name}" */}4 Kết quả
              tìm kiếm cho danh mục "{slug}"
            </MainTitle>
            {posts.map((post) => {
              return (
                <div className="col-md-12 width100" key={post.id}>
                  <ArticleItem isShowCategories post={post} />
                </div>
              );
            })}
            {/* {hasMoreItems && (
              <div class="col-xs-12">
                <div class="blog-button text-center">
                  <Button
                    className="btn-blog"
                    type="primary"
                    isSizeLarge
                    isLoading={loading}
                    onClick={handleLoadMore}
                  >
                    Tải thêm
                  </Button>
                </div>
              </div>
            )} */}
          </div>
        </div>
      </section>
    </main>
  );
}

export default CategoryPage;
