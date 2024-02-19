export default function Home() {
  return (
    <main >
      <div className="container pt-5">
        <div className="row">
          <div className="col-md-5 m-auto">
            <div className="row">
              <div className="col-md-6">
                <a className="btn btnPrimary w-100" href="/login">Login</a>
              </div>
              <div className="col-md-6">
                <a className="btn btnPrimary w-100" href="/movies/list">Movie List</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
