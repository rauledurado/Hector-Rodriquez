import React from 'react'
function navbar({
    searchCity,
    setSearchValue,
    searchValue,
    getForcast,
    forcast3days,
    weaklyForcast,
    checked,
    checked1
  }) {
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-dark">
        <form className="form-inline my-2 my-lg-0">
      <input className="form-control ml-2  p-30  searchlocation" value={searchValue} onChange={(event) => setSearchValue(event.target.value)}  type="search" placeholder="Search" aria-label="Search"/>
      <button className="btn btn btn-primary  btn-md ml-2" type='button' onClick={searchCity} >Search</button>
    </form>
<div class="form-check">
  <input class="form-check-input" type="radio" name="flexRadioDefault"  value={checked} id="flexCheckDefault" onChange={forcast3days} />
  <label class="form-check-label text-light" for="flexRadioDefault1">
  Weather forecast for 3 days
  </label>
</div>
<div class="form-check">
  <input class="form-check-input" type="radio" name="flexRadioDefault"  value={checked1} id="flexCheckChecked" onChange={weaklyForcast}  />
  <label class="form-check-label text-light" for="flexRadioDefault2">
  For weakly Weather forecast
  </label>
</div>
</nav>
    </div>
  )
}
export default navbar