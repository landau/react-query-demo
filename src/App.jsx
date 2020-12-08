import React from "react";
import Posts from "./Posts";
import Sidebar from "./Sidebar";
import LatestPosts from "./LatestPosts";

const App = () => {
  return (
    <div className="App">
      <div className="container">
        <header className="blog-header py-3">
          <div className="row flex-nowrap justify-content-between align-items-center">
            <div className="col-4 pt-1">
              <a className="text-muted" href="#"></a>
            </div>
            <div className="col-4 text-center">
              <a className="blog-header-logo text-dark" href="#">
                React Query Blog
              </a>
            </div>
            <div className="col-4 d-flex justify-content-end align-items-center"></div>
          </div>
        </header>
        <LatestPosts />
      </div>

      <main role="main" className="container">
        <div className="row">
          <div className="col-md-8 blog-main">
            <h3 className="pb-4 mb-4 font-italic border-bottom">
              From the Firehose
            </h3>

            <Posts />

            <nav className="blog-pagination">
              <a className="btn btn-outline-primary" href="#">
                Older
              </a>
              <a
                className="btn btn-outline-secondary disabled"
                href="#"
                tabIndex="-1"
                aria-disabled="true"
              >
                Newer
              </a>
            </nav>
          </div>
          {/* <!-- /.blog-main --> */}

          <Sidebar />
        </div>
        {/* <!-- /.row --> */}
      </main>
      {/* <!-- /.container --> */}
    </div>
  );
};

export default App;
