import React from "react";
const Table = ({
  geocodingApiRes,
}) => {
  return (
      <div className="tablemain">
        <table className="table table-striped table-dark">
          <thead>
            <tr>
              <th>NAME</th>
              <th>COORDINATES</th>
              <th>ADMIN 1</th>
              <th>COUNTRY</th>
              <th>TEMPERATURE</th>
              <th>TIME</th>
            </tr>
          </thead>
          <tbody>
            {geocodingApiRes &&
              geocodingApiRes.map((geocoding,i) => {
                return (
                  <tr key={i}>
                    <td>{geocoding?.name}</td>
                    <td>
                      {geocoding?.latitude}, {geocoding?.longitude}
                    </td>
                    <td>{geocoding?.admin1}</td>
                    <td>{geocoding?.country}</td>
                    <td>{geocoding?.temperature}</td>
                    <td>{geocoding?.time}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    
  );
};

export default Table;
