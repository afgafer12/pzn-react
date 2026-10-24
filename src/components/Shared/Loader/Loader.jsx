import { useEffect, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { getUserList } from "../../../lib/api/UserApi";

export default function Loader(props) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  }, []);

  return <>
    {props.loading && (
      <div className="overlay">
        <div className="position-absolute top-50 start-50">
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
      </div>
    )}
  </>
}